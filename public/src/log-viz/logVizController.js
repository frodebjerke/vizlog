define([
    'backbone',

    // Views
    'log-viz/views/controlsView',
    'log-viz/views/userView',
    'log-viz/views/logVizLayout',

    // Entities
    'entities/controlsModel',
    'entities/userModel'
],
function (Backbone, ControlsView, UserView, Layout, Controls, User) {
  var LogVizController = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;

      this.controls = this.getControlsModel();
      this.setControlsEvents();
      this.layout = this.renderLayout();
      this.renderControls(this.layout.controls);
    },
    renderLayout: function () {
      var layout = new Layout();
      this.region.show(layout);
      return layout;
    },
    renderControls: function (region) {
      var view = new ControlsView({model: this.controls});
      region.show(view);
      return view;
    },
    renderUser: function (region) {
      var user = new User(this.controls.get("user"));
      var view = new UserView({model: user});
      region.show(view);
      return view;
    },
    getControlsModel: function () {
      var controls = new Controls();
      controls.fetch();
      return controls;
    },
    setControlsEvents: function () {
      this.listenTo(this.controls, "change:user", function () {
        this.renderUser(this.layout.user);
      });
    }
  });
  return LogVizController;
});
