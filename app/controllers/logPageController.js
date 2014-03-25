var mongoose = require('mongoose'),
  LogPage = mongoose.model('LogPage');

exports.page = function (req, res) {
  var _user = req.params.user;
  var _type = req.params.type;
  var _page = req.params.page;

  console.log("logpage.page: {user: %s, type: %s, page: %s}",_user, _type, _page);
  LogPage.findOne({user: _user, type: _type, page: _page}, {}, {}, function (err, logPage) {
    if (err) throw new Error(err);
    res.send(logPage);
  });
};
