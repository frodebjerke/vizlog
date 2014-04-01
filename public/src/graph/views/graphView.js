define([
  'backbone.marionette',
  'hbs!graph/templates/graphTmpl',
  ],
function (Marionette, Tmpl) {

  return Marionette.ItemView.extend({
      template: Tmpl,
      className: "col-lg-9",
      onShow: function () {
        this.trigger('graphview:rendered');

        $(window).on("resize", function () {
          this.trigger('graphview:resize');
        }.bind(this));
      }
  });
});
