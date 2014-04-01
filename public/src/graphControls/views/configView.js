define([
  'backbone.marionette',
  'hbs!graphControls/templates/configTmpl'
  ], function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      className: 'col-xs-12',
      initialize: function (options) {
        console.log(this.model)
      },
      events: {
      },

    });
  }
);
