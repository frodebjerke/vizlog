var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Wave = new Schema({
  "user": String,
  "type": String,
  "page": Number,
  "starttime": Date,
  "endttime": Date,
  "granularity": String,
  "frequency": String,
  "values": {}
});

mongoose.model('Wave', Wave);
