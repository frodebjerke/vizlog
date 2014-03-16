define([
  'backbone'
  ],
function (Backbone) {
  return Backbone.Model.extend({
    url: function () {
      return 'api/logs/' + this.get('user') +'/'+ this.get('type')+'/'+this.get('page');
    }
  });
});
