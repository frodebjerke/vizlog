define([
  'd3'
  ],
function (d3) {
  return function (config) {
    var el = config.get('el'),
        margin = config.get('margin');
    console.log($(el));
    var getWidth = function () {
      return $(el).width();
    };

    var getHeight = function () {
      return Math.floor(getWidth() / 2);
    };

    var width = getWidth();
    var height = getHeight();

    var svg = function () {
      return d3.select(el)
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "el-linegraph");
    }();

    var graph = function (svg, starty, stopy) {
      return svg.append("svg:g")
          .attr("transform", "translate("+starty+", "+stopy+")");
    }(svg, 0, height);

    return {
      svg: svg,
      graph: graph,
      width: width,
      height: height,
      margin: margin,
      getWidth: getWidth,
      getHeight: getHeight
    };
  };
});
