const parametros = new URLSearchParams(window.location.search);
const imdbId = parametros.get("id");

console.log(imdbId);

const url = `http://127.0.0.1:8000/peliculas/${imdbId}`;

console.log("INICIANDO PETICIÓN DE DETALLES:", url);

fetch(url)
.then(response => response.json())
.then(pelicula => {
    console.log("DETALLES:", pelicula);
    let detalle = `
        <div class="card">
            <div class="row">
                <div class="col-md-4">
                    <img src="${pelicula.Poster}" class="img-fluid">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        <h1>${pelicula.Title}</h1>
                        <p><strong>Año:</strong> ${pelicula.Year}</p>
                        <p><strong>Género:</strong> ${pelicula.Genre}</p>
                        <p><strong>Director:</strong> ${pelicula.Director}</p>
                        <p><strong>Actores:</strong> ${pelicula.Actors}</p>
                        <p><strong>Argumento:</strong> ${pelicula.Plot}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("detalle").innerHTML = detalle;
})
.catch(error => {
    console.log("Error al cargar los detalles:", error);
});

const urlComentarios =
    `http://127.0.0.1:8000/peliculas/${imdbId}/comentarios`;

function mostrarComentarios() {
    fetch(urlComentarios)
    .then(response => response.json())
    .then(data => {
        console.log("COMENTARIOS:", data);
        let listaComentarios = "";

        data.forEach(element => {
            listaComentarios += `
                <div class="card mb-2">
                    <div class="card-body">
                        <h5>${element.persona}</h5>
                        <p>${element.comentario}</p>
                        <small>${element.fecha}</small>
                    </div>
                </div>
            `;
        });

        document.getElementById("comentarios").innerHTML =
            listaComentarios;
    })
    .catch(error => {
        console.log("Error al cargar los comentarios:", error);
    });
}

mostrarComentarios();

const formularioComentario =
    document.getElementById("formulario-comentario");

function agregarComentario(evento) {
    // Evita que el formulario se envié de forma automática y recargue la página
    evento.preventDefault();

    const persona = document.getElementById("persona").value.trim();
    if (persona === "") {
        alert("El nombre no puede estar vacío");
        return;
    }
    if (/\d/.test(persona)) {
        alert("El nombre no puede contener números");
        return;
    }
    
    if (!/\p{L}/u.test(persona)) {
        alert("El nombre debe contener al menos una letra");
        return;
    }
    const comentario = document.getElementById("comentario").value.trim();
    
    if (comentario === "") {
        alert("El comentario no puede estar vacío");
        return;
    }
    if (/\d/.test(comentario)) {
        alert("El comentario no puede contener números");
        return;
    }
    
    if (!/\p{L}/u.test(comentario)) {
        alert("El comentario debe contener al menos una letra");
        return;
    }
    const fecha = document.getElementById("fecha").value.trim();

    fetch(urlComentarios, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            persona: persona,
            comentario: comentario,
            fecha: fecha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        alert(data.mensaje);
        formularioComentario.reset();
        mostrarComentarios();
    })
    .catch(error => {
        console.log("Error al guardar el comentario:", error);
    });
}

// URL para consultar la media de las valoraciones
const urlPuntuacion = `http://127.0.0.1:8000/peliculas/${imdbId}/puntuacion`;

// Obtener la puntuación media de la película
fetch(urlPuntuacion)
    .then(response => response.json())
    .then(media => {
        document.getElementById("puntuacion").innerHTML =
            `<h3>Valoración media: ⭐ ${media ?? "Sin valoraciones"} </h3>`;
    })
    .catch(error => console.log("Error al cargar la puntuación:", error));

// Ejecuta la función agregarComentario cuando se envía el formulario
formularioComentario.addEventListener("submit", agregarComentario);