#!/usr/bin/env node

var path = require('path');
var express = require('express');
var contentDisposition = require('content-disposition');
var pkg = require( path.join(__dirname, 'package.json') );

// Parse command line options
var program = require('commander');
var cocoonCore = require('./cocoon-core');

program
    .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
    .parse(process.argv);

var port = program.port || 3000;

var app = express();
// Serve static files from the frontend folder
app.use('/', express.static(path.join(__dirname, 'static')));

app.get('/api/pull-slots', function(req,res){
	cocoonCore.httpGetSlots("002001", "2015-07-16", function(slots) {
		res.status(200).send(slots);
	});
});

app.listen(port);
console.log('Application is running on port ' + port);