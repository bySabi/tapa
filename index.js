'use strict';

// 'node-tap' export is a object
// 'tape' export is a function with methods
function addTapa (tap, tapa) {
  tap.test = testWrapped(tap.test, tapa);
  tap.only = testWrapped(tap.only, tapa);
  if (typeof tap === 'function') {
    // tape only
    var tapObj = copyProps({}, tap);
    tap = testWrapped(tap, tapa);
    return copyProps(tap, tapObj);
  }
  return inject(tap, tapa);
}

// Wrap 'test' method and test method callback. Wrapped callback
// inject `tapas` recursively when a nested test is create.
function testWrapped (test, tapa) {
  function recursiveCallBack (cb) {
    return function (t) {
      t = inject(t, tapa);
      var test = t.test;
      t.test = function (name_, opts_, cb_) {
        var args = getTestArgs(name_, opts_, cb_);
        var name = args.name;
        var opts = args.opts;
        var cb = args.cb;

        return test.call(t, name, opts, recursiveCallBack(cb));
      };
      return cb.call(t, t);
    };
  }

  return function (name_, opts_, cb_) {
    var args = getTestArgs(name_, opts_, cb_);
    var name = args.name;
    var opts = args.opts;
    var cb = args.cb;

    return test.call(test, name, opts, recursiveCallBack(cb));
  };
}

function inject (ctx, tapa) {
  for (var method in tapa) {
    ctx[method] = tapa[method].bind(ctx);
  }
  return ctx;
}

// lifted from tape
// https://github.com/substack/tape/blob/master/lib/test.js
// for handle test([name], [opts], cb) signature
function getTestArgs (name_, opts_, cb_) {
  var name = '(anonymous)';
  var opts = {};
  var cb;
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var t = typeof arg;
    if (t === 'string') {
      name = arg;
    } else if (t === 'object') {
      opts = arg || opts;
    } else if (t === 'function') {
      cb = arg;
    }
  }
  return { name: name, opts: opts, cb: cb };
}

// Don´t relay on Object assign
function copyProps (dest, src) {
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dest[prop] = src[prop];
    }
  }
  return dest;
}

module.exports = addTapa;
