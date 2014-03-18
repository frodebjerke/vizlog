define([
  'd3',
  'underscore'
  ],
function (d3, _) {
  var xdomain = function (data) {
    return [0, data[0].length];
  };

  var ydomain = function (data) {
    var res = _.reduce(data, function (memo, d) {
      var domain = d3.extent(d, function (v) { return v; });
      memo[0] = domain[0] < memo[0] ? domain[0] : memo[0];
      memo[1] = domain[1] > memo[1] ? domain[1] : domain[1];
      return memo;
    }, [0,0]);
    return res;
  };

  var setX = function (domain, width, margin) {
    return d3.scale.linear().domain(domain).range([0 + margin, width - margin]);
  };

  var setY = function (domain, height, margin) {
    return d3.scale.linear().domain(domain).range([0 + margin, height - margin]);
  };

  var defaultLine = function (x, y) {
    return d3.svg.line()
        .x(function (d, i) { return x(i); })
        .y(function (d) { return -1 * y(d); });
  };

  var addPathToGraph = function (graph, data, line) {
    return graph.append("svg:path")
        .attr("d", line(data));
  };

  return function (options) {
    var graph = options.graph;
    var width = graph.width;
    var height = graph.height;
    var margin = graph.margin;
    var data = options.data;

    var x = setX(xdomain(data), width, margin);
    var y = setY(ydomain(data), height, margin);

    var line = defaultLine(x, y);
    var paths = _.map(data, function (d) {
      return addPathToGraph(graph.graph, d, line);
    });

    return {
      changeData: function (index, values) { return console.log("not impl"); },
      get: function () { return this; }
    };
  };
});
