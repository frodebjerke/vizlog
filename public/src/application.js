define([
  'backbone.marionette',
  'communicator',
  'routesController',
  'mainRouter'
],
function (Marionette, Communicator, RoutesController, MainRouter) {
  window.Vizlog = new Marionette.Application();

  Vizlog.on('initialize:before', function (options) {
    this.addRegions({
      "main": "#main-region"
    });
  });

	Vizlog.addInitializer(function(options){
		this.router = new MainRouter({controller:options.controller});
		Backbone.history.start();
	});

  Vizlog.mainController = new RoutesController();
	Vizlog.start({controller : Vizlog.mainController} );
  return Vizlog;
});
