#!/usr/bin/env node

var express = require('express');
var fs = require('fs');

var app = express();


app.get('/snowdays', function(req, res, next) {

	let sd = [
		"2018-12-01"
	];

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(sd));

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

var server = app.listen(3500, function() {
	console.log('listening on port %d', server.address().port);
});
