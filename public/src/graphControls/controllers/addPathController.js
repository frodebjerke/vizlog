define([
    'backbone',

    // Views
    'graphControls/views/addPathView',
    'graphControls/views/navtoAddPathView',

    // Entities
    'entities/pathModel'
],
function (Backbone, AddPathView, NavToAddPathView, Path) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;

      this.paths = reqres.request('paths');
      this.logpages = reqres.request('logpages');
      var config = reqres.request('config');
      var controls = reqres.request('controls');

      var addpathview = this.renderAddPath(region, this.paths, config, controls);
      addpathview.on("addpath:submit", this.addPath.bind(this));
    },
    renderAddPath: function (region, paths, config, controls) {
      var nav = new NavToAddPathView();
      var view = new AddPathView({paths: paths, config: config, controls: controls});

      region.show(nav);

      nav.on('addpath:do', function () {
        region.show(view);
      });
      view.on('addpath:submit', function () {
        region.show(nav);
      }.bind(this));
      return view;
    },
    renderNavToAddPath: function (region) {
      var view = new NavToAddPathView();
      region.show(view);
      return view;
    },
    addPath: function (pathConf) {
      pathConf.logpages = this.logpages;
      var path = new Path(pathConf);
      this.paths.add(path);
    }
  });
  return LogVizController;
});
