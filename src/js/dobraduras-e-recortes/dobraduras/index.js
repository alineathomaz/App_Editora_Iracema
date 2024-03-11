const selecaoDobraduras = document.querySelectorAll(".selecao-dobradura .dobraduras a")
const voltar = document.getElementById('voltar')
const passos = {
    cachorro: document.querySelectorAll('#cachorro .passos .passo'),
    gato: document.querySelectorAll('#gato .passos .passo'),
    flor: document.querySelectorAll('#flor .passos .passo'),
    aviao: document.querySelectorAll('#aviao .passos .passo'),
    barco: document.querySelectorAll('#barco .passos .passo')
}

console.log(passos)

const buttonAvancar = {
    cachorro: document.querySelector('#cachorro .btn-avancar'),
    gato: document.querySelector('#gato .btn-avancar'),
    flor: document.querySelector('#flor .btn-avancar')
}

let dobraduraSelecionada = ''
let currentPosition = 0;

selecaoDobraduras.forEach(dobradura => {
    dobradura.addEventListener('click', () => {
        dobraduraSelecionada = dobradura.name
        document.getElementById('selecao-dobradura').classList.toggle('hidden')

        document.getElementById(dobradura.name).classList.toggle('hidden')
    })
})

const btnsAvancar = document.querySelectorAll('.dobradura .btn-avancar')

//função para que os itens aparecendo na tela avancem.

btnsAvancar.forEach(btnAvancar => {
    btnAvancar.addEventListener('click', () => {
        if (currentPosition === passos[dobraduraSelecionada].length - 1) {
            const parabens = document.getElementById('parabens')
            const navegacao = document.getElementById('navegacao')

            parabens.classList.toggle('hidden')
            navegacao.classList.toggle('concluido')

            return
        }

        console.log(currentPosition)
        if (currentPosition % 2 === 0 && currentPosition < passos[dobraduraSelecionada].length - 1) {
            mudaVisibilidade(currentPosition + 1)
            if (currentPosition < passos[dobraduraSelecionada].length - 1) {
                currentPosition++
            }
        } else if (currentPosition % 2 === 1 && currentPosition < passos[dobraduraSelecionada].length - 1) {
            mudaVisibilidade(currentPosition - 1)
            mudaVisibilidade(currentPosition)
            mudaVisibilidade(currentPosition + 1)
            if (currentPosition < passos[dobraduraSelecionada].length) {
                currentPosition++
            }
        }
    })
})

//função para que mude os itens que estão aparecendo na tela

function mudaVisibilidade(currentPosition) {
    if (passos[dobraduraSelecionada][currentPosition].classList.contains('pronto')) {
        if (dobraduraSelecionada === 'cachorro' || dobraduraSelecionada === 'gato') {
            buttonAvancar[dobraduraSelecionada].classList.add('pronto')
        } else if (dobraduraSelecionada === 'flor') {
            buttonAvancar[dobraduraSelecionada].classList.add('pronto-flor')
        }
    }
    passos[dobraduraSelecionada][currentPosition].classList.toggle('hidden')
}

//Função para que o botão de voltar não volte para a página anterior caso algum dos animais esteja selecinado.

voltar.addEventListener('click', event => {
    if (dobraduraSelecionada !== '') {
        event.preventDefault()

        passos[dobraduraSelecionada].forEach(passo => {
            if (!passo.classList.contains('hidden')) {
                passo.classList.toggle('hidden')
            }
        })

        passos[dobraduraSelecionada][0].classList.toggle('hidden')

        if (dobraduraSelecionada === 'cachorro' || dobraduraSelecionada === 'gato') {
            buttonAvancar[dobraduraSelecionada].classList.remove('pronto')
        } else if (dobraduraSelecionada === 'flor') {
            buttonAvancar[dobraduraSelecionada].classList.remove('pronto-flor')
        }

        const dobradura = document.getElementById(dobraduraSelecionada)
        const selecaoDobradura = document.getElementById('selecao-dobradura')
        const parabens = document.getElementById('parabens')
        const navegacao = document.getElementById('navegacao')

        parabens.classList.toggle('hidden')
        navegacao.classList.toggle('concluido')
        dobradura.classList.toggle('hidden')
        selecaoDobradura.classList.toggle('hidden')

        dobraduraSelecionada = ''
        currentPosition = 0
    }
})