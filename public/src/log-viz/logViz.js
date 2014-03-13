define([
  'src/log-viz/views/controls.js'
  ],
function (ControlsView) {
  return function (LogViz, App) {
    LogViz.addInitializer(function (options) {
      var controlsView = new ControlsView({});
      App.main.show(controlsView);
    });
  };
});
