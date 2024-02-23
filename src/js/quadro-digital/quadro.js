import { cores } from "./objetos/cores.js"
import { paintModes, tintas, canvas, contextCanvas, containerCanvas, canvasWidth, canvasHeight, tamanhoPincel } from "./variaveis/variaveis.js"
import { drawingSpray } from "./funcoes/drawingSpray.js"
import { drawing } from "./funcoes/drawing.js"
import { fillShape } from "./funcoes/balde.js"

let modoSelecionado = 'pincel'
let corSelecionada = ''
let corSelecionadaBaldeTinta = ''
let radius = 2;
let dragging = false;
canvas.width = canvasWidth
canvas.height = canvasHeight
canvas.style.backgroundColor = '#fff'

paintModes.forEach(paintMode => {
    paintMode.addEventListener('click', () => {
        if (paintMode.classList.contains('selected')) {
            return
        }

        const elementoSelecionado = document.querySelector('.pinceis .selected')
        elementoSelecionado.firstElementChild.src = `../../../../src/images/quadro-digital/buttons/modes/${elementoSelecionado.name}.svg`
        elementoSelecionado.classList.toggle('selected')

        paintMode.classList.toggle('selected')
        paintMode.firstElementChild.src = `../../../../src/images/quadro-digital/buttons/modes/${paintMode.name}-ativo.svg`

        modoSelecionado = paintMode.name
        if (paintMode.name === 'borracha') {
            contextCanvas.strokeStyle = '#fff'
        } else {
            contextCanvas.strokeStyle = corSelecionada
            contextCanvas.fillStyle = corSelecionada
        }
    })
})

tintas.forEach(tinta => {
    tinta.addEventListener('click', () => {
        if (tinta.classList.contains('selected')) {
            return
        }

        tinta.classList.toggle('selected')
        corSelecionada = cores[tinta.name]
        corSelecionadaBaldeTinta = tinta.name

        if (modoSelecionado === 'borracha') {
            return
        }
        contextCanvas.strokeStyle = corSelecionada
        contextCanvas.fillStyle = corSelecionada

    })
})

let drawingStart = function (event, modoSelecionado) {

    dragging = true;
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    contextCanvas.moveTo(positionX, positionY)
    if (modoSelecionado === 'spray') {
        drawingSpray(event, radius, dragging)
    } else {
        drawing(event, dragging)
    }
}

let drawingStopped = function () {
    dragging = false;
    contextCanvas.beginPath()
}

canvas.addEventListener('touchstart', event => {
    if (modoSelecionado === 'balde-tinta') {
        fillShape(event.changedTouches[0], corSelecionadaBaldeTinta)
    } else {
        dragging = true
        drawingStart(event.changedTouches[0])
    }
})
canvas.addEventListener('mousedown', (event) => {
    if (modoSelecionado === 'balde-tinta') {
        fillShape(event, corSelecionadaBaldeTinta)
    } else {
        dragging = true
        drawingStart(event)
    }
})

canvas.addEventListener('touchmove', event => {
    event.preventDefault();
    if (modoSelecionado === 'spray') {
        drawingSpray(event.changedTouches[0], radius, dragging)
    } else {
        drawing(event.changedTouches[0], dragging)
    }
})
canvas.addEventListener('mousemove', event => {
    if (modoSelecionado === 'spray') {
        drawingSpray(event, radius, dragging)
    } else {
        drawing(event, dragging)
    }
})

canvas.addEventListener('touchend', event => drawingStopped(event.changedTouches[0]))
canvas.addEventListener('mouseup', drawingStopped)

tamanhoPincel.addEventListener('change', () => {
    contextCanvas.lineWidth = tamanhoPincel.value
    radius = tamanhoPincel.value
})

const selecionaCorInicial = () => {
    const corInicial = document.querySelector('.paint-colors button[name="vermelho"]')
    corInicial.classList.toggle('selected')
    corSelecionada = cores[corInicial.name]
    corSelecionadaBaldeTinta = corInicial.name
    contextCanvas.strokeStyle = corSelecionada
    contextCanvas.fillStyle = corSelecionada
}

selecionaCorInicial()