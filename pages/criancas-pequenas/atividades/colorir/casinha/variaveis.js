const paintModes = document.querySelectorAll(".pinceis button")
const tintas = document.querySelectorAll(".paint-colors button")
const canvas = document.getElementById('canvas')
const contextCanvas = canvas.getContext('2d')
const containerCanvas = document.querySelector(".container-canvas")
const canvasWidth = containerCanvas.clientWidth
const canvasHeight = containerCanvas.clientHeight
const tamanhoPincel = document.getElementById('tamanho-pincel')

const cores = {
    laranja: [214, 129, 35, 255],
    salmon: [255, 131, 123, 255],
    rosa: [243, 79, 165, 255],
    verde: [116, 190, 33, 255],
    azul: [63, 87, 214, 255],
    amarelo: [212, 215, 59, 255]
}

const coresTinta = {
    laranja: '#D6812019',
    salmon: '#FF837B19',
    rosa: '#F34FA519',
    verde: '#74BE2119',
    azul: '#3F57D619',
    amarelo: '#D4D73B19'
}

export { paintModes, tintas, canvas, contextCanvas, containerCanvas, canvasWidth, canvasHeight, tamanhoPincel, cores, coresTinta }