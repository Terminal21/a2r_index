var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;
var syslog = require('./syslog').getInstance();

var sessions = mongoose.model('Sessions', require('./models.js').Sessions) ;

//ToDo: read settings from config
mongoose.connect('mongodb://localhost/a2r_index') ;

var setRoutes = function(ex) {
  ex.post('/', function(req, res) {
    var data = req.body ;
    if (data.token != undefined) return res.json("bad request", 400) ;

    // new session
    var session = new sessions(data) ;
    session.save(function (err) {
      if (err) {
        return res.json("bad request", 400) ;
      } else {
        return res.json({token: session.token}) ;
      }
    }) ;
  }) ;
      
  ex.put('/', function(req, res) {
    var data = req.body ;
    if (data.token == undefined) return res.json("bad request", 400) ;

    sessions.findOne({token: data.token}, function(err, doc) {
      if (err) {
        return res.json("bad request", 400) ;
      } else {
        if (doc == null) {          // wrong token
          return res.json("session not found", 404) ;
        } else {                    // right token
          for (var key in data) {
            doc[key] = data[key] ;
          }
          doc.save(function(err) {
            if (err) {
              return res.json("bad request", 400) ;
            } else {
              return res.json({token: doc.token}) ;
            }
          }) ;
        }
      }
    }) ;
  }) ;

  ex.get('/', function(req, res) {
    sessions.find({}, function(err, docs) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      }

      if (req.accepts("text/html")) return res.render('index', { sessions: docs}) ;
      return res.json(docs) ;
      
    }) ;
  });

  ex.get('/:id', function(req, res) {
    sessions.findById(req.params.id, function(err, doc) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      } else {
        if (req.accepts("html")) return res.render('show', { session: doc }) ;
        return res.json(doc) ;
      }
    }) ;
  }) ;
} ;

module.exports.setRoutes = setRoutes ;
