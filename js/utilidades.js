function crearElemento(tipo) {
  var nodo = document.createElement(tipo);
  return nodo;
}

function crearElementoTexto(tipo, texto) {
  var nodo = document.createElement(tipo);
  var textoNodo = document.createTextNode(texto);
  nodo.appendChild(textoNodo);
  return nodo;
}

function crearElementoImagen(url, alt) {
  var nodo = crearElemento("img");
  nodo.src = url;
  nodo.alt = alt;
  return nodo;
}

function crearElementoLink(href, texto) {
  var nodo = crearElementoTexto("a", texto);
  nodo.href = href;
  return nodo;
}

function adicionarElementoABody(nodo) {
  document.body.appendChild(nodo);
}

function adicionarElementoAContenedor(elemento, contenedor) {
  contenedor.appendChild(elemento);
}
