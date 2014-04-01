define([
  'backbone.marionette',
  'hbs!graphControls/templates/navToAddPathTmpl'
  ],
function (Marionette, Tmpl) {

  return Marionette.ItemView.extend({
      template: Tmpl,
      className: "addpath-nav",
      onShow: function () {
        this.delegateEvents();
      },
      triggers: {
        'click' : 'addpath:do'
      },
  });
});
