var animaisColuna2 = ['animal1.png','animal2.png','animal3.png', 'animal4.png','animal5.png'];
const animaisSelecionados = ['cachorro', 'gato', 'urso', 'elefante', 'pato']

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

let organizadorColuna2 = []
let ordemAnimaisColuna2 = []
let positionInitial = []
const renderizaTela = () => {

    
    for (let index = 0; index < animaisColuna2.length; index++) {
        let randomNumber = randomizer(animaisColuna2.length);
        while(organizadorColuna2.includes(randomNumber)){
            randomNumber = randomizer(animaisColuna2.length);
        }
        organizadorColuna2.push(randomNumber);
        document.getElementById("coluna2").innerHTML += `<img src="./${animaisColuna2[randomNumber]}" name="${animaisSelecionados[randomNumber]}"/>`;
        ordemAnimaisColuna2.push(animaisSelecionados[randomNumber]);
    }
}


renderizaTela()

console.log(ordemAnimaisColuna2);

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
    positionInitial.push({positionX, positionY});
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

const animaisRenderizadosColuna1 = document.querySelectorAll('.coluna1 img')
const animaisRenderizadosColuna2 = document.querySelectorAll('.coluna2 img')

console.log(animaisRenderizadosColuna1, animaisRenderizadosColuna2)

canvas.addEventListener('mousedown', event => {
    
    drawingStart(event)
})
canvas.addEventListener('mouseup', event => {
    checaLigação(event);
    positionInitial.pop()
    drawingStopped(event)
})
canvas.addEventListener('mousemove', event => drawing(event))
canvas.addEventListener('touchstart', event => drawingStart(event.changedTouches[0]))
canvas.addEventListener('touchend', event => {
    checaLigação(event.changedTouches[0]);
    positionInitial.pop()
    drawingStopped(event.changedTouches[0])
})
canvas.addEventListener('touchmove', event => {
    event.preventDefault()
    drawing(event.changedTouches[0])
})

const mainScreen = document.querySelector('.main')

//mainScreen.addEventListener('touchmove', event => event.preventDefault());



const primeiraColuna = {
    position1: {x: animaisRenderizadosColuna1[0].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna1[0].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna1[0].width, height: animaisRenderizadosColuna1[0].height},
    position2: {x: animaisRenderizadosColuna1[1].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna1[1].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna1[1].width, height: animaisRenderizadosColuna1[1].height},
    position3: {x: animaisRenderizadosColuna1[2].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna1[2].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna1[2].width, height: animaisRenderizadosColuna1[2].height},
    position4: {x: animaisRenderizadosColuna1[3].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna1[3].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna1[3].width, height: animaisRenderizadosColuna1[3].height},
    position5: {x: animaisRenderizadosColuna1[4].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna1[4].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna1[4].width, height: animaisRenderizadosColuna1[4].height}
}

const segundaColuna = {
    position1: {x: animaisRenderizadosColuna2[0].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna2[0].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna2[0].width, height: animaisRenderizadosColuna2[0].height},
    position2: {x: animaisRenderizadosColuna2[1].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna2[1].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna2[1].width, height: animaisRenderizadosColuna2[1].height},
    position3: {x: animaisRenderizadosColuna2[2].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna2[2].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna2[2].width, height: animaisRenderizadosColuna2[2].height},
    position4: {x: animaisRenderizadosColuna2[3].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna2[3].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna2[3].width, height: animaisRenderizadosColuna2[3].height},
    position5: {x: animaisRenderizadosColuna2[4].x - containerCanvas.offsetLeft, y: animaisRenderizadosColuna2[4].y - containerCanvas.offsetTop, width: animaisRenderizadosColuna2[4].width, height: animaisRenderizadosColuna2[4].height}
}

console.log(primeiraColuna, segundaColuna)

