import { animais } from "../objetos/animais.js"

// função para mudar os animais que estão sendo mostrados na tela

function mudaAnimais(indiceAtual) {
    animais.animais.forEach(animal => {
        if (!animal.classList.contains('hidden')) {
            animal.classList.add('hidden')
        }
    })

    for (let i = 0; i < 5; i++) {
        let indexador = i + indiceAtual
        animais.animais[indexador].classList.remove('hidden')
    }
}

export { mudaAnimais }