const desenhos = document.querySelectorAll('.imagem')
const desenhoGalinha = document.querySelectorAll('.imagem[name="galinha"]')

console.log(desenhoGalinha)

let count = 0;

desenhos.forEach(desenho => {
    desenho.addEventListener('click', () => {
        if (desenho.name !== 'galinha' || desenho.firstElementChild.name === 'colorido') {
            window.alert('Este não é para colorir')
            return
        } else {
            count++
            desenho.firstElementChild.src = './galinha-colorido.svg'
            desenho.firstElementChild.name = 'colorido'
            desenho.lastElementChild.innerHTML = count;
            desenho.lastElementChild.classList.remove('hidden');
        }
    })
})

const avancar = document.querySelector('.btn-avancar')

avancar.addEventListener('click', () => {
    if(count !== desenhoGalinha.length) {
        window.alert('Não coloriu todos os desenhos')
    }
})