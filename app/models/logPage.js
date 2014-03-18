var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LogPage = new Schema({
  "user": String,
  "type": String,
  "page": Number,
  "starttime": Number,
  "endttime": Number,
  "granularity": String,
  "frequency": String,
  "values": {}
}, {
  "collection": "logs"
});

mongoose.model('LogPage', LogPage);
