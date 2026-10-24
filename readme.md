# 🎬 CineFy — API de películas y reseñas

## Descripción

CineFy es una aplicación web que permite buscar películas, consultar sus detalles, publicar comentarios y calificarlas de 1 a 5 estrellas.

El proyecto utiliza una API REST desarrollada con **FastAPI**, que se conecta con **OMDb API** para obtener información de películas y con una base de datos **SQLite** para almacenar comentarios y calificaciones.

## Tecnologías utilizadas

- **Backend:** Python, FastAPI y Pydantic.
- **Frontend:** HTML5, JavaScript y Bootstrap 5.
- **Base de datos:** SQLite.
- **API externa:** OMDb API.
- **Librerías:** Requests, Uvicorn y python-dotenv.

## Estructura del proyecto

```text
peliculas_api/
├── backend/
│   ├── conexion.py
│   ├── consultas.py
│   ├── consultas_omdb.py
│   ├── controller_pelicula.py
│   ├── create_tables.sql
│   └── main.py
│
├── frontend/
│   ├── static/
│   │   ├── img/
│   │   │   ├── batman.jpg
│   │   │   ├── interstellar.jpg
│   │   │   └── lalaland.jpg
│   │   └── js/
│   │       ├── buscador.js
│   │       └── pelicula.js
│   │
│   ├── index.html
│   └── pelicula.html
│
├── .gitignore
├── readme.md
└── requirements.txt
```

Los archivos HTML se encuentran en `frontend`, mientras que los archivos estáticos (JavaScript e imágenes) se organizan dentro de `frontend/static`.

El entorno virtual (`entorno/`), el archivo de variables de entorno (`.env`), la base de datos SQLite (`bd_peliculas.db`) y los archivos temporales de Python se mantienen localmente y están excluidos del repositorio mediante `.gitignore`.


## Arquitectura del proyecto

CineFy sigue una organización basada en el patrón **MVC (Modelo–Vista–Controlador)**, separando las responsabilidades de la aplicación:

- **Modelo:** `conexion.py` y `consultas.py` gestionan la conexión y las operaciones con SQLite.
- **Vista:** los archivos HTML y JavaScript del frontend muestran las películas, los comentarios y las valoraciones.
- **Controlador:** `controller_pelicula.py` define los endpoints de FastAPI y coordina las peticiones.

Además, `consultas_omdb.py` gestiona la comunicación con la API externa OMDb y `main.py` inicia la aplicación.

Esta separación facilita la organización, el mantenimiento y la comprensión del código.

## Instalación y ejecución

### 1. Crear y activar el entorno virtual

Desde la carpeta principal `peliculas_api`:

**macOS / Linux:**

```bash
python3 -m venv entorno
source entorno/bin/activate
```

**Windows:**

```bash
python -m venv entorno
entorno\Scripts\activate
```

### 2. Instalar las dependencias

```bash
python -m pip install -r requirements.txt
```

### 3. Configurar OMDb API

Obtener una clave gratuita en https://www.omdbapi.com/apikey.aspx.

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
API_KEY=tu_clave_de_omdb
```

La clave se utiliza desde el backend para consultar la API externa sin exponerla en el frontend.

### 4. Crear la base de datos

Desde la carpeta `backend`, ejecutar el siguiente comando:

```bash
python -c "import sqlite3; c = sqlite3.connect('bd_peliculas.db'); c.executescript(open('create_tables.sql').read()); c.close()"
```

Este comando crea la base de datos SQLite `bd_peliculas.db`, si todavía no existe, y las tablas `Comentario` y `Calificacion` definidas en `create_tables.sql`.

Las tablas almacenarán los comentarios y las valoraciones de las películas.

### 5. Ejecutar el backend
Desde la carpeta backend, con el entorno virtual activado, ejecutar:
```bash
fastapi dev main.py
```

La API estará disponible en:

- **Servidor:** http://127.0.0.1:8000
- **Documentación interactiva:** http://127.0.0.1:8000/docs

### 6. Ejecutar el frontend

Abrir `frontend/index.html` utilizando un servidor local, por ejemplo, Live Server de VS Code.

El frontend utiliza `fetch()` de JavaScript para comunicarse con FastAPI mediante peticiones HTTP.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/peliculas` | Buscar películas por título y, opcionalmente, por año |
| GET | `/peliculas/{imdb_id}` | Consultar los detalles de una película |
| GET | `/peliculas/{imdb_id}/comentarios` | Obtener los comentarios de una película |
| POST | `/peliculas/{imdb_id}/comentarios` | Publicar un comentario y una calificación |
| GET | `/peliculas/{imdb_id}/puntuacion` | Obtener la valoración media |

**Parámetros de búsqueda:** `titulo` es obligatorio y `año` es opcional.

Ejemplo:

```text
http://127.0.0.1:8000/peliculas?titulo=Titanic&año=1997
```

## Funcionamiento

1. El usuario busca una película desde el frontend.
2. FastAPI consulta OMDb API y devuelve los resultados.
3. El usuario selecciona una película para consultar sus detalles.
4. Puede publicar una reseña indicando su nombre, comentario y calificación.
5. El backend guarda los datos en SQLite.
6. Los comentarios y la valoración media se actualizan automáticamente en la página.

## Base de datos

La base de datos `bd_peliculas.db` contiene dos tablas:

**Comentario**
- `id`
- `id_pelicula`
- `persona`
- `comentario`
- `fecha`

**Calificacion**
- `id`
- `id_pelicula`
- `persona`
- `calificacion`
- `fecha`

Las fechas se generan automáticamente desde SQLite y las calificaciones admiten valores entre 1 y 5.

La valoración media se calcula mediante la función SQL `AVG()`.

El archivo `create_tables.sql` contiene las instrucciones necesarias para crear ambas tablas en una base de datos nueva.

## Seguridad

La clave de OMDb se almacena en `.env` y no debe publicarse en GitHub. El entorno virtual y los archivos temporales de Python también deben excluirse mediante `.gitignore`.