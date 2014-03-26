var mongoose = require('mongoose'),
  LogPage = mongoose.model('LogPage'),
  _ = require('underscore');

exports.user = function (req, res) {
  var _user = req.params.user;
  LogPage.distinct('type', {user: _user}, function (err, resp) {
    if (err) throw new Error(err);
    res.send(resp);
  });
};

exports.users = function (req, res) {
  LogPage.aggregate({
    $group: {
      "_id": {user: "$user", type: "$type"},
      "pages": {$sum: 1},
      "starttime": {$min: "$starttime"},
      "endtime": {$max: "$endtime"}
    }
  }, {
    $group: {
      "_id": "$_id.user",
      "types": {$push: {
        "type": "$_id.type",
        "pages": "$pages",
        "starttime": "$starttime",
        "endtime": "$endtime"
      }}
    }
  }).exec(function (err, resp) {
    if (err) throw new Error(err);
    var model = {
      users: resp,
    };
    console.log(JSON.stringify(model))
    res.send(model);
  });
};
