import { animais } from "../objetos/animais.js"
import { instrumentos } from "../objetos/instrumentos.js"

// funções para parar audios que estão sendo tocados

function stopAudioAnimal(animalName) {
    animais[animalName].pause()
    animais[animalName].currentTime = 0
}

function stopCurrentNote(instrumentoSelecionado, notaName) {
    instrumentos[instrumentoSelecionado][notaName].pause()
    instrumentos[instrumentoSelecionado][notaName].currentTime = 0
}

export { stopAudioAnimal, stopCurrentNote }