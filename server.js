//
// FCC Timestamp
// Copyright (C) 2016 Nirix
//

var express = require('express');
var router = express();

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

router.get('/', function(req, res){
  res.send([
    '<h1>Timestamp Microservice</h1>',
    'Unix timestamp:',
    "<code>GET /1234567890</code><br>",
    'Natural timestamp:',
    '<code>GET /February 13, 2009</code>'
  ].join('<br>'));
});


router.get('/favicon.ico', function(req, res){
  res.send('');
});

router.get('/:timestamp', function(req, res){
  var result = {
    "unix": null,
    "natural": null
  };

  if (req.params.timestamp) {
    var timestamp = decodeURI(req.params.timestamp);

    if (Number(timestamp)) {
      timestamp = timestamp * 1000;
    }

    var parsed = new Date(timestamp);

    if (!isNaN(parsed.valueOf())) {
      result.unix = parsed.valueOf() / 1000;
      result.natural = months[parsed.getUTCMonth()] + ' ' + parsed.getUTCDate() + ', ' + parsed.getUTCFullYear();
    }
  }

  res.json(result);
});

router.listen(process.env.PORT || 3000, function(){
  console.log('Server listening on port', process.env.PORT || 3000);
});
