#!/usr/bin/env node

/* A2R Index Server
*/

var argv = require('optimist').boolean('v').argv ;

var express = require('express');

var syslog = require('./lib/syslog');
if (argv.v) syslog.setConsoleLog(true);

var config = require('./lib/configloader').load('index.config');

a2r_index = express();
a2r_index.set('view engine', 'jade');
a2r_index.use(express["static"](__dirname + '/public'));
a2r_index.use(express.bodyParser()) ;

require('./lib/routes').setRoutes(a2r_index) ;

a2r_index.listen(config['index_server_port']);
syslog.log(syslog.LOG_INFO, 'starting a2r_index server on port ' + config['index_server_port']);
