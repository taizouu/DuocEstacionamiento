# funcionarios/models.py
from django.db import models
from django.contrib.auth.models import User # <--- Importamos el sistema de usuarios de Django

class Funcionario(models.Model):
    # --- RELACIÓN CON EL LOGIN (NUEVO) ---
    # Esto permite que un Funcionario tenga usuario y contraseña para entrar al sistema
    usuario_sistema = models.OneToOneField(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name="Cuenta de Usuario Asociada"
    )

    # --- TUS DATOS DEL EXCEL ---
    rut = models.CharField(max_length=12, unique=True, verbose_name="RUT")
    nombre = models.CharField(max_length=150, verbose_name="Nombre Completo")
    cargo = models.CharField(max_length=100, verbose_name="Cargo")
    ppu = models.CharField(max_length=10, blank=True, null=True, verbose_name="Patente (PPU)")

    class Meta:
        verbose_name = "Funcionario"
        verbose_name_plural = "Funcionarios"

    def __str__(self):
        return f"{self.nombre} ({self.rut})"