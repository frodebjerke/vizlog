var mongoose = require('mongoose'),
  Wave = mongoose.model('Wave');

exports.index = function (req, res) {
  Wave.distinct('user', {}, function (err, resp) {
    if (err) throw new Error(err);
    res.render('index', {
      users: resp
    });
  });

};
