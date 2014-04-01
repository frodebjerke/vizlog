define([
  'backbone.marionette',
  'hbs!graphControls/templates/gcLayoutTmpl'
  ],
  function (Marionette, Tmpl) {
    var Layout = Marionette.Layout.extend({
      template: Tmpl,
      className: "col-lg-3",
      regions: {
        config: '#config-region',
        paths: "#paths-region",
        addpath: "#addpath-region"
      },
    });
    return Layout;
  });
