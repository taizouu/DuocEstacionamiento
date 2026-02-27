from celery import shared_task
from django.utils import timezone
from .models import Lugar, RegistroMovimiento
from django.core.mail import EmailMessage
from django.conf import settings
from io import BytesIO
import openpyxl
from datetime import datetime

@shared_task
def limpiar_estacionamientos_nocturno():
    """Busca lugares ocupados y los libera automáticamente."""
    lugares_ocupados = Lugar.objects.filter(ocupado_por__isnull=False)
    cantidad = lugares_ocupados.count()

    if cantidad > 0:
        ahora = timezone.now()
        
        # 1. Cerramos los registros históricos
        RegistroMovimiento.objects.filter(
            fecha_salida__isnull=True,
            lugar__in=lugares_ocupados
        ).update(
            fecha_salida=ahora,
            # Asegúrate de haber agregado 'AUTOMATICA' a tus choices en models.py
            tipo_salida='AUTOMATICA' 
        )

        # 2. Liberamos los espacios físicos
        lugares_ocupados.update(ocupado_por=None)
        
        return f"Proceso exitoso: Se liberaron {cantidad} puestos."
    
    return "No se requirió limpieza: Mapa 100% liberado."

@shared_task
def enviar_reporte_diario():
    """Genera un Excel con los movimientos del día y lo envía por correo."""
    
    # 1. Definimos el correo de destino (CÁMBIALO POR TU CORREO DE PRUEBA)
    correo_destino = ['wrkdev.tzou@gmail.com'] 
    
    # 2. Obtenemos la fecha de hoy
    hoy = timezone.localtime().date()
    
    # 3. Filtramos solo los registros de hoy
    registros = RegistroMovimiento.objects.select_related(
        'funcionario', 'lugar', 'liberado_por'
    ).filter(fecha_ingreso__date=hoy).order_by('-fecha_ingreso')

    # Si no hubo movimientos hoy, opcionalmente podríamos cancelar el envío o enviar un aviso
    # Pero generaremos el Excel de todas formas para mantener la constancia.

    # 4. Creamos el Excel en memoria (Idéntico a tu View)
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = f"Reporte {hoy.strftime('%d-%m-%Y')}"

    headers = ['FECHA INGRESO', 'FECHA SALIDA', 'LUGAR', 'NOMBRE', 'RUT', 'CARGO', 'PATENTE', 'DESTINO', 'ESTADO', 'MÉTODO DE SALIDA']
    ws.append(headers)

    for r in registros:
        ingreso = timezone.localtime(r.fecha_ingreso).strftime("%d/%m/%Y %H:%M") if r.fecha_ingreso else ""
        salida = timezone.localtime(r.fecha_salida).strftime("%d/%m/%Y %H:%M") if r.fecha_salida else "En curso"
        estado = "Activo" if r.es_activo else "Finalizado"
        
        metodo_salida = "---"
        if not r.es_activo:
            if r.tipo_salida == 'AUTOMATICA':
                metodo_salida = "Automático (Nocturno)"
            elif r.tipo_salida == 'MANUAL' or r.liberado_por:
                admin = r.liberado_por.username if r.liberado_por else "Admin"
                metodo_salida = f"Manual ({admin})"
            else:
                metodo_salida = "Sistema (Escáner)"

        ws.append([
            ingreso, salida, r.lugar.id_lugar, r.funcionario.nombre, 
            r.funcionario.rut, r.funcionario.cargo, r.funcionario.ppu or "---", 
            r.funcionario.destino or "---", estado, metodo_salida
        ])

    # Guardamos el Excel en un "buffer" (memoria RAM)
    buffer = BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    nombre_archivo = f'Reporte_Duoc_{hoy.strftime("%d_%m_%Y")}.xlsx'

    # 5. Preparamos y enviamos el correo electrónico
    asunto = f'📊 Reporte Diario de Estacionamiento - {hoy.strftime("%d/%m/%Y")}'
    cuerpo = f"""
    Hola,
    
    Adjunto encontrarás el reporte automático de los movimientos de estacionamiento correspondientes al día {hoy.strftime("%d/%m/%Y")}.
    
    Total de movimientos registrados hoy: {registros.count()}
    
    Saludos,
    Sistema de Gestión Duoc UC
    """
    
    # Creamos el mensaje
    email = EmailMessage(
        subject=asunto,
        body=cuerpo,
        from_email=settings.EMAIL_HOST_USER, # El correo que pusiste en tu .env
        to=correo_destino
    )
    
    # Adjuntamos el archivo Excel
    email.attach(nombre_archivo, buffer.getvalue(), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    # ¡Enviamos!
    email.send(fail_silently=False)
    
    return f"Reporte enviado con éxito a {correo_destino}. Total registros: {registros.count()}"