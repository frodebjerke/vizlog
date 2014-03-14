var mongoose = require('mongoose'),
  LogPage = mongoose.model('LogPage'),
  _ = require('underscore');

exports.users = function (req, res) {
  LogPage.distinct('user', {}, function (err, resp) {
    if (err) throw new Error(err);
    var users = _.map(resp, function (user) {
      return {id: user};
    });
    var model = {
      users: users
    };
    console.log(model);
    res.send(model);
  });
};
