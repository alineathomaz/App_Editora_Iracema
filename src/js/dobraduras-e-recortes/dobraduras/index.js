const selecaoDobraduras = document.querySelectorAll(".selecao-dobradura .dobraduras a")
const passos = {
    cachorro: document.querySelectorAll('#cachorro .passos .passo'),
    gato: document.querySelectorAll('#gato .passos .passo'),
    flor: document.querySelectorAll('#flor .passos .passo'),
    aviao: document.querySelectorAll('#aviao .passos .passo'),
    barco: document.querySelectorAll('#barco .passos .passo')
}

let dobraduraSelecionada = ''
let currentPosition = 0

selecaoDobraduras.forEach(dobradura => {
    dobradura.addEventListener('click', () => {
        dobraduraSelecionada = dobradura.name
        document.getElementById('selecao-dobradura').classList.toggle('hidden')

        document.getElementById(dobradura.name).classList.toggle('hidden')
    })
})

const btnsAvancar = document.querySelectorAll('.dobradura #btn-avancar')

btnsAvancar.forEach(btnAvancar => {
    btnAvancar.addEventListener('click', () => {
        if(currentPosition === passos[dobraduraSelecionada].length) {
            return
        }

        if (currentPosition % 2 === 0 && currentPosition < passos[dobraduraSelecionada].length) {
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

function mudaVisibilidade(currentPosition) {
    passos[dobraduraSelecionada][currentPosition].classList.toggle('hidden')
}