const buttonsColagens = document.querySelectorAll('.colagens a')
const voltar = document.getElementById('voltar')

buttonsColagens.forEach(buttonColagem => {
    buttonColagem.addEventListener('click', () => {
        const selecaoColagens = document.getElementById('selecao-colagens')
        const colagemSelecionada = document.getElementById(buttonColagem.name)

        selecaoColagens.classList.toggle('hidden')
        colagemSelecionada.classList.toggle('hidden')
    })
})

voltar.addEventListener('click', event => {
    if(document.getElementById('selecao-colagens').classList.contains('hidden')){
        event.preventDefault()

        const selecaoColagens = document.getElementById('selecao-colagens')
        const colagens = document.querySelectorAll('.colagem')
        colagens.forEach(colagem => {
            if(!colagem.classList.contains('hidden')){
                colagem.classList.toggle('hidden')
            }
        })
        selecaoColagens.classList.toggle('hidden')
    }
})