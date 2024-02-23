// Event listener for mouse click
canvas.addEventListener('click', function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const fillColor = [255, 0, 0, 255]; // Red color
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const visited = new Array(canvas.width * canvas.height).fill(false); // Track visited pixels
  
    // Get the color of the clicked pixel
    const targetColor = getColor(x, y, imageData);
  
    // Perform flood fill
    floodFill(x, y, targetColor, fillColor, imageData, visited);
  
    // Update the canvas with the filled area
    ctx.putImageData(imageData, 0, 0);
  });
  
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
  
  // Function to perform flood fill
  function floodFill(x, y, targetColor, fillColor, imageData, visited) {
    const stack = [[x, y]];
  
    while (stack.length) {
      const [currentX, currentY] = stack.pop();
      const pixelIndex = (currentY * imageData.width + currentX) * 4;
  
      // Check if the current pixel is within bounds and hasn't been visited
      if (
        currentX >= 0 && currentX < canvas.width &&
        currentY >= 0 && currentY < canvas.height &&
        !visited[currentY * canvas.width + currentX]
      ) {
        visited[currentY * canvas.width + currentX] = true; // Mark pixel as visited
  
        const currentColor = getColor(currentX, currentY, imageData);
  
        // Check if the current pixel matches the target color
        if (
          currentColor[0] === targetColor[0] &&
          currentColor[1] === targetColor[1] &&
          currentColor[2] === targetColor[2] &&
          currentColor[3] === targetColor[3]
        ) {
          // Set the fill color for the current pixel
          imageData.data[pixelIndex] = fillColor[0];
          imageData.data[pixelIndex + 1] = fillColor[1];
          imageData.data[pixelIndex + 2] = fillColor[2];
          imageData.data[pixelIndex + 3] = fillColor[3];
  
          // Add neighboring pixels to the stack
          stack.push([currentX - 1, currentY]);
          stack.push([currentX + 1, currentY]);
          stack.push([currentX, currentY - 1]);
          stack.push([currentX, currentY + 1]);
        }
      }
    }
  }