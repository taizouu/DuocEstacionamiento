from django.db import models
from funcionarios.models import Funcionario 

class Lugar(models.Model):
    id_lugar = models.CharField(max_length=10, unique=True, verbose_name="Número de Estacionamiento")
    ocupado = models.BooleanField(default=False)
    
    # Relación: Si está ocupado, guardamos qué funcionario está ahí.
    # 'null=True' significa que puede estar vacío (nadie estacionado).
    ocupado_por = models.ForeignKey(Funcionario, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        estado = "Ocupado" if self.ocupado else "Libre"
        return f"Estacionamiento {self.id_lugar} ({estado})"

class RegistroMovimiento(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    lugar = models.ForeignKey(Lugar, on_delete=models.CASCADE)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_salida = models.DateTimeField(null=True, blank=True)
    activo = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.funcionario} en {self.lugar} - {self.fecha_ingreso}"


class ConfiguracionSistema(models.Model):
    clave_maestra = models.CharField(max_length=50, default="admin123")
    
    def __str__(self):
        return f"Configuración Global (Clave actual: {self.clave_maestra})"

    class Meta:
        verbose_name = "Configuración del Sistema"
        verbose_name_plural = "Configuraciones"