var w = 630,h = 630;
var svg;

    var scatterplotX;
    var scatterplotY;

function drawScatterplot(dataset,xValue,yValue) {
    svg = svg || d3.select("#scatterplot")
                            .append("svg")
                            .attr("width",w)
                            .attr("height",h);

    var padding = 30;
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
        yMax = 10;
    } else {
        yMax = d3.max(dataset, function(d) {return parseFloat(d[yValue]);});
        yMin = d3.min(dataset, function(d) {return parseFloat(d[yValue]);});
    }

    var xScale = d3.scale.linear().domain([xMin,xMax]).range([0 + padding,w - padding]).nice();
    var yScale = d3.scale.linear().domain([yMin,yMax]).range([h - padding,0 + padding]).nice();

    $("#scatterplot svg").empty();
    var circles = svg.selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                            return xScale(d[xValue]);
                            })
                    .attr("cy",function (d) {
                            return yScale(d[yValue]);
                            })
                    .attr("r", function (d) { return Math.pow(d["quality"]/2,1.8);}) // exponential sizing for great good
                    .attr("class",function(d){return d.type=="red"?"red_wine":"white_wine";});

    var xAxis = d3.svg.axis().scale(xScale).orient("top");
    var yAxis = d3.svg.axis().scale(yScale).orient("right");
    svg.append("g")
        .attr("class","axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class","axis")
        .call(yAxis);
}

// wire events
$(document).ready(function() {

    scatterplotX = wines.columns[0];
    scatterplotY = wines.columns[6];

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

    // checkbox before scatterplot for red and white wine data
    $("#dataset_selectbox input").change(function() {
        $("#dataset_selectbox input").each(function(i,checkbox) {
            if(checkbox.checked) {
                $("."+checkbox.name).show();
                wines[checkbox.value].visible = true;
            } else {
                $("." + checkbox.name).hide();
                wines[checkbox.value].visible = false;
            }
        });
    });
});
