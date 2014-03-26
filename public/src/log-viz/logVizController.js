define([
    'backbone',

    // Views
    'log-viz/views/graphView',
    'log-viz/views/pathsView',
    'log-viz/views/addPathView',
    'log-viz/views/navtoAddPathView',
    'log-viz/views/logVizLayout',
    'log-viz/views/configView',

    // Entities
    'entities/graphConfigModel',
    'entities/controlsModel',
    'entities/pathCollection'
],
function (Backbone, GraphView, PathsView, AddPathView, NavToAddPathView, Layout, ConfigView, Config, Controls, Paths) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;

      var config = new Config();
      var paths = new Paths();
      var controls = new Controls();
      this.layout = this.renderLayout();
      var configview = this.renderConfig(this.layout.config, config);
      var pathsview = this.renderPaths(this.layout.paths, paths);
      var addpathview = this.renderAddPath(this.layout.addpath, paths, config, controls);
      var graphview = this.renderGraph(this.layout.graph, paths, config);
    },
    renderLayout: function () {
      var layout = new Layout();
      this.region.show(layout);
      return layout;
    },
    renderConfig: function (region, config) {
      var view = new ConfigView({model: config});
      region.show(view);
      return view;
    },
    renderPaths: function (region, paths) {
      var view = new PathsView({collection: paths});
      region.show(view);
      return view;
    },
    renderAddPath: function (region, paths, config, controls) {
      var nav = new NavToAddPathView();
      var view = new AddPathView({paths: paths, config: config, controls: controls});
      region.show(nav);
      nav.on('addpath:do', function () {
        console.log('addpath:do')
        region.show(view);
      });
      view.on('addpath:submit', function () {
        console.log('addpath:submit')
        region.show(nav);
      }.bind(this));
    },
    renderNavToAddPath: function (region) {
      var view = new NavToAddPathView();
      region.show(view);
      return view;
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
