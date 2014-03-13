define([
  'log-viz/logVizController',
  ],
function (LogVizController) {
  return function (LogViz, App) {
    LogViz.addInitializer(function (options) {
      LogViz.controller = new LogVizController({
        region: App.main
      });
    });
  };
});
