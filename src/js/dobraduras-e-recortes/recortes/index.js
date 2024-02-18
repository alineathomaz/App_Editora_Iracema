const buttonsRecortes = document.querySelectorAll('.recortes a')
const voltar = document.getElementById('voltar')

buttonsRecortes.forEach(buttonRecorte => {
    buttonRecorte.addEventListener('click', () => {
        const selecaoRecortes = document.getElementById('selecao-recortes')
        const recorteSelecionado = document.getElementById(buttonRecorte.name)

        selecaoRecortes.classList.toggle('hidden')
        recorteSelecionado.classList.toggle('hidden')
    })
})

voltar.addEventListener('click', event => {
    if(document.getElementById('selecao-recortes').classList.contains('hidden')){
        event.preventDefault()

        const selecaoRecortes = document.getElementById('selecao-recortes')
        const recortes = document.querySelectorAll('.recorte')
        recortes.forEach(recorte => {
            if(!recorte.classList.contains('hidden')){
                recorte.classList.toggle('hidden')
            }
        })
        selecaoRecortes.classList.toggle('hidden')
    }
})