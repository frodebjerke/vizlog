define([
  'backbone',
  'underscore'
  ],
function (Backbone, _) {
  return Backbone.Model.extend({
    url: function () {
      return 'api/logs/' + this.get('user') +'/'+ this.get('type')+'/'+this.get('page');
    },

    // Input in s
    getArray: function (start, count) {
      start = start * this.get("frequence"); // Adjust to Hz
      count = count * this.get("frequence");
      var values = this.get("values");
      if (start !== 0)
        start = start - this.get("starttime");

      var array = _.reduce(values, function (memo, b) {
        return memo.concat(_.toArray(b));
      }, []);
      return array.slice(start, start + count);
    },
    sync: function (method, model, options) {
      options.url = this.url();
      return Backbone.sync(method, model, options);
    }
  });
});
