from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Lugar, RegistroMovimiento
from funcionarios.models import Funcionario
from django.utils import timezone

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_data'] = {
            'username': self.user.username,
            'email': self.user.email,
            'rol': self.user.groups.first().name if self.user.groups.exists() else 'SinRol'
        }
        return data

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        # AGREGADO: Incluimos 'cargo' y 'destino' para que el pop-up del mapa los muestre
        fields = ['nombre', 'rut', 'ppu', 'cargo', 'destino']

class LugarSerializer(serializers.ModelSerializer):
    # Anidamos toda la info del funcionario
    ocupado_por = FuncionarioSerializer(read_only=True)
    
    # CORRECCIÓN IMPORTANTE:
    # Como borramos el campo 'ocupado' de la BD, le decimos a Django Rest Framework
    # que saque el valor de la propiedad 'esta_ocupado' que creamos en el modelo.
    ocupado = serializers.BooleanField(source='esta_ocupado', read_only=True)

    class Meta:
        model = Lugar
        fields = ['id_lugar', 'ocupado', 'ocupado_por']

class HistorialSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='funcionario.nombre', read_only=True)
    rut = serializers.CharField(source='funcionario.rut', read_only=True)
    cargo = serializers.CharField(source='funcionario.cargo', read_only=True)
    patente = serializers.CharField(source='funcionario.ppu', read_only=True)
    destino = serializers.CharField(source='funcionario.destino', read_only=True)
    lugar = serializers.CharField(source='lugar.id_lugar', read_only=True)
    
    ingreso = serializers.SerializerMethodField()
    salida = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()
    liberado_por = serializers.SerializerMethodField()

    class Meta:
        model = RegistroMovimiento
        fields = [
            'id', 'nombre', 'rut', 'cargo', 
            'patente', 'destino', 'lugar', 
            'ingreso', 'salida', 'estado',
            'tipo_salida', 'liberado_por'
        ]

    def get_ingreso(self, obj):
        return timezone.localtime(obj.fecha_ingreso).strftime("%d/%m %H:%M")

    def get_salida(self, obj):
        if obj.fecha_salida:
            return timezone.localtime(obj.fecha_salida).strftime("%d/%m %H:%M")
        return "En curso"

    def get_estado(self, obj):
        # Usamos la nueva propiedad 'es_activo' del modelo para mayor limpieza
        return "Activo" if obj.es_activo else "Finalizado"

    def get_liberado_por(self, obj):
        if obj.liberado_por:
            nombre_completo = f"{obj.liberado_por.first_name} {obj.liberado_por.last_name}"
            usuario = obj.liberado_por.username
            
            if len(nombre_completo.strip()) > 0:
                return f"{nombre_completo} ({usuario})"
            return usuario
            
        return "Autoridad"