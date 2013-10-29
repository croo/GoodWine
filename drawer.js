var wines = {};
wines.white = {};
wines.red = {};

wines.columns = ["fixed_acidity","volatile_acidity","citric_acid","residual_sugar","chlorides","free_sulfur_dioxide","total_sulfur_dioxide","density","pH","sulphates","alcohol","quality"];

$(document).ready(function(){

   var intervalId = setInterval(function(){
                                    if(wines.white.loaded && wines.red.loaded){
                                        clearInterval(intervalId);
                                        initDraw();
                                    }
                                },
                                200);

    $.get("wine/wine_red.csv", red_success, "text");
    $.get("wine/wine_white.csv", white_success, "text");
});

function red_success(data) {
    wines.red = $.csv.toObjects(data);
    wines.red.loaded = true;
    wines.red.visible = true;
    for(var i = 0; i < wines.red.length; i++) {
        wines.red[i].type = "red";
    }
}

function white_success(data) {
    wines.white = $.csv.toObjects(data);
    wines.white.loaded = true;
    wines.white.visible = true;
    for(var i = 0; i < wines.white.length; i++) {
        wines.white[i].type = "white";
    }
}

function initDraw() {
    drawScatterplot(wines.red.concat(wines.white),wines.columns[0],wines.columns[6]);
}
