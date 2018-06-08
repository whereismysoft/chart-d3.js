var dataset = [
    {income: 30, outcome: 15},
    {income: 50, outcome: 10},
    {income: 45, outcome: 25}
];

var dataKeys = Object.keys(dataset[0]);

d3.select('body')
  .insert('svg');

var svg = d3.select('svg')
  .attr('width', '500')
  .attr('height', 800);

var gR = svg.selectAll('g')
  .data(dataset)
  .enter()
  .append('g')
    .style('transform', function(d, i) {
        return 'translateX(' + ((i * (30+10) * 2)) + 'px)';
    })

gR.append('rect')
  .attr('height', function(d, i) {
        return d.income;
  })
  .attr('width', 30)
    .style('fill', '#5c9a15')

gR.append('rect')
  .attr('height', function(d, i) {
    return d.outcome;
  })
  .attr('width', 30)
    .style('fill', '#d3323980')
    .style('transform', 'translateX(30px)');
