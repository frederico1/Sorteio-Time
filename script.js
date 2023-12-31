var jogadores = []
var times = []

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

  // Expressão regular para validar o nome do jogador
  var nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/

  if (jogador !== '') {
    if (nomeRegex.test(jogador)) {
      if (jogadores.length < 15) {
        jogadores.push(jogador)
        jogadorInput.value = ''
        exibirJogadores()
        salvarJogadores()
      } else {
        alert('O número máximo de jogadores é 15.')
      }
    } else {
      alert('Não adicionar números e caracteres especiais ao nome do jogador.')
    }
  }
}

// Exibir jogadores
function exibirJogadores() {
  var jogadoresList = document.getElementById('jogadores-list')
  jogadoresList.innerHTML = ''

  for (var i = 0; i < jogadores.length; i++) {
    var jogadorItem = document.createElement('li')
    jogadorItem.textContent = jogadores[i]

    var removerBotao = document.createElement('button')
    removerBotao.textContent = 'X'
    removerBotao.className = 'remover-button'
    removerBotao.dataset.index = i
    removerBotao.addEventListener('click', function () {
      var index = parseInt(this.dataset.index)
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
  times = []
  exibirTimes()
  salvarJogadores()
  salvarTimes()
}

// Salvar jogadores no Local Storage
function salvarJogadores() {
  localStorage.setItem('jogadores', JSON.stringify(jogadores))
}

// Carregar times do Local Storage, se disponível
function carregarTimes() {
  var timesSalvos = localStorage.getItem('times')
  if (timesSalvos) {
    times = JSON.parse(timesSalvos)
    exibirTimes()
  }
}

// Salvar times no Local Storage
function salvarTimes() {
  localStorage.setItem('times', JSON.stringify(times))
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

  times = []
  var numTimes = Math.min(3, Math.ceil(jogadoresSorteados.length / 5))

  for (var i = 0; i < numTimes; i++) {
    var startIndex = i * 5
    var endIndex = Math.min(startIndex + 5, jogadoresSorteados.length)
    var time = jogadoresSorteados.slice(startIndex, endIndex)
    times.push(time)
  }

  exibirTimes()
  salvarTimes()
}

// Exibir times
function exibirTimes() {
  var timesDiv = document.getElementById('times')
  timesDiv.innerHTML = ''

  for (var i = 0; i < times.length; i++) {
    var time = times[i]

    var timeDiv = document.createElement('div')
    timeDiv.className = 'time'

    var tituloTime = document.createElement('h3')
    tituloTime.textContent = 'Time ' + (i + 1)
    timeDiv.appendChild(tituloTime)

    for (var j = 0; j < time.length; j++) {
      var jogador = document.createElement('p')
      jogador.textContent = time[j]
      timeDiv.appendChild(jogador)
    }

    timesDiv.appendChild(timeDiv)
  }
}

// Evento de carga da página
window.addEventListener('load', function () {
  carregarJogadores()
  carregarTimes()
})

// Remover jogador individual
function removerJogador(event) {
  var jogadorItem = event.target.parentNode
  var index = Array.from(jogadorItem.parentNode.children).indexOf(jogadorItem)
  jogadores.splice(index, 1)
  exibirJogadores()
  salvarJogadores()
}

// Evento de clique nos botões de remoção (X)
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remover-button')) {
    event.stopPropagation() // Impede a propagação do evento de clique para evitar a remoção múltipla
    removerJogador(event)
  }
})

// COMPARTILHAR TIMES
document
  .getElementById('compartilhar-button')
  .addEventListener('click', function () {
    var timesDiv = document.getElementById('times')
    var timesText = ''

    // Concatene o texto dos times sorteados
    for (var i = 0; i < timesDiv.children.length; i++) {
      var time = timesDiv.children[i]
      var tituloTime = time.querySelector('h3').textContent
      var jogadores = Array.from(time.querySelectorAll('p')).map(function (
        jogador
      ) {
        return jogador.textContent
      })

      timesText += tituloTime + ': ' + jogadores.join(', ') + '\n'
    }

    // Compartilhe o texto usando a API do navegador
    if (navigator.share) {
      navigator
        .share({
          title: 'Times Sorteados',
          text: timesText
        })
        .then(function () {
          console.log('Times compartilhados com sucesso.')
        })
        .catch(function (error) {
          console.error('Erro ao compartilhar os times:', error)
        })
    } else {
      console.log('API de compartilhamento não suportada pelo navegador.')
    }
  })

// Sortear confronto inicial
function sortearConfronto() {
  var numTimes = Math.min(3, Math.ceil(jogadoresSorteados.length / 5))
  var indiceConfronto = Math.floor(Math.random() * numTimes)
  return indiceConfronto
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
      jogador.textContent = jogadoresSorteados[j]
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
