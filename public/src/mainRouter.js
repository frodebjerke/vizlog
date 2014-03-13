define([
  'backbone.marionette'
  ],
function (Marionette) {
  var MainRouter = Marionette.AppRouter.extend({
    appRoutes: {
      'doc': 'perDocViz',
      '*action': 'perDocViz'
    }
  });
  return MainRouter;
});
