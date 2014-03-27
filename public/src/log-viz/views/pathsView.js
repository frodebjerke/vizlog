define([
  'backbone.marionette',
  'hbs!log-viz/templates/pathsTmpl'
  ], function (Marionette, Tmpl) {
    var typeView = Marionette.ItemView.extend({
      template: Tmpl,
      tagName: 'li',
      className: "col-xs-12",
      initialize: function (options) {
        console.log(options.index);
        this.index = options.index;
      },
      onRender: function () {
        $(this.el).attr('tabindex', this.index);
      },
      events: {
        'click .paths-remove' : 'removePath',
        'focus' : 'hasFocus',
        'blur' : 'lostFocus'
      },
      removePath: function (e) {
        this.model.destroy();
      },
      hasFocus: function () {
        this.model.set("hasFocus", true);
        this.render();
      },
      lostFocus: function () {
        this.model.set("hasFocus", false);
        this.render();
      }
    });

    return Marionette.CollectionView.extend({
      itemView: typeView,
      tagName: 'ul',
      itemViewOptions: function (model, index) {
        return {
          index: index
        };
      }
    });
});
