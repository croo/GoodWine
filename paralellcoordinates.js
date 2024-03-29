
var paralell_width = window.innerWidth-60,
    paralell_height = 520,
    padding = 60;

var p_svg;

var xScale,yScale;

var lineFunction = d3.svg.line()
            .x(function(d){return d.x;})
            .y(function(d){return d.y;})
            .interpolate("linear");

function drawParalellCoordinates(dataset) {
    p_svg = d3.select("#paralell")
        .append("svg")
        .attr("width",paralell_width)
        .attr("height",paralell_height);


     xScale = d3.scale.ordinal()
            .domain(wines.columns)
            .rangePoints([paralell_width - padding,0+padding]);
    yScale = createYScales(dataset);

    var axis = d3.svg.axis().orient("right").ticks(7);

    var g = p_svg.selectAll(".dimension")
        .data(wines.columns)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

    g.append("g")
        .attr("class","axis p_axis")
        .each(function(d) {
           d3.select(this).call(axis.scale(yScale[d]));
        })
        .append("text")
            .attr("text-anchor", "middle")
            .attr("class","p_axis_label")
            .attr("x",10)
            .attr("y",function(d,i){ return i%2 ? 30 : 10;})
            .text(function(d){return d.replace(/_/g,"\n");});

        var lines = p_svg.append("g")
            .attr("class","lines")
            .selectAll("path")
            .data(dataset).enter()
            .append("path")
            .attr("d", function(d){return lineFunction(lineData(d));})
            .attr("class",function(d){return (d.type=="red"?"red_wine":"white_wine") +" q"+d.quality;})
            .style("stroke-width",1)
            .style("stroke-opacity",0.2)
            .style("stroke","lavender")
            .style("fill","none");
    updateParallelVisibility();
}

function updateParallelVisibility(toggled_checkbox) {
    if(! toggled_checkbox) { // redraw everything
        $("#dataset_selectbox input").each(function(i,checkbox) {
            if(checkbox.checked) {
                $("#paralell .lines ."+checkbox.name).show();
                wines[checkbox.value].visible = true;
                updateParallelQualityVisibility("."+checkbox.name);
            } else {
                $("#paralell .lines ." + checkbox.name).hide();
                wines[checkbox.value].visible = false;
            }
        });
    } else if(toggled_checkbox.name == "quality") { //else if it's a quality toggle
        if(wines["red"].visible){
            updateParallelQualityVisibility(".red_wine",".q"+toggled_checkbox.value,toggled_checkbox.checked);
        }
        if(wines["white"].visible){
            updateParallelQualityVisibility(".white_wine",".q"+toggled_checkbox.value,toggled_checkbox.checked);
        }
    } else { // else it's a wine toggle.
            wines[toggled_checkbox.value].visible = toggled_checkbox.checked;
        $("#quality_selectbox input").each(function(i,quality_checkbox) {
            if(quality_checkbox.checked) {
                updateParallelWineVisibility("."+toggled_checkbox.name,".q"+quality_checkbox.value,toggled_checkbox.checked);
            }
        });
    }
}

function updateParallelWineVisibility(wineType,quality,wineOn) {
    if(wineOn) {
            $("#paralell .lines").find(wineType+quality).show()
                                    .css({"stroke":wineType ==".red_wine"?"red":"goldenrod","stroke-opacity":"0.8"});
    } else {
            var bg_visibility = $("#bg_checkbox")[0].checked ? "0.1": "0";
            $("#paralell .lines").find(wineType+quality)
                                    .css({"stroke":"silver","stroke-opacity":bg_visibility});
    }
}

function updateParallelQualityVisibility(wineType,quality,qualityOn){
    var bg_visibility = $("#bg_checkbox")[0].checked ? "0.1": "0";
    if(! quality || ! qualityOn) { // redraw everything
        $("#quality_selectbox input").each(function(i,checkbox) {
            if(checkbox.checked) {
                $("#paralell .lines").find(wineType+".q"+checkbox.value)
                                    .css({"stroke":wineType ==".red_wine"?"red":"goldenrod","stroke-opacity":"0.8"});
            } else {
                $("#paralell .lines").find(".q"+checkbox.value)
                                    .css({"stroke":"silver","stroke-opacity":bg_visibility});
            }
        });
    } else {
        if(qualityOn) {
            $("#paralell .lines").find(wineType+quality)
                                    .css({"stroke":wineType ==".red_wine"?"red":"goldenrod","stroke-opacity":"0.8"});
        } else {
            $("#paralell .lines").find(wineType+quality)
                                    .css({"stroke":"silver","stroke-opacity":bg_visibility});
        }
    }
}

function lineData(d) {
           var path =  wines.columns.map( function(p){
                    return {"x":xScale(p),"y":yScale[p](d[p])};
                    });
           return path;
}

function createYScales(dataset) {
    var yScale = {};
    for (var i = 0; i < wines.columns.length; i++) {

        var max = wines.columns[i] == "quality" ? 10 : d3.max(dataset, function(d) {
            return parseFloat(d[wines.columns[i]]);
        });
        var min = wines.columns[i] == "quality" ? 1 : d3.min(dataset, function(d) {
            return parseFloat(d[wines.columns[i]]);
        });
        yScale[wines.columns[i]] = d3.scale.linear()
                    .domain([min,max])
                    .range([paralell_height - padding,0 + padding])
                    .nice();
    }
    return yScale;
}
