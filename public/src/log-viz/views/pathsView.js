define([
  'backbone.marionette',
  'hbs!log-viz/templates/pathsTmpl'
  ], function (Marionette, Tmpl) {
    var typeView = Marionette.ItemView.extend({
      template: Tmpl,
      tagName: 'li',
      initialize: function (options) {
        console.log(options)
      },
      events: {
        'click .paths-remove' : 'removePath'
      },
      removePath: function (e) {
        this.model.destroy();
      }
    });

    return Marionette.CollectionView.extend({
      itemView: typeView,
      tagName: 'ul',
    });
});
