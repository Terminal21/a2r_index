var Schema = require('mongoose').Schema ;

var Sessions = new Schema({
  title   : { type: String, required: true },
  token   : { type: String },
  date    : Date
}) ;

// Generate tokens on save
Sessions.pre('save', true, function(next, done) {
  next() ;
  this.token = "" ;

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" ;

  for (var i = 0; i < 128; i++ ) {
        this.token += possible.charAt(Math.floor(Math.random() * possible.length)) ;
  }

  done() ;
}) ;

Sessions.post('init', function() {
  this.token = 'I won\'t tell you that!' ;
}) ;

module.exports.Sessions = Sessions ;
