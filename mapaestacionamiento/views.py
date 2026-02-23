from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils import timezone
from django.db import transaction
from django.db.models import Q
from .models import Lugar, RegistroMovimiento
from funcionarios.models import Funcionario
from administracion.models import ConfiguracionSistema 
from .serializers import (LugarSerializer, MyTokenObtainPairSerializer, HistorialSerializer)

def formatear_rut(rut_raw):
    if not rut_raw: return None
    return rut_raw.upper().replace("-", "").replace(".", "")

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MapaEstacionamientoView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        # 1. Obtener Lugares (Lo que ya hacías)
        lugares = Lugar.objects.select_related('ocupado_por').all().order_by('id_lugar')
        es_personal = request.user.is_authenticated
        
        data_lugares = []
        for lugar in lugares:
            info = LugarSerializer(lugar).data
            if not es_personal:
                info['ocupado_por'] = None
            data_lugares.append(info)

        # 2. Obtener ÚLTIMO INGRESO (Nuevo)
        # Buscamos el movimiento más reciente que siga activo (o el último histórico si prefieres)
        ultimo_movimiento = RegistroMovimiento.objects.select_related('funcionario').filter(
            fecha_salida__isnull=True # Solo consideramos autos que están adentro
        ).order_by('-fecha_ingreso').first()

        data_ultimo = None
        if ultimo_movimiento:
            f = ultimo_movimiento.funcionario
            # Si es público, ocultamos nombre real, si es personal mostramos todo
            nombre_mostrar = f.nombre if es_personal else "Ocupado"
            
            data_ultimo = {
                "patente": f.ppu or "---",
                "nombre": nombre_mostrar,
                "hora": timezone.localtime(ultimo_movimiento.fecha_ingreso).strftime("%H:%M")
            }
        else:
            # Datos por defecto si no hay nadie
            data_ultimo = { "patente": "---", "nombre": "Esperando ingreso...", "hora": "--:--" }

        # 3. Retornamos ambas cosas juntas
        return Response({
            "lugares": data_lugares,
            "ultimo_ingreso": data_ultimo
        })
 

class ProcesarPistoleoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            rut_raw = request.data.get('rut') # El RUT que viene del paso 2
            id_lugar_raw = request.data.get('id_lugar')
            
            # Datos opcionales (Visitas)
            nombre_visita = request.data.get('nombre_visita')
            patente_visita = request.data.get('patente', '').upper()
            zona_visita = request.data.get('zona', '')

            if not id_lugar_raw:
                return Response({"error": "Debe escanear un código de Estacionamiento"}, status=400)

            id_lugar = f"E.{id_lugar_raw}" if str(id_lugar_raw).isdigit() else id_lugar_raw

            with transaction.atomic():
                lugar = Lugar.objects.select_for_update().filter(id_lugar=id_lugar).first()
                
                if not lugar:
                    return Response({"error": f"El lugar {id_lugar} no existe"}, status=404)

                # CASO 1: VIENE UN RUT (INTENTO DE ENTRADA / ASIGNACIÓN)
                if rut_raw:
                    # Si intentamos asignar (tenemos RUT) pero el lugar está ocupado -> ERROR
                    if lugar.esta_ocupado:
                        ocupante = lugar.ocupado_por.nombre if lugar.ocupado_por else "Alguien"
                        return Response({
                            "error": f"⛔ EL LUGAR {id_lugar} ESTÁ OCUPADO POR {ocupante}",
                            "codigo": "LUGAR_OCUPADO"
                        }, status=400)
                    
                    # Si el lugar está libre, procedemos con la ENTRADA normal
                    rut_limpio = formatear_rut(rut_raw)
                    funcionario = Funcionario.objects.filter(rut=rut_limpio).first()

                    if not funcionario:
                        if nombre_visita:
                            funcionario = Funcionario.objects.create(
                                rut=rut_limpio, nombre=nombre_visita, cargo='Visita',
                                ppu=patente_visita, destino=zona_visita
                            )
                        else:
                            return Response({"error": "RUT no registrado", "codigo": "RUT_NO_ENCONTRADO"}, status=404)
                    
                    elif funcionario.cargo == 'Visita':
                        if patente_visita: funcionario.ppu = patente_visita
                        if zona_visita: funcionario.destino = zona_visita
                        funcionario.save()

                    if Lugar.objects.filter(ocupado_por=funcionario).exists():
                         return Response({"error": f"{funcionario.nombre} ya tiene un estacionamiento asignado"}, status=400)

                    lugar.ocupado_por = funcionario
                    lugar.save()
                    RegistroMovimiento.objects.create(funcionario=funcionario, lugar=lugar)

                    return Response({
                        "mensaje": f"Ingreso: {funcionario.nombre}",
                        "tipo": "entrada",
                        "datos": {
                            "nombre": funcionario.nombre, "lugar": lugar.id_lugar,
                            "patente": funcionario.ppu or "---", "hora": timezone.localtime(timezone.now()).strftime("%H:%M")
                        }
                    })

                # CASO 2: NO VIENE RUT (INTENTO DE SALIDA / LIBERACIÓN RÁPIDA)
                else:
                    if lugar.esta_ocupado:
                        funcionario = lugar.ocupado_por
                        lugar.ocupado_por = None
                        lugar.save()

                        RegistroMovimiento.objects.filter(
                            lugar=lugar, funcionario=funcionario, fecha_salida__isnull=True
                        ).update(fecha_salida=timezone.now(), tipo_salida='NORMAL')

                        return Response({
                            "mensaje": "Liberado correctamente",
                            "tipo": "salida",
                            "lugar": id_lugar,
                            "funcionario": funcionario.nombre if funcionario else "Desconocido"
                        })
                    else:
                        # Si escaneamos un lugar vacío sin RUT -> Error
                        return Response({"error": "Lugar libre. Para asignar, escanee un RUT primero."}, status=400)

        except Exception as e:
            return Response({"error": f"Error interno: {str(e)}"}, status=500)

