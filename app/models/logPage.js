var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LogPage = new Schema({
  "user": String,
  "type": String,
  "page": Number,
  "starttime": Date,
  "endttime": Date,
  "granularity": String,
  "frequency": String,
  "values": {}
}, {
  "collection": "logs"
});

mongoose.model('LogPage', LogPage);
