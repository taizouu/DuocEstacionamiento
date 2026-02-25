# 1. Usamos la versión oficial y ligera de Python
FROM python:3.12-slim

# 2. Le decimos a Docker que trabaje dentro de /app
WORKDIR /app

# 3. Instalamos herramientas base del sistema (C/C++) por si alguna librería las necesita
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4. Copiamos los requerimientos
COPY requirements.txt .

# =====================================================================
# 🛠️ TRUCO DE INGENIERO: Actualizar pip y wheel ANTES de instalar
# =====================================================================
RUN pip install --upgrade pip setuptools wheel

# 5. Instalamos tus librerías
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copiamos TODO tu proyecto adentro del contenedor
COPY . .

# 7. Exponemos el puerto
EXPOSE 8000

# 8. Comando de arranque
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]