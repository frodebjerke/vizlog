define([
  'backbone.marionette',
  'hbs!log-viz/templates/pathsTmpl'
  ], function (Marionette, Tmpl) {
    var typeView = Marionette.ItemView.extend({
      template: Tmpl,
      tagName: 'li',
      events: {
      },
    });

    return Marionette.CollectionView.extend({
      itemView: typeView,
      tagName: 'ul',
    });
});
