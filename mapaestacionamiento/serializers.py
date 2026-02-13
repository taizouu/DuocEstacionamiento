from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Lugar, RegistroMovimiento
from funcionarios.models import Funcionario
from django.utils import timezone

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Agregamos los datos extra que React está esperando
        data['user_data'] = {
            'username': self.user.username,
            'email': self.user.email,
            # Si el usuario no tiene grupo, le ponemos 'SinRol' para que no falle
            'rol': self.user.groups.first().name if self.user.groups.exists() else 'SinRol'
        }
        return data

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ['nombre', 'rut', 'ppu']

class HistorialSerializer(serializers.ModelSerializer):
    funcionario = serializers.SerializerMethodField()
    lugar = serializers.CharField(source='lugar.id_lugar') 
    
    # La entrada la maneja DRF automático, así que suele respetar la config del settings
    entrada = serializers.DateTimeField(source='fecha_ingreso', format="%d/%m %H:%M") 
    
    salida = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()

    class Meta:
        model = RegistroMovimiento
        fields = ['id', 'funcionario', 'lugar', 'entrada', 'salida', 'estado']

    def get_funcionario(self, obj):
        if obj.funcionario:
            return f"{obj.funcionario.nombre} ({obj.funcionario.rut})"
        return "Desconocido"

    def get_salida(self, obj):
        if obj.fecha_salida:
            # CORRECCIÓN: Convertimos de UTC a Hora Chile antes de formatear
            fecha_local = timezone.localtime(obj.fecha_salida)
            return fecha_local.strftime("%d/%m %H:%M")
        return "En curso"

    def get_estado(self, obj):
        return "Activo" if not obj.fecha_salida else "Finalizado"

class LugarSerializer(serializers.ModelSerializer):
    # Incluimos los datos del funcionario anidado para mostrarlo en el cuadro de detalle
    ocupado_por = FuncionarioSerializer(read_only=True)

    class Meta:
        model = Lugar
        fields = ['id_lugar', 'ocupado', 'ocupado_por']