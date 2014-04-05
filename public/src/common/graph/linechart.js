define([
  'd3'
  ],
function (d3) {

  var getWidth = function (el) {
    return $(el).width();
  };

  var getHeight = function (el) {
    var width = getWidth(el);
    return Math.floor(width / 2);
  };

  var addPathToChart = function (graph, line, i) {
    //var focus = path.get('hasFocus') === true ? "focus" : "";
    return graph.append("svg:path")
        .attr("d", line)
        .attr("class", "stroke-color c"+i); //+ " "+focus);
  };

  return {
    setX: function (xDomain, margin, el) {
      var width = getWidth(el);
      return d3.scale.linear().domain(xDomain).range([0 + margin, width - margin]);
    },
    setY: function (yDomain, margin, el) {
      var height = getHeight(el);
      return d3.scale.linear().domain(yDomain).range([0 + margin, height - margin]);
    },
    defaultLine:function (x, y) {
      return d3.svg.line()
          .x(function (d, i) { return x(i); })
          .y(function (d) { return -1 * y(d); });
    },
    addSvg: function (el) {
      var width = getWidth(el);
      var height = getHeight(el);

      return d3.select(el)
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "el-linegraph");
    },
    addChart: function (svg, el) {
      var stopy = getHeight(el);
      return svg.append("svg:g")
          .attr("transform", "translate("+0+", "+stopy+")");
    },
    addPathsToChart: function (chart, data, line) {
      data.map(function (datum, idx) {
        return addPathToChart(chart, line(datum), idx);
      });
    },
    addYLinesAndLabels: function (chart, xDomain, yDomain, x, y) {
      var numlines = 4;

      var yMin = yDomain[0];
      var yMax = yDomain[1];
      var gap = (yMax-yMin)/numlines;
      var arr = _.range(yMin,yMax, gap);
      arr.push(yMax);

      var ylines = [];
      _.forEach(arr, function (dx, num) {
        ylines.push(chart.append("svg:line")
          .attr("x1", x(xDomain[0]))
          .attr("x2", x(xDomain[1]))
          .attr("y1", -y(dx))
          .attr("y2", -y(dx)));

        ylines.push(chart.append("svg:text")
          .attr("x", 0)
          .attr("y", -y(dx))
          .text(dx.toFixed(3))
          .attr("text-anchor", "right")
          .attr("class", "xlabel"));
      });
      return ylines;
    },
    showValuesOnHover: function (el, chart, x) {
      var width = getWidth(el),
          height = getHeight(el);

      var focus = chart.append("g")
          .attr("class", "focus")
          .style("display", "none");

      var line = focus.append("line")
          .attr("y1", 0)
          .attr("y2", height);

      var circle = chart.append("g")
          .attr("class", "focus")
          .style("display", "none");

      circle.append("circle")
          .attr("r", 4.5);

      circle.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      var mousemove = function () {
        var x0 = x.invert(d3.mouse(this)[0]);
        x0 = x0 - (x0 % 1);

        line.attr("x1", x(x0)).attr("x2", x(x0));
        circle.style("display", "none");
        // lg.paths.map(function (path) {
        //   if (path.get('hasFocus')) {
        //     var y = path.get('data')[x0];
        //     circle.attr("transform", "translate("+lg.x(x0)+","+ (lg.height - lg.y(y))+")");
        //     circle.select("text").text("X: "+x0+ "\tY: "+y);
        //     circle.style("display", null);
        //   }
        // });
      };

      chart.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);
    }
  };
});
