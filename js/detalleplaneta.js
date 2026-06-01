window.onload = cargarDetallesPlaneta;

function cargarDetallesPlaneta() {
  var parametros = new URLSearchParams(window.location.search);

  var id = parametros.get("id");

  console.log("ID recibido:", id);

  if (!id) {
    document.getElementById("contenedorPlaneta").innerHTML =
      "<p>No se encontró el planeta.</p>";

    return;
  }

  var url = "https://dragonball-api.com/api/planets/" + id;

  fetch(url)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el planeta");
      }

      return respuesta.json();
    })
    .then(function (planeta) {
      console.log("Planeta cargado:", planeta);

      mostrarPlaneta(planeta);

      if (planeta.characters) {
        mostrarPersonajes(planeta.characters);
      }
    })
    .catch(function (error) {
      console.error(error);

      document.getElementById("contenedorPlaneta").innerHTML =
        "<p>Error cargando el planeta.</p>";
    });
}

function mostrarPlaneta(planeta) {
  var contenedor = document.getElementById("contenedorPlaneta");

  contenedor.innerHTML = "";

  var imagen = crearElementoImagen(planeta.image, planeta.name);

  imagen.className = "detalle-imagen";

  var nombre = crearElementoTexto("h1", planeta.name);

  var descripcion = crearElementoTexto("p", planeta.description);

  adicionarElementoAContenedor(imagen, contenedor);

  adicionarElementoAContenedor(nombre, contenedor);

  adicionarElementoAContenedor(descripcion, contenedor);
}

function mostrarPersonajes(personajes) {
  var divPadre = document.getElementById("divPersonajes");

  divPadre.innerHTML = "";

 if (!personajes || personajes.length == 0) {
  divPadre.innerHTML =
    "<div class='empty-state'>Este planeta no tiene personajes registrados </div>";
  return;

  }

  for (var i = 0; i < personajes.length; i++) {
    var personaje = personajes[i];

    var tarjeta = crearElemento("div");

    tarjeta.className = "tarjeta";

    var imagen = crearElementoImagen(personaje.image, personaje.name);

    var nombre = crearElementoTexto("h3", personaje.name);

    var raza = crearElementoTexto("p", personaje.race);

    var boton = crearElementoLink(
      "detallespersonajes.html?id=" + personaje.id,
      "Ver Detalles",
    );

    boton.className = "btn-detalles";

    adicionarElementoAContenedor(imagen, tarjeta);
    adicionarElementoAContenedor(nombre, tarjeta);
    adicionarElementoAContenedor(raza, tarjeta);
    adicionarElementoAContenedor(boton, tarjeta);

    adicionarElementoAContenedor(tarjeta, divPadre);
  }
}
