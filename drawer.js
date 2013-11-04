var wines = {};
wines.white = {};
wines.red = {};

wines.columns = ["fixed_acidity","volatile_acidity","citric_acid","residual_sugar","chlorides","free_sulfur_dioxide","total_sulfur_dioxide","density","pH","sulphates","alcohol","quality"];

var scatterplotX;
var scatterplotY;

// wire events
$(document).ready(function() {

    scatterplotX = wines.columns[0];
    scatterplotY = wines.columns[0];

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
        updateScatterplotVisibility(this);
        updateParallelVisibility(this);
    });

    // on changing the quality visibility
    $("#quality_selectbox input").change(function() {
        updateScatterplotVisibility(this);
        updateParallelVisibility(this);
    });
    
    $("#bg_checkbox").change(function() {
        updateParallelVisibility();
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
    drawScatterplot(wines.white.concat(wines.red),scatterplotX,scatterplotY);
    drawParalellCoordinates(wines.white.concat(wines.red));
}

function updateScatterplotVisibility(toggled_checkbox) {
    if(! toggled_checkbox) { // redraw everything
    $("#dataset_selectbox input").each(function(i,checkbox) {
        if(checkbox.checked) {
            $("#scatterplot ."+checkbox.name).show();
            wines[checkbox.value].visible = true;
            updateScatterplotQualityVisibility("."+checkbox.name);
        } else {
            $("#scatterplot ." + checkbox.name).hide();
            wines[checkbox.value].visible = false;
        }
    });
    } else if(toggled_checkbox.name == "quality") { //else if it's a quality toggle
        if(wines["red"].visible){
            updateScatterplotQualityVisibility(".red_wine",".q"+toggled_checkbox.value,toggled_checkbox.checked);
        }
        if(wines["white"].visible){
            updateScatterplotQualityVisibility(".white_wine",".q"+toggled_checkbox.value,toggled_checkbox.checked);
        }
    } else { // else it's a wine toggle.
            wines[toggled_checkbox.value].visible = toggled_checkbox.checked;
        $("#quality_selectbox input").each(function(i,quality_checkbox) {
            if(quality_checkbox.checked) {
                updateScatterplotWineVisibility("."+toggled_checkbox.name,".q"+quality_checkbox.value,toggled_checkbox.checked);
            }
        });
    }
}

function updateScatterplotWineVisibility(wine,quality,wineOn) {
    if(wineOn) {
        $("#scatterplot "+wine+quality).show();
    } else {
        $("#scatterplot "+wine+quality).hide();
    }
}

function updateScatterplotQualityVisibility(wineType,quality,qualityOn){
    if(! quality || ! qualityOn) { // redraw everything
        $("#quality_selectbox input").each(function(i,checkbox) {
            if(checkbox.checked) {
                $("#scatterplot "+wineType+" .q"+checkbox.value).show();
            } else {
                $("#scatterplot .q"+checkbox.value).hide();
            }
        });
    } else {
        if(qualityOn) {
            $("#scatterplot "+wineType+quality).show();
        } else {
            $("#scatterplot "+wineType+quality).hide();
        }
    }
}

