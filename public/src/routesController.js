define([
    'backbone',

    // Modules
    'log-viz/logViz'
],
function (Backbone, LogViz) {
  var MainController = Backbone.Marionette.Controller.extend({
    logVizModule: function () {
      Vizlog.module('per-doc-viz', LogViz, Vizlog.main).start();
    }
  });
  return MainController;
});
