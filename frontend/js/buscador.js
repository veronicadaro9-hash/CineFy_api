console.log("javascript");

const url = "http://127.0.0.1:8000/peliculas";

const formulario = document.getElementById("formulario-busqueda");

function buscarPeliculas(evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const anio = document.getElementById("anio").value;

    let urlConsulta = `${url}?titulo=${titulo}`;

    if (anio !== "") {
        urlConsulta += `&año=${anio}`;
    }

    fetch(urlConsulta)
    .then(response => response.json())
    .then(data => {
        let tarjetas = "";

        data.Search.forEach(pelicula => {
             tarjetas += `
             <div class="col-md-4 mb-3">
                <div class="card h-100">
                   <img src="${pelicula.Poster}" class="card-img-top">

                   <div class="card-body">
                       <h5>${pelicula.Title}</h5>
                       <p>Año: ${pelicula.Year}</p>

                       <a href="pelicula.html?id=${pelicula.imdbID}"
                          class="btn btn-primary">
                          Ver detalles
                       </a>
                   </div>
                </div>
             </div>
         `;
        });

        document.getElementById("resultados").innerHTML = tarjetas;
    })
    .catch(error => {
        console.log("Error al buscar las películas:", error);
    });
}

formulario.addEventListener("submit", buscarPeliculas);