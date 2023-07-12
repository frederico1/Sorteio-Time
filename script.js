var jogadores = []

function adicionarJogador() {
  var jogadorInput = document.getElementById('player-input')
  var jogador = jogadorInput.value.trim()

  if (jogador !== '') {
    jogadores.push(jogador)
    jogadorInput.value = ''
    exibirJogador(jogador, jogadores.length)
  }
}

function exibirJogador(jogador, numJogador) {
  var jogadoresList = document.getElementById('jogadores-list')
  var jogadorItem = document.createElement('li')
  jogadorItem.textContent = numJogador + '. ' + jogador
  jogadoresList.appendChild(jogadorItem)
}

function exibirModal() {
  var modal = document.getElementById('modal')
  modal.style.display = 'block'
}

function fecharModal() {
  var modal = document.getElementById('modal')
  modal.style.display = 'none'
}

function sortearTimes() {
  if (jogadores.length === 0) {
    alert('Por favor, insira pelo menos um jogador antes de sortear os times.')
    return
  }

  // Embaralhar a lista de jogadores
  jogadores.sort(function () {
    return 0.5 - Math.random()
  })

  var timesDiv = document.getElementById('times')
  timesDiv.innerHTML = '' // Limpar os times anteriores

  var numTimes = Math.ceil(jogadores.length / 5)

  for (var i = 0; i < numTimes; i++) {
    var time = document.createElement('div')
    time.className = 'time'
    time.innerHTML = '<h3>Time ' + (i + 1) + '</h3>'

    var startIndex = i * 5
    var endIndex = Math.min(startIndex + 5, jogadores.length)

    for (var j = startIndex; j < endIndex; j++) {
      var jogador = document.createElement('p')
      jogador.innerHTML = jogadores[j]
      time.appendChild(jogador)
    }

    timesDiv.appendChild(time)
  }
}

function limparTimes() {
  jogadores = []
  var jogadoresList = document.getElementById('jogadores-list')
  jogadoresList.innerHTML = ''

  var timesDiv = document.getElementById('times')
  timesDiv.innerHTML = ''
}
