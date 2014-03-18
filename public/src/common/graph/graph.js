define([
  'd3'
  ],
function (d3) {
  return function (options) {
    var svg = function () {
      return d3.select(options.el)
          .append("svg:svg")
          .attr("width", options.width)
          .attr("height", options.height)
          .attr("class", "el-graph");
    }();

    var graph = function (svg, starty, stopy) {
      return svg.append("svg:g")
          .attr("transform", "translate("+starty+", "+stopy+")");
    }(svg, 0, options.height);

    return {
      svg: svg,
      graph: graph,
      width: options.width,
      height: options.height,
      margin: options.margin
    };
  };
});
