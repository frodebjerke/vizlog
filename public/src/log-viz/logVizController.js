define([
    'backbone',

    // Views
    'log-viz/views/controlsView',
    'log-viz/views/userView',
    'log-viz/views/graphView',
    'log-viz/views/logVizLayout',

    // Entities
    'entities/controlsModel',
    'entities/userModel',
    'entities/logPageModel'
],
function (Backbone, ControlsView, UserView, GraphView, Layout, Controls, User, LogPage) {
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
      var view = new UserView({collection: user.get('types')});
      region.show(view);
      this.listenTo(user.get('types'), 'change:showInGraph', function (type) {
        console.log("nothing happening in the showInGraph controller event");
      });
      return view;
    },
    renderGraph: function (user) {
      var view = new GraphView({model: new User(user)});
      this.layout.graph.show(view);
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
        var user = this.controls.get('user');
        this.renderGraph(user);
      });
    }
  });
  return LogVizController;
});
