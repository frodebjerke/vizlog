define([
  'graph/graphController'
  ],
function (GraphCtrl) {
  return function (Graph, App) {
    Graph.addInitializer(function (options) {
      Graph.graphController = new GraphCtrl({
        region: App.graph,
        reqres: App.reqres
      });
    });
  };
});
