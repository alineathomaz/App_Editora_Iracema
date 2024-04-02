document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas-container', {
         width: 1800,
        height: 580
    });

    var puzzlePieces = [];

    for (var i = 0; i < 4; i++) {
        var piece = new fabric.Image.fromURL('sapo' + (i + 1) + '.png', function(img) {
            canvas.add(img.set({
                width: 210,
                height: 210,
                left: Math.random() * 300,
                top: Math.random() * 300,
                selectable: true,
                hasControls: false,
                hasBorders: false
            }));
        });

        piece.id = 'piece' + (i + 1);
        puzzlePieces.push(piece);
    }

    canvas.forEachObject(function (obj) {
        obj.on('mousedown', function () {
            canvas.getActiveObject().bringToFront();
        });
        obj.makeDraggable();
    });

    canvas.on('mouse:up', function (e) {
        var activeObject = e.target;
        if (activeObject && activeObject.id && activeObject.id.startsWith('piece')) {
            if (activeObject.top < 400 && activeObject.left < 400) {
                activeObject.top = 400;
                activeObject.left = 400;
                canvas.renderAll();
            }
        }
    });
});