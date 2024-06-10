document.addEventListener('DOMContentLoaded', function () {
    const heightTela = window.outerHeight * 0.60;
    const widthTela = window.outerWidth * 0.85;
    const tamanhoInicialPeca = 200;
    const tamanhoPeca = heightTela / 2.2;
    const escala = tamanhoPeca / tamanhoInicialPeca;
    const posiçãoInicialX = (widthTela / 2) - tamanhoInicialPeca;
    const posiçãoInicialY = heightTela - tamanhoInicialPeca;

    let contador = 0;

    const imagens = ['leao1.png', 'leao2.png', 'leao3.png', 'leao4.png']

    var canvas = new fabric.Canvas('canvas-container', {
        width: widthTela,
        height: heightTela,
    });

    console.log(heightTela, tamanhoPeca)
    var puzzlePieces = [];
    const puzzlePlaces = [];

    for (var i = 0; i < 4; i++) {
        let name = 'piece' + (i + 1);
        console.log(name)
        const piece = new fabric.Image.fromURL(imagens[i], function (img) {
            img.set({
                width: tamanhoInicialPeca,
                height: tamanhoInicialPeca,
                left: Math.random() * posiçãoInicialX,
                top: Math.random() * posiçãoInicialY,
                selectable: true,
                hasControls: false,
                hasBorders: false,
                evented: true,
            });

            console.log(name)
            img.cacheKey = name
            img.scale(escala)
            canvas.add(img).setActiveObject(img)
        });

        piece.id = 'piece' + (i + 1);
        puzzlePieces.push(piece);

        let posicaoPecaX, posicaoPecaY, horizontal, vertical, posicaoBordaX, posicaoBordaY
        if (i < 2) {
            posicaoPecaX = 6
        } else {
            posicaoPecaX = 6 + tamanhoPeca
        }

        if (i === 0 || i === 2) {
            posicaoPecaY = (heightTela/4)-50
            horizontal = 10 + (tamanhoPeca*2)
            vertical = 5
            if(i === 0) {
                posicaoBordaX = 1
                posicaoBordaY = (widthTela/2) + ((heightTela/4)-50)-5
            } else {
                posicaoBordaX = 4 + tamanhoPeca*2
                posicaoBordaY = (widthTela/2) + ((heightTela/4)-50)-5
            }
        } else {
            posicaoPecaY = (heightTela/4)- 50 +tamanhoPeca
            vertical = tamanhoPeca*2
            horizontal = 5
            if(i=== 1) {
                posicaoBordaX = 6
                posicaoBordaY = (widthTela/2) + ((heightTela/4)-50) - 5
            } else {
                posicaoBordaX = 6
                posicaoBordaY = (widthTela/2) + ((heightTela/4)-50) + tamanhoPeca*2
            }
        }
        const place = new fabric.Rect({
            width: tamanhoPeca,
            height: tamanhoPeca,
            top: posicaoPecaX,
            left: (widthTela / 2) + posicaoPecaY,
            fill: '#B18174',
            opacity: 0.25,
            selectable: false,
            hasControls: false,
            hasBorders: false,
            evented: false,
        })

        const border = new fabric.Rect({
            width: horizontal,
            height: vertical,
            top: posicaoBordaX,
            left: posicaoBordaY,
            backgroundColor: '#B18174',
            opacity: 0.85,
            selectable: false,
            hasControls: false,
            hasBorders: false,
            evented: false,
        })

        place.cacheKey = 'place' + i

        canvas.add(place)
        canvas.add(border)
        place.id = 'place' + (i + 1);
        puzzlePlaces.push(place);
    }

    console.log(canvas._objects)

    canvas.on('object:moving', function () {
        const objetoSelecionado = canvas.getActiveObject()
        const nomeObjetoSelecionado = canvas.getActiveObject().cacheKey

        // Canvas border limitation
        let limitTop = canvas.getActiveObject().top < 0;
        let limitBottom = (canvas.getActiveObject().top + tamanhoPeca) > canvas.height;
        let limitLeft = canvas.getActiveObject().left < 0;
        let limitRight = (canvas.getActiveObject().left + tamanhoPeca) > canvas.width;

        if (limitTop) {
            canvas.getActiveObject().set({ top: 1 });

        }
        if (limitBottom) {
            canvas.getActiveObject().set({ top: canvas.height - tamanhoPeca - 1 });
        }
        if (limitLeft) {
            canvas.getActiveObject().set({ left: 1 });
        }
        if (limitRight) {
            canvas.getActiveObject().set({ left: canvas.width - tamanhoPeca - 1 });
        }

        if (nomeObjetoSelecionado === 'piece1') {
            if (objetoSelecionado.top >= canvas._objects[0].top && objetoSelecionado.left >= canvas._objects[0].left) {
                objetoSelecionado.set({
                    top: canvas._objects[0].top,
                    left: canvas._objects[0].left,
                    lockMovementX: true,
                    lockMovementY: true,
                    selectable: false,
                })
                contador++;
                console.log(contador)
                checaVitoria(contador)
            }
        } else if (nomeObjetoSelecionado === 'piece2') {
            if (objetoSelecionado.top >= canvas._objects[2].top && objetoSelecionado.left >= canvas._objects[2].left) {
                objetoSelecionado.set({
                    top: canvas._objects[2].top,
                    left: canvas._objects[2].left,
                    lockMovementX: true,
                    lockMovementY: true,
                    selectable: false,
                })
                contador++;
                console.log(contador)
                checaVitoria(contador)
            }
        } else if (nomeObjetoSelecionado === 'piece3') {
            if (objetoSelecionado.top >= canvas._objects[4].top && objetoSelecionado.left >= canvas._objects[4].left) {
                objetoSelecionado.set({
                    top: canvas._objects[4].top,
                    left: canvas._objects[4].left,
                    lockMovementX: true,
                    lockMovementY: true,
                    selectable: false,
                })
                contador++
                console.log(contador)
                checaVitoria(contador)
            }
        } else if (nomeObjetoSelecionado === 'piece4') {
            if (objetoSelecionado.top >= canvas._objects[6].top && objetoSelecionado.left >= canvas._objects[6].left) {
                objetoSelecionado.set({
                    top: canvas._objects[6].top,
                    left: canvas._objects[6].left,
                    lockMovementX: true,
                    lockMovementY: true,
                    selectable: false,
                })
                contador++
                console.log(contador)
                checaVitoria(contador)
            }
        }

    })

    function checaVitoria(contador) {
        if (contador === 4) {
            document.querySelector('.parabens').classList.toggle('hidden')
        }
    }
});