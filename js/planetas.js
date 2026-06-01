var listaPlanetas = [];

function consumirPlanetas() {
  var url = "https://dragonball-api.com/api/planets";

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      listaPlanetas = data.items;

      poblarPlanetas(listaPlanetas);
    })
    .catch(function (error) {
      console.error("Hubo un error:", error);
    });
}

function poblarPlanetas(planetas) {
  var divPadre = document.getElementById("divPadre");

  divPadre.innerHTML = "";

  for (var i = 0; i < planetas.length; i++) {
    var planeta = planetas[i];

    var tarjeta = crearElemento("div");

    tarjeta.className = "tarjeta";

    var imagen = crearElementoImagen(planeta.image, planeta.name);

    imagen.style.height = "180px";
    imagen.style.width = "100%";
    imagen.style.objectFit = "contain";

    var nombre = crearElementoTexto("h3", planeta.name);

    var boton = crearElementoLink(
      "detallesplaneta.html?id=" + planeta.id,
      "Ver Detalle",
    );

    boton.className = "btn-detalles";

    adicionarElementoAContenedor(imagen, tarjeta);
    adicionarElementoAContenedor(nombre, tarjeta);

    adicionarElementoAContenedor(boton, tarjeta);

    adicionarElementoAContenedor(tarjeta, divPadre);
  }
}

window.onload = consumirPlanetas;
