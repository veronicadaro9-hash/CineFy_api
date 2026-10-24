from conexion import Conexion
import sqlite3


def formato(respuesta):
    lista_final=[]
    for fila in respuesta.fetchall():
        lista_final.append(dict(fila))
    return lista_final    



def insertar_comentarios(datos):
    conexionInsert = None
    try:
        conexionInsert=Conexion("""INSERT INTO Comentario(id_pelicula, persona, comentario, fecha) VALUES (?,?,?,date('now', 'localtime'));""",datos)
        conexionInsert.conex.commit()
       
    except sqlite3.Error as error:
        print("Error al guardar el comentario:", error)
        raise
    finally:
        if conexionInsert is not None:
            conexionInsert.conex.close()


def insertar_calificacion(datos):
    conexionInsert = None
    try:
        conexionInsert = Conexion(
            """INSERT INTO Calificacion(id_pelicula, persona, calificacion, fecha) VALUES (?,?,?, date('now', 'localtime'));""",
            datos
        )
        conexionInsert.conex.commit()
        
    except sqlite3.Error as error:
        print("Error al guardar la calificación:", error)
        raise
    finally:
        if conexionInsert is not None:
            conexionInsert.conex.close()


    

def mostrar_comentarios(id_pelicula):
    conexionComentarios = Conexion('SELECT persona, comentario, fecha FROM Comentario WHERE id_pelicula = ?;', (id_pelicula,))
    respuesta = conexionComentarios.res
    comentarios = formato(respuesta)
    conexionComentarios.conex.close()
    return comentarios

def media_puntuacion(imdb_id):
    conexion = Conexion("SELECT AVG(calificacion) FROM Calificacion WHERE id_pelicula = ?",(imdb_id,))

    resultado = conexion.res.fetchone()
    conexion.conex.close()

    return resultado[0]


