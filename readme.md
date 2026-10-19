# 🎬 CineFy

### Aplicación web desarrollada con FastAPI, SQLite, JavaScript, HTML y Bootstrap.

Permite buscar películas, consultar sus detalles, añadir comentarios y valorar películas de 1 a 5 estrellas.

## Instalación

**1. Crear el entorno virtual**

```bash
python3 -m venv entorno
```

**2. Activar el entorno (Mac/Linux)**

```bash
source entorno/bin/activate
```

**3. Instalar las dependencias**

```bash
pip install -r requirements.txt
```

**4. Configurar la API de OMDb**

Crear un archivo `.env` dentro de `backend`:

```env
API_KEY=tu_clave_api
```

## Ejecutar la aplicación

**1. Iniciar el backend**

```bash
cd backend
fastapi dev main.py
```

Documentación de la API: http://127.0.0.1:8000/docs

**2. Iniciar el frontend**

Desde otra terminal, situada en la carpeta principal del proyecto:

```bash
python3 -m http.server 2222
```

**3. Abrir la aplicación**

http://127.0.0.1:2222/frontend/index.html
