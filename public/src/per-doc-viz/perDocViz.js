define([
  'src/per-doc-viz/views/controls.js'
  ],
function (ControlsView) {
  return function (PerDocViz, App) {
    PerDocViz.addInitializer(function (options) {
      var controlsView = new ControlsView({});
      App.main.show(controlsView);
    });
  };
});
