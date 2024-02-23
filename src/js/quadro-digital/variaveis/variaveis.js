const paintModes = document.querySelectorAll(".pinceis button")
const tintas = document.querySelectorAll(".paint-colors button")
const canvas = document.getElementById('canvas')
const contextCanvas = canvas.getContext('2d')
const containerCanvas = document.querySelector(".container-canvas")
const canvasWidth = containerCanvas.clientWidth
const canvasHeight = containerCanvas.clientHeight
const tamanhoPincel = document.getElementById('tamanho-pincel')

export { paintModes, tintas, canvas, contextCanvas, containerCanvas, canvasWidth, canvasHeight, tamanhoPincel }