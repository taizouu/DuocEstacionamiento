from django.contrib import admin
from .models import Funcionario

@admin.register(Funcionario)
class FuncionarioAdmin(admin.ModelAdmin):
    # Columnas que se verán en la lista
    list_display = ('rut', 'nombre', 'cargo', 'ppu', 'usuario_sistema', 'ver_rol')
    
    # Campos por los que se puede buscar (barra de búsqueda)
    search_fields = ('rut', 'nombre', 'ppu')
    
    # Filtros laterales
    list_filter = ('cargo',)
    
    # Función extra para ver el Rol directamente en la lista
    def ver_rol(self, obj):
        if obj.usuario_sistema and obj.usuario_sistema.groups.exists():
            return obj.usuario_sistema.groups.first().name
        return "-"
    ver_rol.short_description = 'Rol de Sistema'