#!/usr/bin/env node

require('prototypes');
var http = require('http');
var util = require('util');
var iconv = require('iconv').Iconv;
var cocoonParser = require('./cocoon-parser');

module.exports.httpGetSlots = function(code, date, successCallback) {
	var options = {
		host: 'market.finance.sina.com.cn',
		port: 80,
		path: '/downxls.php?date=' + date + '&symbol=' + module.exports.getSymbolBy(code)
	};

	http.get(options, function(resp) {
		
		resp.setEncoding('binary');
		var html = "";
		
		resp.on('data', function(chunk) {
			html += chunk;
		})

		resp.on('end', function() {
			var responseBody = (new iconv('GB2312', 'UTF-8')).convert(new Buffer(html, 'binary')).toString();
			var slots = cocoonParser.parseResponse(responseBody);
			module.exports.setDateForSlots(slots, date);

			if (successCallback != null) {
				successCallback(slots);
			}
		});

	}).on('error', function(e) {
		console.log("HTTP Get error: " + e.message);
	});
};

module.exports.getSymbolBy = function(code) {
	if (code.startsWith("6")) {
		return "sh" + code;
	} else if (code.startsWith("0") || code.startsWith("3")) {
		return "sz" + code;
	} else {
		return "";
	}
};

module.exports.setDateForSlots = function(slots, date) {
	if (date != undefined && date != null && (new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')).test(date)) {
		for (key in slots) {
			var slot = slots[key];
			if (slot.hasOwnProperty("time")) {
				slot.date = date + " " + slot.time;	
			}
		}	
	}
}