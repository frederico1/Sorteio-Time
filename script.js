var jogadores = []

// Carregar jogadores do Local Storage, se disponível
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
      jogadores.push(jogador)
      jogadorInput.value = ''
      exibirJogadores()
      salvarJogadores()
    } else {
      alert('O número máximo de jogadores é 15.')
    }
  }
}

// Exibir jogadores
function exibirJogadores() {
  var jogadoresList = document.getElementById('jogadores-list')
  jogadoresList.innerHTML = ''

  for (var i = 0; i < jogadores.length; i++) {
    var jogadorItem = document.createElement('li')
    jogadorItem.textContent = i + 1 + '. ' + jogadores[i]

    var removerBotao = document.createElement('button')
    removerBotao.innerHTML = ''
    removerBotao.className = 'remover-button'
    removerBotao.setAttribute('data-index', i) // Atribui o índice do jogador ao atributo data-index
    removerBotao.addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-index')) // Obtém o índice do jogador do atributo data-index
      removerJogador(index)
    })

    jogadorItem.appendChild(removerBotao)

    jogadoresList.appendChild(jogadorItem)
  }
}

// Remover jogador individual
function removerJogador(index) {
  jogadores.splice(index, 1)
  exibirJogadores()
  salvarJogadores()
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
    time.innerHTML = '<h3>Time ' + (i + 1) + '</h3>'

    var startIndex = i * 5
    var endIndex = Math.min(startIndex + 5, jogadoresSorteados.length)

    for (var j = startIndex; j < endIndex; j++) {
      var jogador = document.createElement('p')
      jogador.innerHTML = jogadoresSorteados[j]
      time.appendChild(jogador)
    }

    timesDiv.appendChild(time)
  }
}

// Evento de carga da página
window.addEventListener('load', function () {
  carregarJogadores()
})

// Remover jogador individual
function removerJogador(jogadorItem) {
  var index = Array.from(jogadorItem.parentNode.children).indexOf(jogadorItem)
  jogadores.splice(index, 1)
  exibirJogadores()
  salvarJogadores()
}
// Verificar se o dispositivo é um celular ou tablet
function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  )
}

// Adicionar jogador
function adicionarJogador(event) {
  if (isMobileDevice() && (event.key === 'Enter' || event.keyCode === 13)) {
    var jogadorInput = document.getElementById('player-input')
    var jogador = jogadorInput.value.trim()

    if (jogador !== '') {
      if (jogadores.length < 15) {
        jogadores.push(jogador)
        jogadorInput.value = ''
        exibirJogadores()
        salvarJogadores()
      } else {
        alert('O número máximo de jogadores é 15.')
      }
    }
  }
}

// Verificar se o dispositivo é um celular ou tablet antes de adicionar o evento de pressionar tecla
if (isMobileDevice()) {
  document
    .getElementById('player-input')
    .addEventListener('keypress', adicionarJogador)
}
