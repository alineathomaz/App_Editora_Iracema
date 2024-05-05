var animaisColuna2 = ['animal1.png', 'animal2.png', 'animal3.png', 'animal4.png', 'animal5.png'];
const animaisSelecionados = ['cachorro', 'gato', 'urso', 'elefante', 'pato']
let lastPositionX, lastPositionY;

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

let organizadorColuna2 = []
let ordemAnimaisColuna2 = []
let positionInitial = []
const renderizaTela = () => {


    for (let index = 0; index < animaisColuna2.length; index++) {
        let randomNumber = randomizer(animaisColuna2.length);
        while (organizadorColuna2.includes(randomNumber)) {
            randomNumber = randomizer(animaisColuna2.length);
        }
        organizadorColuna2.push(randomNumber);
        document.getElementById("coluna2").innerHTML += `<img src="./${animaisColuna2[randomNumber]}" name="${animaisSelecionados[randomNumber]}"/>`;
        ordemAnimaisColuna2.push(animaisSelecionados[randomNumber]);
    }
}


renderizaTela()

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const containerCanvas = document.querySelector('.canvas')
let canvasOffsetLeft = containerCanvas.offsetLeft
let canvasOffsetTop = containerCanvas.offsetTop

canvas.width = containerCanvas.clientWidth
canvas.height = containerCanvas.clientHeight

let dragging = false

context.lineWidth = 5
context.strokeStyle = '#000000'

let drawingStart = function (event) {

    dragging = true;
    let positionX = event.pageX - canvasOffsetLeft
    let positionY = event.pageY - canvasOffsetTop
    positionInitial.push({ positionX, positionY });
    lastPositionX = positionX
    lastPositionY = positionY
    drawing(event)
}

let drawingStopped = function () {
    dragging = false;
    context.beginPath()
}

const drawing = function (event) {
    let positionX = event.pageX - canvasOffsetLeft
    let positionY = event.pageY - canvasOffsetTop
    if (dragging == true) {
        context.beginPath()
        context.moveTo(lastPositionX, lastPositionY);
        context.lineTo(positionX, positionY);
        context.stroke()
    }

    lastPositionX = positionX
    lastPositionY = positionY
}

const animaisRenderizadosColuna1 = document.querySelectorAll('.coluna1 img')
const animaisRenderizadosColuna2 = document.querySelectorAll('.coluna2 img')

canvas.addEventListener('mousedown', event => {
    drawingStart(event)
})
canvas.addEventListener('mouseup', event => {
    checaLigacao(event);
    positionInitial.pop()
    drawingStopped(event)
})
canvas.addEventListener('mousemove', event => drawing(event))
canvas.addEventListener('touchstart', event => {
    drawingStart(event.changedTouches[0])
})
canvas.addEventListener('touchend', event => {
    checaLigacao(event.changedTouches[0]);
    positionInitial.pop()
    drawingStopped(event.changedTouches[0])
})
canvas.addEventListener('touchmove', event => {
    event.preventDefault()
    drawing(event.changedTouches[0])
})

const mainScreen = document.querySelector('.main')

//mainScreen.addEventListener('touchmove', event => event.preventDefault());

console.log(containerCanvas)
console.log(containerCanvas.offsetLeft, containerCanvas.offsetTop)
console.log(window)
const primeiraColuna = {}
const segundaColuna = {}


function criaColunas() {
    const animaisRenderizadosColuna1 = document.querySelectorAll('.coluna1 img')
    const animaisRenderizadosColuna2 = document.querySelectorAll('.coluna2 img')
    console.log(animaisRenderizadosColuna1, animaisRenderizadosColuna2)
    console.log("heights for animal 1 ", animaisRenderizadosColuna1[0].clientHeight, animaisRenderizadosColuna1[0].naturalHeight, animaisRenderizadosColuna1[0].height, animaisRenderizadosColuna1[0].offsetHeight)
    console.log("positions x ", animaisRenderizadosColuna1[0].x, animaisRenderizadosColuna1[0].offsetParent.offsetLeft)
    console.log("positions Y ", animaisRenderizadosColuna1[0].y, animaisRenderizadosColuna1[0].offsetParent.offsetTop)
    console.log("offset canvas ", canvasOffsetLeft, canvasOffsetTop)
    for (let index = 0; index < 5; index++) {
        let offsetTopColuna1 = animaisRenderizadosColuna1[index].offsetParent.offsetTop
        let offsetTopColuna2 = animaisRenderizadosColuna2[index].offsetParent.offsetTop
        let positionVerticalEixo
        
        if(index === 0) {
            positionVerticalEixo = animaisRenderizadosColuna1[index+1].y - animaisRenderizadosColuna1[index].y
        } else {
            positionVerticalEixo = animaisRenderizadosColuna1[index].y - animaisRenderizadosColuna1[index-1].y
        }

        console.log('valor do gap entre os elementos: ', positionVerticalEixo);
        console.log('offset da div: ', offsetTopColuna1, offsetTopColuna2);
        let posicaoX1
        let posicaoY1
        let width1 = animaisRenderizadosColuna1[index].width
        let height1 = animaisRenderizadosColuna1[index].height
        if(window.innerWidth <= 1010) {
            posicaoX1 = animaisRenderizadosColuna1[index].offsetParent.offsetLeft - canvasOffsetLeft
            if(index === 0) {
                posicaoY1 = animaisRenderizadosColuna1[index].offsetParent.offsetTop - canvasOffsetTop
            } else {
                let indexador2 = 'position'+(index-1)
                posicaoY1 = primeiraColuna[indexador2].y + 18 + primeiraColuna[indexador2].height
            }
            console.log('offsets index 0 a 4 ', animaisRenderizadosColuna1[index].offsetTop, canvasOffsetTop, posicaoY1)
        } else {
            posicaoX1 = animaisRenderizadosColuna1[index].x - canvasOffsetLeft
            posicaoY1 = animaisRenderizadosColuna1[index].y - canvasOffsetTop
        }
        
        let posicaoX2
        let posicaoY2
        let width2 = animaisRenderizadosColuna2[index].width
        let height2 = animaisRenderizadosColuna2[index].height

        if(window.innerWidth <= 1010) {
            posicaoX2 = animaisRenderizadosColuna2[index].offsetParent.offsetLeft - canvasOffsetLeft
            if(index === 0) {
                posicaoY2 = animaisRenderizadosColuna2[index].offsetParent.offsetTop - canvasOffsetTop
            } else {
                let indexador3 = 'position'+(index-1)
                posicaoY2 = segundaColuna[indexador3].y + 18 + segundaColuna[indexador3].height
            }
        } else {
            posicaoX2 = animaisRenderizadosColuna2[index].x - canvasOffsetLeft
        }
        
        let indexador = 'position'+index

        console.log("heights from each position ", index, height1, height2)
        
        primeiraColuna[indexador] = {x: posicaoX1, y: posicaoY1, width: width1, height: height1}
        segundaColuna[indexador] = {x: posicaoX2, y: posicaoY2, width: width2, height: height2}

        context.fillStyle = '#0000000a'
        context.fillRect(posicaoX1, posicaoY1, width1, height1)
        context.fillRect(posicaoX2, posicaoY2, width2, height2)
    }
}

