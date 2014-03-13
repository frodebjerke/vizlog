define([
    'backbone',

    // Views
    'log-viz/views/controls',
    'log-viz/views/logVizLayout',

    // Entities
    'entities/controls'
],
function (Backbone, ControlsView, Layout, Controls) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
      this.layout = this.renderLayout();
      this.renderControls(this.layout.controls);
    },
    renderLayout: function () {
      var layout = new Layout();
      this.region.show(layout);
      return layout;
    },
    renderControls: function (region) {
      var controls = new Controls();
      var view = new ControlsView({model: controls});
      region.show(view);
      return view;
    }
  });
  return LogVizController;
});
