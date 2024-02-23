import { cores, coresBaldeTinta } from "./objetos/cores.js"
const paintModes = document.querySelectorAll(".pinceis button")
const tintas = document.querySelectorAll(".paint-colors button")

let modoSelecionado = 'pincel'
let corSelecionada = ''
let corSelecionadaBaldeTinta = ''
let radius = 2;


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

        if (corSelecionada !== '') {
            const elementoSelecionado = document.querySelector('.paint-colors .selected')
            elementoSelecionado.classList.toggle('selected')
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

const canvas = document.getElementById('canvas')
const contextCanvas = canvas.getContext('2d')

let dragging = false;

const containerCanvas = document.querySelector(".container-canvas")
const canvasWidth = containerCanvas.clientWidth
const canvasHeight = containerCanvas.clientHeight

canvas.width = canvasWidth
canvas.height = canvasHeight

canvas.style.backgroundColor = '#fff'
contextCanvas.fillStyle = corSelecionada
contextCanvas.willReadFrequently = true;
console.log(contextCanvas)


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

let drawingStart = function (event) {

    dragging = true;
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    contextCanvas.moveTo(positionX, positionY)
    if (modoSelecionado === 'spray') {
        drawingSpray(event)
    } else {
        drawing(event)
    }

}

let drawingStopped = function () {
    dragging = false;
    contextCanvas.beginPath()
}

let drawingSpray = (event) => {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    let size;
    if (radius < 5) {
        size = radius / 2
    } else if (radius < 15) {
        size = radius / 4
    } else if (radius < 30) {
        size = radius / 8
    } else {
        size = radius / 12
    }
    if (dragging === true) {
        contextCanvas.fillRect(positionX, positionY, size, size)
        for (let i = 0; i < 5; i++) {
            for (let index = 0; index < 5; index++) {
                let diff = size * (index + 1) * (i + 1);

                if (index % 2 === 0) {
                    contextCanvas.fillRect(positionX - diff, positionY + diff, size, size)
                    contextCanvas.fillRect(positionX + diff, positionY - diff, size, size)
                    contextCanvas.fillRect(positionX - diff, positionY - diff, size, size)
                    contextCanvas.fillRect(positionX + diff, positionY + diff, size, size)
                    contextCanvas.fillRect(positionX - diff, positionY, size, size)
                    contextCanvas.fillRect(positionX + diff, positionY, size, size)
                    contextCanvas.fillRect(positionX, positionY - diff, size, size)
                    contextCanvas.fillRect(positionX, positionY + diff, size, size)
                } else {
                    contextCanvas.fillRect(positionX + (diff / 2), positionY + diff, size, size)
                    contextCanvas.fillRect(positionX + (diff / 2), positionY - diff, size, size)
                    contextCanvas.fillRect(positionX - (diff / 2), positionY - diff, size, size)
                    contextCanvas.fillRect(positionX - (diff / 2), positionY + diff, size, size)
                    contextCanvas.fillRect(positionX - diff, positionY + (diff / 2), size, size)
                    contextCanvas.fillRect(positionX - diff, positionY - (diff / 2), size, size)
                    contextCanvas.fillRect(positionX + diff, positionY - (diff / 2), size, size)
                    contextCanvas.fillRect(positionX + diff, positionY + (diff / 2), size, size)
                }

            }
        }
    }
}


canvas.addEventListener('touchstart', async event => {
    if (modoSelecionado === 'balde-tinta') {
        await fillShape(event.changedTouches[0])
    } else {
        drawingStart(event.changedTouches[0])
    }
})
canvas.addEventListener('touchmove', event => {
    event.preventDefault();
    if (modoSelecionado === 'spray') {
        drawingSpray(event.changedTouches[0])
    } else {
        drawing(event.changedTouches[0])
    }
})
canvas.addEventListener('touchend', event => drawingStopped(event.changedTouches[0]))
canvas.addEventListener('mousedown', async (event) => {
    if (modoSelecionado === 'balde-tinta') {
        await fillShape(event)
    } else {
        drawingStart(event)
    }
})

canvas.addEventListener('mousemove', event => {
    if (modoSelecionado === 'spray') {
        drawingSpray(event)
    } else {
        drawing(event)
    }
})
canvas.addEventListener('mouseup', drawingStopped)


const tamanhoPincel = document.getElementById('tamanho-pincel')

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

console.log(containerCanvas)


/* canvas.addEventListener('click', (event) => console.log(event.x, event.y)) */

/* window.addEventListener('click', event => console.log(event)) */


async function fillShape(event) {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    contextCanvas.willReadFrequently = true;
    const imageData = await contextCanvas.getImageData(0, 0, canvas.width, canvas.height);
    const visited = new Array(canvas.width * canvas.height).fill(false); // Track visited pixels

    // Get the color of the clicked pixel
    const targetColor = getColor(positionX, positionY, imageData);

    // Perform flood fill
    floodFill(positionX, positionY, targetColor, coresBaldeTinta[corSelecionadaBaldeTinta], imageData, visited);

    // Update the canvas with the filled area
    contextCanvas.putImageData(imageData, 0, 0);
};

// Function to get the color of a pixel
function getColor(x, y, imageData) {
    const index = (y * imageData.width + x) * 4;
    return [
        imageData.data[index],
        imageData.data[index + 1],
        imageData.data[index + 2],
        imageData.data[index + 3]
    ];
}

function floodFill(x, y, targetColor, fillColor, imageData, visited) {
    const stack = [[x, y]];
    const width = canvas.width;
    const height = canvas.height;

    while (stack.length) {
        const [currentX, currentY] = stack.pop();
        const pixelIndex = (currentY * width + currentX) << 2; // Convert to index in the image data array

        if (
            currentX >= 0 && currentX < width &&
            currentY >= 0 && currentY < height &&
            !visited[currentY * width + currentX]
        ) {
            visited[currentY * width + currentX] = true;

            const currentColor = [
                imageData.data[pixelIndex],
                imageData.data[pixelIndex + 1],
                imageData.data[pixelIndex + 2],
                imageData.data[pixelIndex + 3]
            ];

            if (currentColor[0] === targetColor[0] &&
                currentColor[1] === targetColor[1] &&
                currentColor[2] === targetColor[2] &&
                currentColor[3] === targetColor[3]) {
                // Set the fill color for the current pixel
                imageData.data[pixelIndex] = fillColor[0];
                imageData.data[pixelIndex + 1] = fillColor[1];
                imageData.data[pixelIndex + 2] = fillColor[2];
                imageData.data[pixelIndex + 3] = fillColor[3];

                stack.push([currentX - 1, currentY]);
                stack.push([currentX + 1, currentY]);
                stack.push([currentX, currentY - 1]);
                stack.push([currentX, currentY + 1]);
            }
        }
    }
}

/*

Use Iterative Approach: The current implementation uses a recursive approach, which can lead to stack overflow errors for large areas to fill. Converting the algorithm to an iterative approach using a stack or queue can help avoid this issue.

Reduce Function Calls: Minimize the number of function calls within the loop to improve performance. For example, instead of calling getColor() for every pixel, consider fetching the image data once and accessing pixel values directly from the data array.

Use Typed Arrays: Consider using typed arrays (Uint32Array, Uint8Array, etc.) for better memory efficiency and faster access to pixel data.

Optimize Boundary Checks: Refine boundary checks to avoid unnecessary checks for pixels outside the canvas bounds.

Parallelization: Explore parallelization techniques to process multiple pixels concurrently, leveraging the capabilities of modern multi-core processors. However, this might introduce complexities due to the need for synchronization.

*/