var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;
var syslog = require('./syslog') ;

//ToDo: read settings from config
var sessions = mongoose.model('Sessions', require('./models.js').Sessions) ;
mongoose.connect('mongodb://localhost/a2r_index') ;

var setRoutes = function(ex) {

  // new session
  ex.post('/', function(req, res) {
    var data = req.body ;

    var session = new sessions(data) ;
    session.save(function (err) {
      if (err) {
        syslog.log(syslog.LOG_INFO, "bad post request, wrong parameter from " + req.ip) ;
        return res.json("bad request, wrong parameter", 400) ;
      } 

      syslog.log(syslog.LOG_INFO, "new session post from " + req.ip) ;
      return res.json({token: session.token}) ;
    }) ;
  }) ;
  
  // update session
  ex.put('/', function(req, res) {
    var data = req.body ;
    if (data.token == undefined) {
      syslog.log(syslog.LOG_INFO, "bad put request, token missing from " + req.ip) ;
      return res.json("bad request, token missing", 400) ;
    }

    sessions.findOne({token: data.token}, function(err, doc) {
      if (err) {
        syslog.log(syslog.LOG_INFO, "bad put request, wrong parameter from " + req.ip) ;
        return res.json("bad request, wrong parameter", 400) ;
      } 

      if (doc == null) {          // wrong token
        syslog.log(syslog.LOG_INFO, "session token " + data.token + " not found for " + req.ip) ;
        return res.json("session token not found", 404) ;
      }

      // right token
      for (var key in data) {
        doc[key] = data[key] ;
      }

      doc.save(function(err) {
        if (err) {
          syslog.log(syslog.LOG_INFO, "bad put request, wrong parameter from " + req.ip) ;
          return res.json("bad request", 400) ;
        }

        syslog.log(syslog.LOG_INFO, "update session put from " + req.ip) ;
        return res.json({token: doc.token}) ;
      
      }) ;
    }) ;
  }) ;

  // read sessions
  ex.get('/', function(req, res) {
    sessions.find({}, function(err, docs) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      }

      if (req.accepts("text/html")) return res.render('index', { sessions: docs}) ;

      syslog.log(syslog.LOG_DEBUG, "json get request from " + req.ip) ;
      return res.json(docs) ;
      
    }) ;
  });

  ex.get('/:id', function(req, res) {
    sessions.findById(req.params.id, function(err, doc) {
      if (err) {
        return syslog.log(syslog.LOG_ERROR, err) ;
      } 

      if (req.accepts("html")) return res.render('show', { session: doc }) ;
      return res.json(doc) ;

    }) ;
  }) ;
} ;

module.exports.setRoutes = setRoutes ;
