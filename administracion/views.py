from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group
from .models import ConfiguracionSistema # Importamos el modelo desde AQUÍ MISMO

# 1. GESTIÓN DE USUARIOS DEL SISTEMA (Guardias, Jefes, etc.)
class GestionUsuariosView(APIView):
    permission_classes = [IsAuthenticated]

    def es_admin_plataforma(self, user):
        # Validamos si es Superusuario o del grupo Jefe/Cetecom
        return user.groups.filter(name__in=['Jefe de Seguridad', 'Cetecom']).exists() or user.is_superuser

    def get(self, request):
        if not self.es_admin_plataforma(request.user):
            return Response({"error": "Acceso denegado"}, status=403)

        usuarios = []
        users_db = User.objects.all().order_by('username')

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
            
            # Asignar grupo
            if rol_solicitado:
                grupo, _ = Group.objects.get_or_create(name=rol_solicitado)
                user.groups.add(grupo)
            
            return Response({"mensaje": f"Usuario creado con rol {rol_solicitado}"}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

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

# 2. CAMBIAR CLAVE MAESTRA
class CambiarClaveMaestraView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        es_jefe = request.user.groups.filter(name__in=['Jefe de Seguridad', 'Cetecom']).exists()
        if not (es_jefe or request.user.is_superuser):
            return Response({"error": "No tienes permisos"}, status=403)

        nueva_clave = request.data.get('nueva_clave')
        if not nueva_clave or len(nueva_clave) < 4:
            return Response({"error": "La clave debe tener al menos 4 caracteres"}, status=400)

        # Usamos el modelo local de esta app
        config, created = ConfiguracionSistema.objects.get_or_create(id=1)
        config.clave_maestra = nueva_clave
        config.save()

        return Response({"mensaje": "✅ Clave Maestra actualizada"})