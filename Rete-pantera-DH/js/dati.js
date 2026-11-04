/* =====================================================================
   dati.js — gli oggetti del catalogo (dal foglio dati_oggetti.xlsx)
   Ogni oggetto è un insieme di coppie "campo: valore".
   - titolo, tipologia, link: dal foglio Excel
   - immagine: dalla colonna "Link immagini" del foglio; quando l'immagine
     non è online è salvata in img/catalogo/. null = nessuna immagine
     (la card mostra allora l'icona della tipologia)
   - intera: true per mostrare l'immagine intera su fondo bianco (copertine,
     loghi, disegni verticali) invece di ritagliarla per riempire il riquadro
   - autore, data: dalle schede del progetto (TEI, Dublin Core, ICCD), dove note;
     stringa vuota "" quando non sono note
   - fonte: l'istituzione o il sito a cui rimanda il link
   - pagina: la pagina item del sito dedicata all'oggetto. Va aggiunta solo quando
     la pagina esiste: senza questo campo card e riga della lista non portano a una scheda
   File separato perché gli stessi dati serviranno anche ad altre pagine
   (scheda dell'oggetto, entità).
   ===================================================================== */

const oggetti = [
  {
    titolo: "Ministro, guarda i nostri sogni nudi",
    tipologia: "TESTO",
    autore: "Fabio Luppino",
    data: "4 febbraio 1990",
    fonte: "Archivio storico de «l'Unità»",
    link: "https://archivio.unita.news/browse/1990/02/04",
    immagine: "img/catalogo/ministro-sogni-nudi.jpg",     // ritaglio dell'articolo, p. 23
    pagina: "item-ministro-sogni-nudi.html"
  },
  {
    titolo: "Batti il tuo tempo",
    tipologia: "MUSICA",
    autore: "Onda Rossa Posse",
    data: "1990",
    fonte: "MusicBrainz",
    link: "https://musicbrainz.org/release-group/5f0a9b7e-95e1-46c8-9f5c-ad853906ba47",
    // copertina del disco su Discogs (indirizzo estratto dal link di Google Immagini del foglio)
    immagine: "https://i.discogs.com/1FCidRBTTIdvDixwfsDmeaM4LqJOXR5aEFayEovEebg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNDU1/OTQ0LTE0OTc3OTk3/OTctNjQ2MC5qcGVn.jpeg",
    intera: true
  },
  {
    titolo: "Riforma Ruberti",
    tipologia: "TESTO",
    autore: "",
    data: "1989",                   // dalla data della Gazzetta Ufficiale nel link (11 maggio 1989)
    fonte: "Normattiva",
    link: "https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=1989-05-11&atto.codiceRedazionale=089G0202&tipoDettaglio=originario&qId=",
    immagine: "img/catalogo/riforma-ruberti.jpg"          // art. 1 della legge su Normattiva
  },
  {
    titolo: "Riprendiamoci l'università",
    tipologia: "VOLANTINO",
    autore: "Coordinamento studenti universitari",
    data: "gennaio 1990",
    fonte: "Archivio Storico della Nuova Sinistra «Marco Pezzi»",
    link: "https://www.iperbole.bologna.it/asnsmp/1990_01_24_Archivio_Pezzi_fondo_Pantera_fascicolo_8_1_centro_stampa_volantini.pdf",
    immagine: "img/catalogo/riprendiamoci-universita.jpg" // parte alta del volantino
  },
  {
    titolo: "Fax n°4",
    tipologia: "FAX",
    autore: "",
    data: "",
    fonte: "",
    link: null,                     // nessun link nel foglio dati
    // illustrazione generica in stile fax: NON è il documento originale
    immagine: "img/catalogo/fax-4.jpg"
  },
  {
    titolo: "Statuto Ass. Pantera90",
    tipologia: "TESTO",
    autore: "",
    data: "2 ottobre 2020",
    fonte: "Associazione Pantera 90",
    link: "https://www.lapantera.org/lassociazione/statuto/",
    immagine: "https://www.lapantera.org/wp-content/uploads/2025/11/cropped-logo-trasparente-bordo-Pantera-90-Archivio-e1763491121317.png",
    intera: true                    // è il logo dell'associazione
  },
  {
    titolo: "Intervista agli Avion Travel",
    tipologia: "AUDIO",
    autore: "",
    data: "",
    fonte: "archiviolimonelunare.org",
    link: "https://www.archiviolimonelunare.org/avion-travel/",
    immagine: "https://www.archiviolimonelunare.org/wp-content/uploads/2025/06/Avion-Travel.jpg"
  },
  {
    titolo: "TeleSqualo",
    tipologia: "VIDEO",
    autore: "",
    data: "",
    fonte: "YouTube",
    link: "https://www.youtube.com/watch?v=_SKtRGs2MCE",
    // Fotogramma di copertina: YouTube lo pubblica a un indirizzo fisso
    // costruito con l'identificativo del video (la parte dopo "v=")
    immagine: "https://img.youtube.com/vi/_SKtRGs2MCE/mqdefault.jpg"
  },
  {
    titolo: "Mappa delle occupazioni",
    tipologia: "DISEGNO",
    autore: "",
    data: "primavera 1990",
    fonte: "Archivio Storico della Nuova Sinistra «Marco Pezzi»",
    link: "https://www.iperbole.bologna.it/asnsmp/Archivio_Pezzi_fondo_Pantera_fascicolo_8_1_disegni_28.jpg",
    immagine: "https://www.iperbole.bologna.it/asnsmp/Archivio_Pezzi_fondo_Pantera_fascicolo_8_1_disegni_28.jpg",
    intera: true                    // foglio A4 verticale: ritagliato si perderebbe la mappa
  },
  {
    titolo: "Occupazione scuola",
    tipologia: "FOTO",
    autore: "Andrea Garuti",
    data: "1989-1990 ca.",
    fonte: "Museo Nazionale di Fotografia",
    link: "https://www.mufocosearch.org/schedafotografia/SUP-10100-0004893?context=photoBySearch&position=1",
    immagine: "https://www.mufocosearch.org/_dati/immagini/piccole/fondi/AGN/sup_10100_0004893.jpg",
    pagina: "item-occupazione-scuola.html"
  }
];
