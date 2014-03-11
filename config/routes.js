var waveController = require('../app/controllers/waveController.js');

module.exports = function (app) {
  app.get('/api/wave/:user/:page', waveController.page);
};
