var mongoose = require('mongoose'),
  Wave = mongoose.model('Wave');

exports.index = function (req, res) {
  res.render('index');
};
