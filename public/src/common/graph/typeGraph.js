define([
  'common/graph/graph',
  'entities/pathCollection',
  'entities/pathModel',
  'entities/graphConfigModel',
  'd3'
  ],
function (graph, Paths, Path, Config, d3) {
  return function (options) {

    // Setup
    var lg = graph(options.config);

    lg.paths = options.paths || new Paths([new Path()]);
    lg.config = options.config || new Config();

    // Render
    var getXDomain = function () {
      var freq = lg.paths.first().get('logpages').first().get("frequence");
      return [lg.config.get('starttime') * freq, lg.config.get('length') * freq];
    };
    var getYDomain = function () {
      var ydomain = [lg.config.get("ymin"), lg.config.get("ymax")];
      return lg.paths.reduce(function (memo, d) {
        var domain = d3.extent(d.get('data'), function (v) { return v; });
        memo[0] = domain[0] < memo[0] ? domain[0] : memo[0];
        memo[1] = domain[1] > memo[1] ? domain[1] : domain[1];
        return memo;
      }, ydomain);
    };

    var setX = function () {
      var margin = lg.margin;
      var width = lg.width;
      return d3.scale.linear().domain(getXDomain()).range([0 + margin, width - margin]);
    };

    var setY = function () {
      var margin = lg.margin;
      var height = lg.height;
      return d3.scale.linear().domain(getYDomain()).range([0 + margin, height - margin]);
    };

    var defaultLine = function (x, y) {
      return d3.svg.line()
          .x(function (d, i) { return x(i); })
          .y(function (d) { return -1 * y(d); });
    };

    var addPathToGraph = function (graph, data, line, i) {
      return graph.append("svg:path")
          .attr("d", line(data))
          .attr("class", "stroke-color c"+i);
    };

    var removeLines = function () {
      _.each(lg.lines, function (line) {
        line.remove();
      });
    };

    var resetSize = function () {
      var width = lg.getWidth();
      var height = lg.getHeight();
      lg.svg.attr('width', width).attr('height', height);
      lg.graph.attr("transform", "translate("+0+", "+height+")");
      lg.width = width;
      lg.height = height;
    };

    // Orchestrate population
    lg.renderGraph = function () {
      removeLines();
      resetSize();
      if (lg.paths.length) {
        lg.x = setX();
        lg.y = setY();
        lg.line = defaultLine(lg.x, lg.y);
        lg.lines = lg.paths.map(function (path, idx) {
          return addPathToGraph(lg.graph, path.get("data"), lg.line, idx);
        });
      }
    };

    // Events
    lg.paths.on('add', function (path) {
      console.log("paths:add");
      //renderGraph();
    });

    lg.paths.on('change', function (path) {
      console.log("paths:change");
      lg.renderGraph();
    });

    lg.paths.on('remove', function (path) {
      console.log("paths:remove");
      console.log(path);
    });

    return lg;
  };
});
