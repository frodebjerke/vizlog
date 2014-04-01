define([
  'graphControls/gcController'
  ],
function (GCCtrl) {
  return function (GC, App) {
    GC.addInitializer(function (options) {
      GC.gcController = new GCCtrl({
        region: App.graphControls,
        reqres: App.reqres
      });
    });
  };
});
