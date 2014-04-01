define([

  'common/graph/typeGraph',
  'graph/views/graphView'
  ],
function (typeGraph, GraphView) {
  var graphCtrl = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;

      var paths = reqres.request('paths');
      var config = reqres.request('config');

      var graphview = this.renderGraph(region, paths, config);

    },
    renderGraph: function (region, paths, config) {
      var view = new GraphView();
      view.once("graphview:rendered", function () {
        this.graph = this.createGraph(paths, config);

        view.on('graphview:resize', this.graph.renderGraph);
      }.bind(this));
      region.show(view);
      return view;
    },
    createGraph: function (paths, config) {
      return typeGraph({
        paths: paths,
        config: config
      });
    }
  });
  return graphCtrl;
});
