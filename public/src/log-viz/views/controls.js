define([
  'backbone.marionette',
  'hbs!log-viz/templates/controls'
  ], function (Marionette, ControlsTmpl) {
    return Marionette.ItemView.extend({
      template: ControlsTmpl
    });
  }
);
