define([
  'backbone.marionette',
  'hbs!log-viz/templates/graphTmpl',
  'entities/logPageModel',
  'common/lineGraph',
  'common/graph/graph',
  'common/graph/graphDataType',
  'd3'
  ],
function (Marionette, Tmpl, LogPage, lineGraph, Graph, GraphDataType, d3) {
  var renderGraph = function (page) {

  };

  return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {
        var get = this.model.get;
        var page = new LogPage({user: this.model.get('_id'), type: "resp", page: 0});
        d3.json(page.url(), function (err, res) {
          if (err) console.log("error fetching d3 data");

          var page = new LogPage(res);
          var values = page.getArray();
          var graph = Graph({
            el: "#graphgraph",
            width: 1400,
            height: 500,
            margin: 30
          });

          var datatype = GraphDataType({
            graph: graph,
            data: [[0,3,9], [-3, 3, 6]]
          });
        });
      }
  });
});
