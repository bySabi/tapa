var tap = require('tap');
var addTapa = require('../');

// add a new assertion: biggerThan
var t = addTapa(tap, {
  biggerThan (a, b) {
    this.ok(b > a, 'is bigger than ' + a);
  }
});

var count = 0;

t.test('a set of some tests', function (t) {
  t.test('A', function (t) {
    t.biggerThan(4, 5);
    t.equal(++count, 1);
    t.end();
  });

  t.test('B', function (t) {
    t.test('b1', function (t) {
      t.test('bb1', function (t) {
        t.biggerThan(4, 5);
        t.equal(++count, 2);
        t.end();
      });
      t.end();
    });

    t.test('b2', function (t) {
      t.biggerThan(4, 5);
      t.equal(++count, 3);
      t.end();
    });

    t.test('b3', function (t) {
      t.equal(++count, 4);
      t.end();
    });

    t.end();
  });

  t.test('C', function (t) {
    t.equal(++count, 5);
    t.end();
  });

  t.biggerThan(4, 5);
  t.end();
});

t.biggerThan(4, 5);
t.equal(++count, 6);
t.end();
