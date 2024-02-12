import { mudaAnimais } from "./funções/mudaAnimais.js";
import { selecionaInstrumento } from "./funções/selecionaInstrumentos.js";
import { animais } from "./objetos/animais.js";
import { instrumentos } from "./objetos/instrumentos.js";
import { stopAudioAnimal, stopCurrentNote } from "./funções/stopCurrentSounds.js";

const teclasPiano = document.querySelectorAll(".teclas button");
const setaDireita = document.getElementById("seta-direita")
const setaEsquerda = document.getElementById("seta-esquerda")

let indiceAtual = 0
let instrumentoSelecionado = 'teclado'
let animalAtual = ''
let notaAtual = ''

/* --- Carregamento dos audios dos animais e dos instrumentos no objeto audioAnimais para os animais e audiosInstrumentos para os instrumentos --- */

animais.geraAnimais();
instrumentos.geraInstrumentos();


// eventListener para que seja chamada e efetuada a troca dos animais que são apresentados na tela

setaDireita.addEventListener('click', () => {
    indiceAtual++
    if (indiceAtual > animais.animais.length - 5) {
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


instrumentos.instrumentos.forEach(instrumento => {
    instrumento.addEventListener('click', () => {
        selecionaInstrumento(instrumento, instrumentoSelecionado, notaAtual)
    })
})

// eventListener para que seja tocado o audio do animal ou nota do instrumento selecionado.

animais.animais.forEach(animal => {
    animal.addEventListener('click', () => {
        const animalName = animal.name

        if (animalAtual !== '') {
            stopAudioAnimal(animalAtual)
        }

        if(notaAtual !== ''){
            stopCurrentNote(instrumentoSelecionado, notaAtual)
            notaAtual = ''
        }

        animais[animalName].play()

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


        instrumentos[instrumentoSelecionado][notaTocada].play()

        notaAtual = notaTocada;
    })
})