const animais = document.querySelectorAll(".seletor-animais button");
const instrumentos = document.querySelectorAll(".instrumentos button");
const teclasPiano = document.querySelectorAll(".teclas button");
const setaDireita = document.getElementById("seta-direita")
const setaEsquerda = document.getElementById("seta-esquerda")

let indiceAtual = 0
let instrumentoSelecionado = 'teclado'
let animalAtual = ''
let notaAtual = ''

const audiosAnimais = {}
const audiosInstrumentos = {}

/* --- Carregamento dos audios dos animais e dos instrumentos no objeto audioAnimais para os animais e audiosInstrumentos para os instrumentos --- */

animais.forEach(animal => {
    audiosAnimais[animal.name] = new Audio(`../../../../src/sounds/piano/animals/${animal.name}.mp3`)
})

instrumentos.forEach(instrumento => {
    audiosInstrumentos[instrumento.name] = {
        do: new Audio(`../../../../src/sounds/piano/${instrumento.name}/do.mp3`),
        re: new Audio(`../../../../src/sounds/piano/${instrumento.name}/re.mp3`),
        mi: new Audio(`../../../../src/sounds/piano/${instrumento.name}/mi.mp3`),
        fa: new Audio(`../../../../src/sounds/piano/${instrumento.name}/fa.mp3`),
        sol: new Audio(`../../../../src/sounds/piano/${instrumento.name}/sol.mp3`),
        la: new Audio(`../../../../src/sounds/piano/${instrumento.name}/la.mp3`),
        si: new Audio(`../../../../src/sounds/piano/${instrumento.name}/si.mp3`),
    }
})

// função para mudar os animais que estão sendo mostrados na tela

function mudaAnimais(indiceAtual) {
    animais.forEach(animal => {
        if (!animal.classList.contains('hidden')) {
            animal.classList.add('hidden')
        }
    })

    for (let i = 0; i < 5; i++) {
        let indexador = i + indiceAtual
        animais[indexador].classList.remove('hidden')
    }
}

// função para mudar o instrumento que esta selecionado

function selecionaInstrumento(instrumento) {
    if (instrumento.classList.contains('selected')) {
        return
    }

    const elementoSelecionado = document.querySelector('.selected')

    if(notaAtual !== '') {
        stopCurrentNote(elementoSelecionado.name, notaAtual);
        notaAtual = ''
    }
    elementoSelecionado.classList.toggle('selected')
    let nomeInstrumento = elementoSelecionado.name
    elementoSelecionado.firstElementChild.src = `../../../../src/images/piano/buttons/instrumentos/${nomeInstrumento}.svg`

    instrumento.classList.toggle('selected')
    instrumento.firstElementChild.src = `../../../../src/images/piano/buttons/instrumentos/${instrumento.name}-ativo.svg`

    instrumentoSelecionado = instrumento.name
}

// funções para parar audios que estão sendo tocados

function stopAudioAnimal(animalName) {
    audiosAnimais[animalName].pause()
    audiosAnimais[animalName].currentTime = 0
}

function stopCurrentNote(instrumentoSelecionado, notaName) {
    audiosInstrumentos[instrumentoSelecionado][notaName].pause()
    audiosInstrumentos[instrumentoSelecionado][notaName].currentTime = 0
}

// eventListener para que seja chamada e efetuada a troca dos animais que são apresentados na tela

setaDireita.addEventListener('click', () => {
    indiceAtual++
    if (indiceAtual > animais.length - 5) {
        indiceAtual--
        return
    }
    mudaAnimais(indiceAtual);
})

setaEsquerda.addEventListener('click', () => {
    indiceAtual--
    if (indiceAtual < 0) {
        indiceAtual = 0
        return
    }
    mudaAnimais(indiceAtual);
})

// eventListener para que seja chamada e efetuada a troca do instrumento selecionado


instrumentos.forEach(instrumento => {
    instrumento.addEventListener('click', () => {
        selecionaInstrumento(instrumento)
    })
})

// eventListener para que seja tocado o audio do animal ou nota do instrumento selecionado.

animais.forEach(animal => {
    animal.addEventListener('click', () => {
        const animalName = animal.name

        if (animalAtual !== '') {
            stopAudioAnimal(animalAtual)
        }

        if(notaAtual !== ''){
            stopCurrentNote(instrumentoSelecionado, notaAtual)
            notaAtual = ''
        }

        audiosAnimais[animalName].play()

        animalAtual = animalName;
    })
})

teclasPiano.forEach(tecla => {
    tecla.addEventListener('click', () => {
        const notaTocada = tecla.name;

        if(notaAtual !== ''){
            stopCurrentNote(instrumentoSelecionado, notaAtual)
        }

        if (animalAtual !== '') {
            stopAudioAnimal(animalAtual)
            animalAtual = ''
        }


        audiosInstrumentos[instrumentoSelecionado][notaTocada].play()

        notaAtual = notaTocada;
    })
})