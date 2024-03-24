import { paintModes, tintas, canvas, contextCanvas, containerCanvas, canvasWidth, canvasHeight, tamanhoPincel, coresTinta } from "./variaveis.js"
import { fillShape } from "./balde.js"

const imagemCasinha = new Image()

imagemCasinha.src = 'casinha.png'

console.log(imagemCasinha)

let modoSelecionado = 'pincel'
let corSelecionada = ''
let corSelecionadaBaldeTinta = ''
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
        elementoSelecionado.firstElementChild.src = `/src/images/quadro-digital/buttons/modes/${elementoSelecionado.name}.svg`
        elementoSelecionado.classList.toggle('selected')

        paintMode.classList.toggle('selected')
        paintMode.firstElementChild.src = `/src/images/quadro-digital/buttons/modes/${paintMode.name}-ativo.svg`

        
        modoSelecionado = paintMode.name
        
        if(modoSelecionado === 'pincel') {
            contextCanvas.lineWidth = 5
        } else if (modoSelecionado = 'balde-tinta') {
            contextCanvas.lineWidth = 30
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
    })
})


let drawingStart = function (event) {

    dragging = true;
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    contextCanvas.moveTo(positionX, positionY)
    drawing(event, dragging)
}

const drawing = function (event) {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    if (dragging == true) {
        contextCanvas.lineCap = 'round';
        contextCanvas.lineTo(positionX, positionY);
        contextCanvas.stroke()
        contextCanvas.moveTo(positionX, positionY);
    }
}

let drawingStopped = function () {
    dragging = false;
    desenhaCasinha()
    contextCanvas.beginPath()
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
    contextCanvas.strokeStyle = corSelecionada
    contextCanvas.fillStyle = corSelecionada
    contextCanvas.lineWidth = 5
}


function desenhaCasinha() {
    imagemCasinha.onload = function () { 
        contextCanvas.drawImage(imagemCasinha, 0, 0, canvasWidth, canvasHeight)
    }
}

desenhaCasinha()
configuracaoInicial()

/* // Selecione o canvas e a imagem
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
}); */

