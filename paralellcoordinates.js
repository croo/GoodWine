
var paralell_width = window.innerWidth-40,
    paralell_height = 520,
    padding = 60;

var p_svg;


function drawParalellCoordinates(dataset) {
    p_svg = d3.select("#paralell")
        .append("svg")
        .attr("width",paralell_width)
        .attr("height",paralell_height);


    var xScale = d3.scale.ordinal()
            .domain(wines.columns)
            .rangePoints([paralell_width - padding,0+padding]);
    var yScale = createYScales(dataset);

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
