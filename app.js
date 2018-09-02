#!/usr/bin/env node

var express = require('express');
var fs = require('fs');

var app = express();

let snowData;

app.get('/snowdays', function(req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(snowData));

});

app.use(express.static('static', {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
	  res.set('x-timestamp', Date.now())
	}
  })
);

// ------------------------- start the listening

fs.readFile('data/snowdays.json', { encoding: 'utf-8' }, function(err, data) {
	if (err) {
		console.log(err);
		snowData = [];
	} else {

		snowData = JSON.parse(data);

		var server = app.listen(3500, function() {
			console.log('listening on port %d', server.address().port);
		});

	}
});


