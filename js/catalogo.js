



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



const righeLista = document.querySelector("#righe-lista");
const grigliaCard = document.querySelector("#griglia-card");
const campoRicerca = document.querySelector("#cerca");
const contatore = document.querySelector("#contatore");
const nessunRisultato = document.querySelector("#nessun-risultato");

const pulsanteTipologia = document.querySelector("#pulsante-tipologia");
const casellaAll = document.querySelector("#menu-tipologia input[value='ALL']");
const caselleTipi = document.querySelectorAll("#menu-tipologia input:not([value='ALL'])");

let tipologieScelte = Array.from(caselleTipi).map(function (c) { return c.value; });
let tutteScelte = true;

oggetti.sort(function (a, b) {
  return a.titolo.localeCompare(b.titolo, "it");
});



function linkIstituzione(o) {
  return o.link
    ? `<a href="${o.link}" target="_blank" rel="noopener" class="link-fonte">${o.fonte} <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></a>`
    : "";
}


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



function accendiBanda() {
  document.querySelectorAll(".banda-tipologie .tipo").forEach(function (voce) {
    const accesa = tutteScelte
      ? voce.dataset.tipo === "ALL"
      : tipologieScelte.includes(voce.dataset.tipo);
    voce.classList.toggle("acceso", accesa);
  });
}



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


righeLista.addEventListener("click", function (evento) {
  const riga = evento.target.closest("tr");
  if (riga && riga.dataset.pagina && !evento.target.closest("a")) {
    location.href = riga.dataset.pagina;
  }
});

campoRicerca.addEventListener("input", mostraOggetti);



mostraOggetti();
accendiBanda();
