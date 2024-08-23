document.addEventListener('DOMContentLoaded', () => {
  fetch('/dados')
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById('dados-tabela').getElementsByTagName('tbody')[0];
      data.forEach(item => {
        const row = tabela.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = item.id;
        cell2.textContent = item.nome;
        cell3.textContent = item.valor;
      });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
});
