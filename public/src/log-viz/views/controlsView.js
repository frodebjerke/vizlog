define([
  'backbone.marionette',
  'hbs!log-viz/templates/controlsTmpl',
  'underscore'
  ], function (Marionette, ControlsTmpl, _) {
    return Marionette.ItemView.extend({
      template: ControlsTmpl,
      initialize: function (options) {

        this.listenTo(this.model, "change", function () {
          this.render();
        });
      },
      events: {
        'change select' : 'changeUser'
      },
      changeUser: function (e) {
        var selectedUser = e.currentTarget.value;
        var user = _.find(this.model.get('users'), function (user) {
          return user._id === selectedUser;
        });
        this.model.set('user', user);
      }
    });
  }
);
