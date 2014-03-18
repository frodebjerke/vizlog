var lib = '../lib/';

require.config({
  deps: ['backbone.marionette', 'main'],
  shims: {
    backbone: {
      deps: [
        'jquery',
        'underscore'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: lib + 'jquery/jquery',
    underscore: lib + 'underscore-amd/underscore',
    backbone: lib + 'backbone-amd/backbone',
    hbs: lib + 'require-handlebars-plugin/hbs',
    d3: lib + 'd3/d3',
    async: lib+ 'async/lib/async',
    'backbone.marionette': lib + 'marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': lib + 'backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': lib + 'backbone.babysitter/lib/amd/backbone.babysitter',

  },
  hbs: {
    helpers: true,
    i18n: false,
    templateExtension: 'hbs',
    partialsUrl: '../templates/partials'
  }
});
