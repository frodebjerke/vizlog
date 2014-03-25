define([
  'backbone.marionette',
  'hbs!log-viz/templates/addPathTmpl',
  'entities/controlsModel'
  ], function (Marionette, Tmpl, Controls) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      className: "row",
      initialize: function (options) {
        var controls = new Controls();
        var config = this.model.get('config');
        // controls.once('change', this.render);
        controls.once('change', function () {
          var users = controls.get('users');
          var user = _.first(users);
          var type = _.find(user.types, function (type) {
            return type === config.get('type') || 'resp';
          });
          console.log("wlal")
          console.log(type);
          this.model.set('users', users);
          this.model.set('type', type);
          this.render();
        }, this);
        controls.fetch();
      },
      onRender: function () {
        console.log("addpath:onrender");
      },
      events: {
        'click  button[type="submit"]' : 'addPath',
      },
      addPath: function (e) {
        console.log(e)
      },
      changeUser: function (e) {
        var selectedUser = e.currentTarget.value;
        var user = _.find(this.model.get('users'), function (user) {
          return user._id === selectedUser;
        });
        this.model.set('user', user);
        this.render()
      }
    });
  }
);
