define([
  'backbone.marionette',
  'hbs!log-viz/templates/addPathTmpl'
  ], function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {
        this.paths = options.paths;
      },
      events: {
        'click button' : 'addPath'
      },
      addPath: function (e) {
        this.paths.addPath({

        });
      }
    });
  }
);
