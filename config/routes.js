var waveController = require('../app/controllers/waveController.js'),
  homeController = require('../app/controllers/homeController.js');

module.exports = function (app) {
  app.get('/', homeController.index)
  app.get('/api/logs/:user/:page', waveController.page);
  app.get('/api/users', waveController.users)
};
