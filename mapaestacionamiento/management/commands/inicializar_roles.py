from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from mapaestacionamiento.models import Lugar

class Command(BaseCommand):
    help = 'Crea los roles (Grupos) definidos para el sistema'

    def handle(self, *args, **kwargs):
        # Definimos los nombres de los roles
        roles = ['Guardia', 'Profesor', 'Administrativo']
        
        for rol in roles:
            grupo, created = Group.objects.get_or_create(name=rol)
            if created:
                self.stdout.write(f"Rol creado: {rol}")
            else:
                self.stdout.write(f"Rol ya existía: {rol}")

        # --- ASIGNAR PERMISOS ESPECÍFICOS ---
        
        # 1. Configurar GUARDIA
        # El guardia necesita poder modificar los Lugares (ocupado/libre)
        grupo_guardia = Group.objects.get(name='Guardia')
        
        # Buscamos el permiso "change_lugar" (modificar lugar)
        content_type = ContentType.objects.get_for_model(Lugar)
        permiso_modificar = Permission.objects.get(
            codename='change_lugar',
            content_type=content_type,
        )
        grupo_guardia.permissions.add(permiso_modificar)
        
        self.stdout.write(self.style.SUCCESS('¡Roles y Permisos configurados correctamente!'))