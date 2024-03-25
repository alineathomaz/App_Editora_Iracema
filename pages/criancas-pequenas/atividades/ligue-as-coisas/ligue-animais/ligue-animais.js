var animaisColuna2 = ['animal1.png','animal2.png','animal3.png', 'animal4.png','animal5.png'];

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

const renderizaTela = () => {

    let array = []
    
    for (let index = 0; index < animaisColuna2.length; index++) {
        let randomNumber = randomizer(animaisColuna2.length);
        while(array.includes(randomNumber)){
            randomNumber = randomizer(animaisColuna2.length);
        }
        array.push(randomNumber);
        document.getElementById("coluna2").innerHTML += `<img src="./${animaisColuna2[randomNumber]}"/>`;
    }
}

renderizaTela()

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const containerCanvas = document.querySelector('.canvas')

canvas.width = containerCanvas.clientWidth
canvas.height = containerCanvas.clientHeight

let dragging = false

context.lineWidth = 5
context.strokeStyle = '#000000'

let drawingStart = function (event) {

    dragging = true;
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    context.moveTo(positionX, positionY)
    drawing(event)
}

let drawingStopped = function () {
    dragging = false;
    context.beginPath()
}

const drawing = function (event) {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    if (dragging == true) {
        context.lineCap = 'round';
        context.lineTo(positionX, positionY);
        context.stroke()
        context.moveTo(positionX, positionY);
    }
}

canvas.addEventListener('mousedown', event => drawingStart(event))
canvas.addEventListener('mouseup', event => drawingStopped(event))
canvas.addEventListener('mousemove', event => drawing(event))
canvas.addEventListener('touchstart', event => drawingStart(event.changedTouches[0]))
canvas.addEventListener('touchend', event => drawingStopped(event.changedTouches[0]))
canvas.addEventListener('touchmove', event => drawing(event.changedTouches[0]))
