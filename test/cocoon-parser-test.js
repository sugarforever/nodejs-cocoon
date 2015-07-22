require('mocha');
var assert = require('assert');
var cocoonParser = require("../cocoon-parser");

describe('cocoon-parser.js', function () {

  describe('parseLine', function () {
    it('parseLine should succeed', function () {
      var slot = cocoonParser.parseLine("09:37:21	15.27	-0.01	88	134376	卖盘");
      assert.notEqual(slot, null);
      assert.equal(slot.time, "09:37:21");
      assert.equal(slot.price, 15.27);
      assert.equal(slot.change, -0.01);
      assert.equal(slot.volume, 88);
      assert.equal(slot.value, 134376);
      assert.equal(slot.type, "卖盘");
    });
  });

  describe('parseLine', function () {
    it('parseLine should succeed', function () {
      var slot = cocoonParser.parseLine("09:37:21	15.27	--	88	134376	卖盘");
      assert.notEqual(slot, null);
      assert.equal(slot.time, "09:37:21");
      assert.equal(slot.price, 15.27);
      assert.equal(slot.change, 0.0);
      assert.equal(slot.volume, 88);
      assert.equal(slot.value, 134376);
      assert.equal(slot.type, "卖盘");
    });
  });

  describe('parseLine', function () {
    it('parseLine should succeed with title line', function () {
      var slot = cocoonParser.parseLine("成交时间	成交价	价格变动	成交量(手)	成交额(元)	性质");
      assert.equal(slot, null);
    });
  });

  describe('isValidTimeStr', function () {
    it('isValidTimeStr should succeed', function () {
      var valid = cocoonParser.isValidTimeStr("09:37:21");
      assert.equal(true, valid);
    });
  });

  describe('isValidTimeStr', function () {
    it('isValidTimeStr should succeed', function () {
      var valid = cocoonParser.isValidTimeStr("9:37:21");
      assert.equal(false, valid);
    });
  });

  describe('isValidTimeStr', function () {
    it('isValidTimeStr should succeed', function () {
      var valid = cocoonParser.isValidTimeStr("dfdf");
      assert.equal(false, valid);
    });
  });

  describe('parseResponse', function () {
    it('parseResponse should succeed', function () {
    	var response = "成交时间	成交价	价格变动	成交量(手)	成交额(元)	性质\n";
    	response += "15:00:23	16.22	--	3172	5146281	买盘\n";
    	response += "14:57:02	16.22	--	4	8045	卖盘\n";
    	response += "14:56:59	16.22	-0.01	45	73054	卖盘\n";
    	response += "14:56:56	16.23	0.01	66	108676	买盘\n";
    	response += "14:56:50	16.22	--	46	74612	卖盘\n";
    	response += "14:56:47	16.22	-0.01	92	149224	卖盘\n";
      	var slots = cocoonParser.parseResponse(response);
      	assert.equal(slots.length, 6);
    });
  });
});