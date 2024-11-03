// Declaração dos arrays
const salas = [
  { nome: "Sala 1", capacidade: 100, localizacao: "1º Andar", disponivel: 100 },
  { nome: "Sala 2", capacidade: 80, localizacao: "2º Andar", disponivel: 80 }
];

const filmes = [
  { titulo: "Sem Limites", genero: "Ação", duracao: 120 }, // Dados do primeiro filme
  { titulo: "Vai que Cola 2", genero: "Comédia", duracao: 90 }, // Dados do segundo filme
  { titulo: "Até o Último Homem", genero: "Drama", duracao: 140 }, // Dados do terceiro filme
  { titulo: "vingadores", genero: "Ficção Científica", duracao: 169 }, // Filme adicional
  { titulo: "Inception", genero: "Ação", duracao: 148 }, // Filme adicional
  { titulo: "O Senhor dos Anéis: A Sociedade do Anel", genero: "Fantasia", duracao: 178 } // Filme adicional
];

const sessoes = [
  { sala: salas[0], filme: filmes[0], dataHora: "2024-10-31 20:00" },
  { sala: salas[1], filme: filmes[1], dataHora: "2024-10-31 18:30" },
  { sala: salas[0], filme: filmes[2], dataHora: "2024-11-01 19:00" }, // Sessão do terceiro filme
  { sala: salas[1], filme: filmes[3], dataHora: "2024-11-01 21:00" }, // Sessão do quarto filme
  { sala: salas[0], filme: filmes[4], dataHora: "2024-11-02 17:00" }, // Sessão do quinto filme
  { sala: salas[1], filme: filmes[5], dataHora: "2024-11-02 20:00" } // Sessão do sexto filme
];

// Função para carregar dados
function carregarDados() {
    const salasSalvas = JSON.parse(localStorage.getItem('salas')) || [];
    const filmesSalvos = JSON.parse(localStorage.getItem('filmes')) || [];
    const sessoesSalvas = JSON.parse(localStorage.getItem('sessoes')) || [];

    salas.push(...salasSalvas);
    filmes.push(...filmesSalvos);
    sessoes.push(...sessoesSalvas);

    atualizarListaSalas();
    atualizarListaFilmes();
    atualizarListaSessoes();
}

// Chamar a função carregarDados quando a página for carregada
window.onload = carregarDados;

document.addEventListener('DOMContentLoaded', function () {
  atualizarSelectSessaoo();
});
















// Inicializa o armazenamento de usuários no localStorage se não existir
if (!localStorage.getItem('users')) {
  const defaultUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "employee", password: "employee123", role: "employee" },
    { username: "user", password: "user123", role: "user" }
  ];
  localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Inicializa a lista de usuários logados se não existir
if (!localStorage.getItem('loggedUsers')) {
  localStorage.setItem('loggedUsers', JSON.stringify([]));
}

// Função para obter usuários do localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para salvar usuários no localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Função para obter usuários logados do localStorage
function getLoggedUsers() {
  return JSON.parse(localStorage.getItem('loggedUsers')) || [];
}

// Função para salvar usuários logados no localStorage
function saveLoggedUsers(loggedUsers) {
  localStorage.setItem('loggedUsers', JSON.stringify(loggedUsers));
}

// Função para cadastrar novo usuário
function register(username, password, role) {
  const users = getUsers();
  const userExists = users.some(u => u.username === username);
  if (userExists) {
    displayMessage("Usuário já existe. Escolha outro nome de usuário.", "error");
  } else {
    users.push({ username, password, role });
    saveUsers(users);
    displayMessage("Cadastro realizado com sucesso!", "success");
    document.getElementById('registerForm').reset();
    window.location.href = "vendaDeIngresos.html"; // Página principal para outros usuários

    
  }
}

// Função para realizar login
function login(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    if (user.role === "admin") {
      window.location.href = "index.html"; // Página para administradores
      alert("admin")
  } else {
      window.location.href = "vendaDeIngresos.html"; // Página principal para outros usuários
      alert("Seja Bem Vindo!")
  }
  
    
    // Adicionar usuário à lista de logados
    let loggedUsers = getLoggedUsers();
    
    // Evitar duplicatas na lista de logados
    if (!loggedUsers.some(u => u.username === user.username)) {
      loggedUsers.push(user);
      saveLoggedUsers(loggedUsers);
      displayLoggedUsers();
    } else {
      displayMessage("Usuário já está logado.", "info");
    }

    return user;
  } else {
    displayMessage("Login falhou! Verifique suas credenciais.", "error");
    return null;
  }
}

// Função para exibir mensagens ao usuário
function displayMessage(msg, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = msg;
  messageDiv.className = type;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = '';
  }, 5000);
}

