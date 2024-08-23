document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dados') // Certifique-se de que a URL está correta
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da rede');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Adicione esta linha para verificar os dados no console
      const tabela = document.getElementById('dados-tabela').getElementsByTagName('tbody')[0];
      data.forEach(item => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = item.id;
        row.insertCell(1).textContent = item.restricaoDescricao;
        row.insertCell(2).textContent = item.setorPatio;
        row.insertCell(3).textContent = item.statusRestricao;
        row.insertCell(4).textContent = item.responsavel;
        row.insertCell(5).textContent = new Date(item.dataCadastro).toLocaleDateString();
        row.insertCell(6).textContent = new Date(item.previsaoRetirada).toLocaleDateString();
        row.insertCell(7).textContent = new Date(item.ultimaMudanca).toLocaleDateString();

        // Calcular a diferença de dias
        const dataCadastro = new Date(item.dataCadastro);
        const previsaoRetirada = new Date(item.previsaoRetirada);
        const diffTime = Math.abs(previsaoRetirada - dataCadastro);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        row.insertCell(8).textContent = diffDays; // Adicionar a diferença de dias na nova coluna
      });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
});
