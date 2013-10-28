
var w = 500,h = 100;

var dataset = [{"x":10,"y":50},{"x":20,"y":10}]

var svg = d3.select("#scatterplot")
            .append("svg")
            .attr("width",w)
            .attr("height",h);

    svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                        return d.x;
                        })
                .attr("cy",function (d) {
                        return d.y;
                        })
                .attr("r", 5);
