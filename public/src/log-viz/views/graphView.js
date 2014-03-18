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

  return Marionette.ItemView.extend({
      template: Tmpl,
      initialize: function (options) {

      },
      onShow: function () {
        var tg = typeGraph({
          paths: this.model.get('paths'),
          config: this.model.get('config')
        });
      }
  });
});
