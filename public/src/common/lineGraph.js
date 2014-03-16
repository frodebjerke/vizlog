define([
  'd3',
  'underscore'
  ],
  function (d3, _) {
    return function (options) {
      if (options.page.values) {
        // serialize data
        var data = _.reduce(options.page.values, function (memo, b) {
          return memo.concat(_.toArray(b));
        }, []);

        var margin = 30;
        var width = 1400;
        var height = 500;

        var x = d3.scale.linear().domain([0, data.length]).range([0+margin, width-margin  ]);
        var y = d3.scale.linear().domain(d3.extent(data,function (d) { return d; })).range([0+margin, height]);

        var vis = d3.select(options.el)
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height);

        var g = vis.append("svg:g")
            .attr("transform", "translate(0, "+height+")");

        var line = d3.svg.line()
            .x(function (d, i) { return x(i);})
            .y(function (d) { return -1 * y(d); });

        g.append("svg:path").attr("d", line(data));

        g.append("svg:line")
            .attr("x1", x(0))
            .attr("x2", x(data.length))
            .attr("y1", - y(0))
            .attr("y2", - y(0));

        g.append("svg:line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y1", 0 - margin)
            .attr("y2", -height -margin);

        g.selectAll(".xLabel")
            .data(x.ticks(10))
            .enter().append("svg:text")
            .attr("class", "xLabel")
            .text(String)
            .attr("x", function(d) { return x(d); })
            .attr("y", 0)
            .attr("text-anchor", "middle");

        g.selectAll(".yLabel")
            .data(y.ticks(8))
            .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(String)
            .attr("x", 0)
            .attr("y", function(d) { return -1 * y(d); })
            .attr("text-anchor", "right")
            .attr("dy", 4);

        }
    };
});
