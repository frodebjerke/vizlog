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

  var setX = function (xDomain, margin, el) {
    var width = getWidth(el);
    return d3.scale.linear().domain(xDomain).range([0 + margin, width - margin]);
  };
  var setY = function (yDomain, margin, el) {
    var height = getHeight(el);
    return d3.scale.linear().domain(yDomain).range([0 + margin, height - margin]);
  };
  var defaultLine = function (x, y) {
    return d3.svg.line()
        .x(function (d, i) { return x(i); })
        .y(function (d) { return -1 * y(d); });
  };
  var addSvg = function (el) {
    var width = getWidth(el);
    var height = getHeight(el);

    return d3.select(el)
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "el-linegraph");
  };
  var addChart = function (svg, el) {
    var stopy = getHeight(el);
    return svg.append("svg:g")
        .attr("transform", "translate("+0+", "+stopy+")");
  };
  var addPathsToChart = function (chart, data, line) {
    data.map(function (datum, idx) {
      return addPathToChart(chart, line(datum), idx);
    });
  };
  var addYLinesAndLabels = function (chart, xDomain, yDomain, x, y) {
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
  };


  return function (options) {
    var el = options.el,
        margin = options.margin,
        xDomain = options.xDomain,
        yDomain = options.yDomain,
        data = options.data,
        width = getWidth(el),
        height = getHeight(el);

    var svg = addSvg(el);
    var chart = addChart(svg, el);
    var x = setX(xDomain, margin, el);
    var y = setY(yDomain, margin, el);
    var line = defaultLine(x, y);
    var lines = addPathsToChart(chart, data, line);
    var ylines = addYLinesAndLabels(chart, xDomain, yDomain, x, y);

    return {
      height: height,
      width: width,
      data: data,
      xDomain: xDomain,
      svg: svg,
      chart: chart,
      x: x,
      y: y,
      line: lines
    };
  };
});
