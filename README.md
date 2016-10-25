# tapa (add TAP helpers)

[![npm version](https://badge.fury.io/js/tapa.svg)](https://badge.fury.io/js/tapa)
[![npm downloads](https://img.shields.io/npm/dm/tapa.svg?style=flat-square)](https://www.npmjs.com/package/tapa)
[![Build Status](https://travis-ci.org/bySabi/tapa.svg?branch=master)](https://travis-ci.org/bySabi/tapa)
[![Windows Tests](https://img.shields.io/appveyor/ci/bySabi/tapa/master.svg?label=Windows%20Tests)](https://ci.appveyor.com/project/bySabi/tapa)
[![bitHound Overall Score](https://www.bithound.io/github/bySabi/tapa/badges/score.svg)](https://www.bithound.io/github/bySabi/tapa)
[![Donate](https://img.shields.io/badge/$-support-green.svg?style=flat-square)](https://paypal.me/bySabi/10)

> Add helpers to your favorite javascript TAP framework.

[Tapa][tapas] is a wide variety of :es: Spanish food [appetizers][appetizers]. Now you can add any `tapa` to your TAP `menu` :fork_and_knife:

[tapas]: https://en.wikipedia.org/wiki/Tapas
[appetizers]: https://www.google.com/search?q=tapas+spain&source=lnms&tbm=isch

## Installation

### npm

```bash
npm install tapa --save-dev
```

## Usage

```javascript
var addTapa = require('tapa');
```

```javascript
var tape = require('tape');

// add a new assertion: biggerThan
var test = addTapa(tape, {
  biggerThan (a, b) {
    this.ok(b > a, 'is bigger than ' + a);
  }
});

var count = 0;

test('a set of some tests', function (t) {
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

test('a test', function (t) {
  t.biggerThan(4, 5);
  t.equal(++count, 6);
  t.end();
});
```

## TAP Frameworks
Work with [tap](https://github.com/tapjs/node-tap) and [tape](https://github.com/substack/tape) on `node` and `browser`

## Contributing
* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE
