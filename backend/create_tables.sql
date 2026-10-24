CREATE TABLE IF NOT EXISTS "Comentario" (
	"id"	INTEGER,
	"id_pelicula"	TEXT NOT NULL,
	"persona"	TEXT NOT NULL,
	"comentario"	TEXT NOT NULL,
	"fecha"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);


CREATE TABLE IF NOT EXISTS "Calificacion" (
	"id"	INTEGER,
	"id_pelicula"	TEXT NOT NULL,
	"persona"	TEXT NOT NULL,
	"calificacion"	INTEGER NOT NULL CHECK("calificacion" BETWEEN 1 AND 5),
	"fecha"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);