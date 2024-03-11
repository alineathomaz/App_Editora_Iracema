// Function to perform flood fill using an iterative approach with a queue
function floodFill(x, y, targetColor, fillColor, imageData, visited) {
    const queue = [{ x, y }];
    const width = canvas.width;
    const height = canvas.height;
  
    while (queue.length) {
      const { x: currentX, y: currentY } = queue.shift();
      const pixelIndex = (currentY * width + currentX) << 2;
  
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
  
        if (colorsMatch(currentColor, targetColor)) {
          // Set the fill color for the current pixel
          imageData.data[pixelIndex] = fillColor[0];
          imageData.data[pixelIndex + 1] = fillColor[1];
          imageData.data[pixelIndex + 2] = fillColor[2];
          imageData.data[pixelIndex + 3] = fillColor[3];
  
          queue.push({ x: currentX - 1, y: currentY });
          queue.push({ x: currentX + 1, y: currentY });
          queue.push({ x: currentX, y: currentY - 1 });
          queue.push({ x: currentX, y: currentY + 1 });
        }
      }
    }
  }
  
  // Helper function to check if two colors match
  function colorsMatch(color1, color2) {
    return color1[0] === color2[0] &&
           color1[1] === color2[1] &&
           color1[2] === color2[2] &&
           color1[3] === color2[3];
  }

  export { floodFill }