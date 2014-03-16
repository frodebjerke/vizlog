define([
  'backbone',
  'underscore'
  ],
function (Backbone, _, User) {
  return Backbone.Model.extend({
    url: 'api/users',
  });
});
