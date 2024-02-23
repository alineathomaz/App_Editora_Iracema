import { coresBaldeTinta } from "../objetos/cores.js";
import { canvas, contextCanvas, containerCanvas } from "../variaveis/variaveis.js";


function fillShape(event, corSelecionadaBaldeTinta) {
    let positionX = event.clientX - containerCanvas.offsetLeft;
    let positionY = event.clientY - containerCanvas.offsetTop;
    contextCanvas.willReadFrequently = true;
    const imageData = contextCanvas.getImageData(0, 0, canvas.width, canvas.height);
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

export { fillShape }


/*

Use Iterative Approach: The current implementation uses a recursive approach, which can lead to stack overflow errors for large areas to fill. Converting the algorithm to an iterative approach using a stack or queue can help avoid this issue.

Reduce Function Calls: Minimize the number of function calls within the loop to improve performance. For example, instead of calling getColor() for every pixel, consider fetching the image data once and accessing pixel values directly from the data array.

Use Typed Arrays: Consider using typed arrays (Uint32Array, Uint8Array, etc.) for better memory efficiency and faster access to pixel data.

Optimize Boundary Checks: Refine boundary checks to avoid unnecessary checks for pixels outside the canvas bounds.

Parallelization: Explore parallelization techniques to process multiple pixels concurrently, leveraging the capabilities of modern multi-core processors. However, this might introduce complexities due to the need for synchronization.

*/