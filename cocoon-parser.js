#!/usr/bin/env node

require('prototypes');

module.exports.parseResponse = function(response) {
	var lines = response.split("\n");
	var slots = [];
	for (i in lines) {
		var line = lines[i];
		var slot = module.exports.parseLine(line);
		if (slot != null) {
			slots.push(slot);
		}
	}

	return slots;
};

module.exports.parseLine = function(line) {
	var sections = line.split("\t");
	var slot = null;
	if (sections.length == 6) {
		if (module.exports.isValidTimeStr(sections[0])) {
			var time = sections[0];
			var price = module.exports.convertNumber(sections[1], 0.0);
			var change = module.exports.convertNumber(sections[2], 0.0);
			var volume = module.exports.convertNumber(sections[3], 0);
			var value = module.exports.convertNumber(sections[4], 0);
			var type = sections[5];

			slot = {
				"time": time,
				"price": price,
				"change": change,
				"volume": volume,
				"value": value,
				"type": type
			}
		}
	}

	return slot;
};

module.exports.isValidTimeStr = function(str) {
	return (new RegExp('[0-9]{2}:[0-9]{2}:[0-9]{2}')).test(str);
};

module.exports.convertNumber = function(str, defaultValue) {
	var num = Number(str);
	if (isNaN(num)) {
		return defaultValue;
	} else {
		return num;
	}
}

