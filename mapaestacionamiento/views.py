from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.utils import timezone
from django.db import transaction
from django.db.models import Q
from django.contrib.auth.models import User, Group
import traceback
from .models import Lugar, RegistroMovimiento, ConfiguracionSistema
from funcionarios.models import Funcionario
from .serializers import (LugarSerializer, MyTokenObtainPairSerializer, HistorialSerializer)
import re
from itertools import cycle

# 1. VISTA DE MAPA
class MapaEstacionamientoView(APIView):
    # CAMBIO 1: Permitimos que CUALQUIERA vea el mapa (Logueado o No)
    permission_classes = [AllowAny] 

    def get(self, request):
        lugares = Lugar.objects.all().order_by('id_lugar')
        data = []
        
        # CAMBIO 2: Verificamos si quien pide el mapa es un usuario del sistema o un anónimo
        es_personal_autorizado = request.user.is_authenticated

        for l in lugares:
            ocupado_por_data = None
            
            # Solo mostramos DATOS PERSONALES si el usuario está logueado (Guardia/Jefe/Director)
            if l.ocupado and l.ocupado_por and es_personal_autorizado:
                ocupado_por_data = {
                    "nombre": l.ocupado_por.nombre,
                    "rut": l.ocupado_por.rut,
                    "ppu": l.ocupado_por.ppu
                }
            
            # Al público general solo le mandamos si está ocupado o no
            data.append({
                "id_lugar": l.id_lugar,
                "ocupado": l.ocupado,       # Esto pinta el color (Rojo/Verde)
                "tipo": "General",
                "ocupado_por": ocupado_por_data # Será null para el público (Privacidad)
            })
            
        return Response(data)
    
def es_rut_valido(rut):
    if not rut: return False
    rut = rut.upper().replace("-", "").replace(".", "")
    if len(rut) < 2: return False
    
    aux, dv = rut[:-1], rut[-1]
    if not aux.isdigit(): return False # Cuerpo debe ser numérico

    # Algoritmo Módulo 11 en 3 líneas:
    revertido = map(int, reversed(str(aux)))
    factors = cycle(range(2, 8))
    s = sum(d * f for d, f in zip(revertido, factors))
    res = (-s) % 11
    dvr = 'K' if res == 10 else str(res)
    
    return dv == dvr    
    
# mapaestacionamiento/views.py

class ProcesarPistoleoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            rut_raw = request.data.get('rut') 
            id_lugar_escaneado = request.data.get('id_lugar')
            nombre_visita = request.data.get('nombre_visita')

            if not id_lugar_escaneado:
                return Response({"error": "Debe escanear un código de Estacionamiento"}, status=400)

            if str(id_lugar_escaneado).isdigit():
                 id_lugar_escaneado = f"E.{id_lugar_escaneado}"
            
            with transaction.atomic():
                lugar_target = Lugar.objects.select_for_update().filter(id_lugar=id_lugar_escaneado).first()
                
                if not lugar_target:
                    return Response({"error": f"El lugar {id_lugar_escaneado} no existe"}, status=404)

                # --- ESCENARIO SALIDA (Si hay alguien asignado O si la bandera dice ocupado) ---
                # Verificamos ambos por seguridad
                if lugar_target.ocupado_por or lugar_target.ocupado:
                    
                    funcionario_actual = lugar_target.ocupado_por
                    nombre_funcionario = funcionario_actual.nombre if funcionario_actual else "Desconocido"
                    
                    # 1. ACTUALIZACIÓN DOBLE (LA SOLUCIÓN) 🛠️
                    lugar_target.ocupado_por = None
                    lugar_target.ocupado = False # <--- ¡ESTO FALTABA PARA QUE SE PONGA VERDE!
                    lugar_target.save()

                    # 2. CERRAR HISTORIAL
                    if funcionario_actual:
                        RegistroMovimiento.objects.filter(
                            funcionario=funcionario_actual, lugar=lugar_target, fecha_salida__isnull=True
                        ).update(fecha_salida=timezone.now())

                    return Response({
                        "mensaje": "Liberado correctamente", "tipo": "salida",
                        "lugar": id_lugar_escaneado,
                        "funcionario": nombre_funcionario
                    })

                # --- ESCENARIO ENTRADA ---
                else:
                    if not rut_raw:
                        return Response({"error": "Lugar libre. Falta RUT."}, status=400)

                    rut_limpio = rut_raw.upper().replace("-", "").replace(".", "")

                    # Buscar o crear funcionario
                    funcionario = Funcionario.objects.filter(rut=rut_limpio).first()

                    if not funcionario:
                        if nombre_visita:
                            funcionario = Funcionario.objects.create(
                                rut=rut_limpio,
                                nombre=nombre_visita, 
                                cargo='Visita',       
                                ppu='VISITA'
                            )
                        else:
                            return Response({ "error": "RUT no registrado", "codigo": "RUT_NO_ENCONTRADO" }, status=404)

                    # Validar si ya está adentro
                    otro_lugar = Lugar.objects.filter(ocupado_por=funcionario).first()
                    if otro_lugar:
                        return Response({"error": f"{funcionario.nombre} ya está en {otro_lugar.id_lugar}"}, status=400)

                    # 3. ASIGNAR LUGAR (DOBLE ACTUALIZACIÓN)
                    lugar_target.ocupado_por = funcionario
                    lugar_target.ocupado = True # <--- Aseguramos que se ponga rojo
                    lugar_target.save()

                    RegistroMovimiento.objects.create(funcionario=funcionario, lugar=lugar_target)

                    patente_show = funcionario.ppu if funcionario.ppu else 'VISITA'

                    return Response({
                        "mensaje": f"Ingreso: {funcionario.nombre}",
                        "tipo": "entrada",
                        "datos": {
                            "nombre": funcionario.nombre,
                            "lugar": lugar_target.id_lugar,
                            "patente": patente_show,
                            "hora": timezone.now().strftime("%H:%M")
                        }
                    })

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": f"Error interno: {str(e)}"}, status=500)
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#Aca van las clases que tenemos en el bloc de notas
class CambiarClaveMaestraView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # CORRECCIÓN: Permitimos acceso si es Grupo 'Cetecom' O SI ES SUPERUSUARIO
        es_jefe = request.user.groups.filter(name__in=['Jefe de Seguridad', 'Cetecom']).exists()
        es_superuser = request.user.is_superuser

        if not (es_jefe or es_superuser):  # <--- AQUÍ ESTÁ EL CAMBIO
            return Response({"error": "No tienes permisos para cambiar la configuración"}, status=403)

        nueva_clave = request.data.get('nueva_clave')
        
        if not nueva_clave or len(nueva_clave) < 4:
            return Response({"error": "La clave debe tener al menos 4 caracteres"}, status=400)

        config, created = ConfiguracionSistema.objects.get_or_create(id=1)
        config.clave_maestra = nueva_clave
        config.save()

        return Response({"mensaje": "✅ Clave Maestra actualizada correctamente"})

