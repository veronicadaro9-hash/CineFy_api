const parametros = new URLSearchParams(window.location.search);
const imdbId = parametros.get("id");

console.log(imdbId);

 const url= `http://127.0.0.1:8000/peliculas/${imdbId}`;

console.log("INICIANDO PETICIÓN DE DETALLES:", url);
// Consulta los detalles de la película en FastAPI
fetch(url)
.then(response => response.json())
.then(pelicula => {
  console.log("DETALLES:", pelicula);
    
  let detalle = `
    <div class="card bg-dark text-white border-secondary">
        <div class="row g-0">

            <div class="col-md-4">
                <img src="${pelicula.Poster}"
                     class="img-fluid rounded-start w-100"
                     alt="${pelicula.Title}">
            </div>

            <div class="col-md-8">
                <div class="card-body p-4">

                    <h1 class="card-title mb-3">
                        ${pelicula.Title}
                    </h1>

                    <p class="text-secondary mb-4">
                        ${pelicula.Year} · ${pelicula.Genre}
                    </p>

                    <p>
                        <strong class="text-warning">Director:</strong>
                        ${pelicula.Director}
                    </p>

                    <p>
                        <strong class="text-warning">Reparto:</strong>
                        ${pelicula.Actors}
                    </p>

                    <h2 class="fs-5 text-warning mt-4">
                        Sinopsis
                    </h2>

                    <p class="lh-lg">
                        ${pelicula.Plot}
                    </p>

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

// Función para mostrar los comentarios de la película
function mostrarComentarios() {
    fetch(urlComentarios)
    .then(response => response.json())
    .then(data => {
        console.log("COMENTARIOS:", data);

        let listaComentarios = "";

        data.forEach(element => {
            listaComentarios += `
                <div class="card bg-black text-white border-secondary mb-3">
                    <div class="card-body">
                        <h5 class="text-warning">
                            <i class="bi bi-person-circle me-2"></i>
                            ${element.persona}
                        </h5>

                        <p class="mb-2">${element.comentario}</p>

                        <small class="text-secondary">
                            ${element.fecha}
                        </small>
                    </div>
                </div>
            `;
        });

        document.getElementById("comentarios").innerHTML = listaComentarios;
    })
    .catch(error => {
        console.log("Error al cargar los comentarios:", error);
    });
}

mostrarComentarios();


const formularioComentario =
    document.getElementById("formulario-comentario");
// Funcion 
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
    

    const puntuacionSeleccionada =
    document.querySelector('input[name="puntuacion"]:checked');

    if (!puntuacionSeleccionada) {
     alert("Selecciona una puntuación");
    return;
    }

    const puntuacion = Number(puntuacionSeleccionada.value);

    fetch(urlComentarios, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            persona: persona,
            comentario: comentario,
            puntuacion: puntuacion
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
        mostrarPuntuacion();
    })



    .catch(error => {
        console.log("Error al guardar el comentario:", error);
    });
}

// URL para consultar la media de las valoraciones
const urlPuntuacion = `http://127.0.0.1:8000/peliculas/${imdbId}/puntuacion`;

// Obtener la puntuación media de la película

function mostrarPuntuacion() {
    fetch(urlPuntuacion)
    .then(response => response.json())
    .then(media => {

        if (media === null) {
            document.getElementById("puntuacion").innerHTML =
                "<h3>Sin valoraciones</h3>";
            return;
        }

        const puntuacion = Math.round(media);

        const estrellas = [1, 2, 3, 4, 5]
            .map(numero => numero <= puntuacion ? "★" : "☆")
            .join("");

        document.getElementById("puntuacion").innerHTML = `
            <h3>Valoración media</h3>
            <div class="text-warning fs-3">
                ${estrellas}
                <span class="fs-5 text-white">
                    (${media.toFixed(1)}/5)
                </span>
            </div>
        `;
    })
    .catch(error => {
        console.log("Error al cargar la puntuación:", error);
    });
}

mostrarPuntuacion();


// Ejecuta la función agregarComentario cuando se envía el formulario
formularioComentario.addEventListener("submit", agregarComentario);