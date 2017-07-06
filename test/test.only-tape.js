'use strict';

var tap = require('tape');
var addTapa = require('../');

// add a new assertion: biggerThan
var test = addTapa(tap, {
  biggerThan: function (a, b) {
    this.ok(b > a, 'is bigger than ' + a);
  }
});

test.only('a set of some tests', function (t) {
  t.test('only', function (t) {
    t.biggerThan(4, 5);
    t.end();
  });
});

test('this should not run', function(t) {
  t.test('this fail', function (t) {
    t.fail()
    t.end();
  });
});