const criaQuadrante = () => {
    for (let index = 0; index < 5; index++) {
        context.fillStyle = '#00000000'
        let indexador = 'position'+(index+1)
        context.fillRect(primeiraColuna[indexador].x, primeiraColuna[indexador].y, primeiraColuna[indexador].width, primeiraColuna[indexador].height);
        context.fillRect(segundaColuna[indexador].x, segundaColuna[indexador].y, segundaColuna[indexador].width, segundaColuna[indexador].height);
        
    }
}

criaQuadrante()

const checaLigação = (evento) => {

    let posicaoInicialX = positionInitial[0].positionX
    let posicaoInicialY = positionInitial[0].positionY
    let posicaoFinalX = evento.clientX - containerCanvas.offsetLeft;
    let posicaoFinalY = evento.clientY - containerCanvas.offsetTop;
    let posicaoTeste;
    

    if(posicaoInicialX >= primeiraColuna.position1.x && posicaoInicialX <= primeiraColuna.position1.width+primeiraColuna.position1.x) {
        if(posicaoInicialY >= primeiraColuna.position1.y && posicaoInicialY <= primeiraColuna.position1.height+primeiraColuna.position1.y) {
            posicaoTeste = 'cachorro'
            checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
        } else if(posicaoInicialY >= primeiraColuna.position2.y && posicaoInicialY <= primeiraColuna.position2.height+primeiraColuna.position2.y) {
            posicaoTeste = 'gato'
            checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
        } else if(posicaoInicialY >= primeiraColuna.position3.y && posicaoInicialY <= primeiraColuna.position3.height+primeiraColuna.position3.y) {
            posicaoTeste = 'urso'
            checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
        } else if(posicaoInicialY >= primeiraColuna.position4.y && posicaoInicialY <= primeiraColuna.position4.height+primeiraColuna.position4.y) {
            posicaoTeste = 'elefante'
            checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
        } else if(posicaoInicialY >= primeiraColuna.position5.y && posicaoInicialY <= primeiraColuna.position5.height+primeiraColuna.position5.y) {
            posicaoTeste = 'pato'
            checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
        }
    }
     

    console.log(positionInitial[0])
    console.log(posicaoInicialX, posicaoInicialY, posicaoFinalX, posicaoFinalY)
}

function checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste) {
    if (posicaoFinalX >= segundaColuna.position1.x && posicaoFinalX <= segundaColuna.position1.width + segundaColuna.position1.x) {
        if (posicaoFinalY >= segundaColuna.position1.y && posicaoFinalY <= segundaColuna.position1.height + segundaColuna.position1.y) {
            if (ordemAnimaisColuna2[0] === posicaoTeste) {
                window.alert(posicaoTeste + ' conectado');
            } else {
                window.alert('Conectou errado');
            }
        } else if (posicaoFinalY >= segundaColuna.position2.y && posicaoFinalY <= segundaColuna.position2.height + segundaColuna.position2.y) {
            if (ordemAnimaisColuna2[1] === posicaoTeste) {
                window.alert(posicaoTeste + ' conectado');
            } else {
                window.alert('Conectou errado');
            }
        } else if (posicaoFinalY >= segundaColuna.position3.y && posicaoFinalY <= segundaColuna.position3.height + segundaColuna.position3.y) {
            if (ordemAnimaisColuna2[2] === posicaoTeste) {
                window.alert(posicaoTeste + ' conectado');
            } else {
                window.alert('Conectou errado');
            }
        } else if (posicaoFinalY >= segundaColuna.position4.y && posicaoFinalY <= segundaColuna.position4.height + segundaColuna.position4.y) {
            if (ordemAnimaisColuna2[3] === posicaoTeste) {
                window.alert(posicaoTeste + ' conectado');
            } else {
                window.alert('Conectou errado');
            }
        } else if (posicaoFinalY >= segundaColuna.position5.y && posicaoFinalY <= segundaColuna.position5.height + segundaColuna.position5.y) {
            if (ordemAnimaisColuna2[4] === posicaoTeste) {
                window.alert(posicaoTeste + ' conectado');
            } else {
                window.alert('Conectou errado');
            }
        }
    }
}
