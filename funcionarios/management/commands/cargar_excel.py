import pandas as pd
from django.core.management.base import BaseCommand
from funcionarios.models import Funcionario

class Command(BaseCommand):
    help = 'Carga funcionarios masivamente desde un archivo Excel'

    def add_arguments(self, parser):
        # Definimos que el comando necesita recibir la ruta del archivo
        parser.add_argument('ruta_excel', type=str, help='Ruta al archivo Excel')

    def handle(self, *args, **kwargs):
        ruta = kwargs['ruta_excel']
        self.stdout.write(f"Leyendo archivo: {ruta}...")

        try:
            # Leemos el Excel. 'dtype=str' asegura que todo se lea como texto 
            # (importante para evitar que el RUT pierda ceros o formato)
            df = pd.read_excel(ruta, dtype=str)
            
            # Reemplazamos los valores vacíos (NaN) por cadenas vacías para evitar errores
            df = df.fillna('')

            contador_creados = 0
            contador_actualizados = 0

            # Iteramos por cada fila del Excel
            for index, row in df.iterrows():
                # Obtenemos los datos limpiando espacios en blanco al inicio/final
                rut = row['RUT'].strip()
                nombre = row['NOMBRE'].strip()
                cargo = row['CARGO'].strip()
                ppu = row['PPU'].strip()

                # update_or_create es mágico:
                # Busca por 'rut'. Si existe, actualiza los 'defaults'. Si no, lo crea.
                obj, created = Funcionario.objects.update_or_create(
                    rut=rut,
                    defaults={
                        'nombre': nombre,
                        'cargo': cargo,
                        'ppu': ppu
                    }
                )

                if created:
                    contador_creados += 1
                else:
                    contador_actualizados += 1

            self.stdout.write(self.style.SUCCESS(
                f"Proceso finalizado. Creados: {contador_creados}, Actualizados: {contador_actualizados}"
            ))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error al cargar el archivo: {str(e)}"))