define([
    'backbone',

    // Views
    'log-viz/views/controls'
],
function (Backbone, ControlsView) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
      this.view = this.renderControls();
    },
    renderControls: function () {
      var view = new ControlsView();
      this.region.show(view);
      return view;
    }
  });
  return LogVizController;
});
