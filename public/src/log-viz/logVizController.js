define([
    'backbone',

    // Views
    'log-viz/views/controls',

    // Entities
    'entities/controls'
],
function (Backbone, ControlsView, Controls) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
      this.view = this.renderControls();
    },
    renderControls: function () {
      var controls = new Controls();
      var view = new ControlsView({model: controls});
      this.region.show(view);
      return view;
    }
  });
  return LogVizController;
});
