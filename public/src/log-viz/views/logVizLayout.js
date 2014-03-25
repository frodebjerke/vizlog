define([
  'backbone.marionette',
  'hbs!log-viz/templates/logVizTmpl'
  ],
  function (Marionette, Tmpl) {
    var Layout = Marionette.Layout.extend({
      template: Tmpl,
      className: "row",
      regions: {
        config: '#config-region',
        paths: "#paths-region",
        addpath: "#addpath-region",
        graph: '#graph-region'
      },
      initialize: function (options) {
      }
    });
    return Layout;
  });
