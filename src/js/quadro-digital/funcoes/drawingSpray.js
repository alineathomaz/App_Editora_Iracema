import { contextCanvas, containerCanvas } from "../variaveis/variaveis.js";

let drawingSpray = (event, radius, dragging,) => {
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

export { drawingSpray }