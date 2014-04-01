define([
    'backbone',

    // Modules
    'graph/graph',
    'graphControls/graphControls'
],
function (Backbone, Graph, GraphControls) {
  var MainController = Backbone.Marionette.Controller.extend({
    common: function () {
      this.graphModule();
      this.graphControlsModule();
    },
    graphModule: function () {
      Vizlog.module('graphmodule', Graph);
    },
    graphControlsModule: function () {
      Vizlog.module('graph-controls', GraphControls);
    }
  });
  return MainController;
});
