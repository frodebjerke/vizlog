define([
  'backbone.marionette',
  'hbs!graph/templates/graphTmpl',
  'common/linechart/linechart',
  'common/linechart/hover',
  'd3'
  ],
function (Marionette, Tmpl, linechart, hover, d3) {
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

      var lc = linechart({
        el: el,
        margin: margin,
        xDomain: xDomain,
        yDomain: yDomain,
        data: data
      });
      var hoveroverlay = hover(lc);
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
