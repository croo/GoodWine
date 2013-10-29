function draw() {
  drawScatterplot(red_wines,"quality","alcohol");
  drawScatterplot(white_wines,"quality","alcohol");
}

function drawScatterplot(dataset,xValue,yValue) {

var margin = 10;
var w = 500,h = 500;
var xMax,xMin,yMax,yMin;

if(xValue == "quality") {
    xMin = 1;
    xMax = 10;
} else {
    xMax = d3.max(dataset, function(d) {return parseFloat(d[xValue]);});
    xMin = d3.min(dataset, function(d) {return parseFloat(d[xValue]);});
}
if(yValue == "quality") {
    yMin = 1;
    xMin = 10;
} else {
    yMax = d3.max(dataset, function(d) {return parseFloat(d[yValue]);});
    yMin = d3.min(dataset, function(d) {return parseFloat(d[yValue]);});
}

var xScale = d3.scale.linear().domain([xMin,xMax]).range([0+ margin,w - margin]);
var yScale = d3.scale.linear().domain([yMin,yMax]).range([0 + margin,h - margin]);


var svg = d3.select("#scatterplot")
            .append("svg")
            .attr("width",w)
            .attr("height",h);

    svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                        return xScale(d[xValue]);
                        })
                .attr("cy",function (d) {
                        return yScale(d[yValue]);
                        })
                .attr("r", 5);
}

