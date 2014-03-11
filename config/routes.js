var dataController = require('../app/controllers/dataController.js');

module.exports = function (app) {
  app.get('/', dataController.first);
};
