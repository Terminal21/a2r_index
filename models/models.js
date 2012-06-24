var Schema = require('mongoose').Schema ;

var Sessions = new Schema({
  title   : { type: String },
  token   : String,
  date    : Date
}) ;

module.exports.Sessions = Sessions ;
