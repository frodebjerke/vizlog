define([
  'backbone'
  ],
function (Backbone) {
  return Backbone.Model.extend({
    initialize: function(options) {
      this.set('types', new Backbone.Collection(options.types));
    }
  });
});
