/* =====================================================================
   catalogo.js — script della sola pagina catalogo.html
   Legge l'elenco "oggetti" da dati.js (va caricato prima di questo file),
   costruisce le righe della lista e le card, e gestisce filtro e ricerca.
   ===================================================================== */


/* ---------- 1. ICONA DI OGNI TIPOLOGIA ----------
   Nomi delle icone di Bootstrap Icons: https://icons.getbootstrap.com/ */
const icone = {
  TESTO: "bi-file-earmark-text",
  VOLANTINO: "bi-megaphone",
  FAX: "bi-printer",
  DISEGNO: "bi-brush",
  FOTO: "bi-camera",
  AUDIO: "bi-mic",
  MUSICA: "bi-music-note-beamed",
  VIDEO: "bi-camera-video"
};


/* ---------- 2. ELEMENTI DELLA PAGINA ----------
   querySelector trova un elemento con la stessa sintassi dei selettori CSS;
   querySelectorAll li trova tutti. */
const righeLista = document.querySelector("#righe-lista");
const grigliaCard = document.querySelector("#griglia-card");
const campoRicerca = document.querySelector("#cerca");
const contatore = document.querySelector("#contatore");
const nessunRisultato = document.querySelector("#nessun-risultato");

// Menu a tendina della tipologia: la casella "All" e le caselle delle singole tipologie
const pulsanteTipologia = document.querySelector("#pulsante-tipologia");
const casellaAll = document.querySelector("#menu-tipologia input[value='ALL']");
const caselleTipi = document.querySelectorAll("#menu-tipologia input:not([value='ALL'])");

// Tipologie applicate con il pulsante "Filtra" (all'apertura: tutte)
let tipologieScelte = Array.from(caselleTipi).map(function (c) { return c.value; });
let tutteScelte = true;

// Ordine alfabetico dei titoli (localeCompare tiene conto di accenti e lingua italiana)
oggetti.sort(function (a, b) {
  return a.titolo.localeCompare(b.titolo, "it");
});


/* ---------- 3. MODELLI HTML ----------
   Ogni funzione riceve un oggetto e restituisce il suo HTML come testo.
   I "template literal" (testo tra `backtick`) inseriscono i valori con ${...}.
   Doc: https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Template_literals */

// Nome dell'istituzione: link esterno alla pagina di informazioni (link del foglio dati).
// La classe .link-fonte lo tiene cliccabile anche sopra lo stretched-link della card.
function linkIstituzione(o) {
  return o.link
    ? `<a href="${o.link}" target="_blank" rel="noopener" class="link-fonte">${o.fonte} <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></a>`
    : "";
}

// Una riga della tabella (vista Lista).
// Il titolo porta alla pagina item; data-pagina serve a rendere cliccabile tutta la riga (sezione 7).
function rigaLista(o) {
  const titolo = o.pagina ? `<a href="${o.pagina}">${o.titolo}</a>` : o.titolo;
  return `
    <tr class="${o.pagina ? "riga-cliccabile" : ""}" data-pagina="${o.pagina || ""}">
      <td><i class="bi ${icone[o.tipologia]} me-2" aria-hidden="true"></i>${titolo}</td>
      <td>${o.tipologia}</td>
      <td class="d-none d-md-table-cell">${o.autore || "—"}</td>
      <td class="d-none d-md-table-cell">${o.data || "—"}</td>
      <td class="d-none d-lg-table-cell">${linkIstituzione(o) || o.fonte || "—"}</td>
    </tr>`;
}

// Una card (vista Card). Se l'immagine non si carica, onerror la rimuove
// e nel riquadro resta visibile l'icona della tipologia.
// Con intera: true l'immagine riceve la classe .intera (vedi style.css, 9.5).
// Il titolo ha la classe .stretched-link: un clic in qualunque punto della card
// apre la pagina item. Doc: https://getbootstrap.com/docs/5.3/helpers/stretched-link/
function card(o) {
  const immagine = o.immagine
    ? `<img src="${o.immagine}" alt="Anteprima: ${o.titolo}" class="${o.intera ? "intera" : ""}" loading="lazy" onerror="this.remove()">`
    : "";
  const titolo = o.pagina ? `<a href="${o.pagina}" class="stretched-link">${o.titolo}</a>` : o.titolo;
  const dettagli = [o.autore, o.data].filter(Boolean).join(" · ");   // salta i campi vuoti
  const piede = linkIstituzione(o) || `Fonte non disponibile online`;
  return `
    <div class="col">
      <article class="card card-oggetto h-100">
        <div class="anteprima">
          <i class="bi ${icone[o.tipologia]}" aria-hidden="true"></i>
          ${immagine}
        </div>
        <div class="card-body">
          <p class="tipo-oggetto mb-1">${o.tipologia}</p>
          <h3 class="card-title">${titolo}</h3>
          <p class="card-text small mb-0">${dettagli}</p>
        </div>
        <div class="card-footer">${piede}</div>
      </article>
    </div>`;
}


