load = (config_file) -> 
  syslog = require('./syslog').getInstance()

  config = []
  try 
    config = require('cjson').load('./config/' + config_file)
  catch error
    if error.code != 'ENOENT'
      throw error
    syslog.log syslog.LOG_WARNING, 'config file ' + config_file + ' not found'
  
  # Set default values

  config['notify_server_port'] = 7010 if not config['notify_server_port']?
  config['index_server_address'] = "localhost" if not config['index_server_address']?
  config['index_server_port'] = 7001 if not config['index_server_port']?

  # Web Interface
  config['index_web_port'] = 7000 if not config['index_web_port']?

  return config

module.exports.load = load

