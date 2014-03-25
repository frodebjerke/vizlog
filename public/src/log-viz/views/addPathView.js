define([
  'backbone.marionette',
  'hbs!log-viz/templates/addPathTmpl',
  'entities/controlsModel',
  'entities/pathModel'
  ], function (Marionette, Tmpl, Controls, Path) {
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
          this.setCurrent(user);

          this.model.set('users', users);
          this.render();
        }, this);
        controls.fetch();
      },
      onRender: function () {
        console.log("addpath:onrender");
      },
      events: {
        'click  button[type="submit"]' : 'addPath',
        'change select' : 'changeUser'
      },
      addPath: function (e) {
        var form = e.currentTarget.form;
        var start = $(form).find('.addpath-startpoint')[0].value;
        var current = this.model.get("current");

        var path = new Path({user: current.user, type: current.type, start: start, length: 120});
        var paths = this.model.get("paths");
        console.log(path);
        paths.add(path);
      },
      changeUser: function (e) {
        var selectedUser = e.currentTarget.value;
        var user = _.find(this.model.get('users'), function (user) {
          if (user._id === selectedUser) {
            user.selected = "selected";
            return true;
          }
          else {
            user.selected = "";
            return false;
          }
        });
        this.setCurrent(user);
        this.render();
      },
      setCurrent: function (user) {
        var type = 'resp';
        var usertype = _.find(user.types, function (t) {
          return t.type === type;
        });

        var current = {
          user: user._id,
          starttime: usertype.starttime,
          endtime: usertype.endtime,
          pages: usertype.pages,
          type: type
        };

        this.model.set('current', current);
      }
    });
  }
);
