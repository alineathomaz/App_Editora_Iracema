import { contextCanvas, containerCanvas } from "../variaveis/variaveis.js";

const drawing = function (event, dragging) {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    if (dragging == true) {
        contextCanvas.lineCap = 'round';
        contextCanvas.lineTo(positionX, positionY);
        contextCanvas.stroke()
        contextCanvas.moveTo(positionX, positionY);
    }
}

export { drawing }