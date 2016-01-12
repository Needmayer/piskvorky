$(document).ready(function () {

    var canvasX, canvasY;
    var pocPoliSirka = 10;
    var pocPoliVyska = 10;
    var velikostPole = 50;
    var sirkaLinky = 1;

    vykresliPole(pocPoliSirka, pocPoliVyska, velikostPole, sirkaLinky);


    $(canvas).click(function (event) {
        var pos;
        pos = getMousePos(this, event);
        canvasX = pos.x;
        canvasY = pos.y;

        console.log("souradnice X: " + canvasX + " Y: " + canvasY);

        var cells = getCellCoords(canvasX, canvasY, sirkaLinky, velikostPole);
        console.log("bunka x: " + cells.x + " bunka y: " + cells.y);

        var stredy = getMiddleOfCell(cells.x, cells.y, velikostPole);
        vykresliKolecko(stredy.stredX, stredy.stredY, velikostPole);
        vykresliKrizek(stredy.stredX, stredy.stredY, velikostPole);

    });


});


/**
 *
 * @param cellX
 * @param cellY
 */
function getMiddleOfCell(cellX, cellY) {

}


/**
 * * funkce pro získání souřadnic buněk
 * @param canX
 * @param canY
 * @param lineWidth
 * @param cellWH
 * @returns {*[]}
 */
function getCellCoords(canX, canY, lineWidth, cellWH) {

    var x, y;
    x = 1 + Math.floor(canX / (cellWH + lineWidth));
    y = 1 + Math.floor(canY / (cellWH + lineWidth));

    return {
        x: x,
        y: y
    };
}


/**
 * funkce pro zjistění x a y souřadnic po kliknutí na canvas
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


/**
 *
 * @param cellX
 * @param cellY
 * @param velikostPole
 * @returns {{stredX: number, stredY: number}}
 */
function getMiddleOfCell(cellX, cellY, velikostPole) {
    return {
        stredX: velikostPole * cellX - velikostPole / 2,
        stredY: velikostPole * cellY - velikostPole / 2
    }
}

/**
 * vykreslí pole
 * @param x
 * @param y
 * @param velP
 */
function vykresliPole(x, y, velP, lineWidth) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var i, k;



    //sirka
    for (i = 0; i <= x; i++) {
        ctx.moveTo(0, i * velP);
        ctx.lineTo(x * velP, i * velP);
        ctx.stroke();
    }

    //vyska
    for (k = 0; k <= y; k++) {
        ctx.moveTo(k * velP, 0);
        ctx.lineTo(k * velP, y * velP);
        ctx.stroke();
    }

}

/**
 * vykreslí křížek
 * @param stredX
 * @param stredY
 * @param velP
 */
function vykresliKrizek(stredX, stredY, velP) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var polomer = velP/2-5;

    // čára: /
    ctx.moveTo(stredX + polomer, stredY - polomer);
    ctx.lineTo(stredX - polomer, stredY + polomer);
    ctx.strokeStyle="blue";

    // čára: \
    ctx.moveTo(stredX - polomer, stredY - polomer);
    ctx.lineTo(stredX + polomer, stredY + polomer);
    ctx.strokeStyle="blue";

    ctx.stroke();
}

/**
 * vykreslí kolečko
 * @param stredX
 * @param stredY
 * @param velP
 */
function vykresliKolecko(stredX, stredY, velP) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var polomer = velP/2-5;

    ctx.beginPath();
    ctx.arc(stredX, stredY, polomer, 0, 2 * Math.PI);
    ctx.strokeStyle="red";
    ctx.stroke();
}

