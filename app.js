var express = require('express'),
  routes = require('./config/routes.js');

var app = express();

routes(app);

//logging
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("logviz is running. Port: " + port);
});

module.exports = app;
