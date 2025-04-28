function toggleTable(tableId) {
  const table = document.getElementById(tableId);
  const icon = table.previousElementSibling.querySelector('.toggle-icon');

  if (table.style.display === 'none' || table.style.display === '') {
    table.style.display = 'table';
    icon.textContent = '-';
  } else {
    table.style.display = 'none';
    icon.textContent = '+';
  }
}

const groupsPerPage = 2; // Numero di gruppi per pagina
let currentPage = 1;

function showPage(page) {
  const groups = document.querySelectorAll('.group');
  const totalPages = Math.ceil(groups.length / groupsPerPage);

  // Correggi il numero di pagina se è fuori dai limiti
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  // Nascondi tutti i gruppi
  groups.forEach((group, index) => {
    group.style.display = 'none';
    if (index >= (page - 1) * groupsPerPage && index < page * groupsPerPage) {
      group.style.display = 'block';
    }
  });

  // Aggiorna le informazioni di paginazione
  updatePagination(totalPages, page);
}

function updatePagination(totalPages, currentPage) {
  const pageInfo = document.getElementById('page-info');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  // Aggiorna il testo della pagina corrente
  pageInfo.textContent = `Pagina ${currentPage} di ${totalPages}`;

  // Abilita/disabilita i pulsanti di navigazione
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

function changePage(direction) {
  if (direction === 'prev') {
    currentPage--;
  } else if (direction === 'next') {
    currentPage++;
  }
  showPage(currentPage);
}

// Mostra la prima pagina all'avvio
document.addEventListener('DOMContentLoaded', () => {
  showPage(currentPage);
});


document.addEventListener('DOMContentLoaded', () => {
  const expandableCells = document.querySelectorAll('.expandable');

  expandableCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const content = cell.getAttribute('data-content');
      showPopup(content);
    });
  });
});

function showPopup(content, forma = 5, contenuto = 4) {
  // Crea l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.addEventListener('click', closePopup);

  // Crea la finestra popup
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-left">
        <p>${content}</p>
      </div>
      <div class="popup-right">
        <p><strong>Valutazione Forma:</strong> ${forma}</p>
        <p><strong>Valutazione Contenuto:</strong> ${contenuto}</p>
      </div>
    </div>
    <div class="popup-footer">
      <label for="valutazione-docente"><strong>Valutazione Docente:</strong></label>
      <input id="valutazione-docente" type="number" step="0.1" min="0" max="5" class="valutazione-input" placeholder="Inserisci valutazione">
    </div>
    <button onclick="closePopup()">Chiudi</button>
  `;

  // Aggiungi overlay e popup al body
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
}
function closePopup() {
  const overlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  if (overlay) overlay.remove();
  if (popup) popup.remove();
}