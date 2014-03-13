var mongoose = require('mongoose'),
  Wave = mongoose.model('Wave');

exports.page = function (req, res) {
  var _user = req.params.user;
  var _page = req.params.page;

  console.log(_user);
  console.log(_page);
  Wave.findOne({user: _user, page: _page}, {}, {}, function (err, wave) {
    if (err) throw new Error(err);
    res.send(wave);
  });
};

exports.users = function (req, res) {
  Wave.distinct('user', {}, function (err, resp) {
    if (err) throw new Error(err);
    var model = {
      users: resp,
      name: "lol",
      user: resp.length > 0 ? resp[0] : "" 
    };
    console.log(model);
    res.send(model);
  });
};