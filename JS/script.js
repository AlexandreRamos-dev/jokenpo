// Variáveis globais
    let displayJogador = document.querySelector('#displayJogador')
    let displayPc = document.querySelector('#displayPc')
    let placarJogador = document.querySelector('#placarJogador')
    let placarpc = document.querySelector('#placarpc')
    let pontosJogador = 0
    let pontospc = 0
    const opcao = ['pedra', 'papel', 'tesoura']
    const musicaBtn = document.querySelector('#musicaBtn')
    const musica = document.querySelector('#musicaFundo')
    let musicaTocando = false

// Botões de escolha
    const btnPedra = document.querySelector('#btnPedra')
    const btnPapel = document.querySelector('#btnPapel')
    const btnTesoura = document.querySelector('#btnTesoura')
    const btnReiniciar = document.querySelector('#btnReiniciar')

// Escolha dos botões e suas opções
    btnPedra.addEventListener('click',() => jogar('pedra'))
    btnPapel.addEventListener('click', () => jogar('papel'))
    btnTesoura.addEventListener('click', () => jogar('tesoura'))
    btnReiniciar.addEventListener('click', reiniciar)

    musicaBtn.addEventListener('click', iniciarMusica)

// Função para jogar
    function jogar(escolhaJogador) {

        let escolhapc = opcao[Math.floor(Math.random() * opcao.length)]

        eventosImg(escolhaJogador, escolhapc)
        regras(escolhaJogador, escolhapc)

}

// Função para adicionar a imagem
    function eventosImg(escolhaJogador, escolhapc) {   
        displayJogador.innerHTML = ''
        displayPc.innerHTML = '' // Limpar conteúdo

// Variáveis de img
        let imgJogador = document.createElement('img')
        let imgPc = document.createElement('img')
        imgJogador.classList.add("imgJogador")
        imgPc.classList.add("imgPc")

    // Escolha de img do jogador
        if(escolhaJogador == 'pedra') {
            imgJogador.setAttribute('src', 'imagens/pedra.png')
            displayJogador.appendChild(imgJogador)
        } else if(escolhaJogador == 'papel') {
            imgJogador.setAttribute('src', 'imagens/papel.png')
            displayJogador.appendChild(imgJogador)
        } else {
            imgJogador.setAttribute('src', 'imagens/tesoura.png')
            displayJogador.appendChild(imgJogador)
        }

    // Escolha de img do pc
        if(escolhapc == 'pedra') {
            imgPc.setAttribute('src', 'imagens/pedra.png')
            displayPc.appendChild(imgPc)
        } else if(escolhapc == 'papel') {
            imgPc.setAttribute('src', 'imagens/papel.png')
            displayPc.appendChild(imgPc)
        } else {
            imgPc.setAttribute('src', 'imagens/tesoura.png')
            displayPc.appendChild(imgPc)
        }
    }

// Função para regras do jogo
    function regras(escolhaJogador, escolhapc) {
        let textoRodada = document.querySelector('#textoRodada')
        let resultado = ''

        if(escolhaJogador == escolhapc) {
            textoRodada.textContent = 'Deu empate!'
            textoRodada.style.color = '#00d4ff'
            resultado = 0;
        } else if(
            escolhaJogador == 'pedra' && escolhapc == 'papel' ||
            escolhaJogador == 'papel' && escolhapc == 'tesoura' ||
            escolhaJogador == 'tesoura' && escolhapc == 'pedra'
        ) {
            textoRodada.textContent = 'Você perdeu!'
            textoRodada.style.color = '#ff006e'
            resultado = 2;
        } else {
            textoRodada.textContent = 'Você Venceu!'
            textoRodada.style.color = '#9dd341'
            resultado =  1;
        }
        ContarPontos(resultado)
    }

// Contagem de pontos da rodada
    function ContarPontos(resultado) {
        let resultadoFinal = document.querySelector('#resultadoFinal')

        if(resultado == 1) {
            pontosJogador++
        }

        if(resultado == 2) {
            pontospc++
        }

        if(pontosJogador == 3) {
            resultadoFinal.textContent = 'Você ganhou o jogo!'
            btnPedra.disabled = true
            btnPapel.disabled = true
            btnTesoura.disabled = true
            btnReiniciar.disabled = false
        }

        if(pontospc == 3) {
            resultadoFinal.textContent = 'Você perdeu o jogo!'
            resultadoFinal.style.color = '#ff006e'
            btnPedra.disabled = true
            btnPapel.disabled = true
            btnTesoura.disabled = true
            btnReiniciar.disabled = false
        }
        AtualizaPlacar()

    }

// Atualiza a pontuação do placar
    function AtualizaPlacar() {
        let pontosjogadorplacar = document.querySelectorAll('#placarJogador .pontos')
        let pontospcplacar = document.querySelectorAll('#placarpc .pontos')

        for(let i = 0;i < pontosjogadorplacar.length;i++) {
            pontosjogadorplacar[i].classList.remove('active')
        }

        for(let i =0;i < pontospcplacar.length;i++) {
            pontospcplacar[i].classList.remove('active')
        }

        for(let i = 0;i < pontosJogador;i++) {
            pontosjogadorplacar[i].classList.add('active')
        }

        for(let i = 0;i < pontospc; i++) {
            pontospcplacar[i].classList.add('active')
        }

    }

// Reiniciar partida
    function reiniciar() {
        let textoRodada = document.querySelector('#textoRodada')
        let resultadoFinal = document.querySelector('#resultadoFinal')
        textoRodada.textContent = 'Vs'
        textoRodada.style.color = '#9dd341'
        // Limpar display
        displayJogador.innerHTML = ''
        displayPc.innerHTML = ''

        // Limpar pontos
            pontosJogador = 0
            pontospc = 0

        // Resetar resultados
            resultadoFinal.textContent = 'Resultado da partida!'
            resultadoFinal.style.color = '#9dd341'
            btnPedra.disabled = false
            btnPapel.disabled = false
            btnTesoura.disabled = false
            btnReiniciar.disabled = true
            musica.currentTime = 0

            AtualizaPlacar()
    }

    function iniciarMusica() {
        if(!musicaTocando) {
            musicaBtn.textContent = 'Pause ⏸️'
            musica.play()
            musica.volume = 0.3
            musicaTocando = true
        } else {
            musicaBtn.textContent = 'Play ▶️'
            musica.pause()
            musicaTocando = false
        }
    }