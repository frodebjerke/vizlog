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
        var y = d3.scale.linear().domain(d3.extent(data,function (d) { return d; })).range([0+margin, height-margin]);

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

        var focus = vis.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");


        var mousemove = function () {
          var x0 = x.invert(d3.mouse(this)[0]);
          x0 = x0 - (x0 % 1);
          d0 = data[x0];
          focus.attr("transform", "translate("+x(x0)+","+ (height - y(d0))+")");
          focus.select("text").text("X: "+x0+ "\tY: "+d0);
        };

        vis.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);


      }
    };
});
