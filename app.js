var express = require('express'),
  mongoconf = require('./config/mongo.js'),
  fs = require('fs');


var modelsPath = __dirname + '/app/models';
mongoconf.connectToMongo();

fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

require('./config/routes.js')(app);

//logging
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("logviz is running. Port: " + port);
});

module.exports = app;
