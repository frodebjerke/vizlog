define([
  'backbone.marionette',
  'hbs!graph/templates/graphTmpl',
  'common/graph/linechart',
  'd3'
  ],
function (Marionette, Tmpl, linechart, d3) {
  var monitorWindowSize = function (trigger) {
    $(window).on("resize", function () {
      trigger('graphview:resize');
    }.bind(this));
  };

  var renderChart = function (model) {
    var data = model.getDataPaths();

    if (data.length > 0) {
      var el = "#graph",
          xDomain = model.getXDomain(),
          yDomain = model.getYDomain(),
          margin = model.getMargin();

      var svg = linechart.addSvg(el);
      var chart = linechart.addChart(svg, el);
      var x = linechart.setX(xDomain, margin, el);
      var y = linechart.setY(yDomain, margin, el);
      var line = linechart.defaultLine(x, y);
      var lines = linechart.addPathsToChart(chart, data, line);
      var ylines = linechart.addYLinesAndLabels(chart, xDomain, yDomain, x, y);
      linechart.showValuesOnHover(el, svg, x);
    }
    else {
      console.log("no data, chart not rendered.");
    }
  };

  return Marionette.ItemView.extend({
      template: Tmpl,
      className: "col-lg-9",
      initialize: function () {
        monitorWindowSize(this.trigger);
      },
      onRender: function () {
        renderChart(this.model);
      }
  });
});
