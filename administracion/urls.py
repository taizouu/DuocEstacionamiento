from django.urls import path
from .views import GestionUsuariosView, CambiarClaveMaestraView

urlpatterns = [
    path('usuarios/', GestionUsuariosView.as_view(), name='gestion-usuarios'),
    path('config/clave/', CambiarClaveMaestraView.as_view(), name='cambiar_clave'),
]