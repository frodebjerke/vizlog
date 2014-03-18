define([
  'backbone.marionette',
  'hbs!log-viz/templates/graphTmpl',
  'entities/pathModel',
  'entities/pathCollection',
  'entities/graphConfigModel',
  'common/graph/typeGraph',
  'd3'
  ],
function (Marionette, Tmpl, Path, Paths, Config, typeGraph, d3) {
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
        this.paths = new Paths([path]);
        this.config = new Config({
          starttime: start,
          length: length
        });
      },
      onShow: function () {
        var tg = typeGraph({
          paths: this.paths,
          config: this.config,
          el: "#graphgraph",
          height: 500,
          width: 1500,
          margin: 30
        });
      }
  });
});
