define([
    'backbone',

    // Modules
    'per-doc-viz/perDocViz'
],
function (Backbone, PerDocViz) {
  var MainController = Backbone.Marionette.Controller.extend({
    perDocViz: function () {
      Vizlog.module('per-doc-viz', PerDocViz, Vizlog.main).start();
    }
  });
  return MainController;
});
