define([
    'backbone',

    // Views
    'graphControls/views/pathsView',
],
function (Backbone, PathsView) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;
      var paths = reqres.request('paths');

      var pathsview = this.renderPaths(region, paths);
    },
    renderPaths: function (region, paths) {
      var view = new PathsView({collection: paths});
      region.show(view);
      return view;
    },
  });
  return LogVizController;
});
