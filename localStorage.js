
var CisHry = 1;
var NovaHra = localStorage.length;

$( document ).ready(function() {
    $( "#smazat" ).click(function() {

    localStorage.clear();
    });


    $( "#start" ).click(function() {
      Start();
    });

    $( "#pridej" ).click(function() {
        PridejKrok();

    });

    $( "#konec" ).click(function() {
        Konec();
    });

});

var AktualHra = {

    "kroky" : "",
    "konec" : ";"
}

function PridejKrok(){
    //Souřadnice kliku
    var bunka = "[x,y]";

    //Vložený znak
    var znak = "x";

    AktualHra.kroky = AktualHra.kroky + bunka + znak;
}

function Start (){
    //kontrola jestli je proměná uložená
    for (var i = 0; i < localStorage.length; i++){
        var hodnoty=localStorage.getItem(localStorage.key(i));

        if (CisHry == hodnoty){
            CisHry++

        }else{
          //  NovaHra = i;

        }
    }
}

function Konec (){

    SaveLocal(NovaHra);
}


//Uložení do LocalStorage
function SaveLocal(NovaHra){
    // Uložení JSONu
    localStorage.setItem(
        NovaHra,
        JSON.stringify(AktualHra)
    );
}

//Načtení z LocalStorage
function LoadLocal(hra){
    //Získání JSONu
    var data = localStorage.getItem(hra);
    if (data) {
        var obsah = JSON.parse(data);
    }
    return obsah;
}


