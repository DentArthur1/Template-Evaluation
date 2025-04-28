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