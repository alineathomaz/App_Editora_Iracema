const instrumentos = {
    instrumentos: document.querySelectorAll(".instrumentos button"),
    geraInstrumentos() {
        instrumentos.instrumentos.forEach(instrumento => {
            this[instrumento.name] = {
                do: new Audio(`../../../../src/sounds/piano/${instrumento.name}/do.mp3`),
                re: new Audio(`../../../../src/sounds/piano/${instrumento.name}/re.mp3`),
                mi: new Audio(`../../../../src/sounds/piano/${instrumento.name}/mi.mp3`),
                fa: new Audio(`../../../../src/sounds/piano/${instrumento.name}/fa.mp3`),
                sol: new Audio(`../../../../src/sounds/piano/${instrumento.name}/sol.mp3`),
                la: new Audio(`../../../../src/sounds/piano/${instrumento.name}/la.mp3`),
                si: new Audio(`../../../../src/sounds/piano/${instrumento.name}/si.mp3`),
            }
        })
    }
}

export { instrumentos }