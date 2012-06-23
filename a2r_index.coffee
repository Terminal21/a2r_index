### A2R Index Server ###
#
# This is the  A2R Index Server
#
# Copyright (c) 2012, Stefan Walluhn
#
# this file is part of A2R.
#
# A2R is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
# 

syslog = require('./lib/syslog').getInstance()
config = require('./lib/configloader').load('index.config')

express = require('express')
index_web = express.createServer()
index_web.set('view engine', 'jade')
index_web.use(express.static(__dirname + '/public'))

index_web.get '/', (req, res) ->
  res.render('index')

index_web.listen(config['index_web_port'])

console.log 'Server running'
syslog.log syslog.LOG_INFO, 'starting index server on port ' + config['notify_server_port']
