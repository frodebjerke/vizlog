require([
  'backbone.marionette',
  'application',
  'regionManager'
],
function (Marionette, App) {
  'use strict';
    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };
});
