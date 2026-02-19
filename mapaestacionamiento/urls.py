from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (MapaEstacionamientoView, ProcesarPistoleoView, HistorialMovimientosView, LiberarLugarManualView, CambiarLugarVehiculoView,MyTokenObtainPairView)

urlpatterns = [
    # Login
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Mapa y Operación
    path('mapa/', MapaEstacionamientoView.as_view(), name='mapa-estacionamiento'),
    path('pistoleo/', ProcesarPistoleoView.as_view(), name='pistoleo'),
    path('historial/', HistorialMovimientosView.as_view(), name='historial'),
    
    # Acciones Administrativas (Liberar/Mover)
    path('liberar-manual/', LiberarLugarManualView.as_view(), name='liberar'),
    path('cambiar-lugar/', CambiarLugarVehiculoView.as_view(), name='cambiar_lugar'),
]