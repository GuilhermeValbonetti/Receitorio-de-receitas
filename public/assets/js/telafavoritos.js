document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('main.container-principal .row');
  container.innerHTML = ''; // Limpa o conteúdo fixo do HTML

  // Pega favoritos do localStorage (array de strings)
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    container.innerHTML = `<p class="text-center">Você não tem receitas favoritas ainda.</p>`;
    return;
  }

  // Função para carregar receitas do db.json
  async function carregarReceitas() {
    try {
      const res = await fetch('/public/assets/db/db.json');
      const dados = await res.json();
      return dados.receitas;
    } catch (erro) {
      console.error('Erro ao carregar receitas:', erro);
      return [];
    }
  }

  const receitas = await carregarReceitas();

  // Filtra só as receitas que estão nos favoritos
  const receitasFavoritas = receitas.filter(r => favoritos.includes(r.id));

  if (receitasFavoritas.length === 0) {
    container.innerHTML = `<p class="text-center">Você não tem receitas favoritas ainda.</p>`;
    return;
  }

  // Monta o HTML de cada receita favorita
  receitasFavoritas.forEach(r => {
    const col = document.createElement('div');
    col.className = "col-12 col-sm-6 col-md-6 col-lg-3";

    col.innerHTML = `
      <article class="cartão">
        <a href="detalhes.html?id=${r.id}">
          <img src="${r.imagem}" alt="${r.titulo}">
          <h3>${r.titulo}</h3>
          <p>${r.ingredientes.slice(0, 3).join(', ')}...</p>
        </a>
        <button class="favoritar" id="${r.id}">💔 Remover dos Favoritos</button>
      </article>
    `;

    container.appendChild(col);
  });

  // Adiciona evento para remover favorito ao clicar no botão
  container.querySelectorAll('button.favoritar').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.id;
      let favs = JSON.parse(localStorage.getItem('favoritos')) || [];
      favs = favs.filter(favId => favId !== id);
      localStorage.setItem('favoritos', JSON.stringify(favs));
      e.target.closest('.col-12').remove();

      if (favs.length === 0) {
        container.innerHTML = `<p class="text-center">Você não tem receitas favoritas ainda.</p>`;
      }
    });
  });
});
