define([
  'backbone.marionette',
  'hbs!graphControls/templates/configTmpl'
  ], function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      className: 'col-xs-12',
      initialize: function (options) {
      },
      events: {
        'click .zoom-minus' : 'zoomMinus',
        'click .zoom-plus' : 'zoomPlus'
      },
      zoomMinus: function () {
        this.zoom(10);
      },
      zoomPlus: function () {
        this.zoom(-10);
      },
      zoom: function (d) {
        var length = this.model.get("length");
        this.model.set("length", length + d);
        this.render();
      }
    });
  }
);
