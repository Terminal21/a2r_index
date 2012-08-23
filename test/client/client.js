var request = require('request');
request.post({
  url: 'http://localhost:7000/',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'another session with sensors',
    b: 2,
    c: 3,
    date: new Date(),
    sensors : [{
      name: 'sensor1',
      type: 1,
      query_port: 8233,
      target_port: 8234
    }, {
      name: 'sensor2',
      type: 2,
      query_port: 8235,
      target_port: 8236
    }] 
  })
}, function(error, response, body){
  console.log(body);
});

request.post({
  url: 'http://localhost:7000/',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'another session without sensors',
    date: new Date()
 })
}, function(error, response, body){
  console.log(body);
});

