
var paralell_width = window.innerWidth-40,
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

    var background_lines = p_svg.append("g")
                                .attr("class","background_lines")
                                .selectAll("path")
                                .data(dataset).enter()
                                .append("path")
                                .attr("d", function(d){return lineFunction(lineData(d));})
                                .style("stroke-width",1)
                                .style("stroke","grey")
                                .style("fill","none");

    /*var foreground_lines = p_svg.append("g")
                                .attr("class","foreground_lines")
                                .selectAll("path")
                                .data(dataset).enter()
                                .append("path");
                                .attr("d", getLine);*/
}

var i = 0;
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
