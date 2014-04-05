define([
  'd3'
  ],
function (d3) {
  return function (lc) {
    var focus = lc.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    var line = focus.append("line")
        .attr("y1", 0)
        .attr("y2", lc.height);

    var circle = lc.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    circle.append("circle")
        .attr("r", 4.5);

    circle.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");

    var mousemove = function () {
      var x0 = lc.x.invert(d3.mouse(this)[0]);
      x0 = x0 - (x0 % 1);

      line.attr("x1", lc.x(x0)).attr("x2", lc.x(x0));
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

    return lc.svg.append("rect")
        .attr("class", "overlay")
        .attr("width", lc.width)
        .attr("height", lc.height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);
  };
});
