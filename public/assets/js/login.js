document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn_login');

  if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/usuarios?email=' + encodeURIComponent(email));
        const usuarios = await response.json();

        if (usuarios.length > 0 && usuarios[0].senha === senha) {
          sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarios[0]));
          alert('Login realizado com sucesso!');
          window.location.href = 'index.html'; // Vai para a página principal
        } else {
          alert('E-mail ou senha incorretos!');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login');
      }
    });
  }

  // Verifica login nas páginas que não são a de login
  const nomePagina = window.location.pathname.split('/').pop();
  if (nomePagina !== 'login_usuario.html') {
    verificarLogin();
  }
});

// Função para verificar se o usuário está logado
function verificarLogin() {
  const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
  if (!usuario) {
    // Não está logado, volta para a página de login
    window.location.href = 'login_usuario.html';
  } else {
    // Está logado, pode mostrar alguma informação se quiser
    console.log('Usuário logado:', usuario.nome);
  }
}

// LOGOUT
const btnLogout = document.getElementById('btn_logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      logout();
    });
  }
function logout() {
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = 'login_usuario.html';
}
