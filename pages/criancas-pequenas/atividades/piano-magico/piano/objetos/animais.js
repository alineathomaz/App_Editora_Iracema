const animais = {
    animais: document.querySelectorAll(".seletor-animais button"),
    geraAnimais(){
        animais.animais.forEach(animal => {
            this[animal.name] = new Audio(`./sounds/piano/animals/${animal.name}.mp3`)
        });
    }
}

export { animais }