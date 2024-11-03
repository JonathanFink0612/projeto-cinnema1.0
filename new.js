// Função para carregar dados do localStorage
function carregarDados() {
  // Carrega dados do localStorage ou inicializa como array vazio se não existirem
  let salas = JSON.parse(localStorage.getItem('salas')) || [];
  let filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

  // Dados padrão se o localStorage estiver vazio
  if (salas.length === 0) {
    salas = [
      { nome: "Sala 1", capacidade: 100, localizacao: "1º Andar", disponivel: 100 },
      { nome: "Sala 2", capacidade: 80, localizacao: "2º Andar", disponivel: 80 }
    ];
  }
  
  if (filmes.length === 0) {
    filmes = [
      { titulo: "Sem Limites", genero: "Ação", duracao: 120 },
      { titulo: "Vai que Cola 2", genero: "Comédia", duracao: 90 },
      { titulo: "Até o Último Homem", genero: "Drama", duracao: 140 },
      { titulo: "Vingadores", genero: "Ficção Científica", duracao: 169 },
      { titulo: "Inception", genero: "Ação", duracao: 148 },
      { titulo: "O Senhor dos Anéis: A Sociedade do Anel", genero: "Fantasia", duracao: 178 }
    ];
  }

  if (sessoes.length === 0) {
    sessoes = [
      { sala: salas[0], filme: filmes[0], dataHora: "2024-10-31 20:00" },
      { sala: salas[1], filme: filmes[1], dataHora: "2024-10-31 18:30" },
      { sala: salas[0], filme: filmes[2], dataHora: "2024-11-01 19:00" },
      { sala: salas[1], filme: filmes[3], dataHora: "2024-11-01 21:00" },
      { sala: salas[0], filme: filmes[4], dataHora: "2024-11-02 17:00" },
      { sala: salas[1], filme: filmes[5], dataHora: "2024-11-02 20:00" }
    ];
  }

  // Salva os dados no localStorage, caso estejam usando os valores padrão
  localStorage.setItem('salas', JSON.stringify(salas));
  localStorage.setItem('filmes', JSON.stringify(filmes));
  localStorage.setItem('sessoes', JSON.stringify(sessoes));

  // Chama a função para atualizar o seletor de sessões
  atualizarSelectSessao(sessoes);
}
  
// Função para atualizar o <select> com as sessões
function atualizarSelectSessao(sessoes) {
    const select = document.getElementById('sessaoSelect');
    const capacidadeContainer = document.getElementById('capacidadeContainer');
    select.innerHTML = ''; // Limpa as opções antigas
    capacidadeContainer.innerHTML = ''; // Limpa as informações de capacidade

    sessoes.forEach((sessao, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Sessão de "${sessao.filme.titulo}" na sala ${sessao.sala.nome} às ${sessao.dataHora}`;
        select.appendChild(option);
    });

    // Exibe a capacidade total e vagas disponíveis da primeira sessão como exemplo
    if (sessoes.length > 0) {
        const primeiraSessao = sessoes[0];
        capacidadeContainer.innerHTML = `Capacidade total: ${primeiraSessao.sala.capacidade} | Vagas disponíveis: ${primeiraSessao.sala.disponivel}`;
    }

    // Adiciona um listener para mudar as informações de capacidade ao selecionar uma sessão diferente
    select.addEventListener('change', function() {
        const sessao = sessoes[select.value];
        capacidadeContainer.innerHTML = `Capacidade total: ${sessao.sala.capacidade} | Vagas disponíveis: ${sessao.sala.disponivel}`;
    });
}
  

// Preços dos ingressos
const PRECO_INTEIRA = 20.0;
const PRECO_MEIA = 10.0;

// Função para exibir mensagens de sucesso ou erro
function mostrarMensagem(msg, tipo) {
  const alertDiv = document.getElementById('alertMessage');
  alertDiv.textContent = msg;
  alertDiv.className = `alert ${tipo}`;
  alertDiv.style.display = 'block';
  alertDiv.style.opacity = '1';

  // Oculta a mensagem após 10 segundos
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    setTimeout(() => {
      alertDiv.style.display = 'none';
    }, 500);
  }, 10000);
}

// Função para processar a compra
function processarCompra(event) {
    event.preventDefault(); // Evita o reload da página

    const sessaoSelect = document.getElementById('sessaoSelect');
    const sessaoIndex = sessaoSelect.value;
    const sessoes = JSON.parse(localStorage.getItem('sessoes'));
    const sessao = sessoes[sessaoIndex]; // Acesse a sessão selecionada

    const quantidade = parseInt(document.getElementById('quantidadeIngressos').value);
    const tipoIngresso = document.getElementById('tipoIngresso').value;

    if (isNaN(quantidade) || quantidade <= 0) {
        mostrarMensagem('Por favor, insira uma quantidade válida.', 'error');
        return;
    }

    // Verifica se a quantidade solicitada não excede a capacidade disponível da sala
    if (quantidade > sessao.sala.disponivel) {
        mostrarMensagem(`A quantidade solicitada (${quantidade}) excede a capacidade disponível (${sessao.sala.disponivel}) da sala.`, 'error');
        return;
    }

    // Calcula o valor total com base no tipo de ingresso
    const valorUnitario = tipoIngresso === 'inteira' ? PRECO_INTEIRA : PRECO_MEIA;
    const valorTotal = valorUnitario * quantidade;

    // Atualiza a capacidade disponível da sala
    sessao.sala.disponivel -= quantidade; // Desconta a quantidade comprada
    localStorage.setItem('sessoes', JSON.stringify(sessoes)); // Salva as sessões atualizadas no localStorage

    // Exibe a mensagem de sucesso com o valor total
    mostrarMensagem(`Compra realizada com sucesso! Total: R$ ${valorTotal.toFixed(2)}`, 'success');

    // Atualiza a exibição da capacidade após a compra
    atualizarSelectSessao(sessoes);
}

// Adiciona o listener para o formulário de venda
document.getElementById('form-venda').addEventListener('submit', processarCompra);


  // Carrega os dados quando a página estiver pronta
  document.addEventListener('DOMContentLoaded', carregarDados);
  


  



















  
 