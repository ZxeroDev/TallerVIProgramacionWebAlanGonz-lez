window.onload = cargarDetallesPersonaje;

function cargarDetallesPersonaje() {
  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id");

  console.log("ID recibido:", id);

  if (!id) {
    document.getElementById("contenedorDetalle").innerHTML = `
            <p style="color:red; text-align:center;">
                No se encontró el personaje.
            </p>
        `;

    return;
  }

  var url = `https://dragonball-api.com/api/characters/${id}`;

  fetch(url)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el personaje");
      }

      return respuesta.json();
    })
    .then((personaje) => {
      console.log("Personaje cargado:", personaje);

      mostrarDetalles(personaje);
    })
    .catch((error) => {
      console.error("Error:", error);

      document.getElementById("contenedorDetalle").innerHTML = `
                <p style="color:red; text-align:center;">
                    Error cargando los detalles del guerrero.
                </p>
            `;
    });
}

function mostrarDetalles(personaje) {
  var contenedor = document.getElementById("contenedorDetalle");

  contenedor.innerHTML = "";

  var planeta = "Desconocido";

  if (personaje.originPlanet) {
    planeta = personaje.originPlanet.name;
  }

  var imagen = crearElementoImagen(personaje.image, personaje.name);

  imagen.className = "detalle-imagen";

  var nombre = crearElementoTexto("h1", personaje.name);

  var raza = crearElementoTexto("p", "Raza: " + personaje.race);

  var genero = crearElementoTexto("p", "Género: " + personaje.gender);

  var ki = crearElementoTexto("p", "Ki Base: " + personaje.ki);

  var maxKi = crearElementoTexto("p", "Ki Máximo: " + personaje.maxKi);

  var afiliacion = crearElementoTexto(
    "p",
    "Afiliación: " + personaje.affiliation,
  );

  var planetaTxt = crearElementoTexto("p", "Planeta: " + planeta);

  var tituloHistoria = crearElementoTexto("h2", "Historia");

  var descripcion = crearElementoTexto("p", personaje.description);

  var tituloTransformaciones = crearElementoTexto("h2", "Transformaciones");

  var contenedorTransformaciones = crearElemento("div");
  contenedorTransformaciones.className = "contenedor-transformaciones";

  if (personaje.transformations && personaje.transformations.length > 0) {
    for (var i = 0; i < personaje.transformations.length; i++) {
      var transformacion = personaje.transformations[i];

      var card = crearElemento("div");
      card.className = "card-transformacion";

      var img = crearElementoImagen(transformacion.image, transformacion.name);

      var nombreTransformacion = crearElementoTexto("h3", transformacion.name);

      var kiTransformacion = crearElementoTexto("p", transformacion.ki);

      adicionarElementoAContenedor(img, card);

      adicionarElementoAContenedor(nombreTransformacion, card);

      adicionarElementoAContenedor(kiTransformacion, card);

      adicionarElementoAContenedor(card, contenedorTransformaciones);
    }
  } else {
    var mensaje = crearElementoTexto(
      "p",
      "Este personaje no tiene transformaciones registradas.",
    );

    adicionarElementoAContenedor(mensaje, contenedorTransformaciones);
  }

  adicionarElementoAContenedor(imagen, contenedor);

  adicionarElementoAContenedor(nombre, contenedor);

  adicionarElementoAContenedor(raza, contenedor);

  adicionarElementoAContenedor(genero, contenedor);

  adicionarElementoAContenedor(ki, contenedor);

  adicionarElementoAContenedor(maxKi, contenedor);

  adicionarElementoAContenedor(afiliacion, contenedor);

  adicionarElementoAContenedor(planetaTxt, contenedor);

  adicionarElementoAContenedor(tituloHistoria, contenedor);

  adicionarElementoAContenedor(descripcion, contenedor);

  adicionarElementoAContenedor(tituloTransformaciones, contenedor);

  adicionarElementoAContenedor(contenedorTransformaciones, contenedor);
}
