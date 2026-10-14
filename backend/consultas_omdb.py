import requests as consulta
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")

URL_OMDB = "https://www.omdbapi.com/"


def consulta_api_lista(title, year=None):

    if year is None:
        url = f"{URL_OMDB}?apikey={API_KEY}&s={title}"
    else:
        url = f"{URL_OMDB}?apikey={API_KEY}&s={title}&y={year}"

    respuesta = consulta.get(url, timeout=10)

    if respuesta.status_code == 200:
        return respuesta.json()

    else:
        return None


def consulta_api_detalle(imdb_id):
    url = f"{URL_OMDB}?apikey={API_KEY}&i={imdb_id}"
    respuesta = consulta.get(url, timeout=10)

    if respuesta.status_code == 200:
        return respuesta.json()

    else:
        return None

