var mongoose = require('mongoose'),
  Wave = mongoose.model('Wave');

exports.first = function (req, res) {
  Wave.findOne({}, {}, {}, function (err, waves) {
    if (err) throw new Error(err);
    res.send(waves);
  })
}
