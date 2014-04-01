define([
  'backbone.marionette'
  ],
function (Marionette) {
  var MainRouter = Marionette.AppRouter.extend({
    appRoutes: {
      '*action': 'common'
    }
  });
  return MainRouter;
});
