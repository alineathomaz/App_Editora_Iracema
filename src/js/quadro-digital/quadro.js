import { cores } from "./objetos/cores.js"
const paintModes = document.querySelectorAll(".pinceis button")
const tintas = document.querySelectorAll(".paint-colors button")

let modoSelecionado = 'pincel'
let corSelecionada = cores['vermelho']


paintModes.forEach(paintMode => {
    paintMode.addEventListener('click', () => {
        if(paintMode.classList.contains('selected')){
            return
        }

        const elementoSelecionado = document.querySelector('.pinceis .selected')
        elementoSelecionado.firstElementChild.src = `../../../../src/images/quadro-digital/buttons/modes/${elementoSelecionado.name}.svg`
        elementoSelecionado.classList.toggle('selected')

        paintMode.classList.toggle('selected')
        paintMode.firstElementChild.src = `../../../../src/images/quadro-digital/buttons/modes/${paintMode.name}-ativo.svg`

        modoSelecionado = paintMode.name
    })
})


tintas.forEach(tinta => {
    tinta.addEventListener('click', () => {
        if(tinta.classList.contains('selected')){
            return
        }

        const elementoSelecionado = document.querySelector('.paint-colors .selected')
        elementoSelecionado.classList.toggle('selected')

        tinta.classList.toggle('selected')
        corSelecionada = cores[tinta.name]

    })
})