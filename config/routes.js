var logPageController = require('../app/controllers/logPageController.js'),
  homeController = require('../app/controllers/homeController.js');

module.exports = function (app) {
  // Views
  app.get('/', homeController.index);

  // API
  app.get('/api/logs/:user/:page', logPageController.page);
  app.get('/api/users', logPageController.users);
};
