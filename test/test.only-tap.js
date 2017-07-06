'use strict';

var tap = require('tap');
var addTapa = require('../');

// add a new assertion: biggerThan
var t = addTapa(tap, {
  biggerThan: function (a, b) {
    this.ok(b > a, 'is bigger than ' + a);
  }
});

t.only('only', function (t) {
  t.biggerThan(4, 5);
  t.end();
});
