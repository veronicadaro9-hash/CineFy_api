from fastapi import FastAPI
from consultas_omdb import *
from consultas import *
from pydantic import BaseModel, Field
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
    puntuacion:int = Field( ge=1, le=5) # comprueba que la puntuación sea entre 1 y 5
    

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
    datos_comentario= (imdb_id, body.persona, body.comentario)
    datos_calificacion= (imdb_id, body.persona, body.puntuacion)
    insertar_comentarios(datos_comentario)
    insertar_calificacion(datos_calificacion)
    return {"mensaje": "Reseña agregada correctamente"}