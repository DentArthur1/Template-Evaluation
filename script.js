// Funzione per espandere o comprimere le tabelle
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

// Funzione per aprire il modal
function openModal(event, comment, header, valutazioneForma, valutazioneContenuto) {
  event.stopPropagation();
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');
  modal.querySelector('.modal-header').textContent = header;
  document.getElementById('expanded-comment').textContent = comment;
  document.getElementById('valutazione-forma').textContent = valutazioneForma;
  document.getElementById('valutazione-contenuto').textContent = valutazioneContenuto;
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

// Funzione per chiudere il modal
function closeModal() {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// Funzione per espandere o comprimere i commenti direttamente nella tabella
function toggleComment(element, comment, valutazioneForma, valutazioneContenuto) {
  // Trova la riga della tabella (tr) e la cella corrente (td)
  const row = element.closest('tr');
  const allRows = Array.from(row.parentElement.children);

  // Trova dinamicamente tutti gli utenti nella colonna "Utente"
  const utenti = allRows.map(riga => riga.querySelectorAll('td')[1]?.textContent.trim()).filter(Boolean);

  // Trova l'indice dell'utente corrente
  const currentUserIndex = utenti.indexOf(row.querySelectorAll('td')[1]?.textContent.trim());

  // Genera l'header dinamico con tutti gli altri utenti che valutano l'utente corrente
  const dynamicHeader = utenti
    .filter((_, index) => index !== currentUserIndex)
    .map(utente => `${utente} valuta ${utenti[currentUserIndex]}`)
    .join(', ');

  if (element.classList.contains('expanded')) {
    // Comprimi il commento
    element.classList.remove('expanded');
    element.classList.add('truncate');
    element.innerHTML = `
      <p>"${comment}"</p>
      <button class="expand-button" onclick="toggleComment(this.parentElement, '${comment}', ${valutazioneForma}, ${valutazioneContenuto})">🔍</button>
    `;
  } else {
    // Espandi il commento
    element.classList.remove('truncate');
    element.classList.add('expanded');
    element.innerHTML = `
      <div class="comment-header">${dynamicHeader}</div>
      <div class="comment-content">
        <div class="comment-text">
          <p>"${comment}"</p>
        </div>
        <div class="comment-details">
          <p><strong>Valutazione Forma:</strong> ${valutazioneForma}</p>
          <p><strong>Valutazione Contenuto:</strong> ${valutazioneContenuto}</p>
        </div>
      </div>
      <div class="comment-docente">
        <label for="valutazione-docente" class="block font-semibold">Valutazione Docente:</label>
        <input type="number" step="0.1" class="w-full border border-gray-300 px-2 py-1 mt-1" value="0" min="0" max="5">
      </div>
      <button class="close-button" onclick="toggleComment(this.parentElement, '${comment}', ${valutazioneForma}, ${valutazioneContenuto})">Chiudi</button>
    `;
  }
}