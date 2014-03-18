define([
  'backbone',
  'entities/pathModel'
  ],
function (Backbone, Path) {
  return Backbone.Collection.extend({
    model: Path,
    addPath: function (options) {
      var path = new Path({
        start: 20,
        length: 80,
        user: 3141595,
        type: "resp"
      });
      this.add(path);
    }
  });
});
