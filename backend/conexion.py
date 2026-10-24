import sqlite3


class Conexion:
    def __init__(self,sql_query,parametro=[]):
        self.conex=sqlite3.connect( "bd_peliculas.db")
        self.conex.row_factory = sqlite3.Row
        self.cur = self.conex.cursor()
        self.res = self.cur.execute(sql_query,parametro)
        