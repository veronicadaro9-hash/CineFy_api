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
            // Comprobamos si la película tiene póster
            const poster = pelicula.Poster !== "N/A"
                ? `<img src="${pelicula.Poster}"
                        class="card-img-top object-fit-cover"
                        height="400"
                        alt="${pelicula.Title}">`
                : `<div class="bg-secondary d-flex align-items-center justify-content-center"
                        style="height: 400px;">
                        <span class="text-white">Sin póster</span>
                  </div>`;


             tarjetas += `
                <div class="col-md-4 mb-3">
                  <div class="card h-100 bg-dark text-white border-secondary">

                    ${poster}

                    <div class="card-body">
                        <!-- Título y año en la misma línea -->
                        <div class="d-flex justify-content-between align-items-center gap-2 mb-3">

                              <h5 class="card-title">
                                  ${pelicula.Title}
                              </h5>
                              <span class="text-secondary text-nowrap">
                                  Año:${pelicula.Year}
                              </span>
                        </div>

                       <!-- Botón debajo -->
                       <a href="pelicula.html?id=${pelicula.imdbID}"
                          class="btn btn-warning fw-bold">
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