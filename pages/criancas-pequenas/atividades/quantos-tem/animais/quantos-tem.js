const desenhos = document.querySelectorAll('.imagem')

let count = 0;
let validation = false;

desenhos.forEach(desenho => {
    desenho.addEventListener('click', () => {
        if (desenho.name !== 'cavalo' || desenho.firstElementChild.name === 'colorido') {
            window.alert('Este não é para colorir')
            return
        } else {
            count++
            desenho.firstElementChild.src = 'cavalo-colorido.svg'
            desenho.firstElementChild.name = 'colorido'
            desenho.lastElementChild.innerHTML = count;
            desenho.lastElementChild.classList.remove('hidden');
        }
    })
})

const avancar = document.querySelector('.btn-avancar')

avancar.addEventListener('click', (event) => {
    if(count !== desenhos.length) {
        event.preventDefault()
        window.alert('Não coloriu todos os desenhos')
    }
})