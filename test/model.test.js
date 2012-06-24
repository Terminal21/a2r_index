var chai = require('chai');
chai.should();

var mongoose = require('mongoose') ;
mongoose.connect('mongodb://localhost/a2r_test') ;

describe('session model', function() {
  
  var sessions = mongoose.model('Sessions', require('../models/models.js').Sessions) ;

  it('should save sessions', function(done) {
    var session = new sessions({
      title: "test123",
      token: "ABC"
    }) ;

    session.save(done) ;
 });

  it('should find sessions', function(done) {
    sessions.findOne({ title: "test123"}, function(err, doc) {
      doc.title.should.equal("test123") ;
      done() ;
    }) ;
  }) ;

  it('should need a title', function(done) {
    var session = new sessions({
      token: "ABC"
    }) ;
    session.save(function (err) {
      err.name.should.equal('ValidationError') ;
      done() ;
    })
  }) ;

  it('should generate tokens on save', function(done) {
    var session = new sessions({
      title: "test124"
    }) ;
    session.save(function(err) {
      if (err) {
        throw err ;
      } else {
        session.token.length.should.equal(128) ;
      }
      done() ;
    }) ;
  }) ;
  
  it('should overwrite given tokens on save', function(done) {
    var session = new sessions({
      title: "test125",
      token: "ABC"
    }) ;
    session.save(function(err) {
      if (err) {
        throw err ;
      } else {
        session.token.should.have.length(128) ;
      }
      done() ;
    }) ;
  }) ;

  it('should not export the token', function(done) {
    sessions.findOne({ title: "test125"}, function(err, doc) {
      doc.token.should.equal('I won\'t tell you that!') ;
      done() ;
    }) ;
  }) ;
});
