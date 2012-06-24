var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;

var sessions = mongoose.model('Sessions', require('../models/models.js').Sessions) ;

//ToDo: read settings from config
mongoose.connect('mongodb://localhost/a2r_index') ;

var setRoutes = function(ex) {
  ex.post('/', function(req, res) {
    var data = req.body ;
    var session = new sessions(data) ;
    session.save(function (err) {
      if (err) {
        return res.json("bad request", 400) ;
      } else {
        return res.json({token: session.token}) ;
      }
    }) ;
  }) ;

  ex.get('/show.:format?', function(req, res) {
    sessions.find({}, function(err, docs) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      } else {
        if (req.params.format == "json") {
          return res.json(docs) ;
        } else {
          return res.render('index', { sessions: docs}) ;
        }
      }
    }) ;
  });

  ex.get('/show/:id.:format?', function(req, res) {
    sessions.findById(req.params.id, function(err, doc) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      } else {
        if (req.params.format == "json") {
          return res.json(doc) ;
        } else {
          return res.render('show', { session: doc }) ;
        }
      }
    }) ;
  }) ;
} ;

module.exports.setRoutes = setRoutes ;
