var jogadores = []

// Carregar jogadores do Local Storage
function carregarJogadores() {
  var jogadoresSalvos = localStorage.getItem('jogadores')
  if (jogadoresSalvos) {
    jogadores = JSON.parse(jogadoresSalvos)
    exibirJogadores()
  }
}

// Adicionar jogador
function adicionarJogador() {
  var jogadorInput = document.getElementById('player-input')
  var jogador = jogadorInput.value.trim()

  if (jogador !== '') {
    if (jogadores.length < 15) {
      var jogadorId = Date.now().toString() // Gerar um ID único para o jogador
      var jogadorObj = { id: jogadorId, nome: jogador } // Criar um objeto jogador com ID e nome
      jogadores.push(jogadorObj) // Adicionar o objeto jogador à lista

      jogadorInput.value = ''
      exibirJogadores()
      salvarJogadores()
    } else {
      alert('O número máximo de jogadores é 15.')
    }
  }
}

// Remover jogador individual
function removerJogador(jogadorId) {
  jogadores = jogadores.filter(function (jogador) {
    return jogador.id !== jogadorId
  })

  exibirJogadores()
  salvarJogadores()
}

// Exibir jogadores
function exibirJogadores() {
  var jogadoresList = document.getElementById('jogadores-list')
  jogadoresList.innerHTML = ''

  for (var i = 0; i < jogadores.length; i++) {
    var jogadorItem = document.createElement('li')
    jogadorItem.textContent = jogadores[i].nome

    var removerBotao = document.createElement('button')
    removerBotao.textContent = 'X'
    removerBotao.className = 'remover-button'
    removerBotao.setAttribute('data-jogador-id', jogadores[i].id) // Atribuir o ID do jogador como atributo

    removerBotao.addEventListener('click', function () {
      var jogadorId = this.getAttribute('data-jogador-id')
      removerJogador(jogadorId)
    })

    jogadorItem.appendChild(removerBotao)
    jogadoresList.appendChild(jogadorItem)
  }
}

// Remover todos os jogadores e times
function limparJogadoresETimes() {
  jogadores = []
  exibirJogadores()
  var timesDiv = document.getElementById('times')
  timesDiv.innerHTML = ''
  salvarJogadores()
}

// Salvar jogadores no Local Storage
function salvarJogadores() {
  localStorage.setItem('jogadores', JSON.stringify(jogadores))
}

// Sortear times
function sortearTimes() {
  if (jogadores.length === 0) {
    alert('Por favor, insira pelo menos um jogador antes de sortear os times.')
    return
  }

  var jogadoresSorteados = jogadores.slice(0) // Faz uma cópia do array de jogadores

  // Embaralhar a lista de jogadores
  jogadoresSorteados.sort(function () {
    return 0.5 - Math.random()
  })

  var timesDiv = document.getElementById('times')
  timesDiv.innerHTML = '' // Limpar os times anteriores

  var numTimes = Math.min(3, Math.ceil(jogadoresSorteados.length / 5))

  for (var i = 0; i < numTimes; i++) {
    var time = document.createElement('div')
    time.className = 'time'

    var tituloTime = document.createElement('h3')
    tituloTime.textContent = 'Time ' + (i + 1)
    time.appendChild(tituloTime)

    var startIndex = i * 5
    var endIndex = Math.min(startIndex + 5, jogadoresSorteados.length)

    for (var j = startIndex; j < endIndex; j++) {
      var jogador = document.createElement('p')
      jogador.textContent = jogadoresSorteados[j].nome
      time.appendChild(jogador)
    }

    timesDiv.appendChild(time)
  }

  // Aplicar formatação ao título dos três primeiros times
  var titulosTimes = document.querySelectorAll(
    '#times .time:nth-child(-n+3) h3'
  )
  titulosTimes.forEach(function (tituloTime) {
    tituloTime.style.fontWeight = '600'
  })
}

// Evento de carga da página
window.addEventListener('load', function () {
  carregarJogadores()
})
