var white_wines = {};
var red_wines = {};

white_wines.loaded = false;
red_wines.loaded = false;

$(document).ready(function(){

   var intervalId = setInterval(function(){
                                    if(white_wines.loaded && red_wines.loaded){
                                        clearInterval(intervalId);
                                        draw();
                                    }
                                },
                                200);


    $.get("wine/wine_red.csv", red_success, "text");
    $.get("wine/wine_white.csv", white_success, "text");
});

function red_success(data) {
    red_wines = $.csv.toObjects(data);
    red_wines.loaded = true;
    for(var i=0; i < red_wines.length;i++) {
        red_wines[i].type = "red"
    }
}

function white_success(data) {
    white_wines = $.csv.toObjects(data);
    white_wines.loaded = true;
    for(var i=0; i < white_wines.length;i++) {
        white_wines[i].type = "white"
    }
}

