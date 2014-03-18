define([
  'backbone'
  ],
function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      ymin: 0,
      ymax: 0,
      starttime: 0,
      length: 60,
      el: "#graph",
      height: 500,
      width: 1500,
      margin: 30
    }
  });
});
