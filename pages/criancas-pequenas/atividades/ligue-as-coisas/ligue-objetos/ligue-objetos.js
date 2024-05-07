var objetosColuna2 = ['objeto1.svg','objeto2.svg','objeto3.svg', 'objeto4.svg','objeto5.svg', 'objeto6.svg'];

const objetosSelecionados = ['lapis', 'tesoura', 'cola', 'pincel', 'borracha', 'bola']
let lastPositionX, lastPositionY, countWin;
let lapisConectado = false
let tesouraConectado = false
let colaConectado = false
let pincelConectado = false
let borrachaConectado = false
let bolaConectado = false

countWin = 0;

function randomizer(number) {
    return Math.floor(Math.random() * number)
}

let organizadorColuna2 = []
let ordemObjetosColuna2 = []
let positionInitial = []
const renderizaTela = () => {


    for (let index = 0; index < objetosColuna2.length; index++) {
        let randomNumber = randomizer(objetosColuna2.length);
        while (organizadorColuna2.includes(randomNumber)) {
            randomNumber = randomizer(objetosColuna2.length);
        }
        organizadorColuna2.push(randomNumber);
        document.getElementById("coluna2").innerHTML += `<div class="items">
                                                            <img src="./${objetosColuna2[randomNumber]}" name="${objetosSelecionados[randomNumber]}"/>
                                                        </div>`;
        ordemObjetosColuna2.push(objetosSelecionados[randomNumber]);
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

const objetosRenderizadosColuna1 = document.querySelectorAll('.coluna1 img')
const objetosRenderizadosColuna2 = document.querySelectorAll('.coluna2 img')

canvas.addEventListener('mousedown', event => {
    drawingStart(event)
})
canvas.addEventListener('mouseup', event => {
    checaLigacao(event);
    mudaCorStroke();
    checaVitoria();
    positionInitial.pop()
    drawingStopped(event)
})
canvas.addEventListener('mousemove', event => drawing(event))
canvas.addEventListener('touchstart', event => {
    drawingStart(event.changedTouches[0])
})
canvas.addEventListener('touchend', event => {
    checaLigacao(event.changedTouches[0]);
    mudaCorStroke();
    checaVitoria();
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
const primeiraColuna = {}
const segundaColuna = {}

const checaLigacao = (evento) => {

    let posicaoInicialX = positionInitial[0].positionX
    let posicaoInicialY = positionInitial[0].positionY
    let posicaoFinalX = evento.pageX - containerCanvas.offsetLeft;
    let posicaoFinalY = evento.pageY - containerCanvas.offsetTop;
    let posicaoTeste;

    if (posicaoInicialX >= primeiraColuna.position0.x && posicaoInicialX <= primeiraColuna.position0.width + primeiraColuna.position0.x) {
        if (posicaoInicialY >= primeiraColuna.position0.y && posicaoInicialY <= primeiraColuna.position0.height + primeiraColuna.position0.y) {
            posicaoTeste = 'lapis'
            if (lapisConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {
                lapisConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!lapisConectado) {
                    window.alert('Não conectou o lapis')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        } else if (posicaoInicialY >= primeiraColuna.position1.y && posicaoInicialY <= primeiraColuna.position1.height + primeiraColuna.position1.y) {
            posicaoTeste = 'tesoura'
            if (tesouraConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {
                tesouraConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!tesouraConectado) {
                    window.alert('Não conectou o tesoura')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        } else if (posicaoInicialY >= primeiraColuna.position2.y && posicaoInicialY <= primeiraColuna.position2.height + primeiraColuna.position2.y) {
            posicaoTeste = 'cola'
            if (colaConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {
                colaConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!colaConectado) {
                    window.alert('Não conectou o cola')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        } else if (posicaoInicialY >= primeiraColuna.position3.y && posicaoInicialY <= primeiraColuna.position3.height + primeiraColuna.position3.y) {
            posicaoTeste = 'pincel'
            if (pincelConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {
                pincelConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!pincelConectado) {
                    window.alert('Não conectou o pincel')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        } else if (posicaoInicialY >= primeiraColuna.position4.y && posicaoInicialY <= primeiraColuna.position4.height + primeiraColuna.position4.y) {
            posicaoTeste = 'borracha'
            if (borrachaConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {

                borrachaConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!borrachaConectado) {
                    window.alert('Não conectou o borracha')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        } else if (posicaoInicialY >= primeiraColuna.position5.y && posicaoInicialY <= primeiraColuna.position5.height + primeiraColuna.position5.y) {
            posicaoTeste = 'bola'
            if (bolaConectado) {
                window.alert('Objeto já foi conectado')
                return
            } else {

                bolaConectado = checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste);
                if (!bolaConectado) {
                    window.alert('Não conectou o bola')
                } else {
                    mostraValidacao();
                    countWin++
                }
            }
        }
    }

}

function mostraValidacao() {
    if(countWin === 5) {
        return
    }
    let checkmark = document.getElementById('checkmark');
    checkmark.classList.toggle('hidden');
    setTimeout(() => { checkmark.classList.toggle('hidden'); }, 1000);
}

function checaPosicaoFinal(posicaoFinalX, posicaoFinalY, posicaoTeste) {
    if (posicaoFinalX >= segundaColuna.position0.x && posicaoFinalX <= segundaColuna.position0.width + segundaColuna.position0.x) {
        if (posicaoFinalY >= segundaColuna.position0.y && posicaoFinalY <= segundaColuna.position0.height + segundaColuna.position0.y) {
            if (ordemObjetosColuna2[0] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position1.y && posicaoFinalY <= segundaColuna.position1.height + segundaColuna.position1.y) {
            if (ordemObjetosColuna2[1] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position2.y && posicaoFinalY <= segundaColuna.position2.height + segundaColuna.position2.y) {
            if (ordemObjetosColuna2[2] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position3.y && posicaoFinalY <= segundaColuna.position3.height + segundaColuna.position3.y) {
            if (ordemObjetosColuna2[3] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position4.y && posicaoFinalY <= segundaColuna.position4.height + segundaColuna.position4.y) {
            if (ordemObjetosColuna2[4] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        } else if (posicaoFinalY >= segundaColuna.position5.y && posicaoFinalY <= segundaColuna.position5.height + segundaColuna.position5.y) {
            if (ordemObjetosColuna2[5] === posicaoTeste) {
                return true;
            } else {
                return false;
            }
        }
    }
}

const itensColuna1 = document.querySelectorAll('.coluna1 .items')
const itensColuna2 = document.querySelectorAll('.coluna2 .items')

console.log(itensColuna1, itensColuna2)

const criaColuna = () => {
    for (let index = 0; index < 6; index++) {
        let width1 = itensColuna1[index].clientWidth
        let height1 = itensColuna1[index].clientHeight
        let posicaoX1 = itensColuna1[index].offsetParent.offsetLeft - canvasOffsetLeft
        let posicaoY1 = itensColuna1[index].offsetParent.offsetTop + itensColuna1[index].offsetTop - canvasOffsetTop

        let width2 = itensColuna2[index].clientWidth
        let height2 = itensColuna2[index].clientHeight
        let posicaoX2 = itensColuna2[index].offsetParent.offsetLeft - canvasOffsetLeft
        let posicaoY2 = itensColuna2[index].offsetParent.offsetTop + itensColuna2[index].offsetTop - canvasOffsetTop

        let indexador = 'position' + index

        primeiraColuna[indexador] = { x: posicaoX1, y: posicaoY1, width: width1, height: height1 }
        segundaColuna[indexador] = { x: posicaoX2, y: posicaoY2, width: width2, height: height2 }
    }
}

criaColuna()

const mudaCorStroke = () => {
    switch (countWin) {
        case 1:
            context.strokeStyle = '#74BE21'
            break;
        case 2:
            context.strokeStyle = '#F787BF'
            break;
        case 3:
            context.strokeStyle = '#B66C1A'
            break;
        case 4:
            context.strokeStyle = '#E72323'
            break;
        case 5:
            context.strokeStyle = '#7FAFE2'
            break;
        case 6:
        default:
            context.strokeStyle = '#000000'
            break;
    }
}

const checaVitoria = () => {
    if (lapisConectado && tesouraConectado && colaConectado && bolaConectado && pincelConectado && borrachaConectado) {
        document.getElementById('fim-de-jogo').classList.toggle('hidden')
    } else {
        return
    }
}