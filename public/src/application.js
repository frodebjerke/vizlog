define([
  'backbone.marionette',
  'communicator',
  'routesController',
  'mainRouter',
  'handlerManager'
],
function (Marionette, Communicator, RoutesController, MainRouter, handlers) {
  window.Vizlog = new Marionette.Application();

  Vizlog.on('initialize:before', function (options) {
    this.addRegions({
      "graph": "#graph-region",
      "graphControls": "#graph-controls-region"
    });
  });

	Vizlog.addInitializer(function(options){
		this.router = new MainRouter({controller:options.controller});
		Backbone.history.start();
	});

  Vizlog.reqres.setHandlers(handlers);

  Vizlog.mainController = new RoutesController();
	Vizlog.start({controller : Vizlog.mainController} );
  return Vizlog;
});
