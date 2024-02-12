import { stopCurrentNote } from "./stopCurrentSounds.js";

// função para mudar o instrumento que esta selecionado

function selecionaInstrumento(instrumento, instrumentoSelecionado, notaAtual) {
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

export { selecionaInstrumento }