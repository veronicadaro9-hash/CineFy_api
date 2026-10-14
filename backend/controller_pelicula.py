from fastapi import FastAPI
from consultas_omdb import *
from consultas import *
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
#comunicación con el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ModelComentario(BaseModel):
    persona:str
    comentario:str
    fecha:str
    puntuacion:int
    

@app.get("/peliculas", tags=["Película"])
def buscar_peliculas(titulo: str, año: int = None):
    return consulta_api_lista(titulo, año)

@app.get("/peliculas/{imdb_id}", tags=["Película"])
def ver_detalle_pelicula(imdb_id: str):
    return consulta_api_detalle(imdb_id)

@app.get("/peliculas/{imdb_id}/comentarios", tags=["Comentario"])
def ver_comentarios(imdb_id: str):
    return mostrar_comentarios(imdb_id)

@app.get("/peliculas/{imdb_id}/puntuacion", tags=["Puntuación"])
def ver_puntuacion(imdb_id: str):
    return media_puntuacion(imdb_id)

@app.post("/peliculas/{imdb_id}/comentarios", tags=["Comentario"])
def agregar_comentario(imdb_id: str, body: ModelComentario):
    datos = (imdb_id, body.persona, body.comentario, body.fecha, body.puntuacion)
    insertar_comentarios(datos)
    return {"mensaje": "Comentario agregado correctamente"}