// Função para exibir a lista de usuários logados
function displayLoggedUsers() {
  const loggedUsers = getLoggedUsers();
  const loggedUsersDiv = document.getElementById('loggedUsersList');
  
  // Limpar a lista antes de atualizá-la
  loggedUsersDiv.innerHTML = "";

  if (loggedUsers.length > 0) {
    const title = document.createElement('h2');
    title.textContent = "Usuários Logados:";
    loggedUsersDiv.appendChild(title);

    loggedUsers.forEach(user => {
      const userItem = document.createElement('div');
      userItem.textContent = `Usuário: ${user.username} | Função: ${user.role}`;
      loggedUsersDiv.appendChild(userItem);
    });
  } else {
    loggedUsersDiv.innerHTML = "<p>Nenhum usuário está logado.</p>";
  }
}


// Event Listeners para formulários
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const role = document.getElementById('regRole').value;
  
  if (username && password && role) {
    register(username, password, role);
  } else {
    displayMessage("Por favor, preencha todos os campos de cadastro.", "error");
  }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  
  if (username && password) {
    login(username, password);
  } else {
    displayMessage("Por favor, preencha todos os campos de login.", "error");
  }
});


// Exibir usuários logados ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  displayLoggedUsers();
});






























// Função para salvar dados no localStorage
function salvarNoLocalStorage() {
  localStorage.setItem('salas', JSON.stringify(salas));
  localStorage.setItem('filmes', JSON.stringify(filmes));
  localStorage.setItem('sessoes', JSON.stringify(sessoes));
}


// Função para carregar dados do localStorage
function carregarDoLocalStorage() {
  const salasSalvas = JSON.parse(localStorage.getItem('salas'));
  const filmesSalvos = JSON.parse(localStorage.getItem('filmes'));
  const sessoesSalvas = JSON.parse(localStorage.getItem('sessoes'));

  if (salasSalvas) salas.push(...salasSalvas);
  if (filmesSalvos) filmes.push(...filmesSalvos);
  if (sessoesSalvas) sessoes.push(...sessoesSalvas);
}




// Atualizar as funções para salvar os dados no localStorage
document.getElementById('form-salas').addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nomeSala').value;
  const capacidade = parseInt(document.getElementById('capacidadeSala').value);
  const localizacao = document.getElementById('localizacaoSala').value;
  salas.push({ nome, capacidade, localizacao, disponivel: capacidade });
  atualizarListaSalas();
  salvarNoLocalStorage(); // Salva as salas no localStorage
  this.reset();
});
document.getElementById('form-filmes').addEventListener('submit', function(event) {
  event.preventDefault();
  const titulo = document.getElementById('tituloFilme').value;
  const genero = document.getElementById('generoFilme').value;
  const duracao = parseInt(document.getElementById('duracaoFilme').value);
  filmes.push({ titulo, genero, duracao });
  atualizarListaFilmes();
  salvarNoLocalStorage(); // Salva as salas no localStorage
  this.reset();
});

document.getElementById('form-sessoes').addEventListener('submit', function(event) {
  event.preventDefault();
  const salaIndex = document.getElementById('salaSelect').value;
  const filmeIndex = document.getElementById('filmeSelect').value;
  const dataHora = document.getElementById('dataHora').value;
  
  const novaSessao = { sala: salas[salaIndex], filme: filmes[filmeIndex], dataHora };
  sessoes.push(novaSessao);
  atualizarListaSessoes();
  salvarNoLocalStorage(); // Salva as salas no localStorage
  this.reset();
});







































// Atualiza as listas
function atualizarListaSalas() {
  const lista = document.getElementById('listaSalas');
  lista.innerHTML = '';
  salas.forEach((sala) => {
      const li = document.createElement('li');
      li.textContent = `${sala.nome} - Capacidade: ${sala.capacidade} - Localização: ${sala.localizacao} - Disponível: ${sala.disponivel}`;
      lista.appendChild(li);
      atualizarSelectSala();
  });
}



function atualizarListaFilmes() {
  const lista = document.getElementById('listaFilmes');
  lista.innerHTML = '';
  filmes.forEach((filme) => {
      const li = document.createElement('li');
      li.textContent = `${filme.titulo} - Gênero: ${filme.genero} - Duração: ${filme.duracao} min`;
      lista.appendChild(li);
      atualizarSelectFilme();
  });
}



function atualizarListaSessoes() {
  const lista = document.getElementById('listaSessoes');
  lista.innerHTML = '';
  sessoes.forEach((sessao) => {
      const li = document.createElement('li');
      li.textContent = `Sessão de "${sessao.filme.titulo}" na sala ${sessao.sala.nome} às ${sessao.dataHora}`;
      lista.appendChild(li);
  });
}



function atualizarSelectSala() {
  const select = document.getElementById('salaSelect');
  select.innerHTML = '';
  salas.forEach((sala, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = sala.nome;
      select.appendChild(option);
  });
}



function atualizarSelectFilme() {
  const select = document.getElementById('filmeSelect');
  select.innerHTML = '';
  filmes.forEach((filme, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = filme.titulo;
      select.appendChild(option);
  });
}



function atualizarSelectSessao() {
const select = document.getElementById('sessaoSelect');
select.innerHTML = '';
sessoes.forEach((sessao, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Sessão de "${sessao.filme.titulo}" na sala ${sessao.sala.nome}`;
    select.appendChild(option);
});
}















 



