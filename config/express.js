var express = require('express'),
  exphbs = require('express3-handlebars');

module.exports = function (app, config) {

  app.use(express.static(config.root + '/public'));

  // Views config
  app.engine('.hbs', exphbs({extname: ".hbs"}));
  app.set('view engine', '.hbs');
  app.set('views', config.root + '/app/views');

};
