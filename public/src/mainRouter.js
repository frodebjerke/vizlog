define([
  'backbone.marionette'
  ],
function (Marionette) {
  var MainRouter = Marionette.AppRouter.extend({
    appRoutes: {
      'doc': 'logVizModule',
      '*action': 'logVizModule'
    }
  });
  return MainRouter;
});
