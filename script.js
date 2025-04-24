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