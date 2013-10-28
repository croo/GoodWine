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
    white_wines = $.csv.toObjects(data);
    white_wines.loaded = true;
    calculateMinMax(white_wines);
}

function white_success(data) {
    red_wines = $.csv.toObjects(data);
    red_wines.loaded = true;
    calculateMinMax(red_wines);
}

function calculateMinMax(d) {
    d.fixed_acidity_min = 999;
    d.fixed_acidity_max = 0;
    d.volatile_acidity_min = 999;
    d.volatile_acidity_max = 0;
    d.citric_acid_min = 999;
    d.citric_acid_max = 0;
    d.residual_sugar_min = 999;
    d.residual_sugar_max = 0;
    d.chlorides_min = 999;
    d.chlorides_max = 0;
    d.free_sulfur_dioxide_min = 999;
    d.free_sulfur_dioxide_max = 0;
    d.total_sulfur_dioxide_min = 999;
    d.total_sulfur_dioxide_max = 0;
    d.density_min = 999;
    d.density_max = 0;
    d.pH_min = 999;
    d.pH_max = 0;
    d.sulphates_min = 999;
    d.sulphates_max = 0;
    d.alcohol_min = 999;
    d.alcohol_max = 0;
    d.quality_min = 999;
    d.quality_max = 0;

    var dataset_size = d.length;
    for(var i = 0; i < dataset_size;i++) {
        if(parseFloat(d[i].fixed_acidity) < parseFloat(d.fixed_acidity_min)) {
            d.fixed_acidity_min = d[i].fixed_acitidy;
        }
        if(parseFloat(d[i].fixed_acidity) > parseFloat(d.fixed_acidity_max)) {
            d.fixed_acidity_max = d[i].fixed_acidity;
        }

        if(parseFloat(d[i].volatile_acidity) < parseFloat(d.volatile_acidity_min)) {
            d.volatile_acidity_min = d[i].volatile_acidity;
        }
        if(parseFloat(d[i].volatile_acidity) > parseFloat(d.volatile_acidity_max)) {
            d.volatile_acidity_max = d[i].volatile_acidity;
        }

        if(parseFloat(d[i].citric_acid) < parseFloat(d.citric_acid_min)) {
            d.citric_acid_min = d[i].citric_acid;
        }
        if(parseFloat(d[i].citric_acid) > parseFloat(d.citric_acid_max)) {
            d.citric_acid_max = d[i].citric_acid;
        }

        if(parseFloat(d[i].residual_sugar) < parseFloat(d.residual_sugar_min)) {
            d.residual_sugar_min = d[i].residual_sugar;
        }
        if(parseFloat(d[i].residual_sugar) > parseFloat(d.residual_sugar_max)) {
            d.residual_sugar_max = d[i].residual_sugar;
        }

        if(parseFloat(d[i].chlorides) < parseFloat(d.chlorides_min)) {
            d.chlorides_min = d[i].chlorides;
        }
        if(parseFloat(d[i].chlorides) > parseFloat(d.chlorides_max)) {
            d.chlorides_max = d[i].chlorides;
        }

        if(parseFloat(d[i].free_sulfur_dioxide) < parseFloat(d.free_sulfur_dioxide_min)) {
            d.free_sulfur_dioxide_min = d[i].free_sulfur_dioxide;
        }
        if(parseFloat(d[i].free_sulfur_dioxide) > parseFloat(d.free_sulfur_dioxide_max)) {
            d.free_sulfur_dioxide_max = d[i].free_sulfur_dioxide;
        }

        if(parseFloat(d[i].total_sulfur_dioxide) < parseFloat(d.total_sulfur_dioxide_min)) {
            d.total_sulfur_dioxide_min = d[i].total_sulfur_dioxide;
        }
        if(parseFloat(d[i].total_sulfur_dioxide) > parseFloat(d.total_sulfur_dioxide_max)) {
            d.total_sulfur_dioxide_max = d[i].total_sulfur_dioxide;
        }

        if(parseFloat(d[i].density) < parseFloat(d.density_min)) {
            d.density_min = d[i].density;
        }
        if(parseFloat(d[i].density) > parseFloat(d.density_max)) {
            d.density_max = d[i].density;
        }

        if(parseFloat(d[i].pH) < parseFloat(d.pH_min)) {
            d.pH_min = d[i].pH;
        }
        if(parseFloat(d[i].pH) > parseFloat(d.pH_max)) {
            d.pH_max = d[i].pH;
        }

        if(parseFloat(d[i].sulphates) < parseFloat(d.sulphates_min)) {
            d.sulphates_min = d[i].sulphates;
        }
        if(parseFloat(d[i].sulphates) > parseFloat(d.sulphates_max)) {
            d.sulphates_max = d[i].sulphates;
        }

        if(parseFloat(d[i].alcohol) < parseFloat(d.alcohol_min)) {
            d.alcohol_min = d[i].alcohol;
        }
        if(parseFloat(d[i].alcohol) > parseFloat(d.alcohol_max)) {
            d.alcohol_max = d[i].alcohol;
        }

        if(parseFloat(d[i].quality) < parseFloat(d.quality_min)) {
            d.quality_min = d[i].quality;
        }
        if(parseFloat(d[i].quality) > parseFloat(d.quality_max)) {
            d.quality_max = d[i].quality;
        }
    } // end for
}

