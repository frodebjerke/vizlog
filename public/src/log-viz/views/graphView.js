define([
  'backbone.marionette',
  'hbs!log-viz/templates/graphTmpl',
  'entities/pathModel',
  'd3'
  ],
function (Marionette, Tmpl, Path, d3) {
  var renderGraph = function (page) {

  };

  return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {
        var user = 3141595;
        var type = "resp";
        var start = 20;
        var length = 80;
        var path = new Path({user: user, type: type, start: start, length: length});
        path.on('change', function (d) {
          console.log("change:data");
          console.log(d.get("data"));
        });
        // var page = new LogPage({user: this.model.get('_id'), type: "resp", page: 0});
        // d3.json(page.url(), function (err, res) {
        //   if (err) console.log("error fetching d3 data");
        //
        //   var page = new LogPage(res);
        //   var values = page.getArray();
        //   var graph = Graph({
        //     el: "#graphgraph",
        //     width: 1400,
        //     height: 500,
        //     margin: 30
        //   });
        //
        //   var datatype = GraphDataType({
        //     graph: graph,
        //     data: [values]
        //   });
        // });
      }
  });
});
