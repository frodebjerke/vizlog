define([
  'backbone.marionette',
  'hbs!log-viz/templates/userTmpl',
  ], function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {
        console.log("user view created");
      }
    });
});
