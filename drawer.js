var wines = {};
wines.white = {};
wines.red = {};

wines.columns = ["fixed_acidity","volatile_acidity","citric_acid","residual_sugar","chlorides","free_sulfur_dioxide","total_sulfur_dioxide","density","pH","sulphates","alcohol","quality"];

var scatterplotX;
var scatterplotY;

// wire events
$(document).ready(function() {

    scatterplotX = wines.columns[0];
    scatterplotY = wines.columns[6];

    //on changing the X axis
    $("#data_x").change(function(){
        scatterplotX = $("#data_x").val();
        drawScatterplot(wines.red.concat(wines.white),scatterplotX,scatterplotY);
        if(!wines.red.visible) {
            $(".red_wine").hide();
        }
        if(!wines.white.visible) {
            $(".white_wine").hide();
        }
    });

    //on changing the Y axis
    $("#data_y").change(function(){
        scatterplotY = $("#data_y").val();
        var dataset = [];
        drawScatterplot(wines.red.concat(wines.white),scatterplotX,scatterplotY);
        if(!wines.red.visible) {
            $(".red_wine").hide();
        }
        if(!wines.white.visible) {
            $(".white_wine").hide();
        }
    });

    // on changing the dataset visibility
    $("#dataset_selectbox input").change(function() {
        updateVisibility();
    });

    // on changing the quality visibility
    $("#quality_selectbox input").change(function() {
        updateVisibility();
    });

    // Wait with the drawing until the csv files are loaded.
   var intervalId = setInterval(function(){
                                    if(wines.white.loaded && wines.red.loaded){
                                        clearInterval(intervalId);
                                        initDraw();
                                    }
                                },
                                200);

   // load the csv files
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
    drawScatterplot(wines.red.concat(wines.white),scatterplotX,scatterplotY);
    drawParalellCoordinates(wines.red.concat(wines.white));
}

function updateVisibility() {
    $("#dataset_selectbox input").each(function(i,checkbox) {
        if(checkbox.checked) {
            $("."+checkbox.name).show();
            wines[checkbox.value].visible = true;
            updateQualityVisibility("."+checkbox.name);
        } else {
            $("." + checkbox.name).hide();
            wines[checkbox.value].visible = false;
        }
    });
}

function updateQualityVisibility(wineType){
    $("#quality_selectbox input").each(function(i,checkbox) {
        if(checkbox.checked) {
            $(wineType+" .q"+checkbox.value).show();
        } else {
            $(".q"+checkbox.value).hide();
        }
    });
}

