var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var xValue = function(d) { return d.poverty;}, 
    xScale = d3.scale.linear().range([0, width]), 
    xMap = function(d) { return xScale(xValue(d));}, 
    xAxis = d3.svg.axis().scale(xScale).tickFormat(function(d) { return d + "%"; }).orient("bottom");


var yValue = function(d) { return d.healthcare;}, 
    yScale = d3.scale.linear().range([height, 0]), 
    yMap = function(d) { return yScale(yValue(d));}, 
    yAxis = d3.svg.axis().scale(yScale).tickFormat(function(d) { return d + "%"; }).orient("left");



var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.csv("assets/data/data.csv", function(error, data) {

  
  data.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
//    console.log(d);
  });

  
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("% In Poverty");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("% Lacks Healthcare");

 

var dots = svg.selectAll("g.dot")
              .data(data)
              .enter().append('g');

dots.append("circle")
      .attr("class", "dot")
      .attr("r", "10")
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr('stroke','black')
      .attr('stroke-width',1)
      .style("fill", "salmon") 
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') 
      .text(function (d) { return d.state +":"+
                           '\nPercent in Poverty: ' + (d.poverty) +"%"+
                           '\nPercent lacking Healthcare: ' + (d.healthcare) +"%"});

dots.append("text").text(function(d){
    return d.abbr;
    })
    .attr("x", xMap)
    .attr("y", yMap)
});