criaColunas()
    
console.log(animaisRenderizadosColuna1, animaisRenderizadosColuna2)
console.log(primeiraColuna, segundaColuna)


const checaLigacao = (evento) => {

    let posicaoInicialX = positionInitial[0].positionX
    let posicaoInicialY = positionInitial[0].positionY
    let posicaoFinalX = evento.pageX - containerCanvas.offsetLeft;
    let posicaoFinalY = evento.pageY - containerCanvas.offsetTop;
    let posicaoTeste;
    let cachorroConectado
    let gatoConectado
    let ursoConectado
    let elefanteConectado
    let patoConectado

    if (posicaoInicialX >= primeiraColuna.position0.x && posicaoInicialX <= primeiraColuna.position0.width + primeiraColuna.position0.x) {
        if (posicaoInicialY >= primeiraColuna.position0.y && posicaoInicialY <= primeiraColuna.position0.height + primeiraColuna.position0.y) {
            posicaoTeste = 'cachorro'
            cachorroConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
            if (!cachorroConectado) {
                window.alert('Não conectou o cachorro')
            } else {
                window.alert('Parabéns')
            }
        } else if (posicaoInicialY >= primeiraColuna.position1.y && posicaoInicialY <= primeiraColuna.position1.height + primeiraColuna.position1.y) {
            posicaoTeste = 'gato'
            gatoConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
            if (!gatoConectado) {
                window.alert('Não conectou o gato')
            } else {
                window.alert('Parabéns')
            }
        } else if (posicaoInicialY >= primeiraColuna.position2.y && posicaoInicialY <= primeiraColuna.position2.height + primeiraColuna.position2.y) {
            posicaoTeste = 'urso'
            ursoConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
            if (!ursoConectado) {
                window.alert('Não conectou o urso')
            } else {
                window.alert('Parabéns')
            }
        } else if (posicaoInicialY >= primeiraColuna.position3.y && posicaoInicialY <= primeiraColuna.position3.height + primeiraColuna.position3.y) {
            posicaoTeste = 'elefante'
            elefanteConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
            if (!elefanteConectado) {
                window.alert('Não conectou o elefante')
            } else {
                window.alert('Parabéns')
            }
        } else if (posicaoInicialY >= primeiraColuna.position4.y && posicaoInicialY <= primeiraColuna.position4.height + primeiraColuna.position4.y) {
            posicaoTeste = 'pato'
            patoConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
            if (!patoConectado) {
                window.alert('Não conectou o pato')
            } else {
                window.alert('Parabéns')
            }
        }
    }

}

function checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste) {
    if (posicaoFinalX >= segundaColuna.position0.x && posicaoFinalX <= segundaColuna.position0.width + segundaColuna.position0.x) {
        if (posicaoFinalY >= segundaColuna.position0.y && posicaoFinalY <= segundaColuna.position0.height + segundaColuna.position0.y) {
            if (ordemAnimaisColuna2[0] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position1.y && posicaoFinalY <= segundaColuna.position1.height + segundaColuna.position1.y) {
            if (ordemAnimaisColuna2[1] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position2.y && posicaoFinalY <= segundaColuna.position2.height + segundaColuna.position2.y) {
            if (ordemAnimaisColuna2[2] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position3.y && posicaoFinalY <= segundaColuna.position3.height + segundaColuna.position3.y) {
            if (ordemAnimaisColuna2[3] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position4.y && posicaoFinalY <= segundaColuna.position4.height + segundaColuna.position4.y) {
            if (ordemAnimaisColuna2[4] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        }
    }
}
