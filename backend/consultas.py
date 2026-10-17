from conexion import Conexion
import sqlite3


def formato(respuesta):
    lista_final=[]
    for fila in respuesta.fetchall():
        lista_final.append(dict(fila))
    return lista_final    



def insertar_comentarios(datos):
    try:
        conexionInsert=Conexion('INSERT INTO Comentario(id_pelicula, persona, comentario, fecha,puntuacion) VALUES (?,?,?,?,?);',datos)
        conexionInsert.res
        conexionInsert.conex.commit()
        conexionInsert.conex.close()
    except sqlite3.Error as error:
        print('Error: ',error)

    

def mostrar_comentarios(id_pelicula):
    conexionComentarios = Conexion('SELECT persona, comentario, fecha, puntuacion FROM Comentario WHERE id_pelicula = ?;', (id_pelicula,))
    respuesta = conexionComentarios.res
    comentarios = formato(respuesta)
    conexionComentarios.conex.close()
    return comentarios

def media_puntuacion(imdb_id):
    conexion = Conexion("SELECT AVG(puntuacion) FROM Comentario WHERE id_pelicula = ?",(imdb_id,))

    resultado = conexion.res.fetchone()
    conexion.conex.close()

    return resultado[0]


