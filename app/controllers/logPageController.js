var mongoose = require('mongoose'),
  LogPage = mongoose.model('LogPage');

exports.page = function (req, res) {
  var _user = req.params.user;
  var _type = req.params.type;
  var _page = req.params.page;

  console.log(_user);
  console.log(_type);
  console.log(_page);
  LogPage.findOne({user: _user, type: _type, page: _page}, {}, {}, function (err, logPage) {
    if (err) throw new Error(err);
    res.send(logPage);
  });
};
