from django.db import models
from funcionarios.models import Funcionario 
from django.contrib.auth.models import User
from django.utils import timezone

class Lugar(models.Model):
    id_lugar = models.CharField(max_length=10, unique=True, verbose_name="Número de Estacionamiento")
    ocupado_por = models.ForeignKey(Funcionario, on_delete=models.SET_NULL, null=True, blank=True)
    
    @property
    def esta_ocupado(self):
        return self.ocupado_por is not None

    def __str__(self):
        estado = "Ocupado" if self.esta_ocupado else "Libre"
        return f"Estacionamiento {self.id_lugar} ({estado})"

class RegistroMovimiento(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    lugar = models.ForeignKey(Lugar, on_delete=models.CASCADE)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_salida = models.DateTimeField(null=True, blank=True)
    
    area = models.CharField(max_length=50, blank=True, null=True, verbose_name="Área de estacionamiento")

    TIPO_SALIDA_CHOICES = [
        ('NORMAL', 'Salida Normal (Escáner)'),
        ('MANUAL', 'Liberación Manual (Admin/Guardia)'),
        ('AUTOMATICA', 'Liberación Automática Nocturna'),
    ]
    
    tipo_salida = models.CharField(
        max_length=20, 
        choices=TIPO_SALIDA_CHOICES, 
        blank=True, 
        null=True
    )
    
    liberado_por = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='liberaciones_realizadas'
    )
    
    @property
    def es_activo(self):
        return self.fecha_salida is None
    
    def __str__(self):
        return f"{self.funcionario} en {self.lugar} - {self.fecha_ingreso}"