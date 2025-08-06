document.getElementById('forma').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const novoUsuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        // Verifica se o e-mail já existe
        const verificaEmail = await fetch(`http://localhost:3000/usuarios?email=${novoUsuario.email}`);
        const usuarios = await verificaEmail.json();
        
        if (usuarios.length > 0) {
            alert('Este e-mail já está cadastrado!');
            return;
        }

        // Cadastra o novo usuário
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login_usuario.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar');
    }
});