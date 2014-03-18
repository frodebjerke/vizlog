define([
  'backbone',
  'underscore'
  ],
function (Backbone, _) {
  return Backbone.Model.extend({
    url: function () {
      return 'api/logs/' + this.get('user') +'/'+ this.get('type')+'/'+this.get('page');
    },
    getArray: function () {
      var values = this.get("values");
      return _.reduce(values, function (memo, b) {
        return memo.concat(_.toArray(b));
      }, []);
    }
  });
});