class LiberarLugarManualView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        es_autorizado = request.user.groups.filter(name__in=['Cetecom', 'Jefe de Seguridad']).exists()
        
        if not (es_autorizado or request.user.is_superuser):
            return Response({"error": "⛔ No tienes permisos."}, status=403)

        lugar_id = request.data.get('id_lugar')
        # En tu mapa.js envías 'pass' en vez de 'password' para esta función específica
        # Así que verificamos ambas por si acaso
        password = request.data.get('password') or request.data.get('pass') 

        if not password:
            return Response({"error": "Debe ingresar su contraseña"}, status=400)
            
        if not request.user.check_password(password):
             return Response({"error": "⛔ Contraseña de usuario incorrecta"}, status=403)

        if not lugar_id: return Response({"error": "Faltan datos"}, status=400)
        
        lugar_id = f"E.{lugar_id}" if str(lugar_id).isdigit() else lugar_id

        try:
            with transaction.atomic():
                lugar = Lugar.objects.select_for_update().get(id_lugar=lugar_id)

                if not lugar.esta_ocupado:
                    return Response({"mensaje": "Lugar ya estaba libre."})

                funcionario = lugar.ocupado_por
                lugar.ocupado_por = None
                lugar.save()

                RegistroMovimiento.objects.filter(
                    lugar=lugar,
                    funcionario=funcionario,
                    fecha_salida__isnull=True
                ).update(
                    fecha_salida=timezone.now(),
                    tipo_salida='MANUAL',
                    liberado_por=request.user
                )

            return Response({"mensaje": f"✅ Liberado manualmente por {request.user.username}"})

        except Lugar.DoesNotExist:
            return Response({"error": "Lugar no encontrado"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class HistorialMovimientosView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('search', '')
        registros = RegistroMovimiento.objects.select_related('funcionario', 'lugar', 'liberado_por').all().order_by('-fecha_ingreso')

        if query:
            registros = registros.filter(
                Q(funcionario__rut__icontains=query) | 
                Q(funcionario__nombre__icontains=query) |
                Q(funcionario__ppu__icontains=query)
            )
        
        serializer = HistorialSerializer(registros[:100], many=True)
        return Response(serializer.data)

class CambiarLugarVehiculoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        roles_autorizados = ['Cetecom', 'Jefe de Seguridad']
        es_autorizado = request.user.groups.filter(name__in=roles_autorizados).exists()
        
        if not (es_autorizado or request.user.is_superuser):
            return Response({"error": "⛔ No tienes permisos."}, status=403)
            
        origen_id = request.data.get('lugar_origen')
        destino_id = request.data.get('lugar_destino')
        password_admin = request.data.get('password')

        # =========================================================
        # 🔐 NUEVA VALIDACIÓN: Contraseña del propio usuario
        # =========================================================
        if not password_admin:
            return Response({"error": "Debe ingresar su contraseña"}, status=400)
            
        if not request.user.check_password(password_admin):
            return Response({"error": "⛔ Contraseña de usuario incorrecta"}, status=403)

        if not origen_id or not destino_id:
            return Response({"error": "Faltan datos"}, status=400)
            
        if str(origen_id).isdigit(): origen_id = f"E.{origen_id}"
        if str(destino_id).isdigit(): destino_id = f"E.{destino_id}"

        try:
            with transaction.atomic():
                lugar_origen = Lugar.objects.select_for_update().get(id_lugar=origen_id)
                lugar_destino = Lugar.objects.select_for_update().get(id_lugar=destino_id)

                if not lugar_origen.esta_ocupado:
                    return Response({"error": f"El lugar de origen {origen_id} está vacío."}, status=400)
                
                if lugar_destino.esta_ocupado:
                    return Response({"error": f"El lugar de destino {destino_id} ya está ocupado."}, status=400)

                funcionario = lugar_origen.ocupado_por
                
                # Mover
                lugar_origen.ocupado_por = None
                lugar_origen.save()

                lugar_destino.ocupado_por = funcionario
                lugar_destino.save()

                # Actualizar Historial
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