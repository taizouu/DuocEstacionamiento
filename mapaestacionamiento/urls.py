# estacionamiento/urls.py
from django.urls import path
from .views import MapaEstacionamientoView, ProcesarPistoleoView, HistorialMovimientosView, CambiarClaveMaestraView, LiberarLugarManualView, CambiarLugarVehiculoView

urlpatterns = [
    path('mapa/', MapaEstacionamientoView.as_view(), name='mapa-estacionamiento'),
    path('pistoleo/', ProcesarPistoleoView.as_view(), name='pistoleo'),
    path('liberar-manual/', LiberarLugarManualView.as_view(), name='liberar'),
    path('historial/', HistorialMovimientosView.as_view(), name='historial'),
    path('config/clave/', CambiarClaveMaestraView.as_view(), name='cambiar_clave'),
    path('cambiar-lugar/', CambiarLugarVehiculoView.as_view(), name='cambiar_lugar'),
]