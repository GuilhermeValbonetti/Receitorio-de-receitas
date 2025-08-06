fetch('/public/assets/db/db.json')
  .then(response => response.json())  
  .then(data => {
    const id = new URLSearchParams(window.location.search).get('id'); 
    const receita = data.receitas.find(item => item.id == id); 
    
    if (receita) {
      document.getElementById('titulo').textContent = receita.titulo;
      document.getElementById('imagem').src = receita.imagem;
      document.getElementById('ingredientes').innerHTML = receita.ingredientes.map(i => `<li>${i}</li>`).join('');
      document.getElementById('modoPreparo').innerHTML = receita.modoPreparo.split("\n").map(i => `<li>${i}</li>`).join('');
    } else {
      console.log('Receita não encontrada');
    }
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
