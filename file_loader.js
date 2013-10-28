
$(document).ready(function(){
    $.get("wine/wine_red.csv", success, "text");
    $.get("wine/wine_white.csv", success, "text");
});

function success(data) {
    dataset = $.csv.toObjects(data);
    drawScatterplot(dataset);
}