class LiberarLugarManualView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. VERIFICAR PERMISOS
        roles_autorizados = ['Cetecom', 'Jefe de Seguridad']
        es_autorizado = request.user.groups.filter(name__in=roles_autorizados).exists()
        
        if not (es_autorizado or request.user.is_superuser):
            return Response({"error": "⛔ No tienes permisos para liberar manualmente."}, status=403)

        # 2. OBTENER DATOS
        lugar_id = request.data.get('id_lugar')
        password = request.data.get('password')

        if not lugar_id or not password:
            return Response({"error": "Faltan datos"}, status=400)

        # 3. VERIFICAR CLAVE MAESTRA
        config, _ = ConfiguracionSistema.objects.get_or_create(id=1)
        if password != config.clave_maestra:
            return Response({"error": "⛔ Contraseña administrativa incorrecta"}, status=403)

        # 4. NORMALIZACIÓN DE ID (AQUÍ ESTÁ LA CORRECCIÓN CRÍTICA) 🛠️
        # Antes verificábamos .isdigit(), ahora verificamos si empieza con "E."
        lugar_id = str(lugar_id) # Asegurar que es string
        if not lugar_id.startswith('E.'):
            lugar_id = f"E.{lugar_id}"

        try:
            with transaction.atomic():
                # Buscar el lugar
                lugar = Lugar.objects.select_for_update().get(id_lugar=lugar_id)

                if not lugar.ocupado:
                    return Response({"mensaje": "El lugar ya estaba libre."})

                # Obtener quién lo ocupaba para cerrar su registro
                funcionario = lugar.ocupado_por
                
                # Liberar el lugar físico
                lugar.ocupado = False
                lugar.ocupado_por = None
                lugar.save()

                # Cerrar el registro de movimiento abierto
                if funcionario:
                    RegistroMovimiento.objects.filter(
                        lugar=lugar,
                        funcionario=funcionario,
                        fecha_salida__isnull=True
                    ).update(fecha_salida=timezone.now())

            return Response({"mensaje": f"✅ Lugar {lugar_id} liberado correctamente"})

        except Lugar.DoesNotExist:
            return Response({"error": f"El lugar {lugar_id} no existe en la base de datos."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class HistorialMovimientosView(APIView):
    permission_classes = [IsAuthenticated] # <--- Mantenemos esto

    def get(self, request):
        # 1. PERMISOS (Tu código estaba bien aquí)
        roles_permitidos = ['Director de Sede', 'Subdirectora de Sede']
        # Nota: Usamos filter().exists() para que sea robusto
        es_auditor = request.user.groups.filter(name__in=roles_permitidos).exists()
        
        if not (es_auditor or request.user.is_superuser):
            return Response({"error": "Acceso Denegado"}, status=403)

        try:
            query = request.GET.get('search', '')
            registros = RegistroMovimiento.objects.select_related('funcionario', 'lugar').all().order_by('-fecha_ingreso')

            if query:
                registros = registros.filter(
                    Q(funcionario__rut__icontains=query) | 
                    Q(funcionario__nombre__icontains=query) |
                    Q(funcionario__ppu__icontains=query)
                )
            
            serializer = HistorialSerializer(registros[:100], many=True)
            return Response(serializer.data)

        except Exception as e:
            # Esto nos dirá en la terminal negra qué pasó realmente
            print(f"❌ ERROR EN HISTORIAL: {str(e)}")
            return Response({"error": str(e)}, status=500)
    
class GestionUsuariosView(APIView):
    permission_classes = [IsAuthenticated]

    def es_admin_plataforma(self, user):
        # Aquí definimos quiénes son los "Dioses" del sistema
        return user.groups.filter(name__in=['Jefe de Seguridad', 'Cetecom']).exists() or user.is_superuser

    # 1. LISTAR USUARIOS
    def get(self, request):
        if not self.es_admin_plataforma(request.user):
            return Response({"error": "Acceso denegado"}, status=403)

        usuarios = []
        # Mostramos todos los usuarios relevantes
        users_db = User.objects.filter(groups__name__in=[
            'Guardia', 'Jefe de Seguridad', 'Cetecom', 
            'Director de Sede', 'Subdirectora de Sede', 'Profesor'
        ]).distinct().order_by('username')

        for u in users_db:
            grupo = u.groups.first().name if u.groups.exists() else "Sin Rol"
            usuarios.append({
                "id": u.id,
                "username": u.username,
                "nombre_completo": f"{u.first_name} {u.last_name}",
                "email": u.email,
                "rol": grupo,
                "activo": u.is_active
            })
            
        return Response(usuarios)

    # 2. CREAR USUARIO
    def post(self, request):
        if not self.es_admin_plataforma(request.user):
            return Response({"error": "No tienes permisos"}, status=403)

        data = request.data
        try:
            username = data.get('username')
            password = data.get('password')
            nombre = data.get('first_name', '')
            apellido = data.get('last_name', '')
            rol_solicitado = data.get('rol') 

            if User.objects.filter(username=username).exists():
                return Response({"error": "El usuario ya existe"}, status=400)

            user = User.objects.create_user(username=username, password=password, first_name=nombre, last_name=apellido)
            
            # Asignación de Roles permitidos
            roles_validos = [
                'Guardia', 'Jefe de Seguridad', 'Cetecom', 
                'Director de Sede', 'Subdirectora de Sede', 'Profesor'
            ]
            
            if rol_solicitado in roles_validos:
                grupo = Group.objects.get(name=rol_solicitado)
                user.groups.add(grupo)
            else:
                grupo = Group.objects.get(name='Guardia')
                user.groups.add(grupo)
            
            return Response({"mensaje": f"Usuario creado como {grupo.name}"}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

    # 3. ELIMINAR USUARIO
    def delete(self, request):
        if not self.es_admin_plataforma(request.user):
            return Response({"error": "No tienes permisos"}, status=403)
            
        id_usuario = request.query_params.get('id')
        
        try:
            user = User.objects.get(id=id_usuario)
            if user.id == request.user.id:
                 return Response({"error": "No puedes eliminarte a ti mismo"}, status=400)
            
            user.delete()
            return Response({"mensaje": "Usuario eliminado correctamente"})
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)
        
# En mapaestacionamiento/views.py

class CambiarLugarVehiculoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        roles_autorizados = ['Cetecom', 'Jefe de Seguridad']
        es_autorizado = request.user.groups.filter(name__in=roles_autorizados).exists()
        
        if not (es_autorizado or request.user.is_superuser):
            return Response({"error": "⛔ No tienes permisos para mover vehículos."}, status=403)
        origen_id = request.data.get('lugar_origen')
        destino_id = request.data.get('lugar_destino')
        password_admin = request.data.get('password') # <--- NUEVO CAMPO

        if not origen_id or not destino_id:
            return Response({"error": "Debe indicar lugar de origen y destino"}, status=400)
        config, _ = ConfiguracionSistema.objects.get_or_create(id=1)
        
        if password_admin != config.clave_maestra:
            return Response({"error": "⛔ Contraseña administrativa incorrecta"}, status=403)
        if str(origen_id).isdigit(): origen_id = f"E.{origen_id}"
        if str(destino_id).isdigit(): destino_id = f"E.{destino_id}"

        try:
            with transaction.atomic():
                lugar_origen = Lugar.objects.select_for_update().get(id_lugar=origen_id)
                lugar_destino = Lugar.objects.select_for_update().get(id_lugar=destino_id)

                if not lugar_origen.ocupado:
                    return Response({"error": f"El lugar de origen {origen_id} está vacío."}, status=400)
                
                if lugar_destino.ocupado:
                    return Response({"error": f"El lugar de destino {destino_id} ya está ocupado."}, status=400)

                funcionario = lugar_origen.ocupado_por
                
                lugar_origen.ocupado = False
                lugar_origen.ocupado_por = None
                lugar_origen.save()

                # B. Ocupar Destino
                lugar_destino.ocupado = True
                lugar_destino.ocupado_por = funcionario
                lugar_destino.save()

                # C. Actualizar Historial
                registro_activo = RegistroMovimiento.objects.filter(
                    lugar=lugar_origen,
                    funcionario=funcionario,
                    fecha_salida__isnull=True
                ).first()

                if registro_activo:
                    registro_activo.lugar = lugar_destino
                    registro_activo.save()

            return Response({"mensaje": f"✅ Vehículo movido exitosamente de {origen_id} a {destino_id}"})

        except Lugar.DoesNotExist:
            return Response({"error": "Uno de los lugares especificados no existe"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)