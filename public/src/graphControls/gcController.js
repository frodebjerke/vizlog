define([
    'backbone',

    // Controllers
    'graphControls/controllers/pathsController',
    'graphControls/controllers/addPathController',
    'graphControls/controllers/configController',

    // Views
    'graphControls/views/gcLayout'

    // Entities
],
function (Backbone, PathsCtrl, AddPathCtrl, ConfigCtrl, Layout) {
  var gcCtrl = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      this.reqres = options.reqres;

      var layout = this.renderLayout(region);
      var config = this.setConfigCtrl(layout.config);
      var addpath = this.setAddPathCtrl(layout.addpath);
      var paths = this.setPathsCtrl(layout.paths);
    },
    setConfigCtrl: function (region) {
      return new ConfigCtrl({
        region: region,
        reqres: this.reqres
      });
    },
    setPathsCtrl: function (region) {
      return new PathsCtrl({
        region: region,
        reqres: this.reqres
      });
    },
    setAddPathCtrl: function (region) {
      return new AddPathCtrl({
        region: region,
        reqres: this.reqres
      });
    },
    renderLayout: function (region) {
      var layout = new Layout();
      region.show(layout);
      return layout;
    },

  });
  return gcCtrl;
});
