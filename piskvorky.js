/**
 * Created by student on 7.1.2016.
 */


$(document).ready(function(){

    var canvasX, canvasY;
    var pocPoliSirka = 10;
    var pocPoliVyska = 10;
    var velikostPole = 50;
    var sirkaLinky = 1;
    var arrayOfEllements = [];
    var hrac = 0;

    initArray(arrayOfEllements,pocPoliSirka,  pocPoliVyska);
    writeArray(arrayOfEllements, pocPoliSirka, pocPoliVyska);
    vykresliPole(pocPoliSirka, pocPoliVyska, velikostPole)

    $(canvas).click(function(event){

        var pos;
        pos = getMousePos(this, event);
        canvasX = pos.x;
        canvasY = pos.y;

        var cells = getCellCoords(canvasX, canvasY, sirkaLinky, velikostPole);

        var stred = getMiddleOfCell(cells.x, cells.y, velikostPole);

        hrac = changePlayer(hrac);


        if(arrayOfEllements[cells.x][cells.y] ==1 ){
            alert(arrayOfEllements[cells.x][cells.y]);
        }else{
            arrayOfEllements[cells.x][cells.y] = 1;
        }

    });




});

/**
 * funkce pro zmenu hrace
 * 
 * @param hrac
 * @returns {Number}
 */
function changePlayer(hrac){
    hrac += 1;
    hrac = hrac%2;
    return hrac;


}

/**
 * vykresleni pole
 * @param arrayOfEllements
 * @param pocPoliSirka
 * @param pocPoliVyska
 */

function writeArray(arrayOfEllements, pocPoliSirka, pocPoliVyska){
    var i,j;
    for(i = 0; i < pocPoliSirka; i+=1){
        for(j = 0; j < pocPoliVyska; j+=1){
            console.log(i, arrayOfEllements[i][j]);
        }
    }
}

/**
 * vytvoření prazdneho pole
 * pole slouzi k zaznamenani do ktere bunky v canvasu uz bylo kliknuto
 * ochrana pred prekreslovani bunek
 * 
 * @param arrayOfEllements
 * @param pocPoliSirka
 * @param pocPoliVyska
 */
function initArray(arrayOfEllements, pocPoliSirka, pocPoliVyska){
    var i,j;
    for(i = 0; i < pocPoliSirka; i+=1){
        arrayOfEllements.push(new Array);

        for(j = 0; j < pocPoliVyska; j+=1){
            arrayOfEllements[i].push(0);
        }
    }
}

/**
 * vrací string, ktery obsahuje jeden radek do zaznamu
 */
function saveClick(){
 //   var save = "Click " + click + "bunka[" + y +" / " + x +"]";
}


/**
 * vrati objekt se stredem bunky
 * @param cellX
 * @param cellY
 */
function getMiddleOfCell(cellX, cellY, velikostPole){
    return {
            stredX : velikostPole*cellX - velikostPole/2,
            stredY : velikostPole*cellY - velikostPole/2
        }
}


/**
 * funkce pro ziskani souradnic bunek
 * @param canX
 * @param canY
 * @param lineWidth
 * @param cellWH
 * @returns {*[]}
 */
function getCellCoords(canX, canY, lineWidth, cellWH){

    var x, y;
    x = 1 + Math.floor(canX / (cellWH+lineWidth));
    y = 1 + Math.floor(canY / (cellWH+lineWidth));

    return {
        x : x,
        y : y
    };
}



/**
 * funkce pro zjisteni x a y souradnic po kliknuti na canvas
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/**
 * vykresli pole
 * @param x
 * @param y
 * @param velP
 */
function vykresliPole(x, y, velP) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var i, k;
    //sirka
    for (i = 0; i <= x; i++) {
        ctx.moveTo(0,i*velP);    //x, y
        ctx.lineTo(x*velP, i*velP); // odkud, kam
        ctx.stroke();
    }
    //vyska
    for (k = 0; k <= y; k++) {
        ctx.moveTo(k*velP,0);    //x, y
        ctx.lineTo(k*velP, y*velP); // odkud, kam
        ctx.stroke();
    }

}