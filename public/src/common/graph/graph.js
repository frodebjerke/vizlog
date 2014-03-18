define([
  'd3'
  ],
function (d3) {
  return function (config) {
    var el = config.get('el'),
        width = config.get('width'),
        height = config.get('height'),
        margin = config.get('margin');

    var svg = function () {
      return d3.select(el)
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "el-graph");
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
      margin: margin
    };
  };
});
