define([
    'backbone',

    // Views
    'log-viz/views/graphView',
    'log-viz/views/logVizLayout',

    // Entities
    'entities/graphConfigModel',
    'entities/pathCollection'
],
function (Backbone, GraphView, Layout, Config, Paths) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;

      var config = new Config();
      var paths = new Paths();
      this.layout = this.renderLayout();
      var configview = this.renderConfig(this.layout.config, config);
      var pathsview = this.renderPaths(this.layout.paths, paths);
      var graphview = this.renderGraph(this.layout.graph, paths, config);
    },
    renderLayout: function () {
      var layout = new Layout();
      this.region.show(layout);
      return layout;
    },
    renderConfig: function (config) {

    },
    renderPaths: function (paths) {

    },
    renderGraph: function (region, paths, config) {
      var model = new Backbone.Model({config: config, paths: paths});
      var view = new GraphView({model: model});
      region.show(view);
      return view;
    },
  });
  return LogVizController;
});
