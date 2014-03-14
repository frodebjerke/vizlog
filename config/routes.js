var logPageController = require('../app/controllers/logPageController.js'),
  homeController = require('../app/controllers/homeController.js'),
    userController = require('../app/controllers/userController.js');

module.exports = function (app) {
  // Views
  app.get('/', homeController.index);

  // API
  app.get('/api/logs/:user/:page', logPageController.page);

  app.get('/api/users/:user', userController.user);
  app.get('/api/users', userController.users);
};
