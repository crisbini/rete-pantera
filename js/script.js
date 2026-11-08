
let paginaCorrente = location.pathname.split("/").pop() || "index.html";
if (paginaCorrente.startsWith("item-")) {
  paginaCorrente = "catalogo.html";
}

document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
  if (link.getAttribute("href") === paginaCorrente) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});


/* - Doc Tab via JavaScript: https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior
     Doc URLSearchParams: https://developer.mozilla.org/it/docs/Web/API/URLSearchParams */
const vistaScelta = new URLSearchParams(location.search).get("vista");
const pulsanteVista = document.querySelector('[data-vista="' + vistaScelta + '"]');

if (pulsanteVista) {
  bootstrap.Tab.getOrCreateInstance(pulsanteVista).show();
}
