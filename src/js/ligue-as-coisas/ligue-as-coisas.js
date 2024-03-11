const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const containerCanvas = document.querySelector('.canvas')
const imagemLogo = new Image()
const animais = document.querySelectorAll('#animais img')
const screenItems = 6

const animaisRenderizadosCima = []
const animaisRenderizadosBaixo = []

console.log(animais)

imagemLogo.src = '../../../../../src/images/ligue-as-coisas/ligue-as-coisas.svg'

canvas.width = containerCanvas.clientWidth
canvas.height = containerCanvas.clientHeight

let positionImageX = (canvas.width - imagemLogo.width) / 2

let firstPositionY = imagemLogo.height + (canvas.height/8)
let secondPositionY = firstPositionY + (canvas.height/3)

let imageWidth = canvas.width/(screenItems+2)

let imagePositionX = imageWidth;

let dragging = false

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

context.lineWidth = 5
context.strokeStyle = '#000000'

function renderizaAnimais() {
    context.drawImage(imagemLogo, positionImageX, 0)

    let array = []
    let xPosition = []
    let arrayBaixo = []
    let imageSize = Math.floor(imageWidth*0.6);
    
    for (let index = 0; index < screenItems; index++) {
        let randomNumber = randomizer(animais.length);
        while(array.includes(randomNumber)){
            randomNumber = randomizer(animais.length);
        }
        array.push(randomNumber);
        const imagem = animais[randomNumber]
        animaisRenderizadosCima.push(animais[randomNumber])
        let imageHeight = Math.floor((imagem.height/imagem.width)*imageSize)
        context.drawImage(imagem, imagePositionX, firstPositionY, imageSize, imageHeight)
        xPosition.push(imagePositionX)
        imagePositionX += imageWidth;

        if(index === screenItems - 1) {
            for(let indexador = 0; indexador < screenItems; indexador++){
                let randomNumber2 = randomizer(array.length)
                let gerador = array[indexador]
                const imagem2 = animais[gerador]
                let imageHeight2 = Math.floor((imagem2.height/imagem2.width)*imageSize)
                while(arrayBaixo.includes(randomNumber2)){
                    randomNumber2 = randomizer(array.length);
                }
                arrayBaixo.push(randomNumber2);
                let positionX2 = xPosition[arrayBaixo[indexador]]
                animaisRenderizadosBaixo.push(animais[randomNumber2])
                context.drawImage(imagem2, positionX2, secondPositionY, imageSize, imageHeight2)
            }
        }
    }
}

setTimeout(() => renderizaAnimais(), 1000)


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