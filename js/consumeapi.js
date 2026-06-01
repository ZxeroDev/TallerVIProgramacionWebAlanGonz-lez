var listaPersonajes = [];

function consumeAPI() {
  var url = "https://dragonball-api.com/api/characters?limit=50";

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      listaPersonajes = data.items;

      var personajesCargados = 0;

      for (var i = 0; i < listaPersonajes.length; i++) {
        cargarPlanetaPersonaje(listaPersonajes[i], function () {
          personajesCargados++;

          if (personajesCargados == listaPersonajes.length) {
            generarFiltroPlanetas();
            poblarPersonajes(listaPersonajes);
          }
        });
      }
    })
    .catch(function (error) {
      console.error("Hubo un error:", error);
    });
}

function cargarPlanetaPersonaje(personaje, callback) {
  fetch("https://dragonball-api.com/api/characters/" + personaje.id)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (detalle) {
      if (detalle.originPlanet) {
        personaje.planeta = detalle.originPlanet.name;
      } else {
        personaje.planeta = "Desconocido";
      }

      callback();
    })
    .catch(function () {
      personaje.planeta = "Desconocido";

      callback();
    });
}

function generarFiltroPlanetas() {
  var selectPlaneta = document.getElementById("selectPlaneta");

  selectPlaneta.innerHTML = '<option value="todos">Todos los planetas</option>';

  var planetas = [];

  for (var i = 0; i < listaPersonajes.length; i++) {
    var planeta = listaPersonajes[i].planeta;

    var existe = false;

    for (var j = 0; j < planetas.length; j++) {
      if (planetas[j] == planeta) {
        existe = true;
      }
    }

    if (existe == false) {
      planetas.push(planeta);
    }
  }

  for (var i = 0; i < planetas.length; i++) {
    var opcion = crearElementoTexto("option", planetas[i]);

    opcion.value = planetas[i];

    adicionarElementoAContenedor(opcion, selectPlaneta);
  }
}

function filtrarPersonajes() {
  var textoBuscado = document
    .getElementById("inputBuscador")
    .value.toLowerCase();

  var razaSeleccionada = document.getElementById("selectRaza").value;

  var planetaSeleccionado = document.getElementById("selectPlaneta").value;

  var personajesFiltrados = [];

  for (var i = 0; i < listaPersonajes.length; i++) {
    var personaje = listaPersonajes[i];

    var coincideNombre =
      personaje.name.toLowerCase().indexOf(textoBuscado) != -1;

    var coincideRaza =
      razaSeleccionada == "todos" || personaje.race == razaSeleccionada;

    var coincidePlaneta =
      planetaSeleccionado == "todos" ||
      personaje.planeta == planetaSeleccionado;

    if (coincideNombre && coincideRaza && coincidePlaneta) {
      personajesFiltrados.push(personaje);
    }
  }

  poblarPersonajes(personajesFiltrados);
}

function poblarPersonajes(personajes) {
  var divPadre = document.getElementById("divPadre");

  divPadre.innerHTML = "";

  if (personajes.length == 0) {
    divPadre.innerHTML =
      "<p style='grid-column:1/-1;text-align:center;color:#888;font-size:1.2rem;margin-top:40px;'>No se encontraron guerreros con esos criterios.</p>";

    return;
  }

  for (var i = 0; i < personajes.length; i++) {
    var personaje = personajes[i];

    var tarjeta = crearElemento("div");

    tarjeta.className = "tarjeta";

    var imagen = crearElementoImagen(personaje.image, personaje.name);

    imagen.style.height = "180px";

    imagen.style.width = "100%";

    imagen.style.objectFit = "contain";

    var nombre = crearElementoTexto("h3", personaje.name);

    var infoRaza = crearElementoTexto(
      "p",
      personaje.race + " - " + personaje.planeta,
    );

    var botonDetalles = crearElementoLink(
      "html/detallespersonajes.html?id=" + personaje.id,
      "Ver Detalles",
    );

    botonDetalles.className = "btn-detalles";

    adicionarElementoAContenedor(imagen, tarjeta);

    adicionarElementoAContenedor(nombre, tarjeta);

    adicionarElementoAContenedor(infoRaza, tarjeta);

    adicionarElementoAContenedor(botonDetalles, tarjeta);

    adicionarElementoAContenedor(tarjeta, divPadre);
  }
}

window.onload = consumeAPI;
