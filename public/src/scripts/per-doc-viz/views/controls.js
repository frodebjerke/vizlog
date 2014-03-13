define([
  'backbone.marionette',
  'hbs!per-doc-viz/templates/controls'
  ], function (Marionette, ControlsTmpl) {
    return Marionette.ItemView.extend({
      template: ControlsTmpl
    });
  }
);
