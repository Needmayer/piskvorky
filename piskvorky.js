/**
 * Created by student on 7.1.2016.
 */


$(document).ready(function(){

    var canvasX, canvasY;
    var pocPoliSirka = 10;
    var pocPoliVyska = 10;
    var velikostPole = 50;
    var sirkaLinky = 0;
    var arrayOfEllements = [];
    var hrac = 0;

    initArray(arrayOfEllements,pocPoliSirka,  pocPoliVyska);
    vykresliPole(pocPoliSirka, pocPoliVyska, velikostPole)

    $(canvas).click(function(event){

        var pos;
        pos = getMousePos(this, event);
        canvasX = pos.x;
        canvasY = pos.y;
        console.log("souradnice X: " + canvasX + " Y: " + canvasY);
        
        var cells = getCellCoords(canvasX, canvasY, sirkaLinky, velikostPole);
        console.log("bunka x: " + cells.x + " bunka y: " + cells.y);
        
        var stred = getMiddleOfCell(cells.x, cells.y, velikostPole);

        console.log("array: " + arrayOfEllements[cells.x-1][cells.y-1]);
        console.log("cells.x : " +cells.x + " cells.y :"  + cells.y);

        var pocetKliku = 0;
        //var ol = $("<ol></ol>");
        if(arrayOfEllements[cells.x-1][cells.y-1] === 1 ){
            //alert(arrayOfEllements[cells.x][cells.y]);
        }else{
            if(hrac === 0){
            	vykresliKolecko(stred.stredX, stred.stredY, velikostPole);

                $("#krokyHracu").append("<p>" + saveClick(cells, "kolečko") + "</p>");
                pocetKliku++;
            }else{
            	vykresliKrizek(stred.stredX, stred.stredY, velikostPole);
                $("#krokyHracu").append("<p>" + saveClick(cells, "křížek") + "</p>");
                pocetKliku++;
            }
            arrayOfEllements[cells.x-1][cells.y-1] = 1;
            hrac = changePlayer(hrac);
        }

    });




});

/**
 * funkce pro zmenu hrace
 * 
 * @param hrac
 * @returns {Number}
 * created by: Lukáš
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
 * created by: Lukáš
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
 * created by: Lukáš
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
 * created by: Lukáš, Verča
 */
function saveClick(bunka, hrac){
    var click = "[" + bunka.x + "] [" + bunka.y + "] " + hrac;
    return click;
}


/**
 * vrati objekt se stredem bunky
 * @param cellX
 * @param cellY
 * @returns {{stredX: number, stredY: number}}
 * created by: Lukáš
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
 * created by: Lukáš
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
 * created by: Lukáš
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
 * created by: Verča
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


/**
 * vykreslí křížek
 * @param stredX
 * @param stredY
 * @param velP
 * created by: Verča
 */
function vykresliKrizek(stredX, stredY, velP) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var polomer = velP/2-5;
    ctx.beginPath();

    // čára: /
    ctx.moveTo(stredX + polomer, stredY - polomer);
    ctx.lineTo(stredX - polomer, stredY + polomer);
    ctx.strokeStyle="blue";

    // čára: \
    ctx.moveTo(stredX - polomer, stredY - polomer);
    ctx.lineTo(stredX + polomer, stredY + polomer);
    ctx.strokeStyle="blue";

    ctx.stroke();
    ctx.closePath();
}

/**
 * vykreslí kolečko
 * @param stredX
 * @param stredY
 * @param velP
 * created by: Verča
 */
function vykresliKolecko(stredX, stredY, velP) {
    var c = $("canvas");
    var ctx = c[0].getContext("2d");
    var polomer = velP/2-5;

    ctx.beginPath();
    ctx.arc(stredX, stredY, polomer, 0, 2 * Math.PI);
    ctx.strokeStyle="red";
    ctx.lineWidth=3;
    ctx.stroke();
    ctx.closePath();
}























