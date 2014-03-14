define([
  'backbone.marionette',
  'hbs!log-viz/templates/logVizTmpl'
  ],
  function (Marionette, Tmpl) {
    var Layout = Marionette.Layout.extend({
      template: Tmpl,
      regions: {
        controls: '#controls-region',
        user: "#user-region",
        graph: '#graph-region'
      },
      initialize: function (options) {
      }
    });
    return Layout;
  });
