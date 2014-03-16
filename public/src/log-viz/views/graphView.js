define([
  'backbone.marionette',
  'hbs!log-viz/templates/graphTmpl',
  'entities/logPageModel',
  'common/lineGraph',
  'd3'
  ],
function (Marionette, Tmpl, LogPage, lineGraph, d3) {
  var renderGraph = function (page) {

  };

  return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {
        var get = this.model.get;
        var page = new LogPage({user: this.model.get('_id'), type: "resp", page: 0});
        d3.json(page.url(), function (err, res) {
          if (err) console.log("error fetching d3 data");
          lineGraph({page: res, el: "#graphgraph"});
        });
      }
  });
});
