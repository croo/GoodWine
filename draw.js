function drawScatterplot(dataset) {

var w = 500,h = 500;

var svg = d3.select("#scatterplot")
            .append("svg")
            .attr("width",w)
            .attr("height",h);

    svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                        return d.alcohol*20;
                        })
                .attr("cy",function (d) {
                        return d.quality*50;
                        })
                .attr("r", 5);
}

