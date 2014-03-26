define([
  'backbone.marionette',
  'hbs!log-viz/templates/configTmpl'
  ], function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      className: 'row',
      initialize: function (options) {
        console.log(this.model)
      },
      events: {
      },

    });
  }
);
