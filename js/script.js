/* =====================================================================
   script.js — funzioni comuni a tutte le pagine di Rete Pantera
   Va caricato in fondo al <body>, dopo bootstrap.bundle.min.js:
   a quel punto la pagina è già costruita e l'oggetto "bootstrap" esiste.
   ===================================================================== */


/* ---------- 1. EVIDENZIARE LA PAGINA CORRENTE NELLA NAVBAR ----------
   Confronta il nome del file aperto (es. "catalogo.html") con l'href di ogni voce
   del menu; quella che coincide riceve la classe .active (stile in style.css)
   e aria-current="page" (per i lettori di schermo).
   Le pagine degli oggetti (item-....html) fanno parte del catalogo:
   per loro si evidenzia la voce "Catalogo".
   Doc: https://getbootstrap.com/docs/5.3/components/navbar/#nav */
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


/* ---------- 2. APRIRE LA VISTA DEL CATALOGO SCELTA IN HOME ----------
   I tre pulsanti della home portano a catalogo.html?vista=lista | card | mappa.
   Qui si legge il parametro "vista" dall'indirizzo e si apre la scheda (Tab)
   corrispondente. In catalogo.html ogni pulsante delle schede dovrà avere
   l'attributo data-vista, ad esempio:
     <button class="nav-link" data-bs-toggle="tab" data-bs-target="#vista-mappa" data-vista="mappa">Mappa</button>
   Nelle pagine senza schede (come la home) il blocco non fa nulla.
   Doc Tab via JavaScript: https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior
   Doc URLSearchParams: https://developer.mozilla.org/it/docs/Web/API/URLSearchParams */
const vistaScelta = new URLSearchParams(location.search).get("vista");
const pulsanteVista = document.querySelector('[data-vista="' + vistaScelta + '"]');

if (pulsanteVista) {
  bootstrap.Tab.getOrCreateInstance(pulsanteVista).show();
}
