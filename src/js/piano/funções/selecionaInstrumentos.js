// função para mudar o instrumento que esta selecionado

function selecionaInstrumento(instrumento) {
    if (instrumento.classList.contains('selected')) {
        return
    }

    const elementoSelecionado = document.querySelector('.selected')

    elementoSelecionado.classList.toggle('selected')
    let nomeInstrumento = elementoSelecionado.name
    elementoSelecionado.firstElementChild.src = `../../../../src/images/piano/buttons/instrumentos/${nomeInstrumento}.svg`

    instrumento.classList.toggle('selected')
    instrumento.firstElementChild.src = `../../../../src/images/piano/buttons/instrumentos/${instrumento.name}-ativo.svg`
}

export { selecionaInstrumento }