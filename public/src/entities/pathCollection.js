define([
  'backbone',
  'entities/pathModel'
  ],
function (Backbone, Path) {
  return Backbone.Collection.extend({
    model: Path,

  });
});
