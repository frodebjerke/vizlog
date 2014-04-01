define([
    'backbone',

    // Views
    'graphControls/views/configView',
],
function (Backbone, ConfigView) {
  var configCtrl = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;

      var config = reqres.request('config');

      var configview = this.renderConfig(region, config);
    },
    renderConfig: function (region, config) {
      var view = new ConfigView({model: config});
      region.show(view);
      return view;
    },
  });
  return configCtrl;
});
