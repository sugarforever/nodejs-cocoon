require('mocha');
var chai = require('chai');
var assert = require('assert');
var cocoonCore = require("../cocoon-core");

describe('cocoon-core.js', function () {

  describe('setDateForSlots', function () {
    it('setDateForSlots should succeed', function () {
      var slots = [{
        "time": "09:37:21",
        "price": 15.27,
        "change": -0.01,
        "volume": 88,
        "value": 134376,
        "type": "卖盘"
      }];

      cocoonCore.setDateForSlots(slots, "2015-07-16");
      assert.equal(slots[0].date, "2015-07-16 09:37:21");
    });
  });

  describe('setDateForSlots', function () {
    it('setDateForSlots should succeed', function () {
      var slots = [{
        "price": 15.27,
        "change": -0.01,
        "volume": 88,
        "value": 134376,
        "type": "卖盘"
      }];

      cocoonCore.setDateForSlots(slots, "2015-07-16");
      assert.equal(slots[0].date, null);
    });
  });

  describe('setDateForSlots', function () {
    it('setDateForSlots should succeed', function () {
      var slots = [{
        "time": "09:37:21",
        "price": 15.27,
        "change": -0.01,
        "volume": 88,
        "value": 134376,
        "type": "卖盘"
      }];

      cocoonCore.setDateForSlots(slots, null);
      assert.equal(slots[0].date, null);
    });
  });

  describe('setDateForSlots', function () {
    it('setDateForSlots should succeed', function () {
      var slots = [{
        "time": "09:37:21",
        "price": 15.27,
        "change": -0.01,
        "volume": 88,
        "value": 134376,
        "type": "卖盘"
      }];

      cocoonCore.setDateForSlots(slots, "dfd");
      assert.equal(slots[0].date, null);
    });
  });
});