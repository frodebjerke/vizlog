define([
  'backbone'
  ],
function (Backbone) {
  return Backbone.Model.extend({
    urlRoot: 'api/logs',
		initialize: function() {
			console.log("new log entity");
		}
  });
});
