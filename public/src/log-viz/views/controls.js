define([
  'backbone.marionette',
  'hbs!log-viz/templates/controls'
  ], function (Marionette, ControlsTmpl) {
    return Marionette.ItemView.extend({
      template: ControlsTmpl,
      initialize: function (options) {
        this.model.fetch();

        this.listenTo(this.model, "change:user", function () {
          this.render();
          console.log(this.model);
        });
      },
      events: {
        'change select' : 'changeUser'
      },
      changeUser: function (e) {
        var selectedUser = e.currentTarget.value;
        this.model.set('user', selectedUser);
      }
    });
  }
);
