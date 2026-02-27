import os
from celery import Celery

# Le decimos a Celery que use la configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Estacionamiento.settings')

# Creamos la aplicación de Celery
app = Celery('Estacionamiento')

# Le decimos que lea la configuración desde settings.py buscando variables que empiecen con 'CELERY_'
app.config_from_object('django.conf:settings', namespace='CELERY')

# Esto hace que Celery busque automáticamente archivos 'tasks.py' en tus aplicaciones (como mapaestacionamiento)
app.autodiscover_tasks()