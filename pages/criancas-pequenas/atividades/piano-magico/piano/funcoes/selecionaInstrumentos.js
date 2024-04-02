// função para mudar o instrumento que esta selecionado

function selecionaInstrumento(instrumento) {
    if (instrumento.classList.contains('selected')) {
        return
    }

    instrumento.classList.toggle('selected')
}

export { selecionaInstrumento }