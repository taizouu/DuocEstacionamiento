from django.core.management.base import BaseCommand
from mapaestacionamiento.models import Lugar

class Command(BaseCommand):
    help = 'Reinicia y crea los estacionamientos exactos del mapa (A/B)'

    def handle(self, *args, **kwargs):
        self.stdout.write("Borrando lugares antiguos...")
        Lugar.objects.all().delete() # Limpieza total para empezar de cero

        creados = 0

        # 1. Lugares Simples (Números solos)
        # Según tu mapa: 1-5, 23-43, 44-46, 47-73, 75-83, 95-99, 100
        simples = (
            list(range(1, 6)) + 
            list(range(23, 47)) +  # Incluye 44, 45, 46
            list(range(47, 74)) + 
            list(range(75, 84)) + 
            list(range(95, 100)) + 
            [100]
        )

        for num in simples:
            Lugar.objects.create(id_lugar=str(num))
            creados += 1

        # 2. Lugares Dobles (A y B)
        # Según tu mapa: 6-22 y 84-93
        dobles = list(range(6, 23)) + list(range(84, 94))

        for num in dobles:
            Lugar.objects.create(id_lugar=f"{num}A")
            Lugar.objects.create(id_lugar=f"{num}B")
            creados += 2

        # 3. Especiales (Casos únicos)
        Lugar.objects.create(id_lugar="94A")
        creados += 1

        self.stdout.write(self.style.SUCCESS(f'¡Éxito! Base de datos actualizada con {creados} lugares reales.'))