CREATE TABLE "Comentario" (
	"id"	INTEGER,
	"id_pelicula"	TEXT NOT NULL,
	"persona"	TEXT NOT NULL,
	"comentario"	TEXT NOT NULL,
	"fecha"	TEXT NOT NULL,
	"puntuacion"	INTEGER CHECK("puntuacion" BETWEEN 1 AND 5),
	PRIMARY KEY("id" AUTOINCREMENT)
);