/* ---------- 4. MOSTRARE GLI OGGETTI FILTRATI ----------
   filter() tiene solo gli oggetti che rispettano entrambe le condizioni:
   tipologia tra quelle spuntate nel filtro e testo cercato (in titolo, autore o fonte).
   Le stesse righe/card vengono scritte sia nella lista sia nella griglia,
   così passando da una vista all'altra il risultato resta identico. */
function mostraOggetti() {
  const testo = campoRicerca.value.trim().toLowerCase();

  const risultati = oggetti.filter(function (o) {
    const tipologiaOk = tipologieScelte.includes(o.tipologia);
    const testoOk = (o.titolo + " " + o.autore + " " + o.fonte).toLowerCase().includes(testo);
    return tipologiaOk && testoOk;
  });

  righeLista.innerHTML = risultati.map(rigaLista).join("");
  grigliaCard.innerHTML = risultati.map(card).join("");

  contatore.textContent = risultati.length === 1 ? "1 oggetto" : risultati.length + " oggetti";
  nessunRisultato.classList.toggle("d-none", risultati.length > 0);
}


/* ---------- 5. ACCENDERE LA BANDA DELLE TIPOLOGIE ----------
   Ogni voce della banda ha l'attributo data-tipo (es. data-tipo="FOTO").
   - se sono scelte tutte (All), si accende soltanto All e le altre restano spente;
   - altrimenti si accendono le voci delle tipologie spuntate. */
function accendiBanda() {
  document.querySelectorAll(".banda-tipologie .tipo").forEach(function (voce) {
    const accesa = tutteScelte
      ? voce.dataset.tipo === "ALL"
      : tipologieScelte.includes(voce.dataset.tipo);
    voce.classList.toggle("acceso", accesa);
  });
}


/* ---------- 6. CASELLE DI SPUNTA DEL MENU "TIPOLOGIA" ----------
   - spuntando o togliendo All si spuntano o si tolgono tutte le tipologie;
   - spuntando una per una tutte le tipologie si spunta anche All,
     togliendone una si toglie All.
   Il testo del pulsante riassume la scelta (es. "Testo, Foto" o "3 selezionate").
   Le caselle cambiano subito; il catalogo cambia solo con "Filtra". */
function aggiornaPulsante() {
  const spuntate = Array.from(caselleTipi).filter(function (c) { return c.checked; });
  if (casellaAll.checked) {
    pulsanteTipologia.textContent = "All (tutte)";
  } else if (spuntate.length === 0) {
    pulsanteTipologia.textContent = "Nessuna";
  } else if (spuntate.length <= 2) {
    pulsanteTipologia.textContent = spuntate.map(function (c) { return c.dataset.nome; }).join(", ");
  } else {
    pulsanteTipologia.textContent = spuntate.length + " selezionate";
  }
}

casellaAll.addEventListener("change", function () {
  caselleTipi.forEach(function (c) { c.checked = casellaAll.checked; });
  aggiornaPulsante();
});

caselleTipi.forEach(function (casella) {
  casella.addEventListener("change", function () {
    casellaAll.checked = Array.from(caselleTipi).every(function (c) { return c.checked; });
    aggiornaPulsante();
  });
});


/* ---------- 7. EVENTI DEI FORM ----------
   - pulsante "Filtra": legge le caselle spuntate e aggiorna banda e oggetti;
   - barra di ricerca: filtra mentre si scrive (evento "input").
   preventDefault() impedisce ai form di ricaricare la pagina.
   Doc addEventListener: https://developer.mozilla.org/it/docs/Web/API/EventTarget/addEventListener */
document.querySelector("#form-filtro").addEventListener("submit", function (evento) {
  evento.preventDefault();
  tipologieScelte = Array.from(caselleTipi)
    .filter(function (c) { return c.checked; })
    .map(function (c) { return c.value; });
  tutteScelte = casellaAll.checked;
  accendiBanda();
  mostraOggetti();
});

document.querySelector("#form-ricerca").addEventListener("submit", function (evento) {
  evento.preventDefault();
});

// Clic su una riga della lista: apre la pagina item (se la riga ne ha una).
// Un solo ascoltatore sul <tbody> vale per tutte le righe, anche quelle ricreate dal filtro.
// Se il clic è su un link (titolo o istituzione) lascia fare al link.
righeLista.addEventListener("click", function (evento) {
  const riga = evento.target.closest("tr");
  if (riga && riga.dataset.pagina && !evento.target.closest("a")) {
    location.href = riga.dataset.pagina;
  }
});

campoRicerca.addEventListener("input", mostraOggetti);


/* ---------- 8. AVVIO ---------- */
mostraOggetti();
accendiBanda();
