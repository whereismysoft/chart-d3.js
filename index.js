var dataset = [
    {income: 30, outcome: 15, date: '1 august'},
    {income: 50, outcome: 10, date: '2 august'},
    {income: 45, outcome: 25, date: '3 august'},
    {income: 75, outcome: 40, date: '4 august'},
    {income: 50, outcome: 30, date: '5 august'},
    {income: 75, outcome: 40, date: '4 august'}
];

var linearData = [];
var incomeArr = [];
var outcomeArr = [];

var svgHeight = 200;
var svgWidth = 500;

d3.select('body')
  .insert('svg');

var svg = d3.select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
    .style('transform', 'rotateX(180deg)');

var groupWidth = svgWidth / dataset.length;
var spaceBetweenGroups = 10;
var chartsWidth = groupWidth - ( 2 * spaceBetweenGroups );
var chartWidth = chartsWidth / 2;

for (var i = 0; i < dataset.length; i++) {
  incomeArr.push(dataset[i].income);
  outcomeArr.push(dataset[i].outcome);
  linearData.push({y: dataset[i].income, x: (i * groupWidth) + spaceBetweenGroups });
  linearData.push({y: dataset[i].outcome, x: (i * groupWidth) + spaceBetweenGroups + chartsWidth });
}

var yScale = d3.scaleLinear()
    .domain([0, d3.max(incomeArr)])
    .range([0, svgHeight]);

var xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, svgWidth]);

var x_axis = d3.axisBottom().scale(xScale);

var y_axis = d3.axisLeft().scale(yScale);

var gR = svg.selectAll('g')
  .data(dataset)
  .enter()
  .append('g')
    .style('padding', 10)
    .style('transform', function(d, i) {
        return 'translateX(' + ((i * (groupWidth)) + spaceBetweenGroups) + 'px)';
    })

gR.append('rect')
  .attr('height', function(d, i) {
        return yScale(d.income) ;
  })
  .attr('width', chartWidth)
    .style('fill', '#5c9a15')

gR.append('rect')
  .attr('height', function(d, i) {
    return yScale(d.outcome);
  })
  .attr('width', chartWidth)
    .style('fill', '#d3323980')
    .style('transform', 'translateX('+ chartWidth +'px)');

svg.append("g")
    .attr("transform", "translate(0, 0)")
    .call(y_axis);

svg.append("g")
    .attr("transform", "translate(0, 0)")
    .call(x_axis);

var lineFunction = d3.line()
    .x(function(d, i) { return d.x })
    .y(function(d) { return yScale(d.y)})

var lineGraph = svg.append("path")
            .attr("d", lineFunction(linearData))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none");