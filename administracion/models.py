from django.db import models

# Create your models here.
class ConfiguracionSistema(models.Model):
    clave_maestra = models.CharField(max_length=50, default="admin123")
    
    def __str__(self):
        return f"Configuración Global (Clave actual: {self.clave_maestra})"

    class Meta:
        verbose_name = "Configuración del Sistema"
        verbose_name_plural = "Configuraciones"