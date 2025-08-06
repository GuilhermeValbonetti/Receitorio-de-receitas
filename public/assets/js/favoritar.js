document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.favoritar');

  botoes.forEach(botao => {
    const id = botao.id;

    // Atualiza o texto do botão ao carregar a página
    if (estaNosFavoritos(id)) {
      botao.textContent = '💔 Remover dos Favoritos';
    }

    botao.addEventListener('click', () => {
      if (estaNosFavoritos(id)) {
        removerDosFavoritos(id);
        botao.textContent = '❤️ Favoritar';
      } else {
        adicionarAosFavoritos(id);
        botao.textContent = '💔 Remover dos Favoritos';
      }
    });
  });
});

function obterFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function estaNosFavoritos(id) {
  const favoritos = obterFavoritos();
  return favoritos.includes(String(id));
}

function adicionarAosFavoritos(id) {
  const favoritos = obterFavoritos();
  if (!favoritos.includes(String(id))) {
    favoritos.push(String(id));
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}

function removerDosFavoritos(id) {
  let favoritos = obterFavoritos();
  favoritos = favoritos.filter(favId => favId !== String(id));
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
