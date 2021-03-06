define([
  'backbone.marionette',
  'hbs!graphControls/templates/addPathTmpl',
  ],
  function (Marionette, Tmpl) {
    return Marionette.ItemView.extend({
      template: Tmpl,
      className: "addpath-form",

      initialize: function (options) {
        this.model = this.model || new Backbone.Model();
        this.config = options.config;
        this.paths = options.paths;
        var controls = options.controls;

        controls.once('change', function () {
          var users = controls.get('users');
          var user = _.first(users);
          this.setCurrent(user);
          this.model.set('users', users);
          this.model.set('types', user.types);
          this.render();
        }, this);
        controls.fetch();
      },

      onShow: function () {
        this.delegateEvents();
      },

      events: {
        'click  button[type="submit"]' : 'addPath',
        'change .addpath-user' : 'changeUser',
        'change .addpath-type' : 'changeType'
      },
      addPath: function (e) {
        var form = e.currentTarget.form;
        var start = $(form).find('.addpath-startpoint')[0].value;
        var current = this.model.get("current");
        var config = this.config;
        var pathConf = {
          user: current.user,
          type: current.type,
          start: start,
          length: config.get('length'),
          unit: current.unit
        };

        this.trigger("addpath:submit", pathConf);
      },

      changeUser: function (e) {
        var user = this.currentFromSelect(e, this.model.get('users'), function (u, s) { return u._id === s;});
        this.model.set('types', user.types);
        this.setCurrent(user);
        this.render();
      },

      changeType: function (e) {
        var type = this.currentFromSelect(e, this.model.get('types'), function (t, s) { return t.type === s; });
        this.model.get('current').type = type.type;
      },

      setCurrent: function (user) {
        var usertype = _.first(user.types);
        var current = {
          user: user._id,
          starttime: usertype.starttime,
          endtime: usertype.endtime,
          pages: usertype.pages,
          type: usertype.type,
          unit: usertype.unit
        };
        this.model.set('current', current);
      },

      currentFromSelect: function (e, values, comparator) {
        var value = e.currentTarget.value;
        return _.find(values, function (v) {
          if (comparator(v, value)) {
            v.selected = "selected";
            return true;
          }
          else {
            v.selected = "";
            return false;
          }
        });
      }
    });
  }
);
