define([
  'backbone.marionette',
  'hbs!log-viz/templates/logViz'
  ],
  function (Marionette, Tmpl) {
    var Layout = Marionette.Layout.extend({
      template: Tmpl,
      regions: {
        controls: '#controls-region',
        graph: '#graph-region'
      },
      initialize: function (options) {
        console.log("hello");
      }
    });
    return Layout;
  });
