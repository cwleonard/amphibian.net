#!/usr/bin/env node

var express = require('express');
var fs = require('fs');
var mysql = require('mysql');

let app = express();

let snowData;

app.get('/snowdays', function(req, res, next) {

	var sql = 'SELECT id, dateStr FROM days';
	pool.query(sql, null, function(err, rows) {
		
		let snowData = [];

		if (err) {
			console.log(err);
		} else {
			for (let i = 0; i < rows.length; i++) {
				snowData.push(rows[0].dateStr);
			}
		}

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(snowData));
		
	});

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

let conf = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' }));
let pool = mysql.createPool(conf.database);

fs.readFile('data/snowdays.json', { encoding: 'utf-8' }, function(err, data) {
	if (err) {
		console.log(err);
		snowData = [];
	} else {

		snowData = JSON.parse(data);

		var server = app.listen(conf.port, function() {
			console.log('listening on port %d', server.address().port);
		});

	}
});


