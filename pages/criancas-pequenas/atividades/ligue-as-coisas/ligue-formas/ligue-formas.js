var formasColuna2 = ['forma1.png','forma2.png','forma3.png', 'forma4.png','forma5.png'];

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

const renderizaTela = () => {

    let array = []
    
    for (let index = 0; index < formasColuna2.length; index++) {
        let randomNumber = randomizer(formasColuna2.length);
        while(array.includes(randomNumber)){
            randomNumber = randomizer(formasColuna2.length);
        }
        array.push(randomNumber);
        document.getElementById("coluna2").innerHTML += `<img src="./${formasColuna2[randomNumber]}"/>`;
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
canvas.addEventListener('touchmove', event => {
    event.preventDefault()
    drawing(event.changedTouches[0])
})

const mainScreen = document.querySelector('.main')

mainScreen.addEventListener('touchmove', event => event.preventDefault());
