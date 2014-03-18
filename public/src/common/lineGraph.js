define([
  'd3',
  'underscore'
  ],
  function (d3, _) {
    return function (options) {
      // Required for init
      this.el = options.el;

      // Parameters
      this.margin = options.margin || 30;
      this.width = options.width || 1400;
      this.height = options.height || 500;

      this.xticks = options.xticks || function () { return this.x.ticks(7); };
      this.yticks = options.yticks || function () { return this.y.ticks(10); };

      // Overwriteable functions
      this.xdomain = options.xdomain || function (data) {
        return [0, data.length];
      };
      this.ydomain = options.ydomain || function (data) {
        return d3.extent(data, function (d) { return d; });
      };

      this.createLineGraph = options.createLineGraph || function (data) {
        this.y = setX(data);
        this.x = setY(data);
        this.setSvg();
        this.graph = this.addGraph(0, this.height);
        this.lineGraphLayout();
        this.showValuesOnHover();
      };



      // Should prob not overwrite
      this.setX = function (data) {
        return d3.scale.linear().domain(this.xdomain(data)).range([0 + this.margin, this.width - this.margin]);
      };
      this.setY = function (data) {
        return d3.scale.linear().domain(this.ydomain(data)).range([0 + this.margin, this.height - this.margin]);
      };

      this.line = function (data) {
        return d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d) { return -1 * y(d); });
      };

      this.addPathToGraph = function (data) {
        return this.graph.append("svg:path")
            .attr("d", this.line(data));
      };

      this.changeDataInPath = function (path, data) {
        path.attr("d", this.line(data));
      };

      //
      // LINE GRAPH LAYOUT AREA
      this.lineGraphLayout = function () {
        this.addXLine();
        this.addYLine();

        this.addXLabels();
        this.addYLabels();
      };

      this.addXLine = function () {
        this.graph.append("svg:line")
            .attr("x1", this.x(this.xdomain[0]))
            .attr("x2", this.x(this.xdomain[1]))
            .attr("y1", y(0))
            .attr("y2", y(0));
      };

      this.addYLine = function () {
        this.graph.append("svg:line")
            .attr("x1", this.x(0))
            .attr("x2", this.x(0))
            .attr("y1", 0 - this.margin)
            .attr("y2", - this.height - this.margin);
      };

      this.addXLabels = function () {
        var ticks = this.xticks();
        this.graph.selectAll(".xLabel")
            .data(ticks)
            .enter().append("svg:text")
            .attr("class", "xLabel")
            .text(String)
            .attr("x", function(d) { return this.x(d); })
            .attr("y", 0)
            .attr("text-anchor", "middle");
      };


      this.addYLabels = function () {
        var ticks = this.yticks();
        this.graph.selectAll(".yLabel")
            .data(ticks)
            .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(String)
            .attr("x", 0)
            .attr("y", function(d) { return -1 * y(d); })
            .attr("text-anchor", "right")
            .attr("dy", 4);
      };

      this.showValuesOnHover = function (data) {
        var focus = this.svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        var mousemove = function () {
          var x0 = this.x.invert(d3.mouse(this)[0]);
          x0 = x0 - (x0 % 1);
          d0 = data[x0];
          focus.attr("transform", "translate("+this.x(x0)+","+ (this.height - this.y(d0))+")");
          focus.select("text").text("X: "+x0+ "\tY: "+d0);
        };

        this.svg.append("rect")
            .attr("class", "overlay")
            .attr("width", this.width)
            .attr("height", this.height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
      };

      return this;
    };
});
