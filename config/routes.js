var waveController = require('../app/controllers/waveController.js'),
  homeController = require('../app/controllers/homeController.js');

module.exports = function (app) {
  app.get('/', homeController.index)
  app.get('/api/wave/:user/:page', waveController.page);
};
