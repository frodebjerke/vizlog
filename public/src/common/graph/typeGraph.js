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

    var setX = function (xDomain) {
      var margin = lg.margin;
      var width = lg.width;
      return d3.scale.linear().domain(xDomain).range([0 + margin, width - margin]);
    };

    var setY = function (yDomain) {
      var margin = lg.margin;
      var height = lg.height;
      return d3.scale.linear().domain(yDomain).range([0 + margin, height - margin]);
    };

    var defaultLine = function (x, y) {
      return d3.svg.line()
          .x(function (d, i) { return x(i); })
          .y(function (d) { return -1 * y(d); });
    };

    var addPathToGraph = function (graph, path, line, i) {

      var focus = path.get('hasFocus') === true ? "focus" : "";

      return graph.append("svg:path")
          .attr("d", line(path.get('data')))
          .attr("class", "stroke-color c"+i+ " "+focus);
    };

    var removeThings = function (things) {
      _.each(things, function (thing) {
        thing.remove();
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

    var addXLines = function (xDomain, yDomain) {
      var numlines = 4;

      var yMin = yDomain[0];
      var yMax = yDomain[1];
      var gap = (yMax-yMin)/numlines;
      var arr = _.range(yMin,yMax, gap);
      arr.push(yMax);

      var ylines = [];
      _.forEach(arr, function (y, num) {
        ylines.push(lg.graph.append("svg:line")
          .attr("x1", lg.x(xDomain[0]))
          .attr("x2", lg.x(xDomain[1]))
          .attr("y1", -lg.y(y))
          .attr("y2", -lg.y(y)));

        ylines.push(lg.graph.append("svg:text")
          .attr("x", 0)
          .attr("y", -lg.y(y))
          .text(y.toFixed(3))
          .attr("text-anchor", "right")
          .attr("class", "xlabel"));
      });
      return ylines;
    };

    // Orchestrate population
    lg.renderGraph = function () {
      removeThings(lg.lines);
      removeThings(lg.ylines);
      resetSize();

      if (lg.paths.length) {
        var xDomain = getXDomain();
        var yDomain = getYDomain();
        lg.x = setX(xDomain);
        lg.y = setY(yDomain);
        lg.line = defaultLine(lg.x, lg.y);
        lg.lines = lg.paths.map(function (path, idx) {
          return addPathToGraph(lg.graph, path, lg.line, idx);
        });
        lg.ylines = addXLines(xDomain, yDomain);
      }
    };

    return lg;
  };
});
