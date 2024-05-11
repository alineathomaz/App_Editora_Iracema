import { paintModes, tintas, canvas, contextCanvas, containerCanvas, canvasWidth, canvasHeight, coresTinta } from "./variaveis.js"

const imagemCasinha = new Image()

imagemCasinha.src = 'casinha.png'

console.log(imagemCasinha)

let modoSelecionado = 'pincel'
let corSelecionada = ''
let corSelecionadaBaldeTinta = ''
let dragging = false;
let lastPositionX;
let lastPositionY;
const canvasOffsetLeft = containerCanvas.offsetLeft
const canvasOffsetTop = containerCanvas.offsetTop


canvas.width = canvasWidth
canvas.height = canvasHeight
canvas.style.backgroundColor = '#fff'
console.log(contextCanvas)

paintModes.forEach(paintMode => {
    paintMode.addEventListener('click', () => {
        if (paintMode.classList.contains('selected')) {
            return
        }

        const elementoSelecionado = document.querySelector('.pinceis .selected')
        elementoSelecionado.firstElementChild.src = `../../../../../src/images/quadro-digital/buttons/modes/${elementoSelecionado.name}.svg`
        elementoSelecionado.classList.toggle('selected')

        paintMode.classList.toggle('selected')
        paintMode.firstElementChild.src = `../../../../../src/images/quadro-digital/buttons/modes/${paintMode.name}-ativo.svg`

        
        modoSelecionado = paintMode.name
        
        if(modoSelecionado === 'pincel') {
            contextCanvas.lineWidth = 5

            contextCanvas.strokeStyle = corSelecionada
            contextCanvas.fillStyle = corSelecionada

            console.log(corSelecionada)
        } else if (modoSelecionado = 'balde-tinta') {
            contextCanvas.lineWidth = 30

            contextCanvas.strokeStyle = corSelecionada
            contextCanvas.fillStyle = corSelecionada

            console.log(corSelecionada)
        }
        
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

        const elementoSelecionado = document.querySelector('.paint-colors .selected')
        elementoSelecionado.classList.toggle('selected')

        tinta.classList.toggle('selected')
        corSelecionada = coresTinta[tinta.name]
        corSelecionadaBaldeTinta = tinta.name

        if (modoSelecionado === 'borracha') {
            return
        }
        contextCanvas.strokeStyle = corSelecionada
        contextCanvas.fillStyle = corSelecionada

        console.log(corSelecionada)
        console.log(contextCanvas)
    })
})


let drawingStart = function (event) {

    dragging = true;
    let positionX = event.clientX - canvasOffsetLeft;
    let positionY = event.clientY - canvasOffsetTop;
    lastPositionX = positionX
    lastPositionY = positionY

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

const drawing = function (event, dragging) {

    let positionX = event.pageX - canvasOffsetLeft
    let positionY = event.pageY - canvasOffsetTop
    if (dragging == true) {
        contextCanvas.lineCap = 'round'
        contextCanvas.beginPath()
        contextCanvas.moveTo(lastPositionX, lastPositionY);
        contextCanvas.lineTo(positionX, positionY);
        contextCanvas.stroke()
    }

    lastPositionX = positionX
    lastPositionY = positionY
}

canvas.addEventListener('touchstart', event => {
    /* if (modoSelecionado === 'balde-tinta') {
        fillShape(event.changedTouches[0], corSelecionadaBaldeTinta)
    } else { */
        dragging = true
        drawingStart(event.changedTouches[0])
    /* } */
})
canvas.addEventListener('mousedown', (event) => {
    /* if (modoSelecionado === 'balde-tinta') {
        fillShape(event, corSelecionadaBaldeTinta)
    } else { */
        dragging = true
        drawingStart(event)
    /* } */
})

canvas.addEventListener('touchmove', event => {
    event.preventDefault();
    drawing(event.changedTouches[0], dragging)
})
canvas.addEventListener('mousemove', event => {
    drawing(event, dragging)
})

canvas.addEventListener('touchend', event => drawingStopped(event.changedTouches[0]))
canvas.addEventListener('mouseup', drawingStopped)

/* tamanhoPincel.addEventListener('change', () => {
    contextCanvas.lineWidth = tamanhoPincel.value
    radius = tamanhoPincel.value
}) */

const configuracaoInicial = () => {
    const corInicial = document.querySelector('.paint-colors .selected')
    corSelecionada = coresTinta[corInicial.name]
    console.log(corSelecionada)
    contextCanvas.strokeStyle = corSelecionada
    contextCanvas.fillStyle = corSelecionada
    contextCanvas.lineWidth = 5

    console.log(contextCanvas)
}


function desenhaCasinha() {
    imagemCasinha.onload = function () { 
        contextCanvas.drawImage(imagemCasinha, 0, 0, canvasWidth, canvasHeight)
    }
}

desenhaCasinha()
configuracaoInicial()

// Selecione o canvas e a imagem
var canvasImage = document.getElementById('canvasImage');
var downloadLink = document.getElementById('downloadLink');
var ctx = canvas.getContext('2d');
ctx.fillStyle = '#FFFFFF'; // Define a cor de fundo como branco
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Evento de clique na imagem
canvasImage.addEventListener('click', function() {
    // Converta o conteúdo do canvas em um URL de dados
    var dataURL = canvas.toDataURL('image/jpeg');
    // Atribua o URL de dados ao atributo href do link
    downloadLink.href = dataURL;
});

const mainScreen = document.querySelector('.main')

mainScreen.addEventListener('touchmove', event => event.preventDefault());

