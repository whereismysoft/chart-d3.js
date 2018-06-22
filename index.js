var dataset = [
    {income: 30, outcome: 15, date: '1 august'},
    {income: 50, outcome: 10, date: '2 august'},
    {income: 45, outcome: 25, date: '3 august'},
    {income: 75, outcome: 40, date: '4 august'},
    {income: 50, outcome: 30, date: '5 august'},
    {income: 50, outcome: 45, date: '6 august'},
    {income: 75, outcome: 20, date: '7 august'},
    {income: 80, outcome: 60, date: '8 august'},
    {income: 50, outcome: 25, date: '9 august'},
];

var incomeArr = [],
  linearData = [];

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    // .paddingInner(0.4);

var x1 = d3.scaleBand()
    .padding(0.7);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#a05d56",]);

x0.domain(dataset.map(function(d) { return d.date; }));
x1.domain([0, dataset.length]).rangeRound([0, x0.bandwidth()]);

for (var i = 0; i < dataset.length; i++) {
  incomeArr.push(dataset[i].income);
  linearData.push({y: dataset[i].income / 2, x: i * x0.bandwidth()});
    linearData.push({y: dataset[i].outcome / 2, x: i * x0.bandwidth() + 2 * x1.bandwidth()});
}

y.domain([0, d3.max(incomeArr)]).nice();

var gR = g.append("g")
      .attr("transform", "translate(" + (x0(dataset[1].date)/2 - x1.bandwidth()) + ",0)")
    .selectAll("g")
    .data(dataset)
    .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

    gR.append("rect")
        .attr("x", function(d, i) { return 0; })
        .attr("y", function(d) { return y(d.income); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.income); })
        .attr("fill", function(d, i) { return z(0); });
    gR.append("rect")
        .attr("x",  x1.bandwidth())
        .attr("y", function(d) { return y(d.outcome); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.outcome); })
        .attr("fill", function(d, i) { return z(1); });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0))

    g.append("g")
        .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
        .attr("x", -50)
        .attr("y", y(y.ticks().pop()) - 15.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
      .text("MONEY MONEY MONEY");

var lineFunction = d3.line()
    .x(function(d, i) { return d.x})
    .y(function(d) { return y(d.y)})

var lineGraph = svg.select('g').select('g')
  .append("path")
      .attr("d", lineFunction(linearData))
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("fill", "none");

d3.select('body')
  .append('div')
    .attr('class', 'legend')
    .attr('id', 'legendId')   

var legend = d3.select('body')
  .select('div.legend')

var dot = svg
  .select('g')
  .select('g')
  .selectAll("dot")
    .data(linearData)
    .enter().append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return y(d.y); })
      .attr("class", "dot")
    .on("mouseover", function(d){
      var x = this.getAttribute('cx');
      var y = this.getAttribute('cy');

      document.getElementById('legendId').innerHTML = '<div>x :' + x + '</div><div> y: ' + y + '</div>';

      var legendPromise = new Promise( function(resolve, reject) {
        resolve( legend.style('display', 'flex') )
      })

      legendPromise.then(function(resolve) {
        legend.style('left', + x + 30 + 'px' )
        .style('top', + y - 45 + 'px')
        .style('opacity', '1')
      })

    })
    .on("mouseout", function(d){
      legend.style('opacity', '0')
      setTimeout(function() {
        legend.style('display', 'none')
      }, 300)
    })