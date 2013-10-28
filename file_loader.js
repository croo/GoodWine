var red_wine;
var white_wine;

$(document).ready(function(){

    $.get("wine/wine_red.csv",
            function(data){
                red_wine = $.csv.toObjects(data);
                drawScatterplot(red_wine);
            },
        "text"
    );

    $.get("wine/wine_white.csv",
            function(data){
                white_wine = $.csv.toObjects(data);
                drawScatterplot(white_wine);
            },
        "text"
    );
});
