var white_wines = {"loaded":false};
var red_wines = {"loaded":false};
var wines;

var columns = ["fixed_acidity","volatile_acidity","citric_acid","residual_sugar","chlorides","free_sulfur_dioxide","total_sulfur_dioxide","density","pH","sulphates","alcohol","quality"];

$(document).ready(function(){

   var intervalId = setInterval(function(){
                                    if(white_wines.loaded && red_wines.loaded){
                                        clearInterval(intervalId);
                                        initDraw();
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
        red_wines[i].wine_type = "red";
    }
}

function white_success(data) {
    white_wines = $.csv.toObjects(data);
    white_wines.loaded = true;
    for(var i=0; i < white_wines.length;i++) {
        white_wines[i].wine_type = "white";
    }
}

function initDraw() {
    wines = red_wines.concat(white_wines);
    drawScatterplot(wines,columns[0],columns[6]);
}
