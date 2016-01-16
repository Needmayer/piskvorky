/**
 * Created by student on 7.1.2016.
 */
var velikostPole = 50;
var pocPoliSirka = 10;
var pocPoliVyska = 10;

$(document).ready(function(){

    var canvasX, canvasY;


    var sirkaLinky = 0;
    var arrayOfEllements = [];
    var hrac = 0;


    initArray(arrayOfEllements,pocPoliSirka,  pocPoliVyska);
    vykresliPole(pocPoliSirka, pocPoliVyska, velikostPole);

    $(canvas).click(function(event){

        var pos;
        pos = getMousePos(this, event);
        canvasX = pos.x;
        canvasY = pos.y;

        var cells = getCellCoords(canvasX, canvasY, sirkaLinky, velikostPole);

        var stred = getMiddleOfCell(cells.x, cells.y, velikostPole);

        if(arrayOfEllements[cells.x][cells.y] !== -1 ){
        }else{
            if(hrac == 0){
            	vykresliKolecko(stred.stredX, stred.stredY, velikostPole);
                $("#krokyHracu").append("<li>" + saveClick(cells, "&#9899") + "</li>");
                arrayOfEllements[cells.x][cells.y] = 0;

            }else{
            	vykresliKrizek(stred.stredX, stred.stredY, velikostPole);
                $("#krokyHracu").append("<li>" + saveClick(cells, "&#10006") + "</li>");
                arrayOfEllements[cells.x][cells.y] = 1;

            }
            evaluate(hrac, parseInt(cells.x), parseInt(cells.y), arrayOfEllements);
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
        arrayOfEllements.push([]);

        for(j = 0; j < pocPoliVyska; j+=1){
            arrayOfEllements[i].push(-1);
        }
    }
}

/**
 *
 * @param player
 * @param cellX
 * @param cellY
 * @param arrayOfEllements
 * created by: Lukáš
 */
function evaluate(player, cellX, cellY, arrayOfEllements){
	var i, j, num = 1, stredObj;

	for(i = -1; i < 2; i+=1){
		for(j = -1; j <2; j+=1){
			if(cellX + i < 0 || cellX + i > 9 ||
					cellY + j < 0 || cellY +j >9 || (i==0 && j == 0)){
				continue;
			}else{
				if(arrayOfEllements[cellX+i][cellY+j] == player){
					num = getNumber(arrayOfEllements, i, j, cellX, cellY, player);
					if(num === 5){
						alert("victory");
						stredObj = getVictoryLine(player, cellX, cellY, i, j, arrayOfEllements);
						drawVictoryLine(stredObj, player);
					}
				}
			}
		}
	}
}
/**
 * získá pocet stejných prvku v jednom smeru
 * @param arrayOfEllements
 * @param i
 * @param j
 * @param cellX
 * @param cellY
 * @param player
 * @returns {Number}
 * created by: Lukáš
 */
function getNumber(arrayOfEllements, i, j, cellX, cellY, player){
	var n = 1, pocet = 1;
	var end1 = false, end2 = false;
	while(n < 5){
		if(checkBoundsPositive(cellX,cellY, n, i, j)){
			if(!end1 && arrayOfEllements[(cellX+(i*n))][(cellY+(n*j))] == player){
				pocet+=1;
			}else{
				end1 = true;
			}
		}else{
			end1 = true;
		}

		if(checkBoundsNegative(cellX,cellY, n, i, j)){
			if(!end2 && arrayOfEllements[(cellX-(i*n))][(cellY-(n*j))] == player){
				pocet+=1;
			}else{
				end2 = true;
			}
		}else{
			end2 = true;
		}

		if(end1 && end2){
			break;
		}else{
			n +=1;
		}
	}

	return pocet;
}

/**
 * zajisteni neprekroceni hranic pole
 * @param cellX
 * @param cellY
 * @param n
 * @param i
 * @param j
 * @returns {Boolean}
 * created by: Lukáš
 */
function checkBoundsPositive(cellX,cellY, n, i, j){
	if(cellX+(i*n)>-1 && cellX+(i*n) < pocPoliSirka &&
	   cellY+(n*j)>-1 && (cellY+(n*j)) < pocPoliVyska){
		return true;
	}
	return false;
}

/**
 * zajisteni neprekroceni hranic pole
 * @param cellX
 * @param cellY
 * @param n
 * @param i
 * @param j
 * @returns {Boolean}
 * created by: Lukáš
 */
function checkBoundsNegative(cellX,cellY, n, i, j){
	if((cellX-(i*n))>-1 && (cellX-(i*n)) < pocPoliSirka &&
		cellY-(n*j )>-1 && (cellY-(n*j)) < pocPoliVyska){
		return true;
	}
	return false;
}


/**
 * funkce zjistí stredy posledních dvou bodu vitezne linie
 * @param player
 * @param cellX
 * @param cellY
 * @param i
 * @param j
 * @param arrayOfEllements
 * @returns {{s1: *, s2: *}}    s1.stredX, s1.stredY, s2.stredX, s2.stredY
 * created by: Lukáš
 */
function getVictoryLine(player, cellX, cellY, i, j, arrayOfEllements){
	var n = 1, stred1, stred2;
	var end1 = false, end2 = false;

	while(n < 5){
		if(checkBoundsPositive(cellX, cellY, n, i, j) && arrayOfEllements[(cellX+(i*n))][(cellY+(n*j))] == player){

		}else{
			if(!end1){
				stred1 = getMiddleOfCell((cellX+(i*(n-1))), (cellY+((n-1)*j)), velikostPole);
				end1 = true;
			}
		}
		if(checkBoundsNegative(cellX, cellY, n, i, j) && arrayOfEllements[(cellX-(i*n))][(cellY-(n*j))] == player){
		}else{
			if(!end2){
				stred2 = getMiddleOfCell((cellX-(i*(n-1))), (cellY-((n-1)*j)), velikostPole);
				end2 = true;
			}
		}

		if(end1 && end2){
			return {
				s1 : stred1,
				s2 : stred2
			};
		}else{
			n+=1;
		}
	}
}


/**
 * vrací string, ktery obsahuje jeden radek do zaznamu
 * created by: Lukáš, Verča
 */
function saveClick(bunka, hrac){
    return click = "[" + bunka.x + "] [" + bunka.y + "] " + hrac;
}


/**
 * vrati objekt se stredem bunky
 * @param cellX
 * @param cellY
 * @returns {{stredX: number, stredY: number}}
 * created by: Lukáš
 */
function getMiddleOfCell(cellX, cellY){
    return {
    	stredX : velikostPole*cellX + velikostPole/2,
        stredY : velikostPole*cellY + velikostPole/2
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
    x = Math.floor(canX / (cellWH+lineWidth));
    y = Math.floor(canY / (cellWH+lineWidth));

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


/**
 * fukce nakreslí vítěznou linku mezi dvěma posledními body
 * @param stredObj
 * @param player
 */
function drawVictoryLine(stredObj, player){

}




















