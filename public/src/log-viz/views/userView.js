define([
  'backbone.marionette',
  'hbs!log-viz/templates/userTmpl'
  ], function (Marionette, Tmpl) {
    var typeView = Marionette.ItemView.extend({
      template: Tmpl,
      tagName: 'li',
      events: {
        'change input[type="checkbox"]': 'changeGraphVisibility'
      },
      changeGraphVisibility: function (e) {
        this.model.set('showInGraph', e.currentTarget.checked);
      }
    });

    return Marionette.CollectionView.extend({
      itemView: typeView,
      tagName: 'ul',
    });
});
