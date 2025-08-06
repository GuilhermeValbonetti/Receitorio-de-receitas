const API_URL = "http://localhost:3000/receitas";

const form = document.getElementById("form-receita");
const tabela = document.getElementById("table-receitas");
var id_novo = 0;
// Carrega as receitas da API e mostra na tabela
async function carregarReceitas() {
  const resposta = await fetch(API_URL);
  const receitas = await resposta.json();

  tabela.innerHTML = "";

  for (let i = 0; i < receitas.length; i++) {
    const receita = receitas[i];

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${receita.id}</td>
      <td>${receita.titulo}</td>
      <td><img src="${receita.imagem}" width="60" /></td>
      <td>${receita.ingredientes}</td>
      <td>${receita.modoPreparo}</td>
      <td>${receita.categoria || ""}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarReceita(${receita.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirReceita(${receita.id})">Excluir</button>
      </td>
    `;
    id_novo = receita.id;
    tabela.appendChild(tr);
  }
}

// Cadastrar ou atualizar receita
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("inputId").value;

const receita = {
  id: id ? String(id) : String(parseInt(id_novo) + 1),
  titulo: document.getElementById("inputTitulo").value,
  imagem: document.getElementById("inputImagem").value,
  ingredientes: document.getElementById("inputIngredientes").value,
  modoPreparo: document.getElementById("inputModoPreparo").value,
  categoria: document.getElementById("inputCategoria").value
};

    // Atualizar
  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receita)
    });
  } else {
    // Cadastrar
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receita)
    });
  }

  form.reset();
  document.getElementById("inputId").value = "";
  carregarReceitas();
});

// Excluir receita
async function excluirReceita(id) {
  const confirmar = confirm("Deseja excluir essa receita?");
  if (confirmar) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    carregarReceitas();
  }
}

// Editar receita (preenche o formulário)
async function editarReceita(id) {
  const resposta = await fetch(`${API_URL}/${id}`);
  const receita = await resposta.json();

  document.getElementById("inputId").value = receita.id;
  document.getElementById("inputTitulo").value = receita.titulo;
  document.getElementById("inputImagem").value = receita.imagem;
  document.getElementById("inputIngredientes").value = receita.ingredientes;
  document.getElementById("inputModoPreparo").value = receita.modoPreparo;
  document.getElementById("inputCategoria").value = receita.categoria || "";
}

// Ao iniciar, carrega as receitas
carregarReceitas();
