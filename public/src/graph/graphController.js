define([

  'common/graph/typeGraph',
  'graph/views/graphView'
  ],
function (typeGraph, GraphView) {
  var graphCtrl = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;

      this.paths = reqres.request('paths');
      this.config = reqres.request('config');

      var graphview = this.renderGraph(region);

    },
    renderGraph: function (region) {
      var view = new GraphView();
      view.once("graphview:rendered", function () {
        this.graph = this.createGraph(this.paths, this.config);

        view.on('graphview:resize', this.graph.renderGraph);
        this.graphEvents();
      }.bind(this));
      region.show(view);
      return view;
    },
    createGraph: function (paths, config) {
      return typeGraph({
        paths: paths,
        config: config
      });
    },
    graphEvents: function () {
      var graph = this.graph;
      var paths = this.paths;
      var config = this.config;

      graph.paths.on('change', graph.renderGraph);

      graph.paths.on('remove', graph.renderGraph);

      config.on("change:length", function () {
        var length = config.get("length");
        paths.forEach(function (path) {
          path.set("length", length);
        });
      });


    }
  });
  return graphCtrl;
});
