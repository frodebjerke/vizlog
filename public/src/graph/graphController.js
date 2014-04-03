define([

  'common/graph/typeGraph',
  'graph/views/graphView',
  'entities/graphModel'
  ],
function (typeGraph, GraphView, GraphModel) {
  var graphCtrl = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
      var region = options.region;
      var reqres = options.reqres;

      this.paths = reqres.request('paths');
      this.config = reqres.request('config');

      this.graphview = this.createGraph();
      this.renderGraph(region, this.graphview);
      this.graphEvents();

    },
    renderGraph: function (region, view) {

      // view.once("graphview:rendered", function () {
      //   this.graph = this.createGraph(this.paths, this.config);
      //
      //   view.on('graphview:resize', this.graph.renderGraph);
      //   this.graphEvents();
      // }.bind(this));
      region.show(view);
    },
    createGraph: function () {
      var model = new GraphModel({paths: this.paths, config: this.config});
      return new GraphView({model: model});
    },
    graphEvents: function () {
      var paths = this.paths;
      var config = this.config;
      var graphview = this.graphview;

      paths.on('change', graphview.render);

      paths.on('remove', graphview.render);

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
