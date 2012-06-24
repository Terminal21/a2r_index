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
});
