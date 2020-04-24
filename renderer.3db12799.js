// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js"}],"../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_library":"../node_modules/core-js/modules/_library.js"}],"../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../node_modules/core-js/modules/_shared.js"}],"../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_has":"../node_modules/core-js/modules/_has.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_function-to-string":"../node_modules/core-js/modules/_function-to-string.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_ctx":"../node_modules/core-js/modules/_ctx.js"}],"../node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../node_modules/core-js/modules/_uid.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_has":"../node_modules/core-js/modules/_has.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_has":"../node_modules/core-js/modules/_has.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_library":"../node_modules/core-js/modules/_library.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/modules/_iobject.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-dps":"../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_html":"../node_modules/core-js/modules/_html.js"}],"../node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js"}],"../node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_shared":"../node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_wks-define":"../node_modules/core-js/modules/_wks-define.js","./_enum-keys":"../node_modules/core-js/modules/_enum-keys.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_library":"../node_modules/core-js/modules/_library.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es6.object.create.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-create":"../node_modules/core-js/modules/_object-create.js"}],"../node_modules/core-js/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/es6.object.define-properties.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-dps":"../node_modules/core-js/modules/_object-dps.js"}],"../node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"../node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js"}],"../node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js"}],"../node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"../node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_same-value":"../node_modules/core-js/modules/_same-value.js"}],"../node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_invoke":"../node_modules/core-js/modules/_invoke.js"}],"../node_modules/core-js/modules/es6.function.bind.js":[function(require,module,exports) {
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_bind":"../node_modules/core-js/modules/_bind.js"}],"../node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/modules/_export.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-int":"../node_modules/core-js/modules/_parse-int.js"}],"../node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-float":"../node_modules/core-js/modules/_parse-float.js"}],"../node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_a-number-value.js":[function(require,module,exports) {
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es6.number.to-fixed.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_a-number-value":"../node_modules/core-js/modules/_a-number-value.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.number.to-precision.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_a-number-value":"../node_modules/core-js/modules/_a-number-value.js"}],"../node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-float":"../node_modules/core-js/modules/_parse-float.js"}],"../node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-int":"../node_modules/core-js/modules/_parse-int.js"}],"../node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"../node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"../node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"../node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-fround":"../node_modules/core-js/modules/_math-fround.js"}],"../node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.string.trim.js":[function(require,module,exports) {
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":"../node_modules/core-js/modules/_string-trim.js"}],"../node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/modules/_object-create.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/modules/_library.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js"}],"../node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.date.now.js":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.date.to-json.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_date-to-iso-string.js":[function(require,module,exports) {
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.date.to-iso-string.js":[function(require,module,exports) {
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_date-to-iso-string":"../node_modules/core-js/modules/_date-to-iso-string.js"}],"../node_modules/core-js/modules/es6.date.to-string.js":[function(require,module,exports) {
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js"}],"../node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_date-to-primitive":"../node_modules/core-js/modules/_date-to-primitive.js"}],"../node_modules/core-js/modules/es6.array.is-array.js":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-array":"../node_modules/core-js/modules/_is-array.js"}],"../node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js"}],"../node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.array.join.js":[function(require,module,exports) {
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.slice.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_html":"../node_modules/core-js/modules/_html.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../node_modules/core-js/modules/_array-species-constructor.js"}],"../node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js"}],"../node_modules/core-js/modules/es6.array.for-each.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.map.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.filter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.some.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.every.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/_array-reduce.js":[function(require,module,exports) {
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.array.reduce.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-reduce":"../node_modules/core-js/modules/_array-reduce.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.reduce-right.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-reduce":"../node_modules/core-js/modules/_array-reduce.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.index-of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.last-index-of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"../node_modules/core-js/modules/_global.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"../node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js"}],"../node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"../node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js"}],"../node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_same-value":"../node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js"}],"../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_invoke":"../node_modules/core-js/modules/_invoke.js","./_html":"../node_modules/core-js/modules/_html.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_global":"../node_modules/core-js/modules/_global.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_task":"../node_modules/core-js/modules/_task.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js"}],"../node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_task":"../node_modules/core-js/modules/_task.js","./_microtask":"../node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/modules/_perform.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_core":"../node_modules/core-js/modules/_core.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js"}],"../node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_has":"../node_modules/core-js/modules/_has.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js","./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js"}],"../node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/es6.typed.data-view.js":[function(require,module,exports) {
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js"}],"../node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_bind":"../node_modules/core-js/modules/_bind.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.enumerate.js":[function(require,module,exports) {
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js"}],"../node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js"}],"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"../node_modules/core-js/modules/_is-array.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es7.array.flatten.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es7.string.at.js":[function(require,module,exports) {
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"../node_modules/core-js/modules/_string-trim.js"}],"../node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"../node_modules/core-js/modules/_string-trim.js"}],"../node_modules/core-js/modules/es7.string.match-all.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js"}],"../node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../node_modules/core-js/modules/_wks-define.js"}],"../node_modules/core-js/modules/es7.symbol.observable.js":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"../node_modules/core-js/modules/_wks-define.js"}],"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_create-property":"../node_modules/core-js/modules/_create-property.js"}],"../node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/_array-from-iterable.js":[function(require,module,exports) {
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"../node_modules/core-js/modules/_for-of.js"}],"../node_modules/core-js/modules/_collection-to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_array-from-iterable":"../node_modules/core-js/modules/_array-from-iterable.js"}],"../node_modules/core-js/modules/es7.map.to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_collection-to-json":"../node_modules/core-js/modules/_collection-to-json.js"}],"../node_modules/core-js/modules/es7.set.to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_collection-to-json":"../node_modules/core-js/modules/_collection-to-json.js"}],"../node_modules/core-js/modules/_set-collection-of.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":"../node_modules/core-js/modules/_set-collection-of.js"}],"../node_modules/core-js/modules/es7.set.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":"../node_modules/core-js/modules/_set-collection-of.js"}],"../node_modules/core-js/modules/es7.weak-map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":"../node_modules/core-js/modules/_set-collection-of.js"}],"../node_modules/core-js/modules/es7.weak-set.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":"../node_modules/core-js/modules/_set-collection-of.js"}],"../node_modules/core-js/modules/_set-collection-from.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_for-of":"../node_modules/core-js/modules/_for-of.js"}],"../node_modules/core-js/modules/es7.map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":"../node_modules/core-js/modules/_set-collection-from.js"}],"../node_modules/core-js/modules/es7.set.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":"../node_modules/core-js/modules/_set-collection-from.js"}],"../node_modules/core-js/modules/es7.weak-map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":"../node_modules/core-js/modules/_set-collection-from.js"}],"../node_modules/core-js/modules/es7.weak-set.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":"../node_modules/core-js/modules/_set-collection-from.js"}],"../node_modules/core-js/modules/es7.global.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.system.global.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.error.is-error.js":[function(require,module,exports) {
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/es7.math.clamp.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.deg-per-rad.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.degrees.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-scale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],"../node_modules/core-js/modules/es7.math.fscale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-scale":"../node_modules/core-js/modules/_math-scale.js","./_math-fround":"../node_modules/core-js/modules/_math-fround.js"}],"../node_modules/core-js/modules/es7.math.iaddh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.isubh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.imulh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.rad-per-deg.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.radians.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.scale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-scale":"../node_modules/core-js/modules/_math-scale.js"}],"../node_modules/core-js/modules/es7.math.umulh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.math.signbit.js":[function(require,module,exports) {
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js"}],"../node_modules/core-js/modules/es7.promise.try.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/modules/_perform.js"}],"../node_modules/core-js/modules/_metadata.js":[function(require,module,exports) {
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./es6.map":"../node_modules/core-js/modules/es6.map.js","./_export":"../node_modules/core-js/modules/_export.js","./_shared":"../node_modules/core-js/modules/_shared.js","./es6.weak-map":"../node_modules/core-js/modules/es6.weak-map.js"}],"../node_modules/core-js/modules/es7.reflect.define-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es7.reflect.delete-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es7.reflect.get-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js"}],"../node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":[function(require,module,exports) {
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./es6.set":"../node_modules/core-js/modules/es6.set.js","./_array-from-iterable":"../node_modules/core-js/modules/_array-from-iterable.js","./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js"}],"../node_modules/core-js/modules/es7.reflect.get-own-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es7.reflect.has-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js"}],"../node_modules/core-js/modules/es7.reflect.has-own-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es7.reflect.metadata.js":[function(require,module,exports) {
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_metadata":"../node_modules/core-js/modules/_metadata.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/es7.asap.js":[function(require,module,exports) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_microtask":"../node_modules/core-js/modules/_microtask.js","./_global":"../node_modules/core-js/modules/_global.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/es7.observable.js":[function(require,module,exports) {

'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_microtask":"../node_modules/core-js/modules/_microtask.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_task":"../node_modules/core-js/modules/_task.js"}],"../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/shim.js":[function(require,module,exports) {
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.exec');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/es6.symbol":"../node_modules/core-js/modules/es6.symbol.js","./modules/es6.object.create":"../node_modules/core-js/modules/es6.object.create.js","./modules/es6.object.define-property":"../node_modules/core-js/modules/es6.object.define-property.js","./modules/es6.object.define-properties":"../node_modules/core-js/modules/es6.object.define-properties.js","./modules/es6.object.get-own-property-descriptor":"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","./modules/es6.object.get-prototype-of":"../node_modules/core-js/modules/es6.object.get-prototype-of.js","./modules/es6.object.keys":"../node_modules/core-js/modules/es6.object.keys.js","./modules/es6.object.get-own-property-names":"../node_modules/core-js/modules/es6.object.get-own-property-names.js","./modules/es6.object.freeze":"../node_modules/core-js/modules/es6.object.freeze.js","./modules/es6.object.seal":"../node_modules/core-js/modules/es6.object.seal.js","./modules/es6.object.prevent-extensions":"../node_modules/core-js/modules/es6.object.prevent-extensions.js","./modules/es6.object.is-frozen":"../node_modules/core-js/modules/es6.object.is-frozen.js","./modules/es6.object.is-sealed":"../node_modules/core-js/modules/es6.object.is-sealed.js","./modules/es6.object.is-extensible":"../node_modules/core-js/modules/es6.object.is-extensible.js","./modules/es6.object.assign":"../node_modules/core-js/modules/es6.object.assign.js","./modules/es6.object.is":"../node_modules/core-js/modules/es6.object.is.js","./modules/es6.object.set-prototype-of":"../node_modules/core-js/modules/es6.object.set-prototype-of.js","./modules/es6.object.to-string":"../node_modules/core-js/modules/es6.object.to-string.js","./modules/es6.function.bind":"../node_modules/core-js/modules/es6.function.bind.js","./modules/es6.function.name":"../node_modules/core-js/modules/es6.function.name.js","./modules/es6.function.has-instance":"../node_modules/core-js/modules/es6.function.has-instance.js","./modules/es6.parse-int":"../node_modules/core-js/modules/es6.parse-int.js","./modules/es6.parse-float":"../node_modules/core-js/modules/es6.parse-float.js","./modules/es6.number.constructor":"../node_modules/core-js/modules/es6.number.constructor.js","./modules/es6.number.to-fixed":"../node_modules/core-js/modules/es6.number.to-fixed.js","./modules/es6.number.to-precision":"../node_modules/core-js/modules/es6.number.to-precision.js","./modules/es6.number.epsilon":"../node_modules/core-js/modules/es6.number.epsilon.js","./modules/es6.number.is-finite":"../node_modules/core-js/modules/es6.number.is-finite.js","./modules/es6.number.is-integer":"../node_modules/core-js/modules/es6.number.is-integer.js","./modules/es6.number.is-nan":"../node_modules/core-js/modules/es6.number.is-nan.js","./modules/es6.number.is-safe-integer":"../node_modules/core-js/modules/es6.number.is-safe-integer.js","./modules/es6.number.max-safe-integer":"../node_modules/core-js/modules/es6.number.max-safe-integer.js","./modules/es6.number.min-safe-integer":"../node_modules/core-js/modules/es6.number.min-safe-integer.js","./modules/es6.number.parse-float":"../node_modules/core-js/modules/es6.number.parse-float.js","./modules/es6.number.parse-int":"../node_modules/core-js/modules/es6.number.parse-int.js","./modules/es6.math.acosh":"../node_modules/core-js/modules/es6.math.acosh.js","./modules/es6.math.asinh":"../node_modules/core-js/modules/es6.math.asinh.js","./modules/es6.math.atanh":"../node_modules/core-js/modules/es6.math.atanh.js","./modules/es6.math.cbrt":"../node_modules/core-js/modules/es6.math.cbrt.js","./modules/es6.math.clz32":"../node_modules/core-js/modules/es6.math.clz32.js","./modules/es6.math.cosh":"../node_modules/core-js/modules/es6.math.cosh.js","./modules/es6.math.expm1":"../node_modules/core-js/modules/es6.math.expm1.js","./modules/es6.math.fround":"../node_modules/core-js/modules/es6.math.fround.js","./modules/es6.math.hypot":"../node_modules/core-js/modules/es6.math.hypot.js","./modules/es6.math.imul":"../node_modules/core-js/modules/es6.math.imul.js","./modules/es6.math.log10":"../node_modules/core-js/modules/es6.math.log10.js","./modules/es6.math.log1p":"../node_modules/core-js/modules/es6.math.log1p.js","./modules/es6.math.log2":"../node_modules/core-js/modules/es6.math.log2.js","./modules/es6.math.sign":"../node_modules/core-js/modules/es6.math.sign.js","./modules/es6.math.sinh":"../node_modules/core-js/modules/es6.math.sinh.js","./modules/es6.math.tanh":"../node_modules/core-js/modules/es6.math.tanh.js","./modules/es6.math.trunc":"../node_modules/core-js/modules/es6.math.trunc.js","./modules/es6.string.from-code-point":"../node_modules/core-js/modules/es6.string.from-code-point.js","./modules/es6.string.raw":"../node_modules/core-js/modules/es6.string.raw.js","./modules/es6.string.trim":"../node_modules/core-js/modules/es6.string.trim.js","./modules/es6.string.iterator":"../node_modules/core-js/modules/es6.string.iterator.js","./modules/es6.string.code-point-at":"../node_modules/core-js/modules/es6.string.code-point-at.js","./modules/es6.string.ends-with":"../node_modules/core-js/modules/es6.string.ends-with.js","./modules/es6.string.includes":"../node_modules/core-js/modules/es6.string.includes.js","./modules/es6.string.repeat":"../node_modules/core-js/modules/es6.string.repeat.js","./modules/es6.string.starts-with":"../node_modules/core-js/modules/es6.string.starts-with.js","./modules/es6.string.anchor":"../node_modules/core-js/modules/es6.string.anchor.js","./modules/es6.string.big":"../node_modules/core-js/modules/es6.string.big.js","./modules/es6.string.blink":"../node_modules/core-js/modules/es6.string.blink.js","./modules/es6.string.bold":"../node_modules/core-js/modules/es6.string.bold.js","./modules/es6.string.fixed":"../node_modules/core-js/modules/es6.string.fixed.js","./modules/es6.string.fontcolor":"../node_modules/core-js/modules/es6.string.fontcolor.js","./modules/es6.string.fontsize":"../node_modules/core-js/modules/es6.string.fontsize.js","./modules/es6.string.italics":"../node_modules/core-js/modules/es6.string.italics.js","./modules/es6.string.link":"../node_modules/core-js/modules/es6.string.link.js","./modules/es6.string.small":"../node_modules/core-js/modules/es6.string.small.js","./modules/es6.string.strike":"../node_modules/core-js/modules/es6.string.strike.js","./modules/es6.string.sub":"../node_modules/core-js/modules/es6.string.sub.js","./modules/es6.string.sup":"../node_modules/core-js/modules/es6.string.sup.js","./modules/es6.date.now":"../node_modules/core-js/modules/es6.date.now.js","./modules/es6.date.to-json":"../node_modules/core-js/modules/es6.date.to-json.js","./modules/es6.date.to-iso-string":"../node_modules/core-js/modules/es6.date.to-iso-string.js","./modules/es6.date.to-string":"../node_modules/core-js/modules/es6.date.to-string.js","./modules/es6.date.to-primitive":"../node_modules/core-js/modules/es6.date.to-primitive.js","./modules/es6.array.is-array":"../node_modules/core-js/modules/es6.array.is-array.js","./modules/es6.array.from":"../node_modules/core-js/modules/es6.array.from.js","./modules/es6.array.of":"../node_modules/core-js/modules/es6.array.of.js","./modules/es6.array.join":"../node_modules/core-js/modules/es6.array.join.js","./modules/es6.array.slice":"../node_modules/core-js/modules/es6.array.slice.js","./modules/es6.array.sort":"../node_modules/core-js/modules/es6.array.sort.js","./modules/es6.array.for-each":"../node_modules/core-js/modules/es6.array.for-each.js","./modules/es6.array.map":"../node_modules/core-js/modules/es6.array.map.js","./modules/es6.array.filter":"../node_modules/core-js/modules/es6.array.filter.js","./modules/es6.array.some":"../node_modules/core-js/modules/es6.array.some.js","./modules/es6.array.every":"../node_modules/core-js/modules/es6.array.every.js","./modules/es6.array.reduce":"../node_modules/core-js/modules/es6.array.reduce.js","./modules/es6.array.reduce-right":"../node_modules/core-js/modules/es6.array.reduce-right.js","./modules/es6.array.index-of":"../node_modules/core-js/modules/es6.array.index-of.js","./modules/es6.array.last-index-of":"../node_modules/core-js/modules/es6.array.last-index-of.js","./modules/es6.array.copy-within":"../node_modules/core-js/modules/es6.array.copy-within.js","./modules/es6.array.fill":"../node_modules/core-js/modules/es6.array.fill.js","./modules/es6.array.find":"../node_modules/core-js/modules/es6.array.find.js","./modules/es6.array.find-index":"../node_modules/core-js/modules/es6.array.find-index.js","./modules/es6.array.species":"../node_modules/core-js/modules/es6.array.species.js","./modules/es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./modules/es6.regexp.constructor":"../node_modules/core-js/modules/es6.regexp.constructor.js","./modules/es6.regexp.exec":"../node_modules/core-js/modules/es6.regexp.exec.js","./modules/es6.regexp.to-string":"../node_modules/core-js/modules/es6.regexp.to-string.js","./modules/es6.regexp.flags":"../node_modules/core-js/modules/es6.regexp.flags.js","./modules/es6.regexp.match":"../node_modules/core-js/modules/es6.regexp.match.js","./modules/es6.regexp.replace":"../node_modules/core-js/modules/es6.regexp.replace.js","./modules/es6.regexp.search":"../node_modules/core-js/modules/es6.regexp.search.js","./modules/es6.regexp.split":"../node_modules/core-js/modules/es6.regexp.split.js","./modules/es6.promise":"../node_modules/core-js/modules/es6.promise.js","./modules/es6.map":"../node_modules/core-js/modules/es6.map.js","./modules/es6.set":"../node_modules/core-js/modules/es6.set.js","./modules/es6.weak-map":"../node_modules/core-js/modules/es6.weak-map.js","./modules/es6.weak-set":"../node_modules/core-js/modules/es6.weak-set.js","./modules/es6.typed.array-buffer":"../node_modules/core-js/modules/es6.typed.array-buffer.js","./modules/es6.typed.data-view":"../node_modules/core-js/modules/es6.typed.data-view.js","./modules/es6.typed.int8-array":"../node_modules/core-js/modules/es6.typed.int8-array.js","./modules/es6.typed.uint8-array":"../node_modules/core-js/modules/es6.typed.uint8-array.js","./modules/es6.typed.uint8-clamped-array":"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","./modules/es6.typed.int16-array":"../node_modules/core-js/modules/es6.typed.int16-array.js","./modules/es6.typed.uint16-array":"../node_modules/core-js/modules/es6.typed.uint16-array.js","./modules/es6.typed.int32-array":"../node_modules/core-js/modules/es6.typed.int32-array.js","./modules/es6.typed.uint32-array":"../node_modules/core-js/modules/es6.typed.uint32-array.js","./modules/es6.typed.float32-array":"../node_modules/core-js/modules/es6.typed.float32-array.js","./modules/es6.typed.float64-array":"../node_modules/core-js/modules/es6.typed.float64-array.js","./modules/es6.reflect.apply":"../node_modules/core-js/modules/es6.reflect.apply.js","./modules/es6.reflect.construct":"../node_modules/core-js/modules/es6.reflect.construct.js","./modules/es6.reflect.define-property":"../node_modules/core-js/modules/es6.reflect.define-property.js","./modules/es6.reflect.delete-property":"../node_modules/core-js/modules/es6.reflect.delete-property.js","./modules/es6.reflect.enumerate":"../node_modules/core-js/modules/es6.reflect.enumerate.js","./modules/es6.reflect.get":"../node_modules/core-js/modules/es6.reflect.get.js","./modules/es6.reflect.get-own-property-descriptor":"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","./modules/es6.reflect.get-prototype-of":"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","./modules/es6.reflect.has":"../node_modules/core-js/modules/es6.reflect.has.js","./modules/es6.reflect.is-extensible":"../node_modules/core-js/modules/es6.reflect.is-extensible.js","./modules/es6.reflect.own-keys":"../node_modules/core-js/modules/es6.reflect.own-keys.js","./modules/es6.reflect.prevent-extensions":"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","./modules/es6.reflect.set":"../node_modules/core-js/modules/es6.reflect.set.js","./modules/es6.reflect.set-prototype-of":"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","./modules/es7.array.includes":"../node_modules/core-js/modules/es7.array.includes.js","./modules/es7.array.flat-map":"../node_modules/core-js/modules/es7.array.flat-map.js","./modules/es7.array.flatten":"../node_modules/core-js/modules/es7.array.flatten.js","./modules/es7.string.at":"../node_modules/core-js/modules/es7.string.at.js","./modules/es7.string.pad-start":"../node_modules/core-js/modules/es7.string.pad-start.js","./modules/es7.string.pad-end":"../node_modules/core-js/modules/es7.string.pad-end.js","./modules/es7.string.trim-left":"../node_modules/core-js/modules/es7.string.trim-left.js","./modules/es7.string.trim-right":"../node_modules/core-js/modules/es7.string.trim-right.js","./modules/es7.string.match-all":"../node_modules/core-js/modules/es7.string.match-all.js","./modules/es7.symbol.async-iterator":"../node_modules/core-js/modules/es7.symbol.async-iterator.js","./modules/es7.symbol.observable":"../node_modules/core-js/modules/es7.symbol.observable.js","./modules/es7.object.get-own-property-descriptors":"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","./modules/es7.object.values":"../node_modules/core-js/modules/es7.object.values.js","./modules/es7.object.entries":"../node_modules/core-js/modules/es7.object.entries.js","./modules/es7.object.define-getter":"../node_modules/core-js/modules/es7.object.define-getter.js","./modules/es7.object.define-setter":"../node_modules/core-js/modules/es7.object.define-setter.js","./modules/es7.object.lookup-getter":"../node_modules/core-js/modules/es7.object.lookup-getter.js","./modules/es7.object.lookup-setter":"../node_modules/core-js/modules/es7.object.lookup-setter.js","./modules/es7.map.to-json":"../node_modules/core-js/modules/es7.map.to-json.js","./modules/es7.set.to-json":"../node_modules/core-js/modules/es7.set.to-json.js","./modules/es7.map.of":"../node_modules/core-js/modules/es7.map.of.js","./modules/es7.set.of":"../node_modules/core-js/modules/es7.set.of.js","./modules/es7.weak-map.of":"../node_modules/core-js/modules/es7.weak-map.of.js","./modules/es7.weak-set.of":"../node_modules/core-js/modules/es7.weak-set.of.js","./modules/es7.map.from":"../node_modules/core-js/modules/es7.map.from.js","./modules/es7.set.from":"../node_modules/core-js/modules/es7.set.from.js","./modules/es7.weak-map.from":"../node_modules/core-js/modules/es7.weak-map.from.js","./modules/es7.weak-set.from":"../node_modules/core-js/modules/es7.weak-set.from.js","./modules/es7.global":"../node_modules/core-js/modules/es7.global.js","./modules/es7.system.global":"../node_modules/core-js/modules/es7.system.global.js","./modules/es7.error.is-error":"../node_modules/core-js/modules/es7.error.is-error.js","./modules/es7.math.clamp":"../node_modules/core-js/modules/es7.math.clamp.js","./modules/es7.math.deg-per-rad":"../node_modules/core-js/modules/es7.math.deg-per-rad.js","./modules/es7.math.degrees":"../node_modules/core-js/modules/es7.math.degrees.js","./modules/es7.math.fscale":"../node_modules/core-js/modules/es7.math.fscale.js","./modules/es7.math.iaddh":"../node_modules/core-js/modules/es7.math.iaddh.js","./modules/es7.math.isubh":"../node_modules/core-js/modules/es7.math.isubh.js","./modules/es7.math.imulh":"../node_modules/core-js/modules/es7.math.imulh.js","./modules/es7.math.rad-per-deg":"../node_modules/core-js/modules/es7.math.rad-per-deg.js","./modules/es7.math.radians":"../node_modules/core-js/modules/es7.math.radians.js","./modules/es7.math.scale":"../node_modules/core-js/modules/es7.math.scale.js","./modules/es7.math.umulh":"../node_modules/core-js/modules/es7.math.umulh.js","./modules/es7.math.signbit":"../node_modules/core-js/modules/es7.math.signbit.js","./modules/es7.promise.finally":"../node_modules/core-js/modules/es7.promise.finally.js","./modules/es7.promise.try":"../node_modules/core-js/modules/es7.promise.try.js","./modules/es7.reflect.define-metadata":"../node_modules/core-js/modules/es7.reflect.define-metadata.js","./modules/es7.reflect.delete-metadata":"../node_modules/core-js/modules/es7.reflect.delete-metadata.js","./modules/es7.reflect.get-metadata":"../node_modules/core-js/modules/es7.reflect.get-metadata.js","./modules/es7.reflect.get-metadata-keys":"../node_modules/core-js/modules/es7.reflect.get-metadata-keys.js","./modules/es7.reflect.get-own-metadata":"../node_modules/core-js/modules/es7.reflect.get-own-metadata.js","./modules/es7.reflect.get-own-metadata-keys":"../node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js","./modules/es7.reflect.has-metadata":"../node_modules/core-js/modules/es7.reflect.has-metadata.js","./modules/es7.reflect.has-own-metadata":"../node_modules/core-js/modules/es7.reflect.has-own-metadata.js","./modules/es7.reflect.metadata":"../node_modules/core-js/modules/es7.reflect.metadata.js","./modules/es7.asap":"../node_modules/core-js/modules/es7.asap.js","./modules/es7.observable":"../node_modules/core-js/modules/es7.observable.js","./modules/web.timers":"../node_modules/core-js/modules/web.timers.js","./modules/web.immediate":"../node_modules/core-js/modules/web.immediate.js","./modules/web.dom.iterable":"../node_modules/core-js/modules/web.dom.iterable.js","./modules/_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

},{}],"../node_modules/core-js/modules/_replacer.js":[function(require,module,exports) {
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],"../node_modules/core-js/modules/core.regexp.escape.js":[function(require,module,exports) {
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_replacer":"../node_modules/core-js/modules/_replacer.js"}],"../node_modules/core-js/fn/regexp/escape.js":[function(require,module,exports) {
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/core.regexp.escape":"../node_modules/core-js/modules/core.regexp.escape.js","../../modules/_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/babel-polyfill/lib/index.js":[function(require,module,exports) {
var global = arguments[3];

"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
},{"core-js/shim":"../node_modules/core-js/shim.js","regenerator-runtime/runtime":"../node_modules/regenerator-runtime/runtime.js","core-js/fn/regexp/escape":"../node_modules/core-js/fn/regexp/escape.js"}],"../node_modules/events/events.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}
},{}],"../node_modules/@ledgerhq/errors/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransportError = TransportError;
exports.TransportStatusError = TransportStatusError;
exports.getAltStatusMessage = getAltStatusMessage;
exports.serializeError = exports.deserializeError = exports.createCustomErrorClass = exports.addCustomErrorDeserializer = exports.WrongDeviceForAccount = exports.WrongAppForCurrency = exports.WebsocketConnectionFailed = exports.WebsocketConnectionError = exports.UserRefusedOnDevice = exports.UserRefusedFirmwareUpdate = exports.UserRefusedDeviceNameChange = exports.UserRefusedAllowManager = exports.UserRefusedAddress = exports.UpdateYourApp = exports.UpdateIncorrectSig = exports.UpdateIncorrectHash = exports.UpdateFetchFileFail = exports.UnknownMCU = exports.UnexpectedBootloader = exports.UnavailableTezosOriginatedAccountSend = exports.UnavailableTezosOriginatedAccountReceive = exports.TransportWebUSBGestureRequired = exports.TransportRaceCondition = exports.TransportOpenUserCancelled = exports.TransportInterfaceNotAvailable = exports.TimeoutTagged = exports.SyncError = exports.StatusCodes = exports.RecommendUndelegation = exports.RecommendSubAccountsToEmpty = exports.RecipientRequired = exports.PasswordsDontMatchError = exports.PasswordIncorrectError = exports.PairingFailed = exports.NotSupportedLegacyAddress = exports.NotEnoughSpendableBalance = exports.NotEnoughGas = exports.NotEnoughBalanceToDelegate = exports.NotEnoughBalanceInParentAccount = exports.NotEnoughBalanceBecauseDestinationNotCreated = exports.NotEnoughBalance = exports.NoDBPathGiven = exports.NoAddressesFound = exports.NoAccessToCamera = exports.NetworkDown = exports.ManagerUninstallBTCDep = exports.ManagerNotEnoughSpaceError = exports.ManagerFirmwareNotEnoughSpaceError = exports.ManagerDeviceLockedError = exports.ManagerAppRelyOnBTCError = exports.ManagerAppDepUninstallRequired = exports.ManagerAppDepInstallRequired = exports.ManagerAppAlreadyInstalledError = exports.MCUNotGenuineToDashboard = exports.LedgerAPINotAvailable = exports.LedgerAPIErrorWithMessage = exports.LedgerAPIError = exports.LedgerAPI5xx = exports.LedgerAPI4xx = exports.LatestMCUInstalledError = exports.InvalidXRPTag = exports.InvalidAddressBecauseDestinationIsAlsoSource = exports.InvalidAddress = exports.HardResetFail = exports.GenuineCheckFailed = exports.GasLessThanEstimate = exports.FirmwareOrAppUpdateRequired = exports.FirmwareNotRecognized = exports.FeeTooHigh = exports.FeeRequired = exports.FeeNotLoaded = exports.FeeEstimationFailed = exports.EthAppPleaseEnableContractData = exports.EnpointConfigError = exports.ETHAddressNonEIP = exports.DisconnectedDeviceDuringOperation = exports.DisconnectedDevice = exports.DeviceSocketNoBulkStatus = exports.DeviceSocketFail = exports.DeviceShouldStayInApp = exports.DeviceOnDashboardUnexpected = exports.DeviceOnDashboardExpected = exports.DeviceNotGenuineError = exports.DeviceNameInvalid = exports.DeviceInOSUExpected = exports.DeviceHalted = exports.DeviceGenuineSocketEarlyClose = exports.DeviceAppVerifyNotSupported = exports.DBWrongPassword = exports.DBNotReset = exports.CurrencyNotSupported = exports.CashAddrNotSupported = exports.CantScanQRCode = exports.CantOpenDevice = exports.BtcUnmatchedApp = exports.BluetoothRequired = exports.AmountRequired = exports.AccountNotSupported = exports.AccountNameRequiredError = void 0;

/* eslint-disable no-continue */

/* eslint-disable no-param-reassign */

/* eslint-disable no-prototype-builtins */
var errorClasses = {};
var deserializers = {};

var addCustomErrorDeserializer = function (name, deserializer) {
  deserializers[name] = deserializer;
};

exports.addCustomErrorDeserializer = addCustomErrorDeserializer;

var createCustomErrorClass = function (name) {
  var C = function CustomError(message, fields) {
    Object.assign(this, fields);
    this.name = name;
    this.message = message || name;
    this.stack = new Error().stack;
  };

  C.prototype = new Error();
  errorClasses[name] = C;
  return C;
}; // inspired from https://github.com/programble/errio/blob/master/index.js


exports.createCustomErrorClass = createCustomErrorClass;

var deserializeError = function (object) {
  if (typeof object === "object" && object) {
    try {
      // $FlowFixMe FIXME HACK
      var msg = JSON.parse(object.message);

      if (msg.message && msg.name) {
        object = msg;
      }
    } catch (e) {// nothing
    }

    var error = void 0;

    if (typeof object.name === "string") {
      var name_1 = object.name;
      var des = deserializers[name_1];

      if (des) {
        error = des(object);
      } else {
        var constructor = name_1 === "Error" ? Error : errorClasses[name_1];

        if (!constructor) {
          console.warn("deserializing an unknown class '" + name_1 + "'");
          constructor = createCustomErrorClass(name_1);
        }

        error = Object.create(constructor.prototype);

        try {
          for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
              error[prop] = object[prop];
            }
          }
        } catch (e) {// sometimes setting a property can fail (e.g. .name)
        }
      }
    } else {
      error = new Error(object.message);
    }

    if (!error.stack && Error.captureStackTrace) {
      Error.captureStackTrace(error, deserializeError);
    }

    return error;
  }

  return new Error(String(object));
}; // inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js


exports.deserializeError = deserializeError;

var serializeError = function (value) {
  if (!value) return value;

  if (typeof value === "object") {
    return destroyCircular(value, []);
  }

  if (typeof value === "function") {
    return "[Function: " + (value.name || "anonymous") + "]";
  }

  return value;
}; // https://www.npmjs.com/package/destroy-circular


exports.serializeError = serializeError;

function destroyCircular(from, seen) {
  var to = {};
  seen.push(from);

  for (var _i = 0, _a = Object.keys(from); _i < _a.length; _i++) {
    var key = _a[_i];
    var value = from[key];

    if (typeof value === "function") {
      continue;
    }

    if (!value || typeof value !== "object") {
      to[key] = value;
      continue;
    }

    if (seen.indexOf(from[key]) === -1) {
      to[key] = destroyCircular(from[key], seen.slice(0));
      continue;
    }

    to[key] = "[Circular]";
  }

  if (typeof from.name === "string") {
    to.name = from.name;
  }

  if (typeof from.message === "string") {
    to.message = from.message;
  }

  if (typeof from.stack === "string") {
    to.stack = from.stack;
  }

  return to;
}

var AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
exports.AccountNameRequiredError = AccountNameRequiredError;
var AccountNotSupported = createCustomErrorClass("AccountNotSupported");
exports.AccountNotSupported = AccountNotSupported;
var AmountRequired = createCustomErrorClass("AmountRequired");
exports.AmountRequired = AmountRequired;
var BluetoothRequired = createCustomErrorClass("BluetoothRequired");
exports.BluetoothRequired = BluetoothRequired;
var BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
exports.BtcUnmatchedApp = BtcUnmatchedApp;
var CantOpenDevice = createCustomErrorClass("CantOpenDevice");
exports.CantOpenDevice = CantOpenDevice;
var CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
exports.CashAddrNotSupported = CashAddrNotSupported;
var CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
exports.CurrencyNotSupported = CurrencyNotSupported;
var DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
exports.DeviceAppVerifyNotSupported = DeviceAppVerifyNotSupported;
var DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
exports.DeviceGenuineSocketEarlyClose = DeviceGenuineSocketEarlyClose;
var DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
exports.DeviceNotGenuineError = DeviceNotGenuineError;
var DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
exports.DeviceOnDashboardExpected = DeviceOnDashboardExpected;
var DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
exports.DeviceOnDashboardUnexpected = DeviceOnDashboardUnexpected;
var DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
exports.DeviceInOSUExpected = DeviceInOSUExpected;
var DeviceHalted = createCustomErrorClass("DeviceHalted");
exports.DeviceHalted = DeviceHalted;
var DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
exports.DeviceNameInvalid = DeviceNameInvalid;
var DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
exports.DeviceSocketFail = DeviceSocketFail;
var DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
exports.DeviceSocketNoBulkStatus = DeviceSocketNoBulkStatus;
var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
exports.DisconnectedDevice = DisconnectedDevice;
var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
exports.DisconnectedDeviceDuringOperation = DisconnectedDeviceDuringOperation;
var EnpointConfigError = createCustomErrorClass("EnpointConfig");
exports.EnpointConfigError = EnpointConfigError;
var EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
exports.EthAppPleaseEnableContractData = EthAppPleaseEnableContractData;
var FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
exports.FeeEstimationFailed = FeeEstimationFailed;
var FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
exports.FirmwareNotRecognized = FirmwareNotRecognized;
var HardResetFail = createCustomErrorClass("HardResetFail");
exports.HardResetFail = HardResetFail;
var InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
exports.InvalidXRPTag = InvalidXRPTag;
var InvalidAddress = createCustomErrorClass("InvalidAddress");
exports.InvalidAddress = InvalidAddress;
var InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
exports.InvalidAddressBecauseDestinationIsAlsoSource = InvalidAddressBecauseDestinationIsAlsoSource;
var LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
exports.LatestMCUInstalledError = LatestMCUInstalledError;
var UnknownMCU = createCustomErrorClass("UnknownMCU");
exports.UnknownMCU = UnknownMCU;
var LedgerAPIError = createCustomErrorClass("LedgerAPIError");
exports.LedgerAPIError = LedgerAPIError;
var LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
exports.LedgerAPIErrorWithMessage = LedgerAPIErrorWithMessage;
var LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
exports.LedgerAPINotAvailable = LedgerAPINotAvailable;
var ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
exports.ManagerAppAlreadyInstalledError = ManagerAppAlreadyInstalledError;
var ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
exports.ManagerAppRelyOnBTCError = ManagerAppRelyOnBTCError;
var ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
exports.ManagerAppDepInstallRequired = ManagerAppDepInstallRequired;
var ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
exports.ManagerAppDepUninstallRequired = ManagerAppDepUninstallRequired;
var ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
exports.ManagerDeviceLockedError = ManagerDeviceLockedError;
var ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
exports.ManagerFirmwareNotEnoughSpaceError = ManagerFirmwareNotEnoughSpaceError;
var ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
exports.ManagerNotEnoughSpaceError = ManagerNotEnoughSpaceError;
var ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
exports.ManagerUninstallBTCDep = ManagerUninstallBTCDep;
var NetworkDown = createCustomErrorClass("NetworkDown");
exports.NetworkDown = NetworkDown;
var NoAddressesFound = createCustomErrorClass("NoAddressesFound");
exports.NoAddressesFound = NoAddressesFound;
var NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
exports.NotEnoughBalance = NotEnoughBalance;
var NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
exports.NotEnoughBalanceToDelegate = NotEnoughBalanceToDelegate;
var NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
exports.NotEnoughBalanceInParentAccount = NotEnoughBalanceInParentAccount;
var NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
exports.NotEnoughSpendableBalance = NotEnoughSpendableBalance;
var NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
exports.NotEnoughBalanceBecauseDestinationNotCreated = NotEnoughBalanceBecauseDestinationNotCreated;
var NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
exports.NoAccessToCamera = NoAccessToCamera;
var NotEnoughGas = createCustomErrorClass("NotEnoughGas");
exports.NotEnoughGas = NotEnoughGas;
var NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
exports.NotSupportedLegacyAddress = NotSupportedLegacyAddress;
var GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
exports.GasLessThanEstimate = GasLessThanEstimate;
var PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
exports.PasswordsDontMatchError = PasswordsDontMatchError;
var PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
exports.PasswordIncorrectError = PasswordIncorrectError;
var RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
exports.RecommendSubAccountsToEmpty = RecommendSubAccountsToEmpty;
var RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
exports.RecommendUndelegation = RecommendUndelegation;
var TimeoutTagged = createCustomErrorClass("TimeoutTagged");
exports.TimeoutTagged = TimeoutTagged;
var UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
exports.UnexpectedBootloader = UnexpectedBootloader;
var MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
exports.MCUNotGenuineToDashboard = MCUNotGenuineToDashboard;
var RecipientRequired = createCustomErrorClass("RecipientRequired");
exports.RecipientRequired = RecipientRequired;
var UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
exports.UnavailableTezosOriginatedAccountReceive = UnavailableTezosOriginatedAccountReceive;
var UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
exports.UnavailableTezosOriginatedAccountSend = UnavailableTezosOriginatedAccountSend;
var UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
exports.UpdateFetchFileFail = UpdateFetchFileFail;
var UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
exports.UpdateIncorrectHash = UpdateIncorrectHash;
var UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
exports.UpdateIncorrectSig = UpdateIncorrectSig;
var UpdateYourApp = createCustomErrorClass("UpdateYourApp");
exports.UpdateYourApp = UpdateYourApp;
var UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
exports.UserRefusedDeviceNameChange = UserRefusedDeviceNameChange;
var UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
exports.UserRefusedAddress = UserRefusedAddress;
var UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
exports.UserRefusedFirmwareUpdate = UserRefusedFirmwareUpdate;
var UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
exports.UserRefusedAllowManager = UserRefusedAllowManager;
var UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal

exports.UserRefusedOnDevice = UserRefusedOnDevice;
var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
exports.TransportOpenUserCancelled = TransportOpenUserCancelled;
var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
exports.TransportInterfaceNotAvailable = TransportInterfaceNotAvailable;
var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
exports.TransportRaceCondition = TransportRaceCondition;
var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
exports.TransportWebUSBGestureRequired = TransportWebUSBGestureRequired;
var DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
exports.DeviceShouldStayInApp = DeviceShouldStayInApp;
var WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
exports.WebsocketConnectionError = WebsocketConnectionError;
var WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
exports.WebsocketConnectionFailed = WebsocketConnectionFailed;
var WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
exports.WrongDeviceForAccount = WrongDeviceForAccount;
var WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
exports.WrongAppForCurrency = WrongAppForCurrency;
var ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
exports.ETHAddressNonEIP = ETHAddressNonEIP;
var CantScanQRCode = createCustomErrorClass("CantScanQRCode");
exports.CantScanQRCode = CantScanQRCode;
var FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
exports.FeeNotLoaded = FeeNotLoaded;
var FeeRequired = createCustomErrorClass("FeeRequired");
exports.FeeRequired = FeeRequired;
var FeeTooHigh = createCustomErrorClass("FeeTooHigh");
exports.FeeTooHigh = FeeTooHigh;
var SyncError = createCustomErrorClass("SyncError");
exports.SyncError = SyncError;
var PairingFailed = createCustomErrorClass("PairingFailed");
exports.PairingFailed = PairingFailed;
var GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
exports.GenuineCheckFailed = GenuineCheckFailed;
var LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
exports.LedgerAPI4xx = LedgerAPI4xx;
var LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
exports.LedgerAPI5xx = LedgerAPI5xx;
var FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired"); // db stuff, no need to translate

exports.FirmwareOrAppUpdateRequired = FirmwareOrAppUpdateRequired;
var NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
exports.NoDBPathGiven = NoDBPathGiven;
var DBWrongPassword = createCustomErrorClass("DBWrongPassword");
exports.DBWrongPassword = DBWrongPassword;
var DBNotReset = createCustomErrorClass("DBNotReset");
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */

exports.DBNotReset = DBNotReset;

function TransportError(message, id) {
  this.name = "TransportError";
  this.message = message;
  this.stack = new Error().stack;
  this.id = id;
}

TransportError.prototype = new Error();
addCustomErrorDeserializer("TransportError", function (e) {
  return new TransportError(e.message, e.id);
});
var StatusCodes = {
  PIN_REMAINING_ATTEMPTS: 0x63c0,
  INCORRECT_LENGTH: 0x6700,
  MISSING_CRITICAL_PARAMETER: 0x6800,
  COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
  SECURITY_STATUS_NOT_SATISFIED: 0x6982,
  CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
  INCORRECT_DATA: 0x6a80,
  NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
  REFERENCED_DATA_NOT_FOUND: 0x6a88,
  FILE_ALREADY_EXISTS: 0x6a89,
  INCORRECT_P1_P2: 0x6b00,
  INS_NOT_SUPPORTED: 0x6d00,
  CLA_NOT_SUPPORTED: 0x6e00,
  TECHNICAL_PROBLEM: 0x6f00,
  OK: 0x9000,
  MEMORY_PROBLEM: 0x9240,
  NO_EF_SELECTED: 0x9400,
  INVALID_OFFSET: 0x9402,
  FILE_NOT_FOUND: 0x9404,
  INCONSISTENT_FILE: 0x9408,
  ALGORITHM_NOT_SUPPORTED: 0x9484,
  INVALID_KCV: 0x9485,
  CODE_NOT_INITIALIZED: 0x9802,
  ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
  CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
  CONTRADICTION_INVALIDATION: 0x9810,
  CODE_BLOCKED: 0x9840,
  MAX_VALUE_REACHED: 0x9850,
  GP_AUTH_FAILED: 0x6300,
  LICENSING: 0x6f42,
  HALTED: 0x6faa
};
exports.StatusCodes = StatusCodes;

function getAltStatusMessage(code) {
  switch (code) {
    // improve text of most common errors
    case 0x6700:
      return "Incorrect length";

    case 0x6800:
      return "Missing critical parameter";

    case 0x6982:
      return "Security not satisfied (dongle locked or have invalid access rights)";

    case 0x6985:
      return "Condition of use not satisfied (denied by the user?)";

    case 0x6a80:
      return "Invalid data received";

    case 0x6b00:
      return "Invalid parameter received";
  }

  if (0x6f00 <= code && code <= 0x6fff) {
    return "Internal error, please report";
  }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */


function TransportStatusError(statusCode) {
  this.name = "TransportStatusError";
  var statusText = Object.keys(StatusCodes).find(function (k) {
    return StatusCodes[k] === statusCode;
  }) || "UNKNOWN_ERROR";
  var smsg = getAltStatusMessage(statusCode) || statusText;
  var statusCodeStr = statusCode.toString(16);
  this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
  this.stack = new Error().stack;
  this.statusCode = statusCode;
  this.statusText = statusText;
}

TransportStatusError.prototype = new Error();
addCustomErrorDeserializer("TransportStatusError", function (e) {
  return new TransportStatusError(e.statusCode);
});
},{}],"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/@ledgerhq/hw-transport/lib-es/Transport.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TransportError", {
  enumerable: true,
  get: function () {
    return _errors.TransportError;
  }
});
Object.defineProperty(exports, "StatusCodes", {
  enumerable: true,
  get: function () {
    return _errors.StatusCodes;
  }
});
Object.defineProperty(exports, "getAltStatusMessage", {
  enumerable: true,
  get: function () {
    return _errors.getAltStatusMessage;
  }
});
Object.defineProperty(exports, "TransportStatusError", {
  enumerable: true,
  get: function () {
    return _errors.TransportStatusError;
  }
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var _errors = require("@ledgerhq/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 */

/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */
class Transport {
  constructor() {
    this.exchangeTimeout = 30000;
    this.unresponsiveTimeout = 15000;
    this.deviceModel = null;
    this._events = new _events.default();

    this.send = async (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [_errors.StatusCodes.OK]) => {
      if (data.length >= 256) {
        throw new _errors.TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
      }

      const response = await this.exchange(Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]));
      const sw = response.readUInt16BE(response.length - 2);

      if (!statusList.some(s => s === sw)) {
        throw new _errors.TransportStatusError(sw);
      }

      return response;
    };

    this.exchangeBusyPromise = void 0;

    this.exchangeAtomicImpl = async f => {
      if (this.exchangeBusyPromise) {
        throw new _errors.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
      }

      let resolveBusy;
      const busyPromise = new Promise(r => {
        resolveBusy = r;
      });
      this.exchangeBusyPromise = busyPromise;
      let unresponsiveReached = false;
      const timeout = setTimeout(() => {
        unresponsiveReached = true;
        this.emit("unresponsive");
      }, this.unresponsiveTimeout);

      try {
        const res = await f();

        if (unresponsiveReached) {
          this.emit("responsive");
        }

        return res;
      } finally {
        clearTimeout(timeout);
        if (resolveBusy) resolveBusy();
        this.exchangeBusyPromise = null;
      }
    };

    this._appAPIlock = null;
  }
  /**
   * low level api to communicate with the device
   * This method is for implementations to implement but should not be directly called.
   * Instead, the recommanded way is to use send() method
   * @param apdu the data to send
   * @return a Promise of response data
   */


  exchange(_apdu) {
    throw new Error("exchange not implemented");
  }
  /**
   * set the "scramble key" for the next exchanges with the device.
   * Each App can have a different scramble key and they internally will set it at instanciation.
   * @param key the scramble key
   */


  setScrambleKey(_key) {}
  /**
   * close the exchange with the device.
   * @return a Promise that ends when the transport is closed.
   */


  close() {
    return Promise.resolve();
  }
  /**
   * Listen to an event on an instance of transport.
   * Transport implementation can have specific events. Here is the common events:
   * * `"disconnect"` : triggered if Transport is disconnected
   */


  on(eventName, cb) {
    this._events.on(eventName, cb);
  }
  /**
   * Stop listening to an event on an instance of transport.
   */


  off(eventName, cb) {
    this._events.removeListener(eventName, cb);
  }

  emit(event, ...args) {
    this._events.emit(event, ...args);
  }
  /**
   * Enable or not logs of the binary exchange
   */


  setDebugMode() {
    console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
  }
  /**
   * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
   */


  setExchangeTimeout(exchangeTimeout) {
    this.exchangeTimeout = exchangeTimeout;
  }
  /**
   * Define the delay before emitting "unresponsive" on an exchange that does not respond
   */


  setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
    this.unresponsiveTimeout = unresponsiveTimeout;
  }
  /**
   * wrapper on top of exchange to simplify work of the implementation.
   * @param cla
   * @param ins
   * @param p1
   * @param p2
   * @param data
   * @param statusList is a list of accepted status code (shorts). [0x9000] by default
   * @return a Promise of response buffer
   */

  /**
   * create() allows to open the first descriptor available or
   * throw if there is none or if timeout is reached.
   * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
   * @example
  TransportFoo.create().then(transport => ...)
   */


  static create(openTimeout = 3000, listenTimeout) {
    return new Promise((resolve, reject) => {
      let found = false;
      const sub = this.listen({
        next: e => {
          found = true;
          if (sub) sub.unsubscribe();
          if (listenTimeoutId) clearTimeout(listenTimeoutId);
          this.open(e.descriptor, openTimeout).then(resolve, reject);
        },
        error: e => {
          if (listenTimeoutId) clearTimeout(listenTimeoutId);
          reject(e);
        },
        complete: () => {
          if (listenTimeoutId) clearTimeout(listenTimeoutId);

          if (!found) {
            reject(new _errors.TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
          }
        }
      });
      const listenTimeoutId = listenTimeout ? setTimeout(() => {
        sub.unsubscribe();
        reject(new _errors.TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
      }, listenTimeout) : null;
    });
  }

  decorateAppAPIMethods(self, methods, scrambleKey) {
    for (let methodName of methods) {
      self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
    }
  }

  decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
    return async (...args) => {
      const {
        _appAPIlock
      } = this;

      if (_appAPIlock) {
        return Promise.reject(new _errors.TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
      }

      try {
        this._appAPIlock = methodName;
        this.setScrambleKey(scrambleKey);
        return await f.apply(ctx, args);
      } finally {
        this._appAPIlock = null;
      }
    };
  }

}

exports.default = Transport;
Transport.isSupported = void 0;
Transport.list = void 0;
Transport.listen = void 0;
Transport.open = void 0;
Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
},{"events":"../node_modules/events/events.js","@ledgerhq/errors":"../node_modules/@ledgerhq/errors/dist/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/@ledgerhq/devices/lib/hid-framing.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = require("@ledgerhq/errors");

const Tag = 0x05;

function asUInt16BE(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}

const initialAcc = {
  data: Buffer.alloc(0),
  dataLength: 0,
  sequence: 0
};
/**
 *
 */

const createHIDframing = (channel, packetSize) => {
  return {
    makeBlocks(apdu) {
      let data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
      const blockSize = packetSize - 5;
      const nbBlocks = Math.ceil(data.length / blockSize);
      data = Buffer.concat([data, // fill data with padding
      Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);
      const blocks = [];

      for (let i = 0; i < nbBlocks; i++) {
        const head = Buffer.alloc(5);
        head.writeUInt16BE(channel, 0);
        head.writeUInt8(Tag, 2);
        head.writeUInt16BE(i, 3);
        const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
        blocks.push(Buffer.concat([head, chunk]));
      }

      return blocks;
    },

    reduceResponse(acc, chunk) {
      let {
        data,
        dataLength,
        sequence
      } = acc || initialAcc;

      if (chunk.readUInt16BE(0) !== channel) {
        throw new _errors.TransportError("Invalid channel", "InvalidChannel");
      }

      if (chunk.readUInt8(2) !== Tag) {
        throw new _errors.TransportError("Invalid tag", "InvalidTag");
      }

      if (chunk.readUInt16BE(3) !== sequence) {
        throw new _errors.TransportError("Invalid sequence", "InvalidSequence");
      }

      if (!acc) {
        dataLength = chunk.readUInt16BE(5);
      }

      sequence++;
      const chunkData = chunk.slice(acc ? 5 : 7);
      data = Buffer.concat([data, chunkData]);

      if (data.length > dataLength) {
        data = data.slice(0, dataLength);
      }

      return {
        data,
        dataLength,
        sequence
      };
    },

    getReducedResult(acc) {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data;
      }
    }

  };
};

var _default = createHIDframing;
exports.default = _default;

},{"@ledgerhq/errors":"../node_modules/@ledgerhq/errors/dist/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/@ledgerhq/devices/lib-es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfosForServiceUuid = exports.getBluetoothServiceUuids = exports.identifyProductName = exports.identifyUSBProductId = exports.getDeviceModel = exports.ledgerUSBVendorId = exports.IIWebUSB = exports.IICCID = exports.IIU2F = exports.IIKeyboardHID = exports.IIGenericHID = void 0;

/**
 * The USB product IDs will be defined as MMII, encoding a model (MM) and an interface bitfield (II)
 *
 ** Model
 * Ledger Nano S : 0x10
 * Ledger Blue : 0x00
 * Ledger Nano X : 0x40
 *
 ** Interface support bitfield
 * Generic HID : 0x01
 * Keyboard HID : 0x02
 * U2F : 0x04
 * CCID : 0x08
 * WebUSB : 0x10
 */
const IIGenericHID = 0x01;
exports.IIGenericHID = IIGenericHID;
const IIKeyboardHID = 0x02;
exports.IIKeyboardHID = IIKeyboardHID;
const IIU2F = 0x04;
exports.IIU2F = IIU2F;
const IICCID = 0x08;
exports.IICCID = IICCID;
const IIWebUSB = 0x10;
exports.IIWebUSB = IIWebUSB;
const devices = {
  blue: {
    id: "blue",
    productName: "Ledger Blue",
    productIdMM: 0x00,
    legacyUsbProductId: 0x0000,
    usbOnly: true,
    memorySize: 480 * 1024,
    blockSize: 4 * 1024
  },
  nanoS: {
    id: "nanoS",
    productName: "Ledger Nano S",
    productIdMM: 0x10,
    legacyUsbProductId: 0x0001,
    usbOnly: true,
    memorySize: 320 * 1024,
    blockSize: 4 * 1024
  },
  nanoX: {
    id: "nanoX",
    productName: "Ledger Nano X",
    productIdMM: 0x40,
    legacyUsbProductId: 0x0004,
    usbOnly: false,
    memorySize: 2 * 1024 * 1024,
    blockSize: 4 * 1024,
    bluetoothSpec: [{
      // this is the legacy one (prototype version). we will eventually drop it.
      serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
      notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
      writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
    }, {
      serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
      notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
      writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
    }]
  }
};
const productMap = {
  Blue: "blue",
  "Nano S": "nanoS",
  "Nano X": "nanoX"
}; // $FlowFixMe

const devicesList = Object.values(devices);
/**
 *
 */

const ledgerUSBVendorId = 0x2c97;
/**
 *
 */

exports.ledgerUSBVendorId = ledgerUSBVendorId;

const getDeviceModel = id => {
  const info = devices[id];
  if (!info) throw new Error("device '" + id + "' does not exist");
  return info;
};
/**
 *
 */


exports.getDeviceModel = getDeviceModel;

const identifyUSBProductId = usbProductId => {
  const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
  if (legacy) return legacy;
  const mm = usbProductId >> 8;
  const deviceModel = devicesList.find(d => d.productIdMM === mm);
  return deviceModel;
};

exports.identifyUSBProductId = identifyUSBProductId;

const identifyProductName = productName => {
  const productId = productMap[productName];
  const deviceModel = devicesList.find(d => d.id === productId);
  return deviceModel;
};

exports.identifyProductName = identifyProductName;
const bluetoothServices = [];
const serviceUuidToInfos = {};

for (let id in devices) {
  const deviceModel = devices[id];
  const {
    bluetoothSpec
  } = deviceModel;

  if (bluetoothSpec) {
    for (let i = 0; i < bluetoothSpec.length; i++) {
      const spec = bluetoothSpec[i];
      bluetoothServices.push(spec.serviceUuid);
      serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = {
        deviceModel,
        ...spec
      };
    }
  }
}
/**
 *
 */


const getBluetoothServiceUuids = () => bluetoothServices;
/**
 *
 */


exports.getBluetoothServiceUuids = getBluetoothServiceUuids;

const getInfosForServiceUuid = uuid => serviceUuidToInfos[uuid.toLowerCase()];
/**
 *
 */


exports.getInfosForServiceUuid = getInfosForServiceUuid;
},{}],"../node_modules/@ledgerhq/logs/lib-es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = exports.log = void 0;

/**
 * A Log object
 */
let id = 0;
const subscribers = [];
/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */

const log = (type, message, data) => {
  const obj = {
    type,
    id: String(++id),
    date: new Date()
  };
  if (message) obj.message = message;
  if (data) obj.data = data;
  dispatch(obj);
};
/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */


exports.log = log;

const listen = cb => {
  subscribers.push(cb);
  return () => {
    const i = subscribers.indexOf(cb);

    if (i !== -1) {
      // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
      subscribers[i] = subscribers[subscribers.length - 1];
      subscribers.pop();
    }
  };
};

exports.listen = listen;

function dispatch(log) {
  for (let i = 0; i < subscribers.length; i++) {
    try {
      subscribers[i](log);
    } catch (e) {
      console.error(e);
    }
  }
} // for debug purpose


if (typeof window !== "undefined") {
  window.__ledgerLogsListen = listen;
}
},{}],"../node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestLedgerDevice = requestLedgerDevice;
exports.getLedgerDevices = getLedgerDevices;
exports.getFirstLedgerDevice = getFirstLedgerDevice;
exports.isSupported = void 0;

var _devices = require("@ledgerhq/devices");

const ledgerDevices = [{
  vendorId: _devices.ledgerUSBVendorId
}];

async function requestLedgerDevice() {
  // $FlowFixMe
  const device = await navigator.usb.requestDevice({
    filters: ledgerDevices
  });
  return device;
}

async function getLedgerDevices() {
  // $FlowFixMe
  const devices = await navigator.usb.getDevices();
  return devices.filter(d => d.vendorId === _devices.ledgerUSBVendorId);
}

async function getFirstLedgerDevice() {
  const existingDevices = await getLedgerDevices();
  if (existingDevices.length > 0) return existingDevices[0];
  return requestLedgerDevice();
}

const isSupported = () => Promise.resolve(!!navigator && // $FlowFixMe
!!navigator.usb && typeof navigator.usb.getDevices === "function");

exports.isSupported = isSupported;
},{"@ledgerhq/devices":"../node_modules/@ledgerhq/devices/lib-es/index.js"}],"../node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hwTransport = _interopRequireDefault(require("@ledgerhq/hw-transport"));

var _hidFraming = _interopRequireDefault(require("@ledgerhq/devices/lib/hid-framing"));

var _devices = require("@ledgerhq/devices");

var _logs = require("@ledgerhq/logs");

var _errors = require("@ledgerhq/errors");

var _webusb = require("./webusb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configurationValue = 1;
const endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */

class TransportWebUSB extends _hwTransport.default {
  constructor(device, interfaceNumber) {
    super();
    this.device = void 0;
    this.deviceModel = void 0;
    this.channel = Math.floor(Math.random() * 0xffff);
    this.packetSize = 64;
    this.interfaceNumber = void 0;
    this._disconnectEmitted = false;

    this._emitDisconnect = e => {
      if (this._disconnectEmitted) return;
      this._disconnectEmitted = true;
      this.emit("disconnect", e);
    };

    this.exchange = apdu => this.exchangeAtomicImpl(async () => {
      const {
        channel,
        packetSize
      } = this;
      (0, _logs.log)("apdu", "=> " + apdu.toString("hex"));
      const framing = (0, _hidFraming.default)(channel, packetSize); // Write...

      const blocks = framing.makeBlocks(apdu);

      for (let i = 0; i < blocks.length; i++) {
        (0, _logs.log)("hid-frame", "=> " + blocks[i].toString("hex"));
        await this.device.transferOut(endpointNumber, blocks[i]);
      } // Read...


      let result;
      let acc;

      while (!(result = framing.getReducedResult(acc))) {
        const r = await this.device.transferIn(endpointNumber, packetSize);
        const buffer = Buffer.from(r.data.buffer);
        (0, _logs.log)("hid-frame", "<= " + buffer.toString("hex"));
        acc = framing.reduceResponse(acc, buffer);
      }

      (0, _logs.log)("apdu", "<= " + result.toString("hex"));
      return result;
    }).catch(e => {
      if (e && e.message && e.message.includes("disconnected")) {
        this._emitDisconnect(e);

        throw new _errors.DisconnectedDeviceDuringOperation(e.message);
      }

      throw e;
    });

    this.device = device;
    this.interfaceNumber = interfaceNumber;
    this.deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
  }
  /**
   * Check if WebUSB transport is supported.
   */

  /**
   * Similar to create() except it will always display the device permission (even if some devices are already accepted).
   */


  static async request() {
    const device = await (0, _webusb.requestLedgerDevice)();
    return TransportWebUSB.open(device);
  }
  /**
   * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
   */


  static async openConnected() {
    const devices = await (0, _webusb.getLedgerDevices)();
    if (devices.length === 0) return null;
    return TransportWebUSB.open(devices[0]);
  }
  /**
   * Create a Ledger transport with a USBDevice
   */


  static async open(device) {
    await device.open();

    if (device.configuration === null) {
      await device.selectConfiguration(configurationValue);
    }

    await device.reset();
    const iface = device.configurations[0].interfaces.find(({
      alternates
    }) => alternates.some(a => a.interfaceClass === 255));

    if (!iface) {
      throw new _errors.TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
    }

    const interfaceNumber = iface.interfaceNumber;

    try {
      await device.claimInterface(interfaceNumber);
    } catch (e) {
      await device.close();
      throw new _errors.TransportInterfaceNotAvailable(e.message);
    }

    const transport = new TransportWebUSB(device, interfaceNumber);

    const onDisconnect = e => {
      if (device === e.device) {
        // $FlowFixMe
        navigator.usb.removeEventListener("disconnect", onDisconnect);

        transport._emitDisconnect(new _errors.DisconnectedDevice());
      }
    }; // $FlowFixMe


    navigator.usb.addEventListener("disconnect", onDisconnect);
    return transport;
  }
  /**
   * Release the transport device
   */


  async close() {
    await this.exchangeBusyPromise;
    await this.device.releaseInterface(this.interfaceNumber);
    await this.device.reset();
    await this.device.close();
  }
  /**
   * Exchange with the device using APDU protocol.
   * @param apdu
   * @returns a promise of apdu response
   */


  setScrambleKey() {}

}

exports.default = TransportWebUSB;
TransportWebUSB.isSupported = _webusb.isSupported;
TransportWebUSB.list = _webusb.getLedgerDevices;

TransportWebUSB.listen = observer => {
  let unsubscribed = false;
  (0, _webusb.getFirstLedgerDevice)().then(device => {
    if (!unsubscribed) {
      const deviceModel = (0, _devices.identifyUSBProductId)(device.productId);
      observer.next({
        type: "add",
        descriptor: device,
        deviceModel
      });
      observer.complete();
    }
  }, error => {
    if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
      observer.error(new _errors.TransportWebUSBGestureRequired(error.message));
    } else {
      observer.error(new _errors.TransportOpenUserCancelled(error.message));
    }
  });

  function unsubscribe() {
    unsubscribed = true;
  }

  return {
    unsubscribe
  };
};
},{"@ledgerhq/hw-transport":"../node_modules/@ledgerhq/hw-transport/lib-es/Transport.js","@ledgerhq/devices/lib/hid-framing":"../node_modules/@ledgerhq/devices/lib/hid-framing.js","@ledgerhq/devices":"../node_modules/@ledgerhq/devices/lib-es/index.js","@ledgerhq/logs":"../node_modules/@ledgerhq/logs/lib-es/index.js","@ledgerhq/errors":"../node_modules/@ledgerhq/errors/dist/index.js","./webusb":"../node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/inherits/inherits_browser.js":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],"../node_modules/safe-buffer/index.js":[function(require,module,exports) {

/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":"../node_modules/buffer/index.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/process-nextick-args/index.js":[function(require,module,exports) {
var process = require("process");
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


},{"process":"../node_modules/process/browser.js"}],"../node_modules/readable-stream/lib/internal/streams/stream-browser.js":[function(require,module,exports) {
module.exports = require('events').EventEmitter;

},{"events":"../node_modules/events/events.js"}],"../node_modules/core-util-is/lib/util.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

},{"buffer":"../node_modules/buffer/index.js"}],"../node_modules/parcel/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/readable-stream/lib/internal/streams/BufferList.js":[function(require,module,exports) {

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":"../node_modules/safe-buffer/index.js","util":"../node_modules/parcel/src/builtins/_empty.js"}],"../node_modules/readable-stream/lib/internal/streams/destroy.js":[function(require,module,exports) {
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":"../node_modules/process-nextick-args/index.js"}],"../node_modules/util-deprecate/browser.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

},{}],"../node_modules/readable-stream/lib/_stream_writable.js":[function(require,module,exports) {
var process = require("process");

var global = arguments[3];
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';
/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var asyncWrite = !true && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/

var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/


var Buffer = require('safe-buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/


var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  var isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm; // cast to ints.

  this.highWaterMark = Math.floor(this.highWaterMark); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end'); // TODO: defer error events consistently everywhere, not just the cb

  stream.emit('error', er);
  pna.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }

  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }

  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;
  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      stream.emit('error', err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
},{"process-nextick-args":"../node_modules/process-nextick-args/index.js","core-util-is":"../node_modules/core-util-is/lib/util.js","inherits":"../node_modules/inherits/inherits_browser.js","util-deprecate":"../node_modules/util-deprecate/browser.js","./internal/streams/stream":"../node_modules/readable-stream/lib/internal/streams/stream-browser.js","safe-buffer":"../node_modules/safe-buffer/index.js","./internal/streams/destroy":"../node_modules/readable-stream/lib/internal/streams/destroy.js","./_stream_duplex":"../node_modules/readable-stream/lib/_stream_duplex.js","process":"../node_modules/process/browser.js"}],"../node_modules/readable-stream/lib/_stream_duplex.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"process-nextick-args":"../node_modules/process-nextick-args/index.js","core-util-is":"../node_modules/core-util-is/lib/util.js","inherits":"../node_modules/inherits/inherits_browser.js","./_stream_readable":"../node_modules/readable-stream/lib/_stream_readable.js","./_stream_writable":"../node_modules/readable-stream/lib/_stream_writable.js"}],"../node_modules/string_decoder/lib/string_decoder.js":[function(require,module,exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/readable-stream/lib/_stream_readable.js":[function(require,module,exports) {

var global = arguments[3];
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
},{"process-nextick-args":"../node_modules/process-nextick-args/index.js","isarray":"../node_modules/isarray/index.js","events":"../node_modules/events/events.js","./internal/streams/stream":"../node_modules/readable-stream/lib/internal/streams/stream-browser.js","safe-buffer":"../node_modules/safe-buffer/index.js","core-util-is":"../node_modules/core-util-is/lib/util.js","inherits":"../node_modules/inherits/inherits_browser.js","util":"../node_modules/parcel/src/builtins/_empty.js","./internal/streams/BufferList":"../node_modules/readable-stream/lib/internal/streams/BufferList.js","./internal/streams/destroy":"../node_modules/readable-stream/lib/internal/streams/destroy.js","./_stream_duplex":"../node_modules/readable-stream/lib/_stream_duplex.js","string_decoder/":"../node_modules/string_decoder/lib/string_decoder.js","process":"../node_modules/process/browser.js"}],"../node_modules/readable-stream/lib/_stream_transform.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":"../node_modules/readable-stream/lib/_stream_duplex.js","core-util-is":"../node_modules/core-util-is/lib/util.js","inherits":"../node_modules/inherits/inherits_browser.js"}],"../node_modules/readable-stream/lib/_stream_passthrough.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":"../node_modules/readable-stream/lib/_stream_transform.js","core-util-is":"../node_modules/core-util-is/lib/util.js","inherits":"../node_modules/inherits/inherits_browser.js"}],"../node_modules/readable-stream/readable-browser.js":[function(require,module,exports) {
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_readable.js":"../node_modules/readable-stream/lib/_stream_readable.js","./lib/_stream_writable.js":"../node_modules/readable-stream/lib/_stream_writable.js","./lib/_stream_duplex.js":"../node_modules/readable-stream/lib/_stream_duplex.js","./lib/_stream_transform.js":"../node_modules/readable-stream/lib/_stream_transform.js","./lib/_stream_passthrough.js":"../node_modules/readable-stream/lib/_stream_passthrough.js"}],"../node_modules/readable-stream/writable-browser.js":[function(require,module,exports) {
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":"../node_modules/readable-stream/lib/_stream_writable.js"}],"../node_modules/readable-stream/duplex-browser.js":[function(require,module,exports) {
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":"../node_modules/readable-stream/lib/_stream_duplex.js"}],"../node_modules/readable-stream/transform.js":[function(require,module,exports) {
module.exports = require('./readable').Transform

},{"./readable":"../node_modules/readable-stream/readable-browser.js"}],"../node_modules/readable-stream/passthrough.js":[function(require,module,exports) {
module.exports = require('./readable').PassThrough

},{"./readable":"../node_modules/readable-stream/readable-browser.js"}],"../node_modules/stream-browserify/index.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":"../node_modules/events/events.js","inherits":"../node_modules/inherits/inherits_browser.js","readable-stream/readable.js":"../node_modules/readable-stream/readable-browser.js","readable-stream/writable.js":"../node_modules/readable-stream/writable-browser.js","readable-stream/duplex.js":"../node_modules/readable-stream/duplex-browser.js","readable-stream/transform.js":"../node_modules/readable-stream/transform.js","readable-stream/passthrough.js":"../node_modules/readable-stream/passthrough.js"}],"../node_modules/hash-base/index.js":[function(require,module,exports) {

'use strict';

var Buffer = require('safe-buffer').Buffer;

var Transform = require('stream').Transform;

var inherits = require('inherits');

function throwIfNotStringOrBuffer(val, prefix) {
  if (!Buffer.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer');
  }
}

function HashBase(blockSize) {
  Transform.call(this);
  this._block = Buffer.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];
  this._finalized = false;
}

inherits(HashBase, Transform);

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null;

  try {
    this.update(chunk, encoding);
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase.prototype._flush = function (callback) {
  var error = null;

  try {
    this.push(this.digest());
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase.prototype.update = function (data, encoding) {
  throwIfNotStringOrBuffer(data, 'Data');
  if (this._finalized) throw new Error('Digest already called');
  if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding); // consume data

  var block = this._block;
  var offset = 0;

  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++];

    this._update();

    this._blockOffset = 0;
  }

  while (offset < data.length) block[this._blockOffset++] = data[offset++]; // update length


  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry;
    carry = this._length[j] / 0x0100000000 | 0;
    if (carry > 0) this._length[j] -= 0x0100000000 * carry;
  }

  return this;
};

HashBase.prototype._update = function () {
  throw new Error('_update is not implemented');
};

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called');
  this._finalized = true;

  var digest = this._digest();

  if (encoding !== undefined) digest = digest.toString(encoding); // reset state

  this._block.fill(0);

  this._blockOffset = 0;

  for (var i = 0; i < 4; ++i) this._length[i] = 0;

  return digest;
};

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented');
};

module.exports = HashBase;
},{"safe-buffer":"../node_modules/safe-buffer/index.js","stream":"../node_modules/stream-browserify/index.js","inherits":"../node_modules/inherits/inherits_browser.js"}],"../node_modules/ripemd160/index.js":[function(require,module,exports) {

'use strict'
var Buffer = require('buffer').Buffer
var inherits = require('inherits')
var HashBase = require('hash-base')

var ARRAY16 = new Array(16)

var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
]

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
]

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
]

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
]

var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]
var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]

function RIPEMD160 () {
  HashBase.call(this, 64)

  // state
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0
}

inherits(RIPEMD160, HashBase)

RIPEMD160.prototype._update = function () {
  var words = ARRAY16
  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4)

  var al = this._a | 0
  var bl = this._b | 0
  var cl = this._c | 0
  var dl = this._d | 0
  var el = this._e | 0

  var ar = this._a | 0
  var br = this._b | 0
  var cr = this._c | 0
  var dr = this._d | 0
  var er = this._e | 0

  // computation
  for (var i = 0; i < 80; i += 1) {
    var tl
    var tr
    if (i < 16) {
      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i])
      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i])
    } else if (i < 32) {
      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i])
      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i])
    } else if (i < 48) {
      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i])
      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i])
    } else if (i < 64) {
      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i])
      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i])
    } else { // if (i<80) {
      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i])
      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i])
    }

    al = el
    el = dl
    dl = rotl(cl, 10)
    cl = bl
    bl = tl

    ar = er
    er = dr
    dr = rotl(cr, 10)
    cr = br
    br = tr
  }

  // update state
  var t = (this._b + cl + dr) | 0
  this._b = (this._c + dl + er) | 0
  this._c = (this._d + el + ar) | 0
  this._d = (this._e + al + br) | 0
  this._e = (this._a + bl + cr) | 0
  this._a = t
}

RIPEMD160.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64)
    this._update()
    this._blockOffset = 0
  }

  this._block.fill(0, this._blockOffset, 56)
  this._block.writeUInt32LE(this._length[0], 56)
  this._block.writeUInt32LE(this._length[1], 60)
  this._update()

  // produce result
  var buffer = Buffer.alloc ? Buffer.alloc(20) : new Buffer(20)
  buffer.writeInt32LE(this._a, 0)
  buffer.writeInt32LE(this._b, 4)
  buffer.writeInt32LE(this._c, 8)
  buffer.writeInt32LE(this._d, 12)
  buffer.writeInt32LE(this._e, 16)
  return buffer
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

module.exports = RIPEMD160

},{"buffer":"../node_modules/buffer/index.js","inherits":"../node_modules/inherits/inherits_browser.js","hash-base":"../node_modules/hash-base/index.js"}],"../node_modules/sha.js/hash.js":[function(require,module,exports) {

var Buffer = require('safe-buffer').Buffer

// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = Buffer.alloc(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = Buffer.from(data, enc)
  }

  var block = this._block
  var blockSize = this._blockSize
  var length = data.length
  var accum = this._len

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize
    var remainder = Math.min(length - offset, blockSize - assigned)

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i]
    }

    accum += remainder
    offset += remainder

    if ((accum % blockSize) === 0) {
      this._update(block)
    }
  }

  this._len += length
  return this
}

Hash.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize

  this._block[rem] = 0x80

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1)

  if (rem >= this._finalSize) {
    this._update(this._block)
    this._block.fill(0)
  }

  var bits = this._len * 8

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4)

  // uint64
  } else {
    var lowBits = (bits & 0xffffffff) >>> 0
    var highBits = (bits - lowBits) / 0x100000000

    this._block.writeUInt32BE(highBits, this._blockSize - 8)
    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
  }

  this._update(this._block)
  var hash = this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash

},{"safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha.js":[function(require,module,exports) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits = require('inherits')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha, Hash)

Sha.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha

},{"inherits":"../node_modules/inherits/inherits_browser.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha1.js":[function(require,module,exports) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = require('inherits')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1

},{"inherits":"../node_modules/inherits/inherits_browser.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha256.js":[function(require,module,exports) {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = require('inherits')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var K = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
]

var W = new Array(64)

function Sha256 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha256, Hash)

Sha256.prototype.init = function () {
  this._a = 0x6a09e667
  this._b = 0xbb67ae85
  this._c = 0x3c6ef372
  this._d = 0xa54ff53a
  this._e = 0x510e527f
  this._f = 0x9b05688c
  this._g = 0x1f83d9ab
  this._h = 0x5be0cd19

  return this
}

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0
  var f = this._f | 0
  var g = this._g | 0
  var h = this._h | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
    var T2 = (sigma0(a) + maj(a, b, c)) | 0

    h = g
    g = f
    f = e
    e = (d + T1) | 0
    d = c
    c = b
    b = a
    a = (T1 + T2) | 0
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
  this._f = (f + this._f) | 0
  this._g = (g + this._g) | 0
  this._h = (h + this._h) | 0
}

Sha256.prototype._hash = function () {
  var H = Buffer.allocUnsafe(32)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)
  H.writeInt32BE(this._h, 28)

  return H
}

module.exports = Sha256

},{"inherits":"../node_modules/inherits/inherits_browser.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha224.js":[function(require,module,exports) {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = require('inherits')
var Sha256 = require('./sha256')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var W = new Array(64)

function Sha224 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha224, Sha256)

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8
  this._b = 0x367cd507
  this._c = 0x3070dd17
  this._d = 0xf70e5939
  this._e = 0xffc00b31
  this._f = 0x68581511
  this._g = 0x64f98fa7
  this._h = 0xbefa4fa4

  return this
}

Sha224.prototype._hash = function () {
  var H = Buffer.allocUnsafe(28)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)

  return H
}

module.exports = Sha224

},{"inherits":"../node_modules/inherits/inherits_browser.js","./sha256":"../node_modules/sha.js/sha256.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha512.js":[function(require,module,exports) {

var inherits = require('inherits')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
]

var W = new Array(160)

function Sha512 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha512, Hash)

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667
  this._bh = 0xbb67ae85
  this._ch = 0x3c6ef372
  this._dh = 0xa54ff53a
  this._eh = 0x510e527f
  this._fh = 0x9b05688c
  this._gh = 0x1f83d9ab
  this._hh = 0x5be0cd19

  this._al = 0xf3bcc908
  this._bl = 0x84caa73b
  this._cl = 0xfe94f82b
  this._dl = 0x5f1d36f1
  this._el = 0xade682d1
  this._fl = 0x2b3e6c1f
  this._gl = 0xfb41bd6b
  this._hl = 0x137e2179

  return this
}

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w

  var ah = this._ah | 0
  var bh = this._bh | 0
  var ch = this._ch | 0
  var dh = this._dh | 0
  var eh = this._eh | 0
  var fh = this._fh | 0
  var gh = this._gh | 0
  var hh = this._hh | 0

  var al = this._al | 0
  var bl = this._bl | 0
  var cl = this._cl | 0
  var dl = this._dl | 0
  var el = this._el | 0
  var fl = this._fl | 0
  var gl = this._gl | 0
  var hl = this._hl | 0

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4)
    W[i + 1] = M.readInt32BE(i * 4 + 4)
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2]
    var xl = W[i - 15 * 2 + 1]
    var gamma0 = Gamma0(xh, xl)
    var gamma0l = Gamma0l(xl, xh)

    xh = W[i - 2 * 2]
    xl = W[i - 2 * 2 + 1]
    var gamma1 = Gamma1(xh, xl)
    var gamma1l = Gamma1l(xl, xh)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2]
    var Wi7l = W[i - 7 * 2 + 1]

    var Wi16h = W[i - 16 * 2]
    var Wi16l = W[i - 16 * 2 + 1]

    var Wil = (gamma0l + Wi7l) | 0
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
    Wil = (Wil + gamma1l) | 0
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
    Wil = (Wil + Wi16l) | 0
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

    W[i] = Wih
    W[i + 1] = Wil
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j]
    Wil = W[j + 1]

    var majh = maj(ah, bh, ch)
    var majl = maj(al, bl, cl)

    var sigma0h = sigma0(ah, al)
    var sigma0l = sigma0(al, ah)
    var sigma1h = sigma1(eh, el)
    var sigma1l = sigma1(el, eh)

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j]
    var Kil = K[j + 1]

    var chh = Ch(eh, fh, gh)
    var chl = Ch(el, fl, gl)

    var t1l = (hl + sigma1l) | 0
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
    t1l = (t1l + chl) | 0
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
    t1l = (t1l + Kil) | 0
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
    t1l = (t1l + Wil) | 0
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

    hh = gh
    hl = gl
    gh = fh
    gl = fl
    fh = eh
    fl = el
    el = (dl + t1l) | 0
    eh = (dh + t1h + getCarry(el, dl)) | 0
    dh = ch
    dl = cl
    ch = bh
    cl = bl
    bh = ah
    bl = al
    al = (t1l + t2l) | 0
    ah = (t1h + t2h + getCarry(al, t1l)) | 0
  }

  this._al = (this._al + al) | 0
  this._bl = (this._bl + bl) | 0
  this._cl = (this._cl + cl) | 0
  this._dl = (this._dl + dl) | 0
  this._el = (this._el + el) | 0
  this._fl = (this._fl + fl) | 0
  this._gl = (this._gl + gl) | 0
  this._hl = (this._hl + hl) | 0

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
}

Sha512.prototype._hash = function () {
  var H = Buffer.allocUnsafe(64)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)
  writeInt64BE(this._gh, this._gl, 48)
  writeInt64BE(this._hh, this._hl, 56)

  return H
}

module.exports = Sha512

},{"inherits":"../node_modules/inherits/inherits_browser.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/sha384.js":[function(require,module,exports) {

var inherits = require('inherits')
var SHA512 = require('./sha512')
var Hash = require('./hash')
var Buffer = require('safe-buffer').Buffer

var W = new Array(160)

function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha384, SHA512)

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d
  this._bh = 0x629a292a
  this._ch = 0x9159015a
  this._dh = 0x152fecd8
  this._eh = 0x67332667
  this._fh = 0x8eb44a87
  this._gh = 0xdb0c2e0d
  this._hh = 0x47b5481d

  this._al = 0xc1059ed8
  this._bl = 0x367cd507
  this._cl = 0x3070dd17
  this._dl = 0xf70e5939
  this._el = 0xffc00b31
  this._fl = 0x68581511
  this._gl = 0x64f98fa7
  this._hl = 0xbefa4fa4

  return this
}

Sha384.prototype._hash = function () {
  var H = Buffer.allocUnsafe(48)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)

  return H
}

module.exports = Sha384

},{"inherits":"../node_modules/inherits/inherits_browser.js","./sha512":"../node_modules/sha.js/sha512.js","./hash":"../node_modules/sha.js/hash.js","safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/sha.js/index.js":[function(require,module,exports) {
var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = require('./sha')
exports.sha1 = require('./sha1')
exports.sha224 = require('./sha224')
exports.sha256 = require('./sha256')
exports.sha384 = require('./sha384')
exports.sha512 = require('./sha512')

},{"./sha":"../node_modules/sha.js/sha.js","./sha1":"../node_modules/sha.js/sha1.js","./sha224":"../node_modules/sha.js/sha224.js","./sha256":"../node_modules/sha.js/sha256.js","./sha384":"../node_modules/sha.js/sha384.js","./sha512":"../node_modules/sha.js/sha512.js"}],"../node_modules/base-x/src/index.js":[function(require,module,exports) {
'use strict'
// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore
var _Buffer = require('safe-buffer').Buffer
function base (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256)
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i)
    var xc = x.charCodeAt(0)
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i
  }
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)
  var FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up
  function encode (source) {
    if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source) }
    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0
    var length = 0
    var pbegin = 0
    var pend = source.length
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++
      zeroes++
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0
    var b58 = new Uint8Array(size)
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin]
            // Apply "b58 = b58 * 256 + ch".
      var i = 0
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0
        b58[it1] = (carry % BASE) >>> 0
        carry = (carry / BASE) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      pbegin++
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length
    while (it2 !== size && b58[it2] === 0) {
      it2++
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes)
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return _Buffer.alloc(0) }
    var psz = 0
        // Skip leading spaces.
    if (source[psz] === ' ') { return }
        // Skip and count leading '1's.
    var zeroes = 0
    var length = 0
    while (source[psz] === LEADER) {
      zeroes++
      psz++
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size)
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)]
            // Invalid character
      if (carry === 255) { return }
      var i = 0
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0
        b256[it3] = (carry % 256) >>> 0
        carry = (carry / 256) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      psz++
    }
        // Skip trailing spaces.
    if (source[psz] === ' ') { return }
        // Skip leading zeroes in b256.
    var it4 = size - length
    while (it4 !== size && b256[it4] === 0) {
      it4++
    }
    var vch = _Buffer.allocUnsafe(zeroes + (size - it4))
    vch.fill(0x00, 0, zeroes)
    var j = zeroes
    while (it4 !== size) {
      vch[j++] = b256[it4++]
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
module.exports = base

},{"safe-buffer":"../node_modules/safe-buffer/index.js"}],"../node_modules/bs58/index.js":[function(require,module,exports) {
var basex = require('base-x')
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)

},{"base-x":"../node_modules/base-x/src/index.js"}],"../node_modules/ledger-liquid-lib-web/src/ledger-liquid-lib.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
/* eslint-disable require-jsdoc */
// import * as TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
// const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const TransportWebUSB = require('@ledgerhq/hw-transport-webusb').default;
// const cfdjs = require('cfd-js');
const Ripemd160 = require('ripemd160');
const sha = require('sha.js');
const base58 = require('bs58');

function byteToString(buffer) {
  // return buffer.toString();
  return (new TextDecoder).decode(buffer);
}

function byteToHexString(buffer) {
  // return buffer.toString('hex');
  return Array.from(buffer).map((v) => {
    let str = v.toString(16);
    if (str.length === 1) str = '0' + str;
    return str;
  }).join('');
}

function readUInt16BE(buf, offset) {
  // return buf.readUInt16BE(offset);
  if (buf.length <= offset + 1) {
    throw Error('offset range error.');
  }
  let result = buf[offset] << 8;
  result |= buf[offset + 1];
  return result >>> 0;
}

function readUInt16LE(buf, offset) {
  let result = 0;
  if (buf.length <= offset + 1) {
    throw Error('offset range error.');
  }
  result = buf[offset];
  result |= buf[offset + 1] << 8;
  return result >>> 0;
}

function readUInt32LE(buf, offset) {
  let result = 0;
  if (buf.length <= offset + 3) {
    throw Error('offset range error.');
  }
  result |= buf[offset];
  result |= buf[offset + 1] << 8;
  result |= buf[offset + 2] << 16;
  result |= buf[offset + 3] << 24;
  return result >>> 0;
}

function readUInt64BE(buf, offset) {
  let result = 0;
  if (buf.length <= offset + 7) {
    throw Error('offset range error.');
  }
  result |= buf[offset + 7];
  result |= buf[offset + 6] << 8;
  result |= buf[offset + 5] << 16;
  result |= buf[offset + 4] << 24;
  result |= buf[offset + 3] << 32;
  result |= buf[offset + 2] << 40;
  result |= buf[offset + 1] << 48;
  result |= buf[offset] << 56;
  return result >>> 0;
}

function writeUInt16LE(buf, value, offset) {
  const wrBuf = Buffer.from([value & 0x00ff, ((value >> 8) & 0x00ff)]);
  buf[offset] = wrBuf[0];
  buf[offset + 1] = wrBuf[1];
  return buf;
}

function writeUInt32LE(buf, value, offset) {
  const wrBuf = Buffer.from([
    value & 0x00ff,
    ((value >> 8) & 0x00ff),
    ((value >> 16) & 0x00ff),
    ((value >> 24) & 0x00ff),
  ]);
  buf[offset] = wrBuf[0];
  buf[offset + 1] = wrBuf[1];
  buf[offset + 2] = wrBuf[2];
  buf[offset + 3] = wrBuf[3];
  return buf;
}

function writeUInt32BE(buf, value, offset) {
  const wrBuf = Buffer.from([
    ((value >> 24) & 0x00ff),
    ((value >> 16) & 0x00ff),
    ((value >> 8) & 0x00ff),
    value & 0x00ff,
  ]);
  buf[offset] = wrBuf[0];
  buf[offset + 1] = wrBuf[1];
  buf[offset + 2] = wrBuf[2];
  buf[offset + 3] = wrBuf[3];
  return buf;
}

function hash160(buf) {
  const sha256Hash = sha('sha256').update(buf).digest();
  return (new Ripemd160()).update(sha256Hash).digest();
}

function sha256d(buf) {
  const sha256Hash = sha('sha256').update(buf).digest();
  return sha('sha256').update(sha256Hash).digest();
}

function encodeBase58Check(buf) {
  const checksum = sha256d(buf);
  return base58.encode(Buffer.concat([buf, checksum], buf.length + 4));
}

function createExtPubKey(
    networkType, depth, childNumber, chainCode, publicKey, parentPubkey) {
  let version = '043587cf'; // testnet
  if ((networkType === 'mainnet') || (networkType === 'liquidv1')) {
    version = '0488b21e'; // mainnet
  }
  const parentKeyBuf = Buffer.from(parentPubkey, 'hex');
  const fingerprint = byteToHexString(hash160(parentKeyBuf).subarray(0, 4));
  const depthStr = byteToHexString(Buffer.from([depth]));
  let numberBuf = Buffer.alloc(4);
  numberBuf = writeUInt32BE(numberBuf, childNumber, 0);
  const childStr = byteToHexString(numberBuf);

  const xpubHex = [
    version, depthStr, fingerprint, childStr, chainCode, publicKey,
  ].join('');
  return encodeBase58Check(Buffer.from(xpubHex, 'hex'));
};

function readVarIntFromBuffer(buffer, startOffset) {
  let result;
  let size = 1;
  if (buffer[startOffset] < 0xfd) {
    result = buffer[startOffset];
  } else if (buffer[startOffset] === 0xfd) {
    result = readUInt16LE(buffer, startOffset + 1);
    size = 3;
  } else if (buffer[startOffset] === 0xfe) {
    result = readUInt32LE(buffer, startOffset + 1);
    size = 5;
  } else {
    const high = buffer.subarray(startOffset + 1, startOffset + 1 + 4);
    const low = buffer.subarray(startOffset + 5, startOffset + 5 + 4);
    result = readUInt32LE(high, 0) << 32;
    result |= readUInt32LE(low, 0);
    size = 9;
  }
  return {value: result, size: size};
}

function reverseBuffer(buf) {
  const buffer = Buffer.allocUnsafe(buf.length);
  for (let i = 0, j = buf.length - 1; i <= j; ++i, --j) {
    buffer[i] = buf[j];
    buffer[j] = buf[i];
  }
  return buffer;
}

function decodeRawTransaction(proposalTx) {
  const buffer = Buffer.from(proposalTx, 'hex');
  const txin = [];
  const txout = [];
  const version = readUInt32LE(buffer, 0);
  let offset = 4;
  // const useWitness = (buffer[offset] !== 0);
  ++offset;

  const txinVarNum = readVarIntFromBuffer(buffer, offset);
  const txinNum = txinVarNum.value;
  offset += txinVarNum.size;
  for (let index = 0; index < txinNum; ++index) {
    const txid = byteToHexString(
        reverseBuffer(buffer.subarray(offset, offset + 32)));
    offset += 32;
    const utxoVout = readUInt32LE(buffer, offset);
    offset += 4;
    const scriptsigLenData = readVarIntFromBuffer(buffer, offset);
    const scriptsigLen = scriptsigLenData.value;
    offset += scriptsigLenData.size;
    offset += scriptsigLen;
    const sequence = readUInt32LE(buffer, offset);
    offset += 4;
    const txinData = {
      txid: txid,
      vout: utxoVout & 0x3fffffff,
      sequence: sequence,
    };
    if ((utxoVout & 0x80000000) !== 0) {
      const assetBlindingNonce = byteToHexString(
          reverseBuffer(buffer.subarray(offset, offset + 32)));
      offset += 32;
      const assetEntropy = byteToHexString(
          reverseBuffer(buffer.subarray(offset, offset + 32)));
      offset += 32;
      let assetAmount;
      if (buffer[offset] <= 1) {
        assetAmount = byteToHexString(buffer.subarray(offset, offset + 9));
        offset += 9;
      } else {
        assetAmount = byteToHexString(buffer.subarray(offset, offset + 33));
        offset += 33;
      }
      let token;
      if (buffer[offset] === 0) {
        token = '';
        offset += 1;
      } else if (buffer[offset] === 1) {
        token = byteToHexString(buffer.subarray(offset, offset + 9));
        offset += 9;
      } else {
        token = byteToHexString(buffer.subarray(offset, offset + 33));
        offset += 33;
      }
      let issuance;
      if (assetBlindingNonce === '0000000000000000000000000000000000000000000000000000000000000000') {
        issuance = {
          assetBlindingNonce: assetBlindingNonce,
          contractHash: assetEntropy,
          assetamountcommitment: assetAmount,
        };
      } else {
        issuance = {
          assetBlindingNonce: assetBlindingNonce,
          assetEntropy: assetEntropy,
          assetamountcommitment: assetAmount,
        };
      }
      if (token) {
        issuance['tokenamountcommitment'] = token;
      }
      txinData['issuance'] = issuance;
    }
    txin.push(txinData);
  }

  const txoutVarNum = readVarIntFromBuffer(buffer, offset);
  const txoutNum = txoutVarNum.value;
  offset += txoutVarNum.size;
  for (let index = 0; index < txoutNum; ++index) {
    let txoutData = {};
    if (buffer[offset] === 0x01) {
      // unblind
      const asset = byteToHexString(reverseBuffer(
          buffer.subarray(offset + 1, offset + 1 + 32)));
      offset += 33;
      const value = readUInt64BE(buffer, offset + 1);
      offset += 9;
      offset += (buffer[offset] === 0x00) ? 1 : 33; // nonce
      const scriptPubkeyLenData = readVarIntFromBuffer(buffer, offset);
      const scriptPubkeyLen = scriptPubkeyLenData.value;
      offset += scriptPubkeyLenData.size;
      const scriptPubKey = byteToHexString(buffer.subarray(
          offset, offset + scriptPubkeyLen));
      offset += scriptPubkeyLen;
      txoutData = {
        asset: asset,
        value: value,
        scriptPubKey: {
          hex: scriptPubKey,
        },
      };
    } else {
      // blind
      const assetcommitment = byteToHexString(buffer.subarray(
          offset, offset + 33));
      offset += 33;
      const valuecommitment = byteToHexString(buffer.subarray(
          offset, offset + 33));
      offset += 33;
      const commitmentnonce = byteToHexString(buffer.subarray(
          offset, offset + 33));
      offset += 33;
      const scriptPubkeyLenData = readVarIntFromBuffer(buffer, offset);
      const scriptPubkeyLen = scriptPubkeyLenData.value;
      offset += scriptPubkeyLenData.size;
      const scriptPubKey = byteToHexString(buffer.subarray(
          offset, offset + scriptPubkeyLen));
      offset += scriptPubkeyLen;
      txoutData = {
        assetcommitment: assetcommitment,
        valuecommitment: valuecommitment,
        commitmentnonce: commitmentnonce,
        scriptPubKey: {
          hex: scriptPubKey,
        },
      };
    }
    txout.push(txoutData);
  }

  const locktime = readUInt32LE(buffer, offset);
  return {
    version: version,
    locktime: locktime,
    vin: txin,
    vout: txout,
  };
  ;
}

// ---- ledger-liquid-lib ----

function convertErrorCode(buf) {
  return readUInt16BE(buf, 0);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function debugSendLog(funcName, buffer) {
  // console.log(funcName, buffer.toString('hex'));
}

function getVarIntBuffer(num) {
  let buf;
  if (num < 0xfd) {
    buf = Buffer.from([num]);
  } else if (num <= 0xffff) {
    buf = Buffer.from([0xfd, 0, 0]);
    buf = writeUInt16LE(buf, num, 1);
  } else if (num <= 0xffffffff) {
    buf = Buffer.from([0xfe, 0, 0, 0, 0]);
    buf = writeUInt32LE(buf, num, 1);
  } else {
    buf = Buffer.from([0xff, 0, 0, 0, 0, 0, 0, 0, 0]);
    const high = num >> 32;
    const low = num & 0xffffffff;
    buf = writeUInt32LE(buf, low, 1);
    buf = writeUInt32LE(buf, high, 5);
  }
  return buf;
}

function convertValueFromAmount(amount) {
  let value = Buffer.alloc(9);
  value[0] = 1;
  let high;
  let low;
  if (typeof amount === 'bigint') {
    const bigHigh = (amount > BigInt(0xffffffff)) ?
        (amount >> BigInt(32)) : BigInt(0);
    const bigLow = amount & BigInt(0xffffffff);
    high = Number(bigHigh);
    low = Number(bigLow);
  } else {
    high = (amount > 0xffffffff) ? (amount >> 32) : 0;
    low = amount & 0xffffffff;
  }
  value = writeUInt32BE(value, high, 1);
  value = writeUInt32BE(value, low, 5);
  return value;
}

function parseBip32Path(path, parent = false) {
  if (path === '') {
    return Buffer.alloc(0);
  }

  let targetPath = path;
  if (targetPath.startsWith('m/')) {
    targetPath = targetPath.substring(2);
  }
  const items = targetPath.split('/');
  if (items.length > 10) {
    throw new Error('Out of Range. Number of BIP 32 derivations to perform is up to 10.');
  }
  const hardendedTargets = ['\'', 'h', 'H'];

  const length = (parent) ? items.length - 1 : items.length;
  let buf = Buffer.alloc(length * 4);
  const array = [];
  for (let idx = 0; idx < length; ++idx) {
    let isFind = false;
    for (let hIdx = 0; hIdx < hardendedTargets.length; ++hIdx) {
      const hKey = hardendedTargets[hIdx];
      const item = items[idx].split(hKey);
      if (item.length > 1) {
        const num = Number(item[0]);
        if ((num === Number.NaN) || (item[1] !== '') || (item.length.length > 2)) {
          throw new Error(`Illegal path format. [${item[0]},${item[1]}]`);
        }
        // const value = 0x80000000 | num;
        const value = 2147483648 + num;
        array.push(value);
        buf = writeUInt32BE(buf, value, idx * 4);
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      const num = Number(items[idx]);
      if (num === Number.NaN) throw new Error(`Illegal path format. [${items[idx]}]`);
      array.push(num);
      buf = writeUInt32BE(buf, num, idx * 4);
    }
  }
  // console.log('bip32 path => ', buf);
  return {
    buffer: buf,
    array: array,
  };
}

// GET WALLET PUBLIC KEY
async function getWalletPublicKey(
    transport, path, option, parent = false) {
  const CLA = 0xe0;
  const GET_WALLET_PUBLIC_KEY = 0x40;
  const p1 = 0;

  const pathBuffer = parseBip32Path(path, parent).buffer;

  const data = Buffer.concat([
    Buffer.from([pathBuffer.length / 4]),
    pathBuffer]);
  debugSendLog('getWalletPublicKey send -> ', data);
  const apdu = Buffer.concat(
      [Buffer.from([CLA, GET_WALLET_PUBLIC_KEY, p1, option]),
        Buffer.from([data.length]), data]);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ?
      exchangeRet : exchangeRet.subarray(exchangeRet.length - 2);
  let pubkey = '';
  let chainCode = '';
  let pubkeyLength = 0;
  let addressLength = 0;
  let address = '';
  if (exchangeRet.length > 2) {
    pubkeyLength = exchangeRet[0];
    if (pubkeyLength === 65) {
      pubkey = byteToHexString(exchangeRet.subarray(1, 66));
    } else if (exchangeRet[0] === 33) {
      pubkey = byteToHexString(exchangeRet.subarray(1, 34));
    }
    if (exchangeRet.length > (pubkeyLength + 1 + 2)) {
      // address length
      addressLength = exchangeRet[pubkeyLength + 1];
      if (addressLength > 0) {
        const addrOffset = pubkeyLength + 2;
        address = byteToString(
            exchangeRet.subarray(addrOffset, addrOffset + addressLength));
      }
    }
    if (exchangeRet.length >= (pubkeyLength + addressLength + 2 + 32 + 2)) {
      const codeChainOffset = pubkeyLength + addressLength + 2;
      chainCode = byteToHexString(
          exchangeRet.subarray(codeChainOffset, codeChainOffset + 32));
    }
  }

  return {
    errorCode: convertErrorCode(result),
    pubkey: pubkey,
    chainCode: chainCode,
    address: address,
  };
}

// GET COIN VERSION
async function getCoinVersion(transport) {
  const CLA = 0xe0;
  const GET_COIN_VERSION = 0x16;
  const apdu = Buffer.from([CLA, GET_COIN_VERSION, 0, 0, 0]);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ? exchangeRet :
    exchangeRet.subarray(exchangeRet.length - 2);
  let prefixP2pkh = 0;
  let prefixP2sh = 0;
  let coinFamily = 0;
  let coinName = '';
  let coinTicker = '';
  if (exchangeRet.length >= 9) {
    prefixP2pkh = readUInt16BE(exchangeRet, 0);
    prefixP2sh = readUInt16BE(exchangeRet, 2);
    coinFamily = exchangeRet[4];
    const coinNameLen = exchangeRet[5];
    if (coinNameLen > 0) {
      const coinNameArr = exchangeRet.subarray(6, 6 + coinNameLen);
      coinName = byteToString(coinNameArr);
    }
    const offset = 6 + coinNameLen;
    if (offset < exchangeRet.length) {
      const coinTickerLen = exchangeRet[offset];
      if (coinTickerLen > 0) {
        const coinTickerArr = exchangeRet.subarray(
            offset + 1, offset + 1 + coinTickerLen);
        coinTicker = byteToString(coinTickerArr);
      }
    }
  }
  const errorCode = convertErrorCode(result);
  return {
    errorCode: errorCode,
    prefixP2pkh: prefixP2pkh,
    prefixP2sh: prefixP2sh,
    coinFamily: coinFamily,
    coinName: coinName,
    coinTicker: coinTicker,
  };
}

async function liquidSetupHeadless(transport, authorizationPublicKeyHex) {
  const ADM_CLA = 0xd0;
  const LIQUID_SETUP_HEADLESS = 0x02;
  const authPubkeyData = Buffer.from(authorizationPublicKeyHex, 'hex');
  const apdu = Buffer.concat(
      [Buffer.from([ADM_CLA, LIQUID_SETUP_HEADLESS, 0, 0]),
        Buffer.from([authPubkeyData.length]), authPubkeyData]);
  const exchangeRet = await transport.exchange(apdu);
  return convertErrorCode(exchangeRet);
}

async function sendHashInputStartCmd(transport, p1, p2, data) {
  // FIXME split send.
  const CLA = 0xe0;
  const HASH_INPUT_START = 0x44;
  const apdu = Buffer.concat([Buffer.from([CLA, HASH_INPUT_START, p1, p2]),
    Buffer.from([data.length]), data]);
  debugSendLog('sendHashInputStartCmd send -> ', apdu);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ? exchangeRet :
    exchangeRet.subarray(exchangeRet.length - 2);
  const resultData = (exchangeRet.length <= 2) ? Buffer.alloc(0) :
    exchangeRet.subarray(0, exchangeRet.length - 2);
  return {data: resultData, errorCode: convertErrorCode(result)};
}

async function sendHashInputFinalizeFullCmd(transport, p1, p2, data) {
  // FIXME split send.
  const CLA = 0xe0;
  const HASH_INPUT_FINALIZE_FULL = 0x4a;
  const apdu = Buffer.concat(
      [Buffer.from([CLA, HASH_INPUT_FINALIZE_FULL, p1, p2]),
        Buffer.from([data.length]), data]);
  debugSendLog('sendHashInputFinalizeFullCmd send -> ', apdu);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ? exchangeRet :
    exchangeRet.subarray(exchangeRet.length - 2);
  const resultData = (exchangeRet.length <= 2) ? Buffer.alloc(0) :
    exchangeRet.subarray(0, exchangeRet.length - 2);
  const ecode = convertErrorCode(result);
  if (ecode != 0x9000) {
    // console.log('sendHashInputFinalizeFullCmd recv: ', exchangeRet.toString('hex'));
  }
  return {data: resultData, errorCode: ecode};
}

async function sendHashSignCmd(transport, data) {
  const CLA = 0xe0;
  const HASH_SIGN = 0x48;
  const apdu = Buffer.concat([Buffer.from([CLA, HASH_SIGN, 0, 0]),
    Buffer.from([data.length]), data]);
  debugSendLog('sendHashSignCmd send -> ', apdu);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ? exchangeRet :
   exchangeRet.subarray(exchangeRet.length - 2);
  const resultData = (exchangeRet.length <= 2) ? Buffer.alloc(0) :
   exchangeRet.subarray(0, exchangeRet.length - 2);
  if (exchangeRet.length > 2) {
    // mask 0xfe
    resultData[0] = resultData[0] & 0xfe;
  }
  return {
    signature: byteToHexString(resultData),
    errorCode: convertErrorCode(result),
  };
}

async function startUntrustedTransaction(transport, dectx, isContinue,
    amountValueList, inputIndex, targetRedeemScript) {
  let p1 = 0;
  const p2 = (isContinue) ? 0x80 : 0x06;
  const txinHead = 0x03;

  let version = Buffer.alloc(4);
  version = writeUInt32LE(version, dectx.version, 0);
  const inputNum = (inputIndex === -1) ? dectx.vin.length : 1;
  let apdu = Buffer.concat([version, getVarIntBuffer([inputNum])]);
  let errData = await sendHashInputStartCmd(transport, p1, p2, apdu);
  if (errData.errorCode != 0x9000) {
    console.log('fail sendHashInputStartCmd', errData);
    return errData.errorCode;
  }

  p1 = 0x80;
  // p2 = 0x00;
  for (let idx = 0; idx < dectx.vin.length; ++idx) {
    if ((inputIndex !== -1) && (idx !== inputIndex)) {
      continue;
    }
    const header = Buffer.from([txinHead]);
    const txid = reverseBuffer(Buffer.from(dectx.vin[idx].txid, 'hex'));
    let vout = Buffer.alloc(4);
    vout = writeUInt32LE(vout, dectx.vin[idx].vout, 0);
    // if ('issuance' in dectx.vin[idx]) {
    //   vout[3] |= 0x80;
    // }
    let value;
    if ((typeof amountValueList[idx] === 'number') ||
        (typeof amountValueList[idx] === 'bigint')) {
      value = convertValueFromAmount(amountValueList[idx]);
    } else {
      value = Buffer.from(amountValueList[idx], 'hex');
    }
    const script = Buffer.from(targetRedeemScript, 'hex');
    let sequence = Buffer.alloc(4);
    sequence = writeUInt32LE(sequence, dectx.vin[idx].sequence, 0);
    apdu = Buffer.concat([header, txid, vout, value,
      getVarIntBuffer(script.length)]);
    errData = await sendHashInputStartCmd(transport, p1, p2, apdu);
    if (errData.errorCode != 0x9000) {
      console.log('fail sendHashInputStartCmd2', errData);
      break;
    }
    if (script.length !== 0) {
      apdu = Buffer.concat([script, sequence]);
      errData = await sendHashInputStartCmd(transport, p1, p2, apdu);
      if (errData.errorCode != 0x9000) {
        console.log('fail sendHashInputStartCmd2', errData);
        break;
      }
    } else {
      errData = await sendHashInputStartCmd(transport, p1, p2, sequence);
      if (errData.errorCode != 0x9000) {
        console.log('fail sendHashInputStartCmd2', errData);
        break;
      }
    }
  }
  return errData.errorCode;
}

async function liquidFinalizeInputFull(transport, dectx) {
  let apdu = getVarIntBuffer(dectx.vout.length);
  let errData = await sendHashInputFinalizeFullCmd(transport, 0, 0, apdu);
  if (errData.errorCode != 0x9000) {
    console.log('fail sendHashInputStartCmd2', errData);
    return errData.errorCode;
  }

  let p1 = 0;
  for (let idx = 0; idx < dectx.vout.length; ++idx) {
    const scriptPubkey = Buffer.from(dectx.vout[idx].scriptPubKey.hex, 'hex');
    if ('valuecommitment' in dectx.vout[idx]) {
      let index = Buffer.alloc(4);
      index = writeUInt32BE(index, idx, 0);
      apdu = Buffer.concat([
        // Buffer.from([0xff]),   // signed data flag
        // index,
        Buffer.from(dectx.vout[idx].assetcommitment, 'hex'),
        Buffer.from(dectx.vout[idx].valuecommitment, 'hex')]);
      errData = await sendHashInputFinalizeFullCmd(transport, 0, 0, apdu);
      if (errData.errorCode != 0x9000) {
        console.log('liquidFinalizeInputFull ', errData);
        break;
      }
      errData = await sendHashInputFinalizeFullCmd(transport, 0, 0,
          Buffer.from(dectx.vout[idx].commitmentnonce, 'hex'));
      if (errData.errorCode != 0x9000) {
        console.log('liquidFinalizeInputFull ', errData);
        break;
      }
      // errData = await sendHashInputFinalizeFullCmd(
      //     transport, 0, 0, Buffer.from([0])); // confidentialKey
      // if (errData.errorCode != 0x9000) break;
    } else {
      const asset = reverseBuffer(Buffer.from(dectx.vout[idx].asset, 'hex'));
      apdu = Buffer.concat([
        Buffer.from([1]), asset,
        convertValueFromAmount(dectx.vout[idx].value)]);
      errData = await sendHashInputFinalizeFullCmd(transport, 0, 0, apdu);
      if (errData.errorCode != 0x9000) {
        console.log('liquidFinalizeInputFull ', errData);
        break;
      }
      errData = await sendHashInputFinalizeFullCmd(
          transport, 0, 0, Buffer.from([0])); // nonce
      if (errData.errorCode != 0x9000) {
        console.log('liquidFinalizeInputFull ', errData);
        break;
      }
      errData = await sendHashInputFinalizeFullCmd(
          transport, 0, 0, Buffer.from([0])); // confidentialKey
      if (errData.errorCode != 0x9000) {
        console.log('liquidFinalizeInputFull ', errData);
        break;
      }
    }
    apdu = Buffer.concat([
      getVarIntBuffer(scriptPubkey.length),
      scriptPubkey]);
    // console.log(`txout(${idx}) = `, apdu.toString('hex'));
    p1 = ((idx + 1) == dectx.vout.length) ? 0x80 : 0x00;
    errData = await sendHashInputFinalizeFullCmd(transport, p1, 0, apdu);
    if (errData.errorCode != 0x9000) {
      console.log(`liquidFinalizeInputFull = `, byteToHexString(errData.data));
      break;
    }
  }
  if (errData.errorCode != 0x9000) {
    console.log('liquidFinalizeInputFull ', errData);
  }
  return errData.errorCode;
}

async function untrustedHashSign(transport, dectx, path, pin, sigHashType) {
  const pathBuffer = parseBip32Path(path).buffer;
  const authorization = Buffer.from(pin, 'hex');

  let locktime = Buffer.alloc(4);
  locktime = writeUInt32BE(locktime, dectx.locktime, 0);

  const apdu = Buffer.concat([
    Buffer.from([pathBuffer.length / 4]),
    pathBuffer,
    Buffer.from([authorization.length]),
    authorization,
    locktime,
    Buffer.from([sigHashType])]);
  // console.log('untrustedHashSign send -> ', apdu.toString('hex'));
  const result = await sendHashSignCmd(transport, apdu);
  if (result.errorCode != 0x9000) {
    console.log('untrustedHashSign fail =', result);
  }
  return result;
}

async function sendProvideIssuanceInformationCmd(
    transport, data, p1) {
  const CLA = 0xe0;
  const LIQUID_PROVIDE_ISSUANCE_INFORMATION = 0xe6;
  const apdu = Buffer.concat(
      [Buffer.from([CLA, LIQUID_PROVIDE_ISSUANCE_INFORMATION, p1, 0]),
        Buffer.from([data.length]), data]);
  debugSendLog('liquidProvideIssuanceInformation send -> ', apdu);
  const exchangeRet = await transport.exchange(apdu);
  const result = (exchangeRet.length <= 2) ? exchangeRet :
    exchangeRet.subarray(exchangeRet.length - 2);
  const ecode = convertErrorCode(result);
  if (ecode !== 0x9000) {
    console.log('sendProvideIssuanceInformationCmd Fail. ecode =', ecode);
  }
  return ecode;
}

async function liquidProvideIssuanceInformation(transport, dectx) {
  let isFind = false;
  for (let idx = 0; idx < dectx.vin.length; ++idx) {
    if ('issuance' in dectx.vin[idx]) {
      isFind = true;
      break;
    }
  }

  let ecode;
  let data;
  if (!isFind) {
    data = Buffer.alloc(dectx.vin.length);
    return await sendProvideIssuanceInformationCmd(transport, data, 0x80);
  }

  for (let idx = 0; idx < dectx.vin.length; ++idx) {
    const p1 = (idx === (dectx.vin.length - 1)) ? 0x80 : 0x00;
    if ('issuance' in dectx.vin[idx]) {
      const issuance = dectx.vin[idx].issuance;
      if ('contractHash' in issuance) {
        data = Buffer.concat([
          reverseBuffer(Buffer.from(issuance.assetBlindingNonce, 'hex')),
          reverseBuffer(Buffer.from(issuance.contractHash, 'hex')),
        ]);
      } else {
        data = Buffer.concat([
          reverseBuffer(Buffer.from(issuance.assetBlindingNonce, 'hex')),
          reverseBuffer(Buffer.from(issuance.assetEntropy, 'hex')),
        ]);
      }
      if ('assetamount' in issuance) {
        data = Buffer.concat([
          data,
          convertValueFromAmount(issuance.assetamount),
        ]);
      } else if ('assetamountcommitment' in issuance) {
        data = Buffer.concat([
          data,
          Buffer.from(issuance.assetamountcommitment, 'hex'),
        ]);
      } else {
        data = Buffer.concat([data, Buffer.alloc(1)]);
      }
      if ('tokenamount' in issuance) {
        data = Buffer.concat([
          data,
          convertValueFromAmount(issuance.tokenamount),
        ]);
      } else if ('tokenamountcommitment' in issuance) {
        data = Buffer.concat([
          data,
          Buffer.from(issuance.tokenamountcommitment, 'hex'),
        ]);
      } else {
        data = Buffer.concat([data, Buffer.alloc(1)]);
      }
      ecode = await sendProvideIssuanceInformationCmd(transport, data, p1);
    } else {
      data = Buffer.alloc(1);
      ecode = await sendProvideIssuanceInformationCmd(transport, data, p1);
    }
    if (ecode !== 0x9000) {
      break;
    }
  }
  return ecode;
}

const disconnectEcode = 0x6d00; // INS_NOT_SUPPORTED

async function checkConnect(transport) {
  // console.time('call getCoinVersion');
  const result = await getCoinVersion(transport);
  // console.timeEnd('call getCoinVersion');
  // console.log('getCoinVersion =', result);
  if (result.errorCode === 0x9000) {
    if ((result.prefixP2pkh === 0x39) &&
        (result.prefixP2sh === 0x27) &&
        (result.coinFamily === 0x01) &&
        (result.coinName === 'Bitcoin') &&
        (result.coinTicker === 'BTC')) {
      // liquid mainnet
    } else if ((result.prefixP2pkh === 0xeb) &&
        (result.prefixP2sh === 0x4b) &&
        (result.coinFamily === 0x01) &&
        (result.coinName === 'Bitcoin') &&
        (result.coinTicker === 'BTC')) {
      // liquid testnet
    } else {
      return disconnectEcode;
    }
  }
  return result.errorCode;
}

function compressPubkey(publicKey) {
  if (!publicKey) return '';
  // return cfdjs.GetCompressedPubkey({pubkey: publicKey}).pubkey;
  const pubkeyArr = Buffer.from(publicKey, 'hex');
  if (pubkeyArr.length === 33) return publicKey;
  const prefix = (pubkeyArr[64] & 1) !== 0 ? 0x03 : 0x02;
  const pubkeySubArr = pubkeyArr.subarray(0, 1 + 32);
  pubkeySubArr[0] = prefix;
  return byteToHexString(pubkeySubArr);
}

const ledgerLiquidWrapper = class LedgerLiquidWrapper {
  constructor(networkType) {
    this.transport = undefined;
    if ((networkType !== 'liquidv1') && (networkType !== 'regtest')) {
      throw new Error('illegal network type.');
    }
    this.networkType = networkType;
    this.mainchainNetwork = (networkType === 'regtest') ?
        'regtest' : 'mainnet';
    this.waitForConnecting = false;
  }

  async getDeviceList() {
    let devList = [];
    let ecode = disconnectEcode;
    let errMsg = 'other error';
    try {
      // devList = await TransportNodeHid.list();
      devList = await TransportWebUSB.list();
      ecode = 0x9000;
      errMsg = '';
    } catch (e) {
      console.log(e);
    }
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: false,
      deviceList: devList,
    };
  }

  async connect(maxWaitTime = undefined, devicePath = undefined) {
    const sleep = (msec) => new Promise(
        (resolve) => setTimeout(resolve, msec));

    if (this.transport) await this.close(this.transport);

    this.waitForConnecting = true;
    const waitLimit = (typeof maxWaitTime === 'number') ? maxWaitTime : 0;
    const path = (typeof devicePath === 'string') ? devicePath : '';
    console.info('connection device:', (!path) ? 'auto' : path);
    let transport = undefined;
    let count = (waitLimit < 1) ? 0 : 1;
    let ecode = disconnectEcode;
    let errMsg = 'other error';
    while ((count <= waitLimit) && this.waitForConnecting) {
      try {
        // transport = await TransportNodeHid.open(path);
        transport = await TransportWebUSB.create();

        ecode = await checkConnect(transport);
        if (ecode === 0x9000) {
          this.transport = transport;
          break;
        } else if (ecode !== disconnectEcode) {
          console.log('illegal error. ', ecode);
          await this.close(transport);
          break;
        }
      } catch (e) {
        // console.log(`connection fail. count=${count}`, e);
        const errText = e.toString();
        if (errText.indexOf('DisconnectedDevice: Cannot write to HID device') >= 0) {
          // disconnect error
        } else if (errText.indexOf('TransportError: NoDevice') >= 0) {
          // device connect error
        } else if (errText.indexOf('cannot open device with path') >= 0) {
          // device connect error
        } else if (errText.indexOf('The device was disconnected') >= 0) {
          // device connect error
        } else if (errText.indexOf('Must be handling a user gesture to show a permission request') >= 0) {
          // device connect error
        } else if (errText.indexOf('No device selected.') >= 0) {
          // disconnect error
        } else {
          console.warn(e);
          console.log(`connection fail.(exception) count=${count}`, e);
          ecode = 0x6000;
          errMsg = errText;
          break;
        }
      }
      if (transport) await this.close(transport);
      transport = undefined;
      console.info(`connection fail. count=${count}`);
      ++count;
      if (count < waitLimit) await sleep(1000);
    }

    if (ecode === 0x9000) {
      errMsg = '';
    } else if (ecode === disconnectEcode) {
      if (this.waitForConnecting) {
        errMsg = 'connection fail.';
      } else {
        errMsg = 'connection cancel.';
      }
    }
    this.waitForConnecting = false;
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: (ecode === disconnectEcode),
    };
  }

  cancelConnect() {
    this.waitForConnecting = false;
  }

  async isConnected() {
    let ecode = disconnectEcode;
    if (this.transport !== undefined) {
      try {
        ecode = await checkConnect(this.transport);
      } catch (e) {
        const errText = e.toString();
        if (errText.indexOf('DisconnectedDevice: Cannot write to HID device') >= 0) {
          // disconnect error
        } else if (errText.indexOf('TransportError: NoDevice') >= 0) {
          // device connect error
        } else if (errText.indexOf('The device was disconnected.') >= 0) {
          // device connect error
        } else if (errText.indexOf('Must be handling a user gesture to show a permission request') >= 0) {
          // device connect error
        } else if (errText.indexOf('No device selected.') >= 0) {
          // disconnect error
        } else {
          console.log(`connection fail.(exception) `, e);
          ecode = 0x8000;
        }
      }
      if (ecode !== 0x9000) this.disconnect();
    }
    let errMsg = 'other error';
    if (ecode === 0x9000) {
      errMsg = '';
    } else if (ecode === disconnectEcode) {
      errMsg = 'connection fail.';
    }
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: (ecode === disconnectEcode),
    };
  }

  async disconnect() {
    if (this.transport !== undefined) {
      await this.close(this.transport);
      this.transport = undefined;
    }
  }

  async close(transport) {
    if (transport !== undefined) {
      await transport.close();
    }
  }

  getPublicKeyRedeemScript(publicKey) {
    const pubkeyArr = Buffer.from(publicKey, 'hex');
    const hash160Buf = hash160(pubkeyArr);
    // OP_DUP OP_HASH160 <20byte-hash> OP_EQUALVERIFY OP_CHECKSIG
    const buf = Buffer.concat([
      Buffer.from([0x76, 0xa9, 0x14]),
      hash160Buf,
      Buffer.from([0x88, 0xac]),
    ]);
    return byteToHexString(buf);
  }

  async getWalletPublicKey(bip32Path) {
    let result = undefined;
    const connRet = await this.isConnected();
    let ecode = connRet.errorCode;
    let errMsg = connRet.errorMessage;
    if (connRet.success) {
      // TODO(k-matsuzawa): notfound liquid option(0x10, 0x11)
      const p2 = 1; // = 0x10;
      // console.time('call getWalletPublicKey');
      result = await getWalletPublicKey(
          this.transport, bip32Path, p2);
      // console.timeEnd('call getWalletPublicKey');
      // console.log('getWalletPublicKey result =', result);
      ecode = result.errorCode;
      errMsg = (ecode === 0x9000) ? '' : 'other error';
    }
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: connRet.disconnect,
      publicKey: (!result) ? '' : compressPubkey(result.pubkey),
      chainCode: (!result) ? '' : result.chainCode,
    };
  }

  async getXpubKey(bip32Path) {
    let xpub = undefined;
    const connRet = await this.isConnected();
    let ecode = connRet.errorCode;
    let errMsg = connRet.errorMessage;
    if (connRet.success) {
      const p2 = 1; // = 0x10;
      const parent = await getWalletPublicKey(
          this.transport, bip32Path, p2, true);
      ecode = parent.errorCode;
      if (ecode !== 0x9000) {
        errMsg = 'other error';
      } else {
        const pubkey = await getWalletPublicKey(
            this.transport, bip32Path, p2);
        ecode = parent.errorCode;
        if (ecode !== 0x9000) {
          errMsg = 'other error';
        } else {
          const pathArr = parseBip32Path(bip32Path).array;
          xpub = createExtPubKey(
              this.mainchainNetwork,
              pathArr.length,
              pathArr[pathArr.length - 1],
              pubkey.chainCode,
              compressPubkey(pubkey.pubkey),
              compressPubkey(parent.pubkey));
          //          const extkey = cfdjs.CreateExtkey({
          //            network: this.mainchainNetwork,
          //            extkeyType: 'extPubkey',
          //            parentKey: compressPubkey(parent.pubkey),
          //            key: compressPubkey(pubkey.pubkey),
          //            chainCode: pubkey.chainCode,
          //            depth: pathArr.length,
          //            childNumber: pathArr[pathArr.length - 1],
          //          });
          //          xpub = extkey.extkey;
        }
      }
    }
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: connRet.disconnect,
      xpubKey: (!xpub) ? '' : xpub,
    };
  }

  async setupHeadlessAuthorization(authorizationPublicKey) {
    const connRet = await this.isConnected();
    let ecode = connRet.errorCode;
    let errMsg = connRet.errorMessage;
    if (connRet.success) {
      ecode = await liquidSetupHeadless(this.transport,
          authorizationPublicKey);
      errMsg = (ecode === 0x9000) ? '' : 'other error.';
      if (ecode === 0x6985) {
        errMsg = 'CONDITIONS_OF_USE_NOT_SATISFIED';
      }
    }
    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: errMsg,
      disconnect: connRet.disconnect,
    };
  }

  //  interface WalletUtxoData extends UtxoData {
  //    bip32Path: string; // key-1(bip32 path)
  //    txid: string; // key(outpoint)
  //    vout: number; // key(outpoint)
  //    amount?: bigint | number;
  //    valueCommitment?: string;
  //    pubkey?: string; // pubkey.
  //    redeemScript?: string; // redeem script.
  //  }

  decodeRawTransaction(proposalTx) {
    return decodeRawTransaction(proposalTx);
  }

  async getSignature(proposalTransaction,
      walletUtxoList, authorizationSignature) {
    const signatureList = [];
    const connRet = await this.isConnected();
    if (!connRet.success) {
      return {
        success: connRet.success,
        errorCode: connRet.errorCode,
        errorCodeHex: connRet.errorCode.toString(16),
        errorMessage: connRet.errorMessage,
        disconnect: connRet.disconnect,
        signatureList: signatureList,
      };
    }
    //    const dectx = cfdjs.ElementsDecodeRawTransaction({
    //      hex: proposalTransaction, network: this.networkType,
    //      mainchainNetwork: this.mainchainNetwork});
    const dectx = decodeRawTransaction(proposalTransaction);
    // console.log('*** dectx ***\n', JSON.stringify(dectx, null, '  '));

    const amountValueList = [];

    const utxoList = walletUtxoList;
    for (const txin of dectx.vin) {
      let isFind = false;
      for (const utxo of utxoList) {
        if ((txin.txid === utxo.txid) && (txin.vout === utxo.vout)) {
          let value = 0;
          if ('valueCommitment' in utxo) {
            value = utxo.valueCommitment;
          } else if ('amount' in utxo) {
            value = utxo.amount;
          }
          amountValueList.push(value);
          isFind = true;
          break;
        }
      }
      if (!isFind) {
        // throw new Error('txin is not in the utxo list.');
        amountValueList.push(1); // dummy amount
      }
    }
    let ecode = 0x9000;

    const utxoScriptList = [];
    // Collect redeemScript before startUntrustedTransaction
    // because you need to call getWalletPublicKey.
    for (const utxo of walletUtxoList) {
      let targetIndex = -1;
      for (let index = 0; index < dectx.vin.length; ++index) {
        if ((dectx.vin[index].txid === utxo.txid) &&
            (dectx.vin[index].vout === utxo.vout)) {
          targetIndex = index;
          break;
        }
      }
      if (targetIndex === -1) {
        throw new Error('wallet utxo is not in the txin list.');
      }

      let redeemScript = '';
      if (!utxo.descriptor && !utxo.redeemScript) {
        // bip32 path -> pubkey -> lockingscript
      } else if (!utxo.descriptor) {
        redeemScript = utxo.redeemScript;
      } else {
        //        const desc = cfdjs.ParseDescriptor({
        //          isElements: true,
        //          descriptor: utxo.descriptor,
        //          network: this.networkType,
        //        });
        //        if (('scripts' in desc) && (desc.scripts.length > 0) &&
        //            ('redeemScript' in desc.scripts[desc.scripts.length - 1])) {
        //          redeemScript = desc.scripts[desc.scripts.length - 1].redeemScript;
        //        }
      }

      if (!redeemScript) {
        if (!utxo.pubkey) {
          const pubkeyRet = await this.getWalletPublicKey(utxo.bip32Path);
          ecode = pubkeyRet.errorCode;
          if (ecode !== 0x9000) {
            break;
          }
          redeemScript = this.getPublicKeyRedeemScript(pubkeyRet.publicKey);
        } else {
          redeemScript = this.getPublicKeyRedeemScript(utxo.pubkey);
        }
      }
      utxoScriptList.push({
        redeemScript: redeemScript,
        targetIndex: targetIndex,
        utxo: utxo,
      });
    }

    // console.info('amountValueList =', amountValueList);
    if (ecode === 0x9000) {
      ecode = await startUntrustedTransaction(this.transport, dectx, false,
          amountValueList, -1, '');
    }
    if (ecode === 0x9000) {
      ecode = await liquidFinalizeInputFull(this.transport, dectx);
    }
    if (ecode === 0x9000) {
      ecode = await liquidProvideIssuanceInformation(this.transport, dectx);
    }

    if (ecode === 0x9000) {
      // sighashtype: 1=all only
      const sighashtype = 1;
      for (const utxoData of utxoScriptList) {
        ecode = await startUntrustedTransaction(this.transport, dectx,
            true, amountValueList, utxoData.targetIndex,
            utxoData.redeemScript);
        if (ecode !== 0x9000) {
          break;
        }
        const signatureRet = await untrustedHashSign(this.transport, dectx,
            utxoData.utxo.bip32Path, authorizationSignature, sighashtype);
        ecode = signatureRet.errorCode;
        if (ecode !== 0x9000) {
          break;
        }
        signatureList.push({
          utxoData: utxoData.utxo,
          signature: signatureRet.signature,
        });
      }
    }

    return {
      success: (ecode === 0x9000),
      errorCode: ecode,
      errorCodeHex: ecode.toString(16),
      errorMessage: (ecode === 0x9000) ? '' : 'other error.',
      disconnect: false,
      signatureList: signatureList,
    };
  }
};

const networkType = {
  LiquidV1: 'liquidv1',
  Regtest: 'regtest',
};

const addressType = {
  Legacy: 'legacy',
  P2shSegwit: 'p2sh-segwit',
  Bech32: 'bech32',
};

module.exports = ledgerLiquidWrapper;
module.exports.LedgerLiquidWrapper = ledgerLiquidWrapper;
module.exports.NetworkType = networkType;
module.exports.NetworkType.LiquidV1 = networkType.LiquidV1;
module.exports.NetworkType.Regtest = networkType.Regtest;
module.exports.AddressType = addressType;
module.exports.AddressType.Legacy = addressType.Legacy;
module.exports.AddressType.P2shSegwit = addressType.P2shSegwit;
module.exports.AddressType.Bech32 = addressType.Bech32;

},{"@ledgerhq/hw-transport-webusb":"../node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js","ripemd160":"../node_modules/ripemd160/index.js","sha.js":"../node_modules/sha.js/index.js","bs58":"../node_modules/bs58/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/ledger-liquid-lib-web/index.js":[function(require,module,exports) {
module.exports = require('./src/ledger-liquid-lib.js');

},{"./src/ledger-liquid-lib.js":"../node_modules/ledger-liquid-lib-web/src/ledger-liquid-lib.js"}],"renderer.js":[function(require,module,exports) {
"use strict";

require("babel-polyfill");

var _hwTransportWebusb = _interopRequireDefault(require("@ledgerhq/hw-transport-webusb"));

var _ledgerLiquidLibWeb = _interopRequireDefault(require("ledger-liquid-lib-web"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initial = "<h1>Connect your Ledger and open Liquid Headless app.<br>Double Click anywhere to start...</h1>";
var $main = document.getElementById("main");
$main.innerHTML = initial;
var proposalTx = '02000000010383057cbc9e3abf476257bf2d288c47933f47d20d3be4c48a1216e3d38a4e8e470000000000ffffffff83057cbc9e3abf476257bf2d288c47933f47d20d3be4c48a1216e3d38a4e8e470100008000ffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000090fe062c0c9c8786e952dc20cb2dafd7cd61698282c6f684d090215d3e951c06a0826084cd179e22b19a988c9543c0f3e24596552ed1a2d0f8f8d7440bf6f1d1b7883057cbc9e3abf476257bf2d288c47933f47d20d3be4c48a1216e3d38a4e8e470400008000ffffffff8db2aaf9b1406a263c79a4e609a69c8f712a123d96db7eb4e166d8847adca078b1a2d523532697e23070d333db069339b3ae94a15a075ac7f8e4f25ce86d78920100000000004c4b4000070a84f8bd4a2f4c8beb94b030b9da97ab272ee0e4a95aec60233b3751bd625f97a508cb47f600fd163bd94f03dcd8e6cb94f4b731fe404c65d590d9ddda7d0f8a206002523e0cf136b14cc069eaf483eb2c6e0316f908ed6f23df015da0f9c7ecd3e9ba17a91492617485a7b6816675a8f9d450a36f442692dd77870a54a77a7304b33a988bf94cf799cc64945b8865805abd8156492aab67ec56cd00083f509e3b3f7f3881b95e5233a84b23a739d8f9879d88005b98e2b996959e72de02471f88c40c296bbff8bf2e5eb085c1facd866241f332af67bca6a27e771d2d5c17a914e5f656cd3ce7597eab209b4c9314e974eec2a86b870ba3b4c34d10a4dfe8c97b5f1b6e6551950ab0e7eeddd95bc513d4d50f6f8bbade086d11a9c495b961599e18b4553fa9caf81c9c5cfa5f3e1131e6ee14e2775df44c03dc4aadf89515f92e047af00f45fd530f2a1e7a34d91c0f796d69c024d68a3c0017a91418a58e1c93f18898e02cf232493f15954171114c870125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a01000000000000c35000000aaa5c8e2d063d72050636a69d5012191f4ed2be6010367dd91969f737bb804c9c08d6ca5a5e1d8f9d2c5d80d5e2f126744c2d6c2637ec0ffae377c0f36373a6425a0255f87b9c52df2593981ba77211d39431ffdd39cb6d6b54206092a5168e43170517a9146b8a95d91981e614ec0e2b253a0890eec15650fb870ae24c9f2efedc8a8cce4494bde0bf7eff62426b0fb82f82d661748fb73ef7b6ed08484121c7632de3a2dafc760853e24eea4ce5ab4e7623c885bc36a26dedf13bcd024a636361f7517a0bec0467b90d80b93c73eedce6a537a1820500532c0c3249c417a91442671dc98a48f62ebd5f9a544da31f6311a04b66870a9108a7cba1ca8013ba9c0c58bf2d1159253617fa8f227db6f56ca075bbcd6339093e71a2db2f1bd5c3303f6b62571b44292c7e2e43fdb1eb564c9b9c56542cc509028d8312c439b273dcdd501519531d5b784a2aba19f52a9423aac69f333025d05f17a914f68547fbcbe3f81e0ba56147d98ca8bbedbb7ca0870000000000000000fd461040338dc67000b89a5c5f17f6ad18147fdc7b43a2722f2f162ecb08e772190b2992264f6f9996665382e22a92ea368ab2b3591c698d83fd2ae32b7573f6f63bf02092fb31b7b1ede8f13126dd37c1eda5df61b33e19c7c4823d676b06dfd124ef317a5fed4b9b9d20fcd3d29d52585029c30ce56749d9dac748c8b3ac7d9b5e334183dd284d89c5f5cd1b4ebd14df52297f785fcfdeba18d0bf2dc141d0a2af1b5996776a88f136b15508cc03e883b2ac5b8b01f29ea877f4274d441e9a85ed1ee7edb3c3c5841c3ad1430c8452144c6370d12a7e3e8087a000cfb3171444398da20d8b712c55e693854ed8102a4c24da4b63b139ff4a90fc88b60333cb5553aaf74fad9c34c3e9a6efcd55ea76f5efb4ec522d549ad513e353d2b652a6c6c9d39447ea8f0eb6ef83a8b428fdda566d3ae706bad5327b446e10f70fdcb55eac10daba3f41602b055c53e0f0da511a1a8d7e18d067296b9b3f844607e7dc9d732bd3f5fb8f7274f695ee4281e006111be34b5279a513da456e4bf017883361c275e1c7067cac8f8e7ae398ffe09bcd23e5e9511423f4bad6a0516a0536ca352ab4d0560aa649ff263721b34291e75396820e9b96d490488b7808e63a7d6ac43c0c8f68eeb17537f8b067cbcfbc254e6cbcf06cdaecbb4f6dc047512c64bcf1db81819f3e64f1c3391c80911320230c6aa165d6cebd1015059877d9b9c4f702cd927e3fbfac7ca8ad8d047c87a3a21679b3300dc4e23d16518510c229f4c71dd62ab9453df2aa5b3a766e6aef26b0f5bb2382010820bee595885b2797b1f1d281e1ea80c8dbb3c08520dcaad2abc585d9a928252ba8638f28cc44b69e1b0544479e2a07b5e333d4e7bfd655d3ecdfac3a74a9974adf6b5d5ffe2b75b1acbad71e0dc132b9e8ce5f9820e7345a5752985276f876ea2ac9ff25900eecebc82d04e311f0ff76f4785451bcc73014f82617df8544c868da244cfe1c7393b7a3b6489b7d8d8f4b5f4dc8062e8e235c013b5286d294ad786e83da8f84c137338c34400de791db1a3d83a7940710b8c890d2ec150dcb5e9307bc70556858a34431e1b346362309ca569ffb3d6d27b8b2939ea1fbec689ff61aed21f2061664ff99dc4f0a9f2ec502b140ecc6c7d5716057174ec6344a7fbef3131e93bc1149c34abd104dadd5b4268cfd19d9ab54ce4e3aa9e44d1a4681aea9b4d2953bf1fba911465d7b3a4325f2a45111f4dc90d9300ba1de5725c9609ecd76511d963892f04729a16ae20bed2ec4b0418569103bd4f43402380e509e850c2f9485fe629cbd98434c1f42160e7e0b6c1ce9636068a966d137a9fbbce26755a48b9a3f3f0ae6810a744becaa1e2b5c8412f62593836010fe5efbb3354a5b348b89f498006f7da063bae09ac9bd93a5181b9fdd04e68737fa58e744b672e444fb38375df74f6251ba26677a745fe2229f20ec8bb9f40c1015e8b231a6b31e960cd4f05c9e2e927602892fb8264567889811119fecb73226baf8719672c39e0a1df5a32741534b56674e506e8e6499589e7b7911e3c65cd9c606e8d85ec216ce5a43f0cad5ac59492eaedea5b6a6b8cb3d9073030f1614fefb06fb7d4ecae4a8da894f227f61fcaef8c4ab1a6806c67ae327e7ca5a2e2aeff30f5b4741d088076d0fbea0ce1ecfcb3dddb61b43618340e173396f7898a5291300e0670faf4f51c8e2c00f1d61edf77f90c09e23090a03876cf754bf6edde4ffc27e757e354812316f907c3363fdb34a38f25f56d26c7c5395ce6f79a110eb63cb631b07d40fba7bf00434648412e5045a9726e2985fd114408e3a2d0930009b7aacd0502db07fbc1856ad0a47f73b70a02f6454298e2c1042b183a02d88ea20f0e05b67981423777eba6e4e0f0758d6bf9d48694831c04b94b7f8bba7b8af88b50d1dd35112f35ca59887793cca08f382a4df47ed1556159da5b61a5022ba7572183d23e9b1a9f6b577d74564543e32d178a179c0d3a0f4dcc5784488d4b5ef65ef3600866e30061a20fe86ab3330b13360f7941dbb4d904dce63408fe67df08163d184b2875d53f68286b07f58cfb5c83c5ae798c97c9e6f35fc3961fb99803a298beb928b434e9bb8d56a193152510df3251495695c2ad504f959437d7d574410ad83c71b24a15d45d55e8f40106cf0eb3f2b0ea238465a36e7970f03fb7b08028773617b7666c10cc0ab15700891d032b7284a88fad079275cf6a3e6da69760a60a405656694767f6326f7949a4a71fb0d5df58d3c41d3d835d7344d4934125ec1b93961eb59e1237f3bacfff353d3c4d3c14b80a759eebb21fde5fef056c44c6606633752a3d9c06ddf1919b3b08d62a95ff490e6075094321c72eabd4b10d9ff2651947b1235277623754ed301c5fa9e762c2433ae8c892ecfa36b12f2ae142856ec60f78c419ddd61da4696c03f399a68c39009d43a936f94a32e5b5377cfec0657120a342b0ce65767ce140015c847cb2a863c4a1186cf400f0aabecd9fd105aba8c448cfb62d1241ef729f3c4cb405ea921beb6756e7a8ee57b84b6975972980462d863ecae233c56910e45fbf8aa9dca43f8b0fdaa8cec12c2c80cb932f94acdb5f6042c6e2a986739f31037ba9ec9840a4ec27c44f82bb35b093cb682f68716b0cfb924b6ae69e1bd59dceebd58b3cdb12922af8b3b09b7a9a162a89c04f6a2e83ad06ba5914f8e928335b8f6ceef19c9b320562fa5da78b564a1420a9dfe2f7346b30c6be6390231bcadd1f22c1abc38b66461cc13ea904436189e44f1c8cbc0ed40c6524f755459c4cfbe59c07bfad9fbf35dba08011965548fb7e3d3e75f2e2e1395ca89e9d6a45bb8e0954d72acf5c5e9fe819551ec2be0304ac28d75ebc93c81a3041778f8142a063546b5d79ed2f332688ecd7c4d7d49b4c27e9539d6417507e5646176502ce86582027bc75c19312f2fa372ab9ff2fadbd18b1f2451eeeb5f787cc9944618462525529d39de4fe3d9613a3e0f6068c2b5a56ce1663f765af47bbc1ab26030a1d48b218d87305bcf4bfd14e154bb3830cd0822b8597aa4534743ed550abc34b8d20df8aecb5ccab32f318a17f90e455094efaebffc4224d753bcb9e33bd0849928e423ea7e83864da3666f51c968035bffdae57c81717020c6d847ad55485bae38cff657ac28d5b1a6799a4cbb6d904e2752e58eacca024c0286e7644f3558662ae43c61e8c2ce2dbadf619337a0c10643def93b3df9c05166ac2e47d5dfe6e0422e969a73ec3c5eac11e0582f0203bb2d75f247192dbd6b2335ee396637b2ca81b82e45f92e42d141e6c65dddc7eff8b304f14757c8532fc7033186f0101e39cceaa1f5f9207bbaa00ea69741c035296c22a3b98d53921f767c495c9fb1017ed734a931c7846ab122ea1503d830abd938840daef1a30d368490db6b997403d19f0f519409869f444087df43cd7f500e03410c55fe4ec75f7af26c7beed4ecd0387e38a039b30f3e9e6be16956c5178363c26569979c9e1ac041ced287af2db2f08ebf1e91c74257464ef5fa3d4e0b9f90641b2a98ea67498c46ce27b00c2e339429d7655faeccf7b1ae5742ccc81f77c16106483d313ffd7115030fd432e928002da3eea833c5891dfc029538815885a9188022124b6c40c4bd5d6cccb0adeb1f4dd87efbca626d966d68a60f5b93c680a5109d84027df36bf501f68b42d1d94bafa2fa2ebbea3c378c3ffb07d1ddc0bb5cbdeacb4cb26fcf5769d235a006815fb0334797e71ab926fd6cc8a453221c2c36a2658eb47ff5c403f4ef26b97f32b4f6b4f05b8470fe13b2b732283b6546a667a4216b516e26f14d276df60735e23ce0407db7b3166050dfeebad5f70a453aec3c1ca72296743ba55f623ff22081d8e3609a427ddfca4dc5f505c1d02c1234d1dcc6fe3f0aa260aab212902b783615265639c980a5396be7d04040760039c35a1f2cea4f20736720f5d2c07c900521e89eb9a0051130286fa8e327d1c8f200ec715c8144dd4e6d8e261cc8489224e828ba44820abdbd45f0da799282c9835a2796b55b4ee155539880adf4c69f13cead27d64727f8660900146d55e77da8aa40cd893defd9f1859c2eb1df65b92c4d766875da686b2ccbe4ae1f13b4dd7eb37911944856dec3f76ec7783f04927863fd4036673e385944c87b950b3c6c892f43763fd929aaa350fd3b40a860d49e11ae07db413dbd885af90f0b2cab0363187073d6346645c992230ce304b636cabe1849ed10b5f7f0e19c422d468a35f6603dded4221f0d0b6acd006ee5926011f9f48b2a57482a5a638f4f667b520eb3bc8941eb418d7f41e5411910b6722018e3a7d130a30bcd25a9764a50f35d89b8627859ec874c6bf9cadb35b419c89d1b81a3a7b2983659b1d92c8af2241199bfa2d6595c79727ecfb33b1438cda24400b602ad97dbeb90deaead0a922f40fc2b66a470355892a0e61873abeda5fb4ad83fc77491bd029faae2cb0f4398b91335364f6ea0ffb4e7a648ab225fc5abe73bb4990c361544c1f27f0fa6d28896251ff39b78b578539343e911455f0ea7a90f48dc250d1e408e62af42efcad9903cd7600f1a10883254e8fc886c5843b9bdf4fa5dccb47112071b887a8f9980087ae538148251230676bab960930f60508d14fa91685bf2fef259175c1bb0071ccc51835c1c59167e162157f5f2aa19d1c92be5421ea7fa297d276b0c32209dbf808fdfe9f1c2b961f5f0aa4158f4b44232b1a9e65910b1fb53339784dcfdbe85558c84590ff8c97d17ef1ed30d774c28357eba841cef239a70fbfce53c6fd9fc66fe535d9514e50d386cc8997ff2c3cf282888d7181268ac1f5502a007b2f619c661fbd89b6164a25798dac2357c213d871065468e90644ba86c1f4712200a6b4d7c0f15703bb8856812f21f038ebfea7d9c860d387568eb130b4cfeeaede8a84932babab174ee17646a2bfea7d1d26945c4defb982a3bcfd64ea6c46e2e85b1a26bf2658508cbf73dbf938aa408dbc72c1053a71205e2ef8aa067b73a264fe191f7b3e08e10eefe8b0dd4684dfcedc71e6ddc68cc6d00ff5e8099bc432c30eff13ec054a58ad0539a1b3c01e35e4a01c61f38c82c7125687550e134772cce92b0731a43caba203d9c1e8fd901b2298ce6766e8f79333df2f37440c783e12e207f9761b2b683f15827fbb5f6ad96c47ad4ed54148db012cf0454bebcf6e8984a46d936005bae3431c950f6488ed032f9ddd6a2c8de13e9227523b0d236d5b49e8f4ac51f063560ae131e65e3565223b5071b35a8b700de3496cae03cbe47edc7e860ad6996cdb7193c01dd62086d1c2f0d82c3c48712d4cf17b644b846224e130a700669013de244977c726a19b59f6e695eb8b0d49b5fec0d9523b369439d133477feb691c9eee06609535a0c566e865b7537427c64351948eb3b3cb4d243536a456163c3a7df531765d5be4aa2b61b1e17a6cf2406ca4f1baf2eef2304ab00a37c5e3405d30522d294c2cec583b83f592a0307067eb21959b9fe9371ef6fa8011305120aee5a401d78baa556f3f3a11ef2ec00db7490aaac116849ab30795e94d20b56cf1c51c088eb718b4ed25f02f5f57e4222f574b93b7cbc544e83e5ddb39f99eb3a0f5996847cc8bf55d5256168eeb333918b064ea3edbdbe02d1b1e3c4543a4bd8e7b562ed29a03d46e5d21f98791444cfbba96e66c7834da28e0b581830d3b989fa96dd6cec437d73a9eb9c09cc07a18fc006967ccd99b90e9debd207851bdafa729b8c7ef50e9145e95bc656de37c8cbfc92f06cd67754fab4985e1cf424ed0b36b0857fa9f76dcc27e2890af9c9157922384027abdc4154218ce3a37e9069540699d52ec50457c524104759286d5cee555c3f5ece849dfd46104033b664060080342db2b105dcb61e534882a66e8f2594e8e3eee6d11a08694d84f6c07fa84beb482394e5981647a8fa01b252c9eb8a6a6345bba60ac4bdd09e4839f7c243a3b1f50283a0780288ea6f70c394c4c7389817854d544cedbc5e97ceb812563bc3fa2e0c3af9cd7af214c9582fdfd420a7fe186f9b63d2dc9ccaf87ea918c9340cc5e24a7816ab4cb714c7de42560f5e1fc07955fe0a2b1369fbeddaacf296ff71e5e66c6ad455eb2372803b1bcd29fde3aa3e5a691ae435bcdcb7860872ca8bd2377a44ce48d544cb5b14314c969790a8a34aa4a7d1609e8e3a8b59b22808a31752be174ec0aca69ec5fcd7426ced849f210ec712d15549cfe54c0bcd6931af7b4414527b17cbe5a35dc148dc1194ac81eaca9a97871ef9bc8dd602dcdf9249bf5bb67e1fa18c86d4089adc1a44634717ee3d777f86f11522a7d80fc13e98eaa7f7ee4bfcd7cb3bf3da150e401a27ef53190ca2219dedf57f4ff6222b6bb7055dbec8282234b4b8ffd9c85db85d1a81b7ba74fe64a1969e156192f354b57f1a4fb431cecb174f2f9e208f8c3f20f185242e096ee3626f3d585de6b3b02f2ada8e3b124f7b4357ab6ba21495161ca26e14413cf8a048efe4f8ddd7c74f59617a54ca54ac7fdc4be6c909b30b45eea33b10766b4f9ddc47d215ef8cde38f01623f296f884a35057133b0e5dc0d56d1730074ab03fa457a8397a2c4bd21a29164eecfe3c9acd1a26e7867601434ca4670464072cbcb78f8608895108ffa7ceeb434b59c05371b317eaad009b1062adbdb4db81860f134ce4d050d5ae9599bd3a57c8482a76e680557f343cdc2560bb7b13b80ba68c2d52891b83fa57510943eb476f8182ba7a6db13dcb6c1be6990df3c95f80efbbf6f2e087d3e910db2bfb993a929b3ec4aeb65eb2b00c3e1e90db60a70b4426ede750a4bcbf37c05232111269f6a3b76f112598fed9dcc9962e808947b4d1bde8f22a4b5645f0b589345979fabad32f6d339d3013494cff4c837c991aee03e73b65343ee78cd2875e5708f7c6889ec517e92a7404e2af6f61897bf7a383419955bd1ac4af7c249ee659efb53a61dacaf69a07fed131cd1b2fcd272608e56c2e3369b63f0f5ee283b105b3f0d3c52d310e60a18727142280fec2017171992209ff91685e0ee726b51a023227c2af4842e24bdaf189355cc94183f35fa50415afee884807beb6bd812276650f1ba3aee911bc0cfb5b41b221921b9be8e7c26c7020b0c9971ff6cdd56b4409a2453823c591b1e7401af62ba6419d5fa660e0f7a5bb17644963b355a8ed83f7fc9db598a008337a6607cc4188b4914df5838a4691f0b2c9b180f3193fc65847886cd088c0607fc6e0a230a16d500bfcf07567ab4048e44061536a84e32b0cf4cfeee4776ba0e8292cafc577bec9b0b15994d6754988d03bc7f282def1fc02cea28629dae5bd0f305bad4af63b9049ece0bba190c6cfee602acbf12b66ea6337573cabc3aa56913b251b8b736765c9646d0af4764d4bb8a9bf0e0cd343779fca42b0dd9569b6b9dc0895d33168e8e2ad7e8df844a099f49da519b919485d13a4c7470ff344db9710189b869ce02a5d05225e82b86386b5ccac443b03becd61eca9ccc2e872e64e343030b306fa97e27eaf539e0d86644bed153d0b0652cf1783aa7565cb33036266b141e1057c84b392b19bafd8b6038b57e4f104ca511a7359a75be850fa947395c70ce09db42731d9f9ea198f21b55c12f090328c522156ca079a809f620332bc2ed014de0cfce6ff433af62491fce63fe4aac7042cb78f6370c3f3e6eca6b28aeb63ab7c3d8999b1205220cd9d3d4c4ded93ad386b3ca0dd51e0360f2e9170fc90dafa45da83c6573bd08d6cbf7b61207944193435d77263a6e495e5f0ea3c0f660b0a18349856489dc36444c617b774585207988b98185cd02761efff55373e5fb54fd0a67f6bc64abc22926e56120f91a18a1cc29b1eb36c8cad55447f73c8af07ec5f01f131c0dd66689ebff9476ecb461c106e65124fe6990be7de7aaf4117ac540f8a6f2d44ef3bfdfb294b79b3875ec096d3ca1425bd3549d85a896e63dac7f7fcad1524b5d6a910c922b27a82665ae9e3a071c9a507685430c97fa42d10f4a666e8787d67b36b699081ba78e6669e5373a5cb48a8d3ecd6e22cacd15e81d2fc2051d419c7697b6bb66ddeff703471cf9bc35826bb35b255c93f801c34e08813c699b8e95a4959139c0dd1ab57de691524cb195221375502cc7eb4937a36eafd3c84adbdcd40aa25dda745c4684c73580b92f46fe5cd850e0d48d6cd2db3f7515923b54f822aa76b13d107d33f358228182d7de790eec24f20aac1f0eb2b3a13c5fd68aef84a716aed3fb91c468995d779e77abd677fac334d8fa8ce76cc6f5277d69954cb7bf0eb531e12a94cbb1aa3d2288a30482bd5e24457af677c53b58e4eed6171e95746ece47e9d8a466b8f2a1fd7f6a5c17758f3570b6ad63feba6ccde221c4186fad80e511c9b98afc52197c253da1b8bb1bc92aeb125b84d29327e0cde9e386b92e208cc3d6d2fe046c9aa40e7ebc82e374fa8fb6fea45799334e8b18aefc9b2ae9677a09a0caab878633a4f1f0ac69ee4cf98ecf68780bfb1e7237498e1768858d99b88fe3444f2179f638c712a129b25fe572c209e5b5d915de3ba2c7c544ff6459d5ce6c3b108ee30b7a3dbf88c2c1d196ced2dd2678317d58f797f2bbda0930fdb98fc5abe60107b781857a6f2f4d127f8c50db0fe34a089a4d1ea07bcfacef95e167095223683a5729690eb86bc0e316db9a85f18a2f79c5d0de9bf7f00ab259aff9683064058c124e198e3f5d79959690bdcd11c9e9459e4dc2b39090ec14666890f6ebb992eb7d8358476fb5b4491131499d6f22825cf9df6fd9255ca009dce0157c1174e80c0f1241d1a4863f6f21b1c7f062a1c36ee34cd0d763e42c46747cb958b4ca09d120e8f9e22e1a90cc47121806078642e566c23e8b41a320bbb90b45a3e9d6d31f7335e8051a5718ab4a2d82aae8669ecc4e7f254bf4df7f60cacc423b1c47a1c41349e1baa28fa6ce969365c41cce90988b594fc204ff055a01fdb156056a054d7b6da9b483c60dc8c4ffae88461b9da33a6335bf0d45db106ec4f7cd0f14bce1761d02f097e933d022246cd59d7e40c69ef2c641daa470541454b102e8864d4f261e6dc0545546e1cb6b24270a0b8160c8f8710a4d6cd404a1e35203fc895b33d1a2d83f10dde233104f6203137381ff1a9a4dfc54d24fb9fe399db963bc9cfa3a981e2c904ccd04a9ff7c16a790a2923dee1890ae42f31d2e9eb723e4cf1c7839d938dfb26ab27430cd101133fd7651d1e32a79e78e8b9eaa9607c85e096e14265d19577fe45975e26c976c28f01cac90391642c8ce13501590775b8dee674ccc220ce5bc5ca704c71c1f570518380b5c1fb21e3abef65b1627eae1295373f64ad869f1933ed276b11fb454e39a2e5a99575bac0a197fb9190a9cbd129b6b2df45e9b85dbfd9d8e6264baabb13355203dba5432c75149cfdbf18ddf2d0038c93cb13f216d34dd9004836ce8eb414f91a0ca288896835c57db2dbe988728edbba119adfb8c46dbc2bd96b59fd7c2c35d8d257639980d27c8229eb45c06305e27c32b85a78c7a829f26d477c1f90210407f4afc611b816a0dd4d6f3f5d8aacfed58ba0c16eee91455901990fc9a5128bee5a6866f1b4fa5cca629ef4fb19bd4185a74d6361eed5d3ee1e37da0aab1fb7287a7fdc76c1d8470a147fa0692a91b9223d53097ca06e35184e596373a6940c13099c4f54bb94655d4ff935d660ac79fb086f29dd41b31342fbc877bf687e0f9de027da92101173638adb5eaf12ccccac2c05a6ffb5958e2e5a1697619ff6d5fa23fc5719b51e7510751172c03b741edadf51953aaa47a1dc73b0823ea9f645d647a24a88b8fa8380ae1b137c8e43aa950c33ac1fb00b2670d5cef1cd8c2f965b997363ff5366b3405ade690bb07fc7f5b11b53d187dd63d05e5417a85e55b373ff988a3c6a86c7868c9e21a1343bf0ee47057877d977451bafd1cf22d4d442c8349d373609c89b9bf2f24ffaf322ceab79551a06aef9a7856d98c5db824b8a8cbe0edcf5fdab56edf6dfdaad7acd6883e885a9967a01b4909ad9419452b07de25bd5a364fb9aa6581dc209feed794ffcb21671f687e16961cee0823aa26aa9341f2e048130c32476933c5a00feca17a4c09adcefea4a807b6b2a3294b3933569aa3e591d0d84ea11e78bdb8e70921c933a70ee01a86966da687dfdbc59f5793d4165284a543625ddf8a08f8be353e74918ca0e920d31f7c65d8b04766d81c163510cc87db82ecfc7960f312b034546b72cbd15566b0130b9c5879b19ac540a3672c54a1883b48784320a11e5476056e94ae7369102022dccca892b9db94efe1e8e31e044fc9732cefb00775d4144236c39616ba0bd8f59d61759c8e81afed7b248a14440aa87ba0099d4e80f6ac1383afb3f280bd5c3f77a633c73f03622ed2cf883aafc333b367e884ad13934a22444caf77393c2cc57cf56a8a6f011260bb55d875db92e3ec8c4590513019803e1d2b1962a6ed30206710210b1d9521a660eafbfe4c533e7e9d240ac3251df446be6ee471156e17858c8dcf09e1b5b185492a82ed13c460659dccca0fea8bda8e3fbdc657867bb679af91a3c36aac309707e10f0706ed3491e45aed17e3c42b75a17b12e2a68d645671e3e876b923f63b0f906756b8bb6309dce19e9e4d134dff56dd96a3d1c7873affb67fb551c69287d544eff72b8a7d80647bcc82893bbce21101a3fde0aa38e2e3b06417edfe05277314b112a16ff082ab34125f55adf6d3f4edf864ca4c6857afbe28b330fe18edc1a88353f3132f432832e345ca050cbd9347501cfc0afb4b470c9e9ebac8420982dd9a2da27c9a7e38594603226fae1ef1c1e905cab4fa93cbd51372ae8bd24bcb548cde38955d0da10bb4a5298163cd7837f1b7bfae7f997260970d1060bca2142d8208f88c84e91651f756be677f7871f1f88ecf32ec960e760fc22ad4812bd80f888cb30c69feb76e93da512f088c5bceb09f0fb5cc14620ddb91663f77182ccfc155bcc91410fba9762bee2e4d1fccf6a27d3127c1bc4f30f6a7acb302998e1c42628024dac5a6fb7fc54dea9b01297e04e553b8face2a791f5b1cdccb0c275e9901867879c7068313afc334400dc818c7745098a41e6ccf98101f5d1f284bbfcac2bc8d965dcd40d15b1898b9fdffe6d6185789d6593f209b5229ad45451029b2a3babcd723785cf8e3ec957dd37550ce064e3fbc5b1db5c7d023ae6bef0e89e386875fed6b096f88fdd4cebc0520d8fe5b7e4c5b00c9d7e8446e90831db7e908a353ff02a2f0aac1ba7e136e65f8134bb636b8d29b690075d1c77c45cf04ffd320e37f1b2bd0ec596bdf8e4235901ca898a4a702e0aec94acead4a676ec45dc16099bf0432a6f23c380706da5dc6c5d562001ae9add6dd8acd5b280395d48b2a41a072f7c1d892129d2d2de4bcffbab1d85aa4e2cc5f666470efd5cb306e1de7dfd7e5746edd002bb1e32b0633f0a06ee7cadd263f0f97f6c7b6fbfae2fe9dd6b14f71b9c56da9aa65370009cff51175577dfb934596b0dd94768319d23856128de2854022ef263d7aa79ade7494821c5ed72d4e77b37ccc753dbacfb396d6e445e03c6fcaf565eeafe9e47138daa0928a8a1c773ba08b887d74649f0ef6a4f6fa01fcca86b1d62352ecdf8578e2fa202b274d8b96bccb27053042d268fa1cabd626e58ad32a51a433550c16a02a4c9f529ac315e37eddcd5740f62c2e12a260f748b81b2c4ec64c1cbf78e6e9b99e0802b311b8ec674050000000000008306000e6d1f229d3bb697c510a95b41fed7e0c3c7035b6f08b994eb59363631cda116e538c543ae81ab07d2eab1613061352d4cca12a840f6131a07c1653b4e70ca2191d06f68b850e77fe0c16b9baa49378f824629b39d29242d4f352356abdecb320611446b2772f185fb6f2d7d9d61812b12c0d0f67a473fab61f95c4355309c177dfd4e1060330000000000000001b6271d0094c9398409d49329809827a0b588cd28732e9e90ceda63e9c62fa31a999da243d2c00a45af5f9f12144a9740fe09aed9d33d59180b0a4a1f0631263459f93f74e279b98d6a85374c6269f6852f25156e1fb63ef6930bc4c16d3ec18c6f7070732ec3f13fa44d8be87babe1920754686a93f13fb73eac027f80dda82a5696640a8c9075b7cd2388c420855a8f8c77b91f7ea05da53e54571dce12a385a42ebfdac4ce86044cd5163f2e893af1f47cace3d577ab28cfd41f7ccdf4e11f7187fce274d717bd3e4c2ac09e080b028533ce03c29e77c07a04f8499a7da268f14b4ecbb67366b8f4b205d772f6e12fbd8b90b7378838a74daf4df3c2950d9ffd17aaf6529d4da5943405b55692696fb0114ddcb53c53271c3e919069c58c1ee51a6fcf60c226b5644207cc39d46447c8edb767f9d3f540fb76d9ccd92610076137f70f0464f08c71239dcdfeb494706a745c43cc4fb66480839da10818a96a1abe36917dbef52629669524a7ea195c95b8838abbd05d23b8863e251ea8269dc79f9436d7109e7765b961c34883e528baefa8504a06b7f4e14d995d0647eaa08245766264e5a107cb55493569c3cce8b4152a0588b56df0a3061ed43d1f21f47c8b166fd750293e24719cd00c80e01e2300def58ce3866a9146a47f63668b0135169eef0072885ff6691e1da8036cb5908f4c651ab1d77b62957818d5dc78a6057a56c1f9900de751cec6f25460df7260bcd7d1d6869402fad222e07c6d6ad69837f06b242ebb094dc50dbab420c413037fd68398fd2a962fd17bf92c7cd69cb1f9c316b61b7ef374c4ec5bd3d0ce0598619757271f0f823c997abe006e2bbb07e3443de192c3ba11d775093ff9f96d871d126526829ea1d385eb1d18a822badff8aabf0ed05f5eea9e6ccbbaef3281a7152f7a9f8cd8c39fda328de5ccb01b27ea720eb302168f9dd267d31785f51fd1a3348f423351806b5d6b3c40c79fcd96a313bcd4266fa9efaf0c90e62349ed5f976001134d802fea6d213991bc9f30d83a9632f4d3aff41e33609255dbf360b74ac254bb197e01072ed00d447900d174d2462959afe4b1c155ca65164ed673ee29ed188ca2202da2130ee8de3fb0382b9665f9c53df4f6f1b78bb70a9eee3e07370f000da303ed932dfc8251e0c28542b40f21b8b033f5ea2ae2d978f38f130cb386e5f6ba9fe04aa6c2b770658630eecc2ad2e1935f30eb159430998e074991d9de5b2e1857ed21575a30bf984d3611789482c0d72f945f5d00e226901d6994332999bcc921c0e0ab54c5860f960cdb15bb4bd1e4d2149157297c183e9c5068ea6746ac1086d6bcec1efad55d6530abe303b29d68717823c82f099d8c43bdb12401535cfc0bd2a3ef694242cc6f9f9ac68ece28e3fc909d494efa89d18b9355ad745284f1ada79b05f7189dd4aff0f6a0a9421d7bbf74d1e533773ddca7ce41a7d65d18435b340d641d30465db55fe6c80640891373406a4a1481a3d58d29e4851715e9aadc90f76fc45325da691fe5207170e1dd7e31ecc0c4b18978e63bb1bdb771576b5d8447f5076cdb700269919ddd2739b43ddbb30b591c4a06aa346c96e77dd6ba9bc5836202c1287fb21f1b614f61c5b914e2596546ff32fb697a03ef16e7ba47f3068f8f32672df84584d202b3667be8e9392284fa175e4b88947b406411704d590cb59b205ab49e31517a463b14b3f44761758396f9a68264d52cd42f0f9ee6a1d49ac05f0fcb41e5ba2fe2da0786763beb32b68c4f6a73bdc3b97c427c7e6776ede8501767eb770e9f81dcba71efcba9cf8006724e961c0c6165ce27cb56f260e9dd9bdf8eccfc9392b9be75c362933bbb551311fbaa81dd2a076e8091227ef2ff1d19a3621cc3dd64a96bbe4159df2c2d022c46282e08ff432e67772dc8a98e83bc3a569b2f870ea98cda10bc4e54af5227d140632398617c79744e6b78ae5fd520e5bed57cba86a6ecac0bf54850c64824d8c283202a538e4dd361cea1961a46242b9e7ed176dcb19c621ca24c87b5cca3a9b320209bde6daf6c433e992b11c440a28477bb0d65b37c97d4a5de0ef16500481c676bafbdb4dd3d51c8f1b5f2e257f2b12aa3841fdff2c7dbad246cfc93f7dca6b72689763d3617252ac9e7565da9e287bc29d8853a5ce0f65c1fab9a09ea3ea48ce29e9bfebf9358f698737b0b6cd1983c04d9a3e3f8bafeee9bc58906fed5698bfc4292436180d96e583b4cf65734ebe2af09d7c351492d12b9cd04719aac5c9443448a567cd92ebc8723eedab960834fedb3bfb33267546fe868f820c2eea0b7328aac9bd0fc6a1e7f69745aa3c94f8b953303f263cb48e369359448346aa44611687cf9a3010e73b8d557409218dc5d66a7a2f84a9a9268b3f9b683a46045ca31a52a077649ab8dc61375358507ef961bfa58a426b7370a516fb244379c2197a01a7de67511ff4e0933e19be04996000c65968c83485721f6eb1fa4fd7e2dd5f856ed4036dc114cd27b23a9f3fd2a7f7518a474a65e4c078e145d3951a9e4294d23f27a31a8ca169c31757121f34e3d6929540e1b274f927ffd6035a5ea9afd65bd54a42a4e30c48b7f77639d916ab0bce9ac70d4a651828d75b502a8a598f9410d24004065c7de4c35c1957f2d143523410380d7373b245412d1d151ca9fdc53e79e2bb962f1d7bf6f431539237f0a710f7ee836eb24745c0d432f97a9b0f934641254499f9a6abda3014df35c329312b21d659c9b3250fd5ada1ec3e8eed313002232f7fed0263f746d5035cbc393f5bb088b91e3a09a311ffabfecf8409da2916e4ffc718c4398a250c5f446f163f4b6581b2580aaa361b9166a23c9e1b03484bb3c5d71bc436e36e19a31fef5fdde0d70e98c8a011a438edea9e9aac753f08ca213b965d39fe878a4c367400a9072e05332666fdc1bfb8cf02f9f2f220ccf18fe785238e01516e3bc979aa4c408f1739bae2af88fcdbe4780d79c0a70396a55d761051b497f3176a09702ab88f9d5e5fd608dd10ca3a3475c6615a76c63ad9ece3b1865e9271ab6a34a0f37160c7e50ef755cb6e754bde9465fe050a24368659afce77d75386cf1ecfb7f6e5d792865f86f2d90188795c1ce7a54330613fc0574813f856da4ba97c2b97a95885fb5275d0feaca3c79c582c37840ac325bb09d0e4d18ff9e13735a2c953e6f83200c96ef5d13d95d4cd6591324bd48b4c1a298f08dabf6d1b503a1a13c0211121a9a026058002e3b59a52b658da9473f899821481dede5cfcc65f6801a8a0907ab7c004774ca00307e5de5fe40a72f17da38dfccbf610694f20a3cfc03cdfbf2b9f9b1322ce852ef06256442e6f736964dd7bef20bd6e081047c8b7b57742b8f0c2633519d5a60405b4249d9d8a521c422f54688202fdd18fadf55d13860666bdbd3b33c266417856ede4a6f011e1e9d6eeb17de4c9225cc42d38e0c4c50543fbf4bda9594e81e38b2c3af38bf2fdc8f9e6a923a6324a6c5d3088340baad86fff7918ecde336eb41c2d038dad0a8666df18590756dca99e3b33c9911a418afc22262295a4146a604406fbe7f5cf644279af4b85b56a1c3a03e146edbf13a5de7f71c4802c41f3c0101a6e9beb31ca06e698af54b64c4e15272bb2cc10adea9a17b3e5bbc771ed810c67a10d7a8ef8f5d5e27398a7fb0cffadb373787b75c46669ad7851d1f44256680beecd04ea520008aa4b1564936afc118a8592c6e7e8b268871487de47e79fc812a31204fce2c43e605745b664a3528743f95258430cf972c7efa60d51ad0d8636a0aa97af1499312eb4ca830f7f9e59b28f33fe81ad0671b8ac2a84c9e64a4ac6596db9f8c82c70547259bb8ea6902d731889a8a20a674a7aea83ec06da97e605c361c9dbe33eaa9315e6746c34d246e669d8c149b01f975c7697f5784a0c8a13354268f5f7444ad2e78d366d85641a090bbe4ab3519f06b5e399dbce95e4bc83f36312bf5e462e929941cfe162bfb1acd35e74cd280544aee2aa4da4d02fbc4335b7be25ff0e572d3b3b3e74f681e93e9b77a193cb90b9823272c8381b4a8670466b8298c686d636e5a2e96778be6f934b6013efb0dfb4b1fee7be83885b90b123efd706feb1eb0db3a194147ca723fdbbc0cd0353c72b6a076f635d5586e4df60704caf0f14d550f7c5a9e6d7e1e9453e299cfb8210d6b533c72166d3e9d4bae174d31975d841784510951e04ee63705398a4dac090a0f6c21833136bcf7e3b9ca0f9d36f21614e1d49eb366c9b7e666d28eddfa3476604de11cd9e8e636df95ea74d9221ae033512dc2c2530f2d31fb1ae5073cb40e49624a203a429ad140baaa199f108e0e8c6afb7d573dbcd14d602ab78c399a9b8d63c8d252c75d5fe46b5ff18732e79b0adc7d0038a446b1a706f3b797352eed95f2f3446a73d39f6bf900e6f822ecd803a95bcbe8dadd239dad549622c9606644d341248ec1c6a0d55f9aa12cfb221fe78c2dbad375fef0d0694b16123da4b965436674ffedfee41ea6371531ba9e72425bf66abb0c772cd7400715fe93bf4efd73b2b11e93550fbb430d07744d4aa1a66fdf24853ae1af210a356487ce94432a03eb56225d9ed062f36320dd13b8c8d4c3a459ddef173663252910d1ad556869132fa89d1053f637d5624fcc9bb0a1c49b3b61493e6bc9630bd387ea2cecc73fe2cc24d1828aeb37a3b2f1ebe026084eaf5d59f8c666eb92bf06bbb44bdd2ea091fe9f22b145e8e5a6e781a1846a5a1679bfbb459c1c3afad0a3e8a4dfc694d64d5544ff3a01c6c536aa1d82747c091a5901e42cf13b05807c8f61974281fe72a8432f312967e7b12772df0daaca0f6a6465548b99c8aeb882b4983c1490290b132bdce506e73030ab1b73efb87b10b45fe3f601c85cb74e565b10f4b8e9aeac12d0099fa7dd32b4d71cb07cf6d3231049825fb77bb8ec34042f07fc20b09fddc45b92f26d7064371a7d83c6bed97cdbc2d941123518731c6b6b8139336eec8c35da1d688fef395ab87d1e8f07b28fe8865c22697ce54e336c4033b0e3d806fe74cdfb9b5c4029d7913797a7405da67a1940875051bd80786670bd0fb1959230efe8fef9e45578787e3caef7b8521572f66f171142cd694e46dda0b79961220566c0f00636ba70dc86d83cdb9c96b5a8ce72479d9ef66c3dbfeaee7ed2486f1551372021ff732130acc9d30d28372ff4c6615e5bead2385be7413523f0692490156a212b78e4dbe7588c446fa2e81a4312f197dc0ad82386b808fc27ca2b47106a70a6e0959ba1b9972516abf5105b7fe071bf3a2ac34174c989ee338164e2d3f4d8f1eebd67e1f1d1d816aac3e59417271378a629062de4ba5953cdf9cffdbbfb22ced189b17dfd78f8c90eff138508741f9d09b66a4192f7d57f9f04aaa0ad98c8bf1735b8c075609803a67a88953cdc96ff6a51a9630c4106467748ce219c08fbdb07e060dd6701b62342a2a9083ef904247401da948384a301c5ddcd4650696071207cfb0be3a8fb752f78f33ff5f2d0c8860342fb3a07029e710f3bb57b6466e48bb20b45838bb8c9e1d13c33907661ff9b593ee4bec671afd240e7a8c504cb6dae253168c5e6caf9dce664ef80c38b2c401b00c5b01f42a95b1538ce94471db5ba755ae0bc3f350c569c13c9ad75b4a358bb1e3d30e0a6554ccc7fcc7bd34cbc77465373571262f0605f163e8fa4905acce798d0149759b7d81c3ba464fb584dd1b731f1386f6c03df82a24d3698bb327789484b69c331725acca9b3cd67f28c140c4c02e9900e5c09ae08a5f1be78ac491bb1eadc46b30812a02e72f07929572d767ea84f67c33a3cfc1100a5dcd5703c98e159d6a2c65086033694cb038b894a4f69bf548306000b0714e469c7e40897313d64247846b55fc0b7c99aa3887ade981695f83443fc8bebe60c99528bcfbcec8a5fbb19a0e276e87cbae0aa68d2d847be2d7782d80c2342a14d864fe4fa012f94b9245555b4abb70f3f2f8e13d33754783f3ce4117525dbb54b8d80b94909a216812ed553899082450ea556de05f4512a436298eb77fcfd4e1060330000000000000001b4a204005831c93ffd9b265b85d8d3f5fbcb30a0467aa5159b992fe7daef98e75fe13175d73d321e31ce769722b8c2db1ee765fa7e8bd262fc80515995dd764d5c2a759bbcda2ecdb0e4c5b562275b8ce2f83072884cec3fc85f069772c1e64af0d663727396d7291e2d62016c1a5cbb3c1c427df7f1aaad74f421c58af40701909de75ab25f97e5ed1e2027e4ec8b3cc3b8cc0d2e51289a68b579e3e3286950e84fbd9e4c790cb7b7d9ecae039b6c850ad9f3bbc33a522962645a54cf7b1957e4694a1f38f3cda56509ed3fc6272427cebfd163e9dd201aedc8344a4b92f6e985214a88991dbdd0dcd1bd888299f20f4036902f3622c95b1fcb928264a6ffe607b653943641fbd83fd4adb10d59217c11406e27fea4489f2eb0f9df9f566531a0e050b270032310b9578dbaaa904e7cbb17ff831b0d639246a889957b75bff85aea581e61271b57db4dfa4a26d656c41a5dd5b8c7be491d035c9c46dfa8d9ec4e5112135a916c498bf1ab70ea611fb5db1b49a7dea91a3f7cba78ac558d6765377b2be5148715b93f7c32486c7d7a2b4e6bd21508f582d4c52e8e29f18da7affaf3d8b15eb584b3937b547cd0acb86f3db3d5c03ae9cd87927da5456663207622f006c5e3aa98f9563b1cd68cbbad002ae100be3930db3af5b375d105d08062525ee68d3d62d347cd76a6b3b8409baa3af2d92fb50585b8feeaf02e930813652feb458a642faad3c29434f211db426c171c527324a64554b164492de125c73c80e23495f26b9cf687d8a913b990ccb25efa490576b811c74c88823d8b6d42d265ef5caf3e94e38a6d852e9e32fa344d820110852547a1b67568dd4ed8e0447a2f6e61ca45e0a7013bb2fb1b35d7d3fc7609ca4b51fdcfee764f753f45569abf85d6ae58a81a6070095b3a76b082aa57e930b427b4b896645c22c248f20f97f60963a8cf87c42aad402b2e018a2e9f38cf65d5e9bbd67f41b4ad03cc25d94eab47b0bda62762ed0678e5ef876422d496a8005c854438b29e80d1c3fc6d3544487efd5da792177c116ae15c6c6f7cfd1e3fb83ace18e2d095bfba840e33279b114571e086bc7ee2c9a672e8fa66da113820552d303a5143f494b5ccb0c084a0716cdd4a46a205f6105a1be6b2166467a42c4a5118b1f44f01b5e162f0360dc88bf9793c646d00f5b3e1433176546f0c149ff0b1b367a43803b17fe941402119ee995ebb0947602f7fbb0e9270e98eac018022e61f034a6d83e5430a26c887f865ff129d72753c6bd14910216aec12a96390efcd07519c89867c9853d8e8b5bd2396cb6b9b929a848d3bacd9ba61d1b01f6843f9f5b751d2828b2ba6963d49c41e9f1326a6fa4d3d831bf4cf99eee1b8df620e6d667993f73e96acbd4de2c29f60968922aafa506c20a931309fac609cb440ee787d2e6c25ff7965c201f1a6401246191e88d37341382d0a32997ad2f4ca2aa55a45d658d82ade12c0717c7e7e0203fc805ce292977db54cf47de4a94ffd93d3545921c39ff34a6dcbfbbee9451692d920ffc62fd06ff3d34e928920f62bd3323be4029ab314d09b9a484d14e0ae9d99c65ab9ce181b2f2aee1b970dfd2b1790dac9a6f2e6a313dda0e692556e99462f3f2d7d015209188d901b689901ad804f768f597bfeca32d624cba3bdd45777b73c508a024033ec3b6e3124acd7f9f0176ccc4238deb9285755932edc64a33987ba9add50244da83e845855534da43ad6414ea3bdd197f537de22a02319fb02a804da663f7f6a4ad61b3730f1a5ebc2ab582593616d795177962ce721d27445133b1a8d204066a9dae80d73d30499ef0f42ecb81296f454c437ed24d969c55ebb1d6b2b19ed7379ec3fddf4df546c8048b652042fee3109157ff97c13afa9879c964922fd7ff00644f1d4c11ed1db588ef8cd7141897a2af7d9ba7bd467943a6f11401d257764653358a0457f7c054e53a33a7071f31eaedf42221a4d9916858c6bafb5d7ed2d8636db9870328527b19ce81bb846421d762147df17cef4e55ed28883d916d7bdf1abbd0275beded63c84cf51924b44bf30ce6291515dc2925e70d9310464669258c32e8d48c113eac40ea3ee877e22ec7f0b9a912df2df642a712a72b50177da76c1ca69bca8ec9aee5292a6364c0db1f4c900c8809df74fb0a2e61cf781db6d9b2c1c2f307a484cece2623517bc9eae333eff537fa6539447c8739e9ca2dbf8acbbc2d36274b3b608b0326d4484e02ed870ca95303cdf02d3afe88ffa58a71a2415a3d3ad0b71af63c108da4357deca0ebe269c5587b9bb7567b95f3a57b0207aec0f632ed340d8ae8638e29b2aa80d7b6b152b875f7158cd7feb8b9f2eb7742b86fd72593dadc8f5eb2e12b65c3893df23c839aae25a5fe18252dab6f2525d544008315f435726a16112444988f1bf04d579f88135fceeb529ff2f774a822b59d48ccb8c57bfeaa6af3977ebc256050968348a30bdf00d687fbe2c9ad3290629eb97c2aecc5c74cd822054ab2364774b1ff9a33d471a5662bff73c15878f54a6f433e22f4770c7081933aee877020adb9e28a58e2ec3ac0de2a0c5186f6b15089dd05c6708aa176c4889f325403b12270f1cc9ddd39fbda2779d7ce3aad5c06286e0f0fa91a371b3bc726f74b26d5729ff2886a4fc6215ff296d9d6f5a548de0804d3a426d0b61389db89c924e91d7f164dc258bb1bcd317d7174525cadb52d46259a8aac7f10458f8e3ff3b7ba045453bd172df10369991d7cedafe70f60f78c4c553e0398280f2e53103bbc3498f424902618067d8a5798fce371bbc9e92f0bd22c558fa062e874cc1c0b629bdf151e2665bee069bda39b19bac3f599bd8d680ecc7d9094e772b08295601c1e81b15ccf9376ab251e1e21b1976a3fadb4631561dc0591c0d19a6e8cf822e1e6ebff70e1cd8bc8ee5ff1a62ca962b1db3b224f4a0a34a64dc901858d8a1ddd8b041058a14a5e8c1a144a5f36c5bccd3f675414fc014416a72a1922e08442c27c4502427c366c9ad56a2b3d2df34cb81783853d290a9f40c962370b351f1964f08cf84366642da909657303b5578dfa5be09985a39d6f7c388fa49d464de410f410b04fbf02c12c766f9f390cf9a71a2f973121c909e3de5ac94b65d685485f8b5718b875b0d70969eee573c6aeabf78f90a93fa6b9fca31b83471ca40bd0cbfb21468ee628d313ae15b5d2c1ca235a4f58595e3ae3cad487b872b817703c20cf53a2385e0d514516b9c435fcb57b6291954e741ea26e1a9ed05347d12ee3024e141fee6890ae11ce2313defe93bfe24fdead525da94b88dcc8aa250b19d7ab4ff774b9d7dd2a532df6918d595bf5636fdce243aa09df82986654f97c456e7c44b51986eb1b78c1c44820d645f2342fcea60fd1ae09caa86b2d235cf657c1e1e0a53c5730816ded7386897dfc7a6be7d6593045fb7c5c83cd1b7301b4acbb5715d8d273d7e479398a4cc44ce8d1adcbb119e8ec219bbba7d4ed7cf99bfd6a4c5bcd8f4d0a944b27989c9bb84e93e4030e6b6fb9395b19301eaf664725c01a2b590b087717a96a53df7122de2f7bb2d7c31e3c1dcb673050d49a3574de2c87ea978c6ae940655eaeeb6880e6b38f28c5c37d8dc78e19ace3814e16b667fb1eb65b6908c7b4517ca91739f9fe7d77a0ddcb3c71ed1f153a63924a87c7513c13c640ec507dc4f8e39e9a8f222f44ddeff8250488424b9435ac501d7461cd8d68c6244fa64d3f9152e31bdb27adb3a3f8a87743f5400a79e642723e9ae3d9c55d158dc33386c9d31141140d684c027d54cdcd6f0dd1ccc10f834c92a863bb8958ee17950afe4535d1092f42391f26a99d56c84fef5ad214997689f1a38ba36aca05678082e7c145c1686fa0fd1c6666ea0521bf66f23e0cdc7590f64dc4ca7d221caa87da3c9e6e7161ee78436450ca8fa51fcba2029e0a886dba2c6e8894e871e5b89da23351ffcc7d4e5930f36ddc07477fdfb8df5c226292f76893c060244f93d56c732e986bc3ac0a1ac0d1f12daddbeca50e600ef6b3fe84292f261be79b4939dbe7bff04e4efcc8f144364dd9e308116cfc4ec111d0ae8cefb9e0f11814c669ebbe32fb4a11577069a30cc5c310af661c61b82171e6371bf3cdf427d9849072fccb884b707c37c75d8f8bd3c89d6892b2b9d52f3cac226d60c6d972b15222bc0e53a618b497cc6484b7e24178ee7186aee9a1b1fd1784124bf26a2afbd5724475d8b2efe68f90b299358c6f43ef849353aa93736789140b10b30fb9ef815af5297f137004c329daecaa6160afc2f5599cb5e892952bd50cca25970b07ff23e49071a7619db8a66c0932b9a5fb5f549521a90b18d438b91e231b34a2c63b2567e7a81bd3c46994f3a137b5c496dc8741ec6d58433f8fa085fc38a6c59f4bcd666a3dd51637a71a3b0951674b2889718bb67223e1fc79453cd8c595de17aa6340e63d6cab85ba04d30d9eea8dc626161fac87c417ca4ba3d1fdc03f6447da314cd589755616566ec72cac8a94fd205c0d225f13b072bcc3ef097b2e504f16a06dbc183013b9960934081e1da0bb78f5ef9acaf99045cb93582592ff5746f85a5a64c192a56b88356b1e0366dd5614116e726832ecf88b7c7ece82335a2724fc0ef656a58f913cf3087fbdd015975bdd2d2cf9f9b57617497c204efb2d17aaa207b70e8fe613dd3bb5d4a2553a0464ad33b66813f1db4e48d53978726120cd3abe31ff1c84bc4b7f1b52f73a70e770e9664eadefa0f5178d0b8a1462ee1397f6ada48a5f5d057afedb8557a6175df5853c923f0cc0d1ca603758a641d2805154883711bc7dcd22a4ae7fcfc82dd64e64ffb0019876d6438bf05eb1c742e7248b588bfabd5910fed6755a9d41460162993d6ef23fcfa5e6ce1eb6d9282f47028b8e855f9f79400d1ae51e072c98ccdde3bc9e95929cdf215d7303952dacfe3765800d43bc09d2fa777a205aba5d2641e827daf8218b3c5ab842670da97052a041dbae5ba3766f25b4c4340510de6db4f6ac14c3ac59f095c8c2b31aaa376a1187be47a5f33167a53642b6a092fcf40063c4673ac2ae4884c630ff4c8e334001874d79506d0735afd20bf3567404c9976c554fc6e1a6c39da8928d918c06b0f65e97547ace767a154dd8567a9d73a97770a14191b201154c94f2023536ac9b9d778f4abaaf2957c52aebc1084f3e1cf1118999ae26647bcf7c0adbb5aa5fb1f7728438af5eb33b55b7fde6c28ac428d94163263ea4112d0761961dffb296d0cd99c18689ae39babff73162149688a1d34653db30de84a837e4b1414f5dfa6f0ac30510ea4753168e8c50f1d3db8ab369db34e3f6b38ce69f2a98e2f1c7434785f579eb61390e1c5ac40a1948306024eaa1a73e8f1bf797527b65e68dbaca8e6aae4dbc9c3fb417c4413ceacaf78956c5190f4955e2de4344a80997170f42e6fe070ab684abb7d4a6b5ff0488770b04f17fff54c69976b66455e9eefd03f1f2390ed5a9c22770f78f56d8001b0ba59bbd5fb82994f52e9fa4c1fb5ce15227d54f335060e066b0c58b01fa35b07e254a5c2cd67a37c9889bfd88ce6ba587d55ecd253ae0801e11b151c0933bedaf4b1315cf717ef65b97d4ee40c974f51eab02860d51bd9a3c172e6a08228d56d9bf57a63a9bd11dd14872b7433e49b3a07f0866404a12fd3775a5faaf8056361bcbea1169d263cbef84af15e2998ed3f41cc5de4edaeb522e1b2dfca183fc24882bcc860406ffb3824404576df32276e29c6b3546e6361d1d638b0cd24bb7aa12070680607265f084ff956c55f959fb427720440a445f7be0b3c161588dae16822aefdcc9eadb4fb06b1bb55ac08d54addb4cbbea238c11ddbbb794b09d20d34d7363383060031b6375855a90f6a94babc6ec8d0c2633ad12784d380bb9f3ba5b7bb1ca1f9f8968bf0a29c1da7d082182f05d2a523c69ec1ec44e06c99e599455ae1b19bb0c163eb8c8a288846c14d6824305050c6bac3ba2818947423cc41d8fe5a545b0ba9d629d97f86af3cf0c4f2e6bcf24d5bf1d73513c5e510e7bcf8f1f58b8cfacb62b5fd4e10603300000000000000012f10bb00c9665a32b2a7ee42836d8a08dd2558154ff60f0cebe308a89f2a5ed0b6b5eb8a41ffc27e7496517665c5bd47a42c86e9cf618ffccf37351a14cad5bde6c58a8a8f7ff0ad4ae23bcfac5c56f5b7d7137375ffa8a6498e73ab81dc3d1bcb665ecec07068634fd17e6363dc8819dcfe0bf8c79c4469ee9b46bc7aa9a946f91a8b2ca95f5b5e6a0251534831b2421e94688543c8ef271ef091328e11523990c6e263d4c661ce4924aa986601ff785674eff8d240a7b7013789172d588952381ba1048d92d060f6b8b217c3e378e15d46d9a3a5995ec99b7b2f689535269c82b738a62f24bf2ed392d30d640290942662bbed13c24b9cb9470e0a977462cf5b46c4b9ccee2a9ac67dcf031250cd665481a8739c1ef207ef9e4dd59023a083741d90455bc1db5bb813a079beac18ce8306ce43a057dc17844b3a930de9a19cb9b080c65629a8fcaf4bd1b614fe51315f72f6dcec67acbc93d920260f53a8fa47b9315dbb952a494eda3fb0ab73921827aa4b813cfd0fe968910f59973fbf22daaacba808e1e9374521bf490e771162b46a55b98dbb205e439034414f12a028e19ea6983881bcba6df3c197acbdc3f0d9f2d8d93b0c82e8f73a006fb7563783ffed2379fc04eca29ecf7940e540d466f36a4b009663091669e9090f95f7631be51e73347e395b72dfef7d33d2b5fb6515d9383fcb8d5c8d9260b16a900482b2da6ce5622a37a356dce780009799840ce767cc9cdeec09d8676726ef4cf05c11367ce3ba1840b0935faecbf2865be4c84f3b5c6bffd4e1505a6144f2fb9412145d3d6999608cda506451dbd44ef149da6a148ee48f7690fa76dcd1ce05df1212bfe15f917695200660be0d21406a3a19947e3d54b21ec30cd8f877af823e79d496f0fe722c73e335c4db6547cc2c6575587de9f25354b587eab3175ec21144243beccaa0ea8e0f9cb363286131db7bc788084c24b33825c49d4b7f6537d31066c9667e22b20398d3e54e2b67863c396a596c1f98156ed79b453603b691a3b21b8ea899e11d1d704524244f18e1fa47f735e9561b95845b09dc54c532dce3f46044d0e4d12d65892c9107fae9b74f3068773274b23efae665ebbed4781d687cf5812058a25363340f15efb0b0e2f3f91849bbe76accb45534d60757a8df95cddfa57fafa75412f39e220e897922078e7f24cc21312e4d05baa54a0110211728203fc7d96e478c6411e60e70ba713e0d667590d7abed5d0a5f3ea169ab469dfe59a640e49a3478105453f3f8a7d87a51388da0629eb5bd290918adb1fbefef1c785b25caef42a21211bbf78c58be145b54d07da6a73f7fba8ec0aad696e860f610931647309daf62644fda0165714d788a4aeeb8454d005e6e6a4a51e73e857b363fbf9d9f3298159b9585466e21cacbc36aa7bee4851c8e2b94d079430e0d60049a1e30bbc206dfa8c55f50e81759a876389b1b3434cdc2cf363de6394006f2066f089810b2fc81af8314da451291a2e6ca86092ddaaea915f47aea42cefd4abcb91fa0112cabde8f89e1465ed4ccd68d90f855f3ec598b256e3adc5edaab9b0fc149dfb124eb3f6d73a65c536d4631014916d01f43aefa3498e209f8d2dbe669f514a068ba3e942ab04c1eed3c21cdbb41978477833f286f654d0984d5954cf3b41cab6ffcfa0767c63998b46f1a39713a7a6138b1902a1343a30f787d2bddd9634b70cc865b6323ba91cd8962901c50f2cd42e8345dfcaef20ff3583757465d853acc4609bbc26fc6c5b45c9907b5f43a71bbb82e64b31356c1973aed1ae70233150a416d31da0fbad52dda1a5e332a9f3924d5ca3f1c6b47b8f24a8e3329816a3ce21ce974888c264402c80fa5b3f7f707c8ebbb4593d452d72a4e74f472c2386fc912eeab524256d792319be4a36bcdb2f1b3a8b712b88bfd9bd9864b04edaad563d002829f7b9743ba09396384bbff3db042a7f4a2a3cdb6766ee87558ab6b9c502c61cc1f9074dc8dd11c43b41a661be05b22b6cd9eea54c685d7fc00c5d694dbbce0d9559696ee2d5e292737a844aaf7bcf746d146184230ffab5985f4f8ca0ad02a5ef49a1f165ea5f13c4d8873d27947362838878644011a2dd7beae6ac3388d262bc90417569bf7793a1cfddcc1705cf8d802bfe1dd7323380add9877f3292c1c246cd1dad8f66d2dfbb81fc9bb70f11d7a2779ef01055eafe124cb1745def565b369605ce1206ddc46e744148af9dba9e9d58ab942546ef70e4db9aa84dc24a74bca4e6ee3b6daa8e441cf512d4931b35571bf42de8df7829bea14c7f149bca43ba990686de7a44befbf3219bbeda74fe9ea13699da78e8cb17545bd41453f5a763520da263c7fdc916d6bbb32e955905e9de7291c6ebcde60f587e9483f55178268509d918f4a617a7358a38e8988dc1e476499f9c7874e48a54561c6506e70540b0a996449482cf2561851d34c7dac24f360beb9c4b6d9cc32a76ddf02a5be195b4c8459cd1f662bd6394ac458203130105a2aaa5cf8d9d040b6b0941923f4e0f954466c52df7bba21cdc0bb397b3707fa29d83e9c575ab056da3338094054778571da5176003667431f1adb4ad887e446266bd37dd36c71dc723a5bb6eab0a61f27da63efc4a5cbe0d1fc7b675b744b7cf48c2dcdef2c9bc2531c916865b180f49b87bc78481c37dc412fa62d21946130067f79b7212d59b9ebc6f2186953b53e6919d8fdfd636f0f5c758c6256a05dcd47019460d24b164a5ad58b791bc006749870a09ebd79584aa081e38cfbeab59ad41dfb95c2025a3a00bcde8db0346b35da5fab6e0a6b5184a7853c16d012b93b382cda43456bc4d3a6514089e5599b19c981fa35858e5b746dc8da83ce9a2fd052ed173cb2a83420fc29da46b3d4cad62d3ddf24e2b00eaac8d4a2a4199bc5a3c7a1bb17235b581b9eb3af73050d17daf2d9ebdbe72fe39678d11b57fad1cc508c3946b4c931810f12d8f1e92356c95e9d583c13aaf4942662e33ca66cf4f5029d0c3b89a59ab068394a904ea30bf35834b00685c4591d8f7b43f31d20ad2f516a028db1a37da9fd777037af40362dce951aa5eb3e274f4f2bfe97fd0c3f6e6df5ed7663886b57329b950d39deecb0306f7b5aaf74845173a75e91a8cfb49afd03a06a70d755365d4510ab601d69c85e58cb8cf01037b88f2ebf598780733ec3f8f25c72814cd20e2dcc716207073b930da3238c689d65efabd50aa297fcaa5461cec940fb8783da76ac44b810f22a3e6cdd7a99c75bbdeec328f435bd2dfc3952f9c56f8b0336c9231313c25e4685cd0151565b7fddef3d40105a5ac734d76e57ffe20cdba1eb2771e13c3a5e2ed2e4364d1162a4646f6baf8d39d2c47a6da2beab4a15c1d76afa1060862d96ba9a6de38f6dc80dd41047e0a406cf172387d9ad7edfa5faadc8cc4126e18dbd1c3c28f61279e1cb2283ae3799189cd5d775a37313712384942c791ffce7061a488eded128a416cbdb60380ec8d00e0457aa69c45b31be12e83ba965215b03a060a1d32bf80c63283c5da885c2dee3fc1625ea070e4f2d22652fa9752ff63e21df755125c7e36f6f7ca40b1a7ed77383e275f5d316bcade8fdccae45551f1a8c3bc2e0b706af73c5c01f885971c9c9bf9c7fe184fae40ae6283a379d4068e15e957564d100f7776295c9d03e8e6473817f23ad73c05a4fede90fa6752511fb32d54962fc4d1afb043b45d80a7e3d12e9d3a2c87040360a7d947e5e46a2d72bd24d6589d921e07e1cc6e6063649e087e3cd6479594a6ab1ccbf07e28abb735961a4063581f7a264a797d76ec5a3a0e92acf3473e956ad4a75958fa3780d01c9c09e6f61b7e0c8d08ea982606c556c61009e8019c9356c49975263fdc09ff601dc254f520d346f6087ead2c60d7a8e90e372fb91a6ed0b086c6895843dbcdaaa8a6ea5b68bc4cf163b9588534cb8212353a8d09bd9cf92ec1992b2e2c13b50d5847c19542c1412e5f59a82bf952fd6581f2b6a06a360ebda413a2eef7979db30e29b66884f897a04227ef5f1a96e7debf205fc923c2d109ee26eb34d5cc5570a4ea1a83dbcefb00bda612c8c954e6e7823a911f8dd196a3f436e2c10bc6474a4cad33a3deb872c61c9ed722e948633fa2f81a802039704bc7586f73389f04e439e96adca3ba0752db9e5db2b1ccd1bea58a62eb9197439868294ab0431ad4da1b3f768ac42b283392a96492440c77b11b38c36620800d90f511dcc945d64983f6ebf6e97348e3e4a38464dfee4f4c8486fc1647608c35d6d189816db47518b58f9698133b2110f14e8b47dd8243b9cf42aa58fc561d1922fb1a19b1776a917e5991b4e5fb0bceae6a424b30e26b3a956c070231b2484037e05ee3cd448e2d96cb8f3d76dab6948a092fd08c76df7206e44dc7a98ec913601a9330e7f0dc72e5b5bb19fdfb69133c6b9ce7ee45a32c9a60508284e2a0a8cfc10937d77c3263a2a311421af154dea9edef5d8941e950000be8712365ff4bf58d31e0d9483915f6bafe59fefd7b5c9edc55ebfaddb0bd8b1403da4ab6ba6f5611c9f5248e54ee27a285d0f31e0d889d96fbb77f3409d00d8f5d109d54c7e223ee14b006efca9af09f8b14142980f17b6e81402fd33a27bdae691008e548d068c74f44e7dd0ef3428c2bc7f472a3af4e739431870fc95c57d954b9677d95116fbda6f660ea80f824b9f107c41498ceb5318b972856dd23ddf260053d829b580569eab4b2b88f16189dbbad6e6d8a7039caefd32dc04620bbfa979a3a17d4d276d14c1bdf964a28f8015922dfacae344f206d9705a2c4aa6f9742ae849b5b3707f6f384c7035afcbc39c79c437ea02144e4dafb856faa9cffcc5d1000bb62603accfa6750ccdd183d65f11a42c95c59ca08aaffd79af289721944d4fef1cf254d3c6e13dacf059955490354106b62012a53666300a861c9471c77fcc1dfed980d4f16019439a36a956e036a08abca2b31973299f9f36117219503fda1d310b3b47a9bbd8afdae27fe2d1224a565003565325d5e6997078c070e0d4c715c5a63be1a97f908d6b3e73212e7df82ed69b1c1840045f01b91fa13fb16f25ab126bfb33ce38ddb73afb7b2f871cde07b6b2c018392e377b835bf31086d4fbb092fea8ca62bca11463170e3dfdc865b25c1a47192aed956e43b64cde1e37babaf6e28fcc428503a1b1ceaeedbc0a25e5a05dbc62d0070761dcb53c14c938d2d3f83a8a367abc63b2d31e7fea1b8015eb225d1f08d6296c0b82de2994581ce706ea497489175ff4621ae8bdd144c8918ff2d839ec27d7c1446d7ddc2f2a099051e416342163c93e76247e2aa88d85d20913c903bac64b5c2baa0f9968bdd636f507efce32a7f019520a1269f231ef11a5b386df305a55f2d5c18b76a58904d9c6c0773295ffd2ebdd71462b3e88db28fa5d47dffc17b0ae14fcb7dee51169d2bdc33fc3a8bde0cf8b171e575e7e6d1019ed2a7677edbe550d5e13ea009b598455ebc6f7a8e5f69ab085f66a4cb7cd7334bfd166ea43172ac3080508a66350a645059ea060b7e79c9f1ccae078a70c38699b33b86a41075fa2a5cfe5805c3bdd7343efbb52e39123a51cf73f1bd3631cfd5b37b290a9ecc5475d88fe989020a81b34a1f12ff63c2379c21f7eea5145e7182941ea64151ca6ae2e125ea320a3fc862b305d70db72980036c3197d235715fde029a9acecf5f748bb14ba3bc4de93808838d9b23406e400d33e1a382f7e37bc068f8a92aa411107fb351e818b5c78d5e127857d0ad81bfd0e452bc25d12566531e10f83875bd296f0b70803c2198f0aba1c1f9ff5eede6f2c1217c04049dbc558ba4c3578e327ce49576993fb53ca4fffc2b3f21b376c11a430baa47e0000830600345dd029041bdecfc30fa0ac2ac70c874599b44bcc0f8306237ff39ae07d52bcc78aaec4f78f15e737cec480281a33c1b7c168bbc8d8195a773cde698de70fe464826cb00153a7a002a71384b7d30b81ef6ebfa705772268f0bc180052c41bc5d474a7052c645aad196b003ecf9e9a7a9f5e0c748974a9a074accc0dc6292148edfd4e10603300000000000000011c218b003a1b00bbccad7808a8aa81d548f9d1c09f41a5cb432845ee0da7a592f146c28b2d506bfa3617a585564adc385c3b83a9a8060d73bdab6348b0acc42269899246f6ab0302d65e4e5df4314e91d430120247fccfa848f6a11336e5b5372b95b654c786fb35bea08092d1b2368fb495557dcc68c6823d0ecbca02c9016fd607c334a35135e2f3f4dbc277ccb90f75c753c26b9357170db11f84d287c0b3ec5496f5777d69afab904bad3c073638d826dccf39f37951ac410836db563a09c6504c60398aa4c9af97d3d254ee1e3e94655125de5505fe368ce3ae28e045f4a418c1a0f33a144541490e87459071da4baa86698bd62d83d036cea4c4ef472bcdfc784ae8739791152d87d4eb9ccc2f9fd3e84b8e916900755a5d1239292bbbc64820c1926e2d2bc27ed0dce0bc3fd3e3753ac98e19498b630da796ba3f9904ff8695d94a4b44a52cf7e9745e93b22ccd3204ac3c3cc643afda0a8b1ad460f01d40fdcb8cc88428016697e0c7a23943d5e5590904ab390105005a20a8f28f87a4023654a5f3989a71120ac7041ed3f362f442f129f19f6379bc22d2a17cfa13ea13413991c19a485485e0a4582fb0fbbaa15a7ad1a63cd545b8e78d987b240ecbc25b650fe74d6dae41a702e4ad433eed743a7f76c294886e6439154ac599faec6c71394dcbdd36dc1e9095b694ce08cde73d25ef44b30f80635d65dba2ad0c7a6f1cfc5cc6df44365eb51afecad499b51cf942af7b60c0c0d6d08bcf9a0544e3c5f3dcd0bfbd243e08d13ac52093726a9e7f49e9936579747d5bca1362cef5e7fff0ca73f9327e9e00fb6457294aadb09d73788928333a3487ec6f5bb19d1e81842c19f280e83ac16f5966126f6741fb406cc36b9a4f057ce9f7242a828aaf9158138d5e983535187ea86cb3767b9840854fa1032bd39b295b7c1554ee4dd38cba9d951165d48ea81c7453a928400f6f209253b444a443bc7d3d38f6a71a3a265ee79f0a57d58a835284dd3cf7706fb2d11610bfdf25ab57f15b1896961fe772ee0124289c40cdb21dbd8c6bf85359f5d9ada9caa37478e3c681fa8be7091db58e04b7fcfe937e4306efe9703228030fa6da3d176f9485afba5dc9740a2ea383043911c3a21ed03e5b6e469809737caa3f8e785960ec247466124c58e287613668e36315e97115f82a3a0992940f3324f801a738852edac5fa8016d3c179e3ae4ebdf0021c7f3747f5414d5af48674f3614477ef00f18f6fe9ec757ec5159443dc2f01a8cbc9216afd60b724d7ba0d7b39ffd62e7aafb72faca710434ce5ca9e63f913dfe2e0754eb08652bb74d29df692c45249b49a8a41a3fd4b3d77cc76adb277e5089686c67b8b2d9fb47a6d769b843769c0e9f60001be4483309a579e13118285dd0fc2052054d1b2b3a7299894393ac9cb2f50c7a1ec6d82b7a344566629022d67581fec30c5cedf7d3e9510908057aa21a5a2c45c46f9b292cea0e5aa8ded725b44c3c8f045ae4838942798b145d8958536a070947455375f0cd8b83af6bcb4954f479fe26821bd8b4fe50bcf3a9184d22fc28b9128016f31abc13a5d64b8006b2c59c9de620fb2fab49ca644428851f167dc23d46b8ec713b08e2fabe8bbe415d4f2a09acaa5f0fbfe1bd166a496ddd35528948b2962ad11e0a0e87c45e6a909e306a36db77fd4d52e6274747ef35640224053baf174b217f6e35ca3cdb362ac85c0ca305589930570bfc6c2fe117a1f06450ef67cdfd479b681ad49b733bb6e46ca6e259c4a8c145674dda6ceacaefabc54d31cb88252a4aa9b3d7c9ff295a57580d5f4a42f91ce3998365cb58282ce45200100efa5f17a892184618a13ea45eeaae44e336355637eb629aa5190e92962c9f34e14f3907adb811ba57426fb4fc152e059002cb50a0a2f7d16d2a96de4a7465df6ef486b82b24fa805bbfadd6e55b50fe0b3bfc2a4f4ec2e6415ff87ad3d93b00b6580171b08842db54fa4b902f4c7beb21a0a74f1b3bb1d33224978a683a7a5386e2df74d2854cc93fc9678417243f1677da633704769f5c0130b723d7782bd55d4d37e097c2c172013c027ed57459e281915704c8132aef1001ee799a14b57bf66193ca6984f3f0b7309c650fe32e4208805d9d7a0b21c8889b5770a0409af587d56588811043f42734481f4506202803e586a76104b0717521ce6821dd8e30c48136faeac626438cfa732d7516d5a3080d1ac45c7ba289653b42d422dd8df5c933150c0f1ebb95d36b914a6b8cee96e96ac333563206dd976610d243dd294c22c57b3d0ac1cb72333706a3e54a2fca15dda39ffcc62d0200a1234420969e7f96974a6dcd211ae5b1b83c68cc863d01ffc0325aaf60e7e514d8c6155059b6e24006f5f36371e52bb8dcccf3da9dd1506fa6f0e33ae539562fb4acf2a404a7d3249eb1ee93b764091d2e205e3f58bc6052a79e9d128e6781c0e7ac39abec315d0de2d4a08b578b4b400f6e778d451fa1fb6c2a4e577e870397164a64e36976caaccf13d0735c4a120fc9a33863e4766cd097e32bf4c69dd4360c4fa5ac766a521044299e3f2b571ef67ca521dc3d16bfc20fdd27d4175b94c5c3ad27d4a820cd69b9d18f9d5f798cd52bb011b54168ea13180a564b7d72935109b77585cd0b9f3887456c0d8c90823ccde2d16c415ecb0224da10cb36e2b1b37ab26c76d021593a784615e286087fcfd33334e1c93670c022c24094175d2eca68ec610bb80f2d4b7cb153277ac00c9f64e6defe2a151948c5a5dc04b7c78aa8f779ac0cab1a4ccd4e56afad3aa4d9bb7ead7dba5f1fba7068aaf5188774a6af224b26aea7b05dac257c0df33fd2a7fd4308060c9a4b6aeed3095c8b314df7dd803ec11230155384a21a0ce88028c7550ad55bdf8d275cb33f2e23494e7fb2fa2e765d8cf2f2375129cf92324119809e0e1f223af0b4d825227cbf3c914c8e738de81adefc884a8d9f4f3dfa6ee260df541ef4acb535587d5bc77368028b4e82396ddcfc3d714b862c267af00082e695167d860e96a8cf00a4dfcec442cdc6f6a09dccc1018d7dabea37395533b32c8eca707b9a4441f37bc86a9148f24007929aa5a878a94f46ccd8cf395057828fea915ee5d1b408695d2c03e10b3406573687ed3630e5d323cd914a74a96e493ba0fa00ae0567bc3297eb7da7a1b902f5fb53afb46cd575a613f2a5122525c773049968febdc86a8e6f3cd240854b5ea1fdc1ea893feae1431c7fa650ca453d5575bb1d95b571d63f6d7dab7fe90cd2c8aad711a7b986aefd334a7a03fab29a006a76c31a0e65db8790cd21a0f9efc09df0e35769800dc759c4ed19abb8c8c99089d8acdf816e702f703e55b9baebb82e8fee2ca035d799c9664109bcfff7c2491c58e2382259be7a1f902268eb8f533f9467a4f31eee8eafde29daa14a2661913bc91ed3197be2567fa1e08827887582c73c7e5c06bb5664ecd14771650c733ebf0bd38cad81c36718d581adbf9aa13edb1eca363ee681b003cdb157bf562ad2b48bd374166e06417a70626d05aff57e295b7a77431f18035ab5cec4ca14a069542e07eb00e4a3038147fabfe011d804a3fcd6766dc7b528367a1552b2bcc10bbea1fd88931e33a45e89d08789aba46cb4eaac8eef6a445ca598af15a4f6286d1aa9cadcfc0dd8fc9f7a920507cb28a44230677607c71e9909f7b4cb65a152b90bf886810d2d007f5749a5b886b74d21e46db3fedfb8ae8638a502eb49ac467481de7c3f15ac96a8f74e5a264c5a5c16795a85f7fe16c0eb4511f15284b33932e69c9c8b1aa9bce78bb486a755ff3a6ecae869e6e9c895c12babf965e176bf8af778ebbdf4a3202771b0ed8e633d420b7814590045e69caa5a7f29883ebcbb23b6ed3eee0e4489a2d1240fa64e1c3a4aca088ad29d588ff4c649c0c9925a761e9cb185718f5fef50b7fdd3d82aa635d3fd8fb3abcfdcecd2c16a0889f9cb8c2bbb61dcac24d90df39d5533f4a7d8b596905420227c54b322690eb42c2600ab53467e6d9e9a89476f008f26211afdf3c38be3f9082fe7737b47e4cb26dfa8f0a0fadd7fdc3eb921036fbf693185721d6ca61081f65b225751a82d8871e2989ec8e1f22ae8c7614322e3829ab2a57c550d500762f53935833a1543ba81720c4159b4896452c5953aa5dd3ac59db6a27f74920c6cd125d5024e76dc61102c1ef6123cc85c18fb63f87a94d6ff49de21823bd7a5317f31513c42ac08586db383bdaf51564e0160d9711d6a8a7fb93885d2b7d1b83e8b5670e8b78882546b7861372707f54c80c634bcdef5b1d99f5e63bac0c07ab5ebadf04cd9c1c69b586e63042610e718263e6fc2761c99a1175514f1c5e7b88f809454e930948eeeda8477767b9c7c94cd802d5fb743cd9af4513960d70a2a96308b727fac620a21a5b4e68965056e7215c8afab24b2536913c38cf8f7d8f741bdebf89e87bce7ca050786d82f4368988732a349d9fe040450f3eb419992f0cf7ca737d77dc7a11256b4b4cec4a9d7ce4525c690fa026102afc1d4bf576e620b065e108d1f1239fd96e84ade170fc3f27e67c3255e585848af242b643eb706d6d4d9d55639989199f83a2dbbbfa98127d12d1a1c5eb50a1303bbd4cf503211784c73dc3714876897d2d95c43cc4ce04a36e3348dc743133bbfd761269aef276fdeb62be31a5fd0029b2741bf19354cf6a3c77488d13108003ed81cd448013fc72bcbe0f3e0713fed40e50eb1f4be8355ed72a1afd1b5273c24322f76553a7fa5fafe9c7d80c5226debf752a94637aec996f521d3b9a8a03172afece798ecfd8ba6955956a7236ff9076423f4b3f88d6da5cab00b10295b90a11af7524847cd1f41355827b865483a3787812003c214bd45416417ee9511ee23c64926da7e78d860275e74aa6e0d2ac00635e8000b7a98fc997e1fd547f5bbcf62dc30d1a8a0b7afb355a67eeeab0ff1e3ece44ffcaa2411259d53f32d98d2cc7d6fcd0089d8f82790d2206219c0c04af986720a41a64cd09459ea0d6140699508153c746aa12bf857851028e5c441b18a255b0665b68e67fc5266a00135dc1f13f27f875196ef509714f6ddb940a0820f98a36cc41904b2cc5b0544546aeb8777f6f10dfd1853d954dc92ef75631eee1f4a42645dbc94af5d6a3c0885b7c4cb13294c7d4d8eb514bc1d9d71e09dc9b8786bddb3e9555517a86ed3f76a114714480ee9351ab022789f851259f8c7f49491b7e91526c64757f95fa58bc2554d66305d2e0654aefa228dd5c1fc2191cae9d96d0fd182f8afaa5512dac505d0869ae7c95bf5c66bfed7186537696b59c25bfd3a65be54c1043004aa5e18c3e95d4709ec3d8cd5037cdbd18d62042d1727537aa5bcb7bed98485241e05d43473a629e3ce78a058a70659ddfbb3860e864a0f193fd835976f7cd004ee96fe4b1f03e44f68f5173d3b2fc660e06e536cf23799dd3c8a15d5241baf0eb390e215057bdca843b4887ee334383d21f0c1b64d0c34a47668d2b1adbce7ca30575abb166a4b51b1ceaf2b54ed421ca21ae98a400702ec2889cc141a9438de1e6550d83efcbbd2e23b8fb5f6c2578e013dd3c453b0a1ea4601493734fb3e377ca07685eb4f8bad762067a59649f34ad2d6fc03a27815212f276a9ea7731262752b110512cbfa5c174d723a6a479f53929bea18e359ca811e1a05c0b3e84923c539ce995fec66145d5bdc12497429300948a73c6a667f453d81fe8f1846f3c1091b67abbe7d7fd91cab3b72eb25a795a7a930e41f74874df83211c8c360f44b154f33c4fc983bbefcf4c863ede2e04b21861801257bb5a32cb26d5648162599b7bfdeac561d20729a6233b6bad9bdd27efdccd2367cc2ad9d84c7ff95ff78306002cef0f37ba23534ef1007888e263bc97716676c667729ead2c03b0d1a927d740b4542b0bbdf89b1cc1f2dce2c33e6d805f06ef1e314c0dc65f6e09cef4ea80388ba34f12e5f78671a77df30f15086ca95df1a76633563e667e4822707304556c1849bdf0a65adfef11d27c4b00b8bacb34f86e75c26290577e3804875ada856a8dfd4e1060330000000000000001343d5701ccebf6ccb16a852357a9abe5744c9e16bb640ca6f1a88cc3aa64901c1283a1e94d2837f271f8c940f6389afe6c5594589d654f2349b32ff5d96aa5232a532d499825722625f58d3b23ebfbd431c104d699669503681d96c23ced28cd80c456c5c597076362e760f6002fec4be3f35def8a4eb7296ef8ec82a08cccf89841c55aaae38f26c2e58341e5b428ecd8872b4c1fa6f5c27a5e139b7072cec9a81f4c6ede1d16a6db7d6c6188d43a0299e4236387249074b593cd908a48ecdbfcc1fedf5b0c56c8d9b1bec9feabf76233b6578f9780e2f410f1a91244a64caba78aae8045cd42d761815bf09fa6c35eb8153e3e037c6fa51640e2e3c3d5881ba0b57f7e384cb360a18bac64edc3fa21570234177d23f240a20a2476d128455a9591a45b3c468c8cd2c3f0d3b340b28d6863c483fef57f9f17cf66236685eadbdbf87b3515a5777d03c73fab0e7078e8f3bf4cd0937ac173e5678c94cd4057f764d90f456bf6cbf36fe49353f9717e7255f9da73c8d59c6af283bc8c07cc620f44dbc1a3abd5660c00b3c18c420c097855f5f84503b6121d7a62bb3ef5622578ddd85490ea3ab48cd461773508c3c23d24f1616fd090eee99d10280244cf41354b0f0f614f0b42bda0b2525f5973a7b74028e7ba873aa349df8539a9bdaef10ec495716eeec139eee40c30569f68be613a8462514f9c5df43dafe1137198fcacd6ed2d858fba3ee3b8f0d9b7ca28c68aea07bbcee22f9e81fbd5c1d1a8c87b69a31edb4772a6fc9c42b51ec689c55f12798326d94e1fcb0ca5f82bc934cd5030ea990784f9db6cd1c4dea61ddaa8d9dd6e5ed230bb81edd655b3a8ea039e81bbcf2dcfcc98c156bda38dc80f8e5dcceb248321dc0a873ffc8e13012de3301da08b8c1751152a6ea531a329021170a701099fd2e9fc8038d90cb53eeddf125a3c3c1919534132b1179d355ef2b27d385b1c13bb28a9026c652ff08985b42751d87251896ac93bc99082acc38f62490ca8320418d1136e721cbfaf216634940932042a9a26561fe3c3e9bdc4e53e2ac523ee7bda6cc388d2b4f3bd31438e850a16451148dedf54d35a3d9a47f23f6085da1433dcd10bfcbb73ff35218d1ea8a67682e90313585fe1a5faceb739c5de915c4641afa04c9e80f28463d5d78037760e8b9d310be6d35d94be92516822f23698b0bc79ed619fa106d28f75045da842a14a7303d431d5fa8bc58dfbad2153aef68ffe015626e7e6957c115b530680ac5479ac32443ab781fbf1583fcdb88c22fb2e9c16db5fa7aec8fe3b7dbef5874972f7e33bbb8c263f16cfe5bb9dc1d0a50a01390c0f9d68e29ba709d994b8b0cc5895ce5e1ce2932d5021b50e7ffdbaeddbaabbe595dec71c95a2e8091852dd92e0731b3105defed2f740cda4f8cd40115e7e70970bb9e301c6817b3fdac3a0ea48600e7d6ba369793f048ae6dba4cde91836e2376bf664af5ee5753a75d57c2772083d24891c4d373b9b7086d32451daf7b2c5fc7be263b17872288f8bc135e2e1722b5106cccf045ceccc780923b62abe79385d568c32a1b589aae832d6f2258c439d9c4db4956a3f8efd9cec24492f83db44aff1733aef10d1ab917b75869a4f63766edf97ff691d95818ad4347a9e1daf016ec7df5a83e57bf18f4b0dd1f39a50b20e60202b35256161661c63439a4dfe50fc9546d2e095d921291dce7b1dda9e5331d061d2ea9c27596c7d59694bac6ab3ce70f0da6cc642ca7ddfb102497057f1143c20c6a4d8ebbece61c910ec8af197a429ee2dd91791e7a1aa5a8e31d4b405e864b9e59e8e4c9b797dce823e4f8d42da11b29361b05f90488f5a728515539361feca175269c52a20e528fabb858c4b68cf6e0259678b4611b109c3d8cac89eee9e876e6929a6d147a2656e25b599af6b2024629cc46d2c84814c4251b8af588ac7953d783d83381763e58eb1bb3c04f7ae2d79d6ecf0d4873956bb8c0aa0a0b9d3adeacf28af687b86c40a99ca5891f57c17d22bf0364cb8c274e3c72b9e25e107ac5a79d1c5d8651422653a533cd187397963876074fc2f30c3bf84f44f9a33ff89e2f8da498d0ec39e2deb49d8acf7c7ae34907a7aee19a840f933fdc02abc5985772182119425167921b5e556744cf6a706244d5da647c8af8122bb0b11ad50382d3735b84197fee8ee7eff455dbde8450d572095fafbb8ab589d2a3ec23a009114a15963a5827eb7f573ad6571f3ed4014b99584bb05eb66c14ed80821c2ad201e83084f505dff3255fdfbbd5eca357663835f1f0bcd9c3741a3bbee5f245cb39367a087b3e3aa93da79a6857f69fe4b77781fada29078354462e3c100f68bbefbc018e0a7f5f44ff2335309d36d3736cdeac746dbd1bdece76da3eaf7b7063a8686b75dfa20673dab0e322b52b31843488dc5c110ad24d573eed2592541665cacae5f05d3d48fd4d24d6eb856f41cc36a06927f282859a5126369cde44fa86b88cce4de1dc5c818decfd0b69d6baae437c8b7484aeaafdb5857064969c6700b7cb5f9c73b46b70c2560c6fc83dfb1e0b0d728454d2cc3cedf792ae956cbbe76b3aded938c6e2453e2d0d65514ae4f5bfe9332aa28032bb268dfb824ca868ee4313bd09dd7cd2e4c41672c29a09e9cb078fb203402db0d5ce2e86722c47efb85f93b2ef1f5a97761e47498117f0fff701aa0a164e9422948793216ce150dc3ea231c60650a8b8546da9abb3b51b46568811dda8bf20bb65bee1f1651f36ec9ba5da468ab626180e6424180650ac44c1db9ae9bc5d3174ca3250903df92442999dc5001a69a3d7129b1a16d0b527cdef9784ce8b46dad67d78ba3eb6a4311688d4e5a8ba032cfacdb678aedeccc5a07a7415dee531e735f1be77b54b2024137cbe59a31f147516087f33973171be721ca8f282051836f111fc0f91e04ae4b5c00ce0a448fbb6fa9ea2220e7b3464f69749b9cdf9923c17738fc881eff55944637b070a061a59066fa3f4dbd4a307a1e5b3e48b82cd70517a6dc931cc56c3af8132eeddec8af1c5ffa181e381b55ab5134dc0bdd9567285697f2c3ed9b1ea7bf1cce39cbbd5e29adbbde275864402293d933d3ea957c5c52d47fe002e310f2ff195bd2ce0a3b995ea8e728b3b64e65d12a80e112eb0026009a3bc8f1ebbcb80cc6a30e4f45fe2f7a206d84ec927b6feae508236c8ab480f48800987ea19f2db7fc238afbd8cfe421d5ec2b9a75ac483bbe46b54b27d119672610f372648d1d01b1ab2a25ae81f01d4fe39d62f3b6af26578d5792e6447aed1fc455bcb7f7af3685ad835c2c31a763f94aadff47ecbd2c36d7e4dabb1d635860c9648e8adbfce9aaea2004961056a6c59f39afb51011ec79860ab7e21ecea671d035fa8a70687fdcc83a859c571fd0c2628d4464cbdd90db098341ad2156963c72c04c7192f17caf3c7027a1d01bad92d2773743fb38303fa36dd4c007dcc0923941519a470cb6adffee99ea34298a537c9219427c57bb35ca82d71a7c6853f36750c39dbb55dcaf6943b9fa6899ab52e05143c5dd345c262d877676b2fccab91ddd47085ed7db418c6cbd989da1d80295814056661da69bf3a75069320b27ba47817cffa9785164ba8299d9581182c38126fdc2283514fab7ececa5f5b0181b075f8621e49dd74edf81569b71725357a348bde68653bb803ef43dd5469ce6f8f0f18642d5756a18dd00be31873e352b896cef07412de58e256e854e672648e9da6dc5b32cc46432e7cbbc0e7098a94cec9a438ca13c06b890e113b6ed8f126ed1e71d8f0a64cf855ab7a77405186c22b9fccb528d94d624db2613640ffb3539afbec92e64cc6da195d87f057ff02b0cbcd2d89f48f9537d9a17ab80b4cfe3fb7f8efbee556727316611428306af7b5e800b084deb0a859a90ff306466dd8adf50816f180e46c09f745de77c7d8b4946fceaacae01720f1d8ddb7573907f37398d310e4fc4906c96da2e85ee013ec62bdea0987e6577652b9d00ca0ebe45a4905e0cbbf4f439d57a916b332a8e82aa08a7cef22c43a0f97b6c8aba938b3fcc51f26180d6bd0d856d7eb4791a41b4cade661ab088d7645ecc9352537d6ac74aede6f17a2da04c054063879d4d9d27d2054f254bdb213dc13da1961906cd6f14958947c1edc7a9da859534db0aadf070381528f528d5faaf7cbf3b94f6c668fcc2bb598621793a6ca8d862de3f089cf4495fa9c0a16977e7fc597485ebc69af4038648417717f6e8fd4961751a05ede4fc6771b5c685d0238e301148f86dbb3779ea9cf81fef96e9224742af05a194e9c8fd75f30201bfcad5ae0130251e32fb29df2725ff2ef901c54195378ab2395678c962158d955e27278db75a4fb27da2d754ceb0a1262a3c2764fdce69df15e319adb032a22c8d1ecd7ef8e2210a234eb3bce10ae193edfa3470e3aa78f82e7986fd4d47b06697606e2aad5fa3653d770e99fe4fe318f98d71692e0f7d178ad3815e55c2d0f5042ef06cce452da339855d06925381488d38cfa746267c2b8af2c73d211b00969f1a148814e54015a7b3e1bf68ae1b5ae4981de291deaa5f8aa426210508c332338165cd2bd4bb69b6321c7c09bb03170fc23422882523d29da95b5cd23594d9cc3dc94cd871567ac47a514a6471cf4511b2f1d7ea6829f265ca74a9989308b36325082cecd3e7ce18f1bd1f341802e6ff32d5c7523a693b91e675070dadb70af984856cd540b2d2d1744ab96cdcca5c31f646f6580e1a27b9bc284e7c08d60e5b683c9fa3d9bbbbbf5d5e224fb86c260e902dd0d4f39dbe7cd9f602fbae2dd30786fe26f4ca8c46e6e514022b0b77ae47e1478018e4383ee148c52032197befdb68c86c4400d700a177df48f94b30c38ddc9ae62ff2af40d40efb2a900734ac81d31f35d09bc0ecf93873809651a0e1da89e1d0b0f0ceaca8752c8e2808efa07d8e07b69e6b79d081e906baf09d09bc225b8b553774201fc4210e35d71f139a30e884c1798d1f7ce8285b66a310afbc9e1b988e0fb246d7c0dcbe849fed8f0c880731b8e44d2ba4fd4400c5653ec69c830719f44d9d9fb53460adc1d94b513cd723bb73167d10ae806af36ae09615437c52f9bb4133dd7ee9874a470ba8380e33bc5e0a082ee323ad090ff7b4998b01b41b3e746f68a70ebfce33140574db73361114b6017f00ea005c137babfb822c4df46aed490ea13f7cb4cc6e52c47af6f505812ea87c3851dbe7576e600955ba86f90665dd461d63274702c264cf999fff1f34ce8722e60f960e0e1363b399875f874d41b79573ecb6933132f65f22fc32a0c9f0ce2c78a7a8c9adcf13408401ca32e09e66028915e680b8afce8bbe90e97dbdf7bc90dac1e97cfe548d6c645ae18b6c171126389aad3885600a3a50f4b90845ac1c749c9feaa960c4b514172d3ba8cef4c95c05af66b41602351e619e745ad8ed699bff7bdf3ff1da1ab2c14abaac99a94c2edf384e94c1893ac934487676461880a8488abda98d0021826a064b806d5bef8a337e323f4480541d8b6b177fa41b58f30b2dca5e0aec1538da5e3a30c9520ed50678e40583cbb42a4395ab0c159928aa876e6a910c881e4905764bcdf539f3d857f60a6080023eca14cfff7fbd95a362a648756bcbc425db4cd515b62032a812cf14c15f4adeee38ac39816c589bf3933edc8bc2b53b940cc79a893c2af856d4471c5616fef8241c4f09f77c8322d552d4f54d9cd5cc40496f6feeb22ab5e566eae52f02281df5eb784ad2aad26198ad0ddadeb2a2c72ed4106cd4b7424fe894b650dbdeab2879280dd0d8103775847fa364f21ad2dcffb9a52246beadd4db13a74a7b7a0e2df91a1fd454f17ac07012669fb160cce622dade4b608083060034a63ae1ae8c81056570b84efd50fc792b3fe304c5a3f8a75ae5486a45fa10fce31c4fda44468f7fbeb9ce14ff4214692ca6f1d4d3aaac92f69621e650aff56144ed9ef861465e933b5444ec4c29ef7b3b8d880ddfa2a533ddd1e249ea9ec99e5ff628c2da514f065880af2a380b8e8a2b51f3c1c911e8d141ae6842370cc266f7fd4e1060330000000000000001f0cc500077f816ee272fbd00bb0368f483aa88cd1191793ef32436b20da0f9a7ecae4c1b8c2e587b1799b1524d96d13a9037a1cc38429d2013658b78513b271fbe29a6fab274219c587ba31d8aef039139251b2f744aa8013c44460c5c34bd6e5b22431cc8709ffff7a6c2057467e7c71f70d92a1274ec76931555edf0d333c3d76f2571da982171aaad2b52b91521160a01cdd8c72dab2b9259759a35ef5f0c54696f98665e3c3f73881a17c5bfc2ab3d9045ceb31db2bc7bda8628b58c298953d1c4623c837a499f1c06b2d61c8e93bbd0094349c9b24f658ad6ed40d845306402664e0e25bf02f1541bb67c8f3c429de742f333e1913592b446cc5d50c7899597ceb671848e7b17eccda53ad1597a64250cb9c4c9f9293bbb79dfb28488de7b98649b2f336b7d478fa5f445579b70d0d49223348dee2a20587f112a6ad98d855fb9843038d075a375df44de7ffd9ed3b99c660e531ead28c66689eb59c08f80c9744697df8a0aa673f2ad96788bf771bcd1b7452c2b377f42dc36569303dcb4a7ee31649955ec072b0a05bc5ab367597adf89b0dccf85c2e6df5170367787e4a0dbde2f3f8691f66e5b71efd13c7b3223a166abfcd8d59e7f41cb5eb989c073b1b37e8976f6c8b80e3dfed10c8a076736b8a60748f7ffd752ddccedd5cbbf02a33d7e2d718eadc7270bcc2e6e41c6d79cae4de6d8c6ad0527f61a4a1ace9466c00200434c39a355400a1209b38e1141644f8ab3e02b6c7ed5d7ebbe03c681977f945fda91e6d2ea8237c833d29a24e504f4f5ca7639bf8fe416b65fc8aadb1221d1a5be93ac260007885449c96be7635b359bd7ccff2e3001d9e39eba9b82399172f3f22ab9203e002ce48a8fcbeb228d423187a0eef63f3f07ba0028229460400441423f9701772bc26963e778c9ad67aa2fc06b5667ec898056a8f597a10204269a095907312a2d4e0f2835343b47e91938d145a6575385616c82dc0988126571466279b692bbba217a0382159ea27657ae5a76c7e0c4eabfc4c9c97b4aa71144c025f9270a82be603327d4acafe40a0b4e92123b2ec0fd712fd66ea7da12cfdde2a9891b3ae72213a7d9530f14dc07c6fa2d828ba5cc6b70f6b183869c340d3688875320b4e965e1ab1686e509bb82eb1d6ef9c1100e53914dd01eb90065e431a96b7e86abba5d9095715612dc6100d01943d1182901f46643737552b9a958d94091e47e2b8c5418c625e94baccd3f239be3faff8769791d8f851c71d28cbdcb477bffd0d66997d680b51242c9374f90f16e31e1bfd8343cdbfde364509013487f415f8e203c41c24d6b9b27107e8f0b35a2fb0d8fbce0ce70e8e0c926be0269e346a0e43716b634b5db07c982d37aaeb0471f0d0933ee096f8d5a929be81fb95c37810352fb96156f826f37dedb2abafbbcfe5ec2516995086ff1d9fc05a08342baf815563d089e7c6b865d8363e0a7d598b5fb92ef6396ade52d4b9f8dcc7057db3776b23508a090702f073641f3e26e61c0ea1ba2d74fdf7a900519264c490a0814f14c1dde5c6a742649e0c518ec0b9f5a9e805e2d155f62077b55362e7966ece248f08e588b5eda2990d1bf62ae1ec405492a0b8f6dce8869b943732ebf6188ba691a515525d33202db5df8526cce35a8ca3cfd2a25b9d838e52da4681f400f36ac89496ab1d5b484845c66e28c0c495b4c7211377c4af42e5574c860379501d361a4b626502d416aef46f9e640211d958a6e0e8dcf5771dfd4bbc27d63cdf3ef5b082dcdf5132cf9bf936ed6dacf41260cdd39b4e83c7cb79a6f27bec49c97cf9b6931c0319ec9e2aa6520abfddfb76498ee56da391887daafa66dd080af7df099dc12c34745bb526524d2a55e802db03ed8d5f4d54c9d75a50250d1e0155d5a84da60bd49b1438544e8c19dc07d3ef60c9decc345cdda10da7bc5cc4a6406007c47f8c29e6b466e7ccdd32829ca069a2fa2df33f1b4cbbde7182531a71de9dc81ebc0ae31ef960a148e2064605a81caf64733ad06c749d59ce4b3e5d70f16dfd2b49e11cf2de30bc35715bf262bf4156a474d911619a014f7b1b9b276674cb4bab375ba4bea2c192da56d890543a2b3069f9d6001599b6309ca86b31e68d6842e05391fb8d0f6fbc881cff7fc8a4422c186e97d14056aa8bc4135307007c52ea04adc1c94e378f66c4690577153ee360b9c9a6e39468c127e112145492d2571b8832beaa3df7d2a4447da088f7a94ab52ab5bf95e4ec886a6aca31bbc888f20cf8b98e1a4d1fe2dce325d795e70298d9ef264e03dbaae1e463403fd2d300476bf3d1a89e81743959779d0a6fddb9763fe70b3a7942ee6331f1c7ea2b4927a301763a14671ee320d13877612c8991ddfa8ca869fc964042d86a777f5c093d1c604bdf1b2f75ddda9ef8157e093b63721253e52d15c912c58fac5577cd40a971c25913d204364ba76cd9e6ce148b5459218a2628ae95c35408e4811a2a9e1cefaa60f02119958a13692be226c8e7deb1967527da5f03ecbc2a328acdc9ce4d26939bbe841f21ba06338bc6ffc34604e78c3c2302f30fa0738b7a3295867b5b2636a2d4072fc08bc0b5cfe665f3f894f00f32e2283c0c7584c18bcfb38f2359200111a12f9c0ba78bb61d8b7df6c3efa2009b8ee987ffd8a7a37ad8612436f04761e81772be4e12bea834308138d8e76c92c14040986491afd93c5a6dec6f8273362924a559c5a7c36dbebb3ca9a5f575edfd89aec75b94f98de80aab67de9e387e5de0fd7f48016970a71495e4518f07615e73cd058ca0f7d06042778a9d1937de1305c0ac9b807563947175d1b774d20e4dd126c13450fb30f9b500840a2613e61687fb401d04f382480002e4042fba44afd8d57dacb50e3ccb81c9e5d09d81cf3db127f8502a988a8918e4a7504e51cc8b989ffa28240449412f3297179011fbd864dac709eac1a639c9543dc90bdd5917601be5e2130b20160af5011673e20558b56156331660ab07470e75dc79f8e2b8d918f3838441077445aba702cf9b281d8cb82128ffcfac1cd7714cb60c61c1b70c00a47c3c13aed4da4debd7fecafaf6a62932fd7e3ec8c5d5c01f618d75e766981ccad9414f5b60eba9e70997795189f0142eec7c82c7b39f06eb757e872662ba240353dddb24ef5c571767052613cfba74045454ab7d8816439edb395d351eb33e145c676845d8e0cf1ff02707b72aa597d423573d738460e64d740d58abc6550e4ce3106233eb7308ba2d2ca9e615ccd1304f1c3cafc91a12cff3040174d8540c99b6d6eceabb828d21c35c794b5b12974fd2dbd0d9a50db3317ac32e0d372b685970c2bc3870ae8e52dc5f3d8778bedb96047e21394e383b538ae28646315a079751a972d4e2035a9af5a7f5b54ae4927560c9ecb0c81484c4885d880a0b5c657e52a301c5eb4360c184abef7cc02567a3448c8c8b1aef6a441f8fddece404370e9c2db304c9cd69fb8b0d37cc6dd714cd56ec6f002d8d7013ac7b3d48bf8c89b31336724e156b7e53a56dae6ade2baad666e59b1c6420fd5c71cf73cf8cf835888ca40156e647b5bba46161f685e25dd82952a59274fbfcdc5763eaab0b3d84ce8b5239f1fcb7794ce0d2506bf9e7660d6deecba9d56320ef9ba280acff10e7800d3a30d12c15ff3fd1d604712e68f84abe0f84776f795ab84de5f939e3fe92a1ced9f6d8c2d7da293504ab45284b8718428efddef7e1d3e5b422011b50df28a17754f53d8a2f100abc59f0f9b7248f128a31b4d652eea43bc1fb0d7d169ad5f3874ef776c652c8ab49b4558c8e0b07a4655b99a0898030450adffcd2d0709908d221f5b4dce5fb896c212aec8235d3c1c891b46c83d9f4a7e1d49b6168b4d28652c5239ca5355486bf0271aeae945e92452e050448b977f83c488e902e67b1e2d98312e083b47e4226ca529d49acabb626045d81a5e3e11e88205faff96efcd7325137da9498f2fc1fb482cf8cf3077e09c22c830f68a5543eed3d49961469fc4abaf7ce0b566d553530a4329db059c36ef76620f6b187773e6ec0e329a11ec9ca8b68a65750e69d09343a1bfca2ab838a16be2193d17167c9ddd5a8c9da32cb01d80d1db9742416c301159054cf7d1a98fe44d3ffce557137f91a0e1bf8b2b9cfd399fd970067294d38215830d7579cfd94cda60867fc5ca9fe87311121659b918556a80b6c16d812b0f267b5c0c04c3eea50bb93ab4689a96433b007f93bebe5e1f05dd148796bae4f9c45565c3b16a33296557142b0b0d7767854d5698e39dae22e5e0ca4585849f330617f7910d98af97c5f74f39edef3b8a3a2b31d735db631b732735ef35c0c5864d08f294039540690aff648bcb01b7170d81c6dd665c6babd51a9fd53fb7d0127312db30e3dbbee8121541d3e3dd5025b39ea774aa8ae16af5f47104844092635e9ca5e8594b40a2df1ed70dff2158ed9c18f5b4636aa4f5a0347f721560a382a967a3f963127babfa7f33b7a5281c9a187b57f2c3bf38b397ea0f3c690a44baadcd011b472874132311a6d2395df38c3328ef95d5870879c47ef13facaba03bf570e7ce5f08345f39904c08b19d1166d5f2a70d4c9416b3ea54b1a0fc6dda2cd7637534162ad31fd9e1f57824c26648d3657ff8f2d2601dd42d2f679bfa6752e84e2077a66ef6423c62fb7065ead56144f16ca13216ed447ee2ec82594ae4b480b0826122f2679f561f173999fd33cb8ac72e1327cd4e95a77d1144c1903a49a2ee9376206898cb86c093ce9af7f55190085075a79b5734f53646734fbe5f84d0d0077526b46bd6efeec734fc4bf6f881714d6cfed90200118408ffaeaa1f85c5db1de8119db1dc8335e8c2bf68b08866658a8ae507f92cecf44437c91530a7d35cf323b93e47a783dbdc0da8aa37d5c01cb9d15d060393d34bee1a106e57d48db054e0f106f62a4ff23eb5d3d35f8551d1829d2296311167104a36459eff93be5f34f00710bee4e3d221eb638d84212306534682d9a6eb73f56073dca59ed5d276e0607cabd81185e9a284954abd5bc7cb3d78e60f630d6f4881915f05b71d49f42b0d83182d11f133f3ffdee914345aebdc9680bdebceb1e679ef99a40da920efba461c508c3a17dfde00637f1437dda62afe82896599dff4cb23b6ce21f508d4e40afba7575cf15d1f793eb339632dc2c8d0546e936f348dbbeb57380778a11e5d7140df06e684cc13a8bf997ffd8e28bc539a0b130acf01aea5fb9ae46962cde9d6214c2a9bb61957b9f9443610810ef1e74f757f1b24994720648d0c51965b285d8d2c377e2c73914747a2a76da05cb56f257f308b9db1efa05463d891eecbed56c78ca0aeeec50148421ade71b5d23bd33d7e2fccd70e2a292b3d9054803816993c01497971b4b0341952cf8f01489a8b17a2d0ddec592f8ef9770315d8474796a7924865d3cbb0cddf7bfd9992f6d19e37ca7819147f0efa4fe23ae5646b4d3b37c7c6386fa545f706ab1a15a692b3ba63b5ee20b3924f754bdcc997273695d6f478dcc38ef8e09698a2459956b787c30ec594e5f03e50abc3d91aaef53faa197fd704fe4d20a39e3fdeaed4d7e8cfcea9120eb0d4187f64b5f2443c91403bab8253da009107fda0f582ce099a199525c99224032c0df97b5d171947b0b949222bf627228fd695554352d4fbbe7926abc42b1487e5874446841b578fbd155bd062b147c84ac1af03432f6f6fb109a9b32453608e841f47589b4fe5fa32e4ee1abf0614fac09f5cdc27326007e1273f347810078144d250dbd6693108df49a3c63c2490628ccb4536076f6f976668902e20e35c63d61cbb6f4d99a9fd79a4f47a60d52d5a745853bb33139fed19b36ef6172030d2b74ec531bae7fa';
var signedTx = '02000000010394e6e9915e55e60ee94a4e69e5d081bd30eded9a588793b55fd06e24814ead9e0000000017160014045eff24e65c80dccc9916e9d04f4b5a7ada20ecffffffff94e6e9915e55e60ee94a4e69e5d081bd30eded9a588793b55fd06e24814ead9e0100008017160014ee1301017789d29690143355fb09f977d87cfc97ffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082352ed20e04271aad30c96efe6c62ff00c803240595729f7d71e8afec40c536809a988e5ce448145004ee22acb3be68fd0fdea553cf48359efcd9d625f4628562c94e6e9915e55e60ee94a4e69e5d081bd30eded9a588793b55fd06e24814ead9e0200008017160014836ef9985bc48cd2738ad7d2b39c2dc35892730cffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000091cb877b7329710217018daca85cade2d01c9e214be09001f439b94f233959ba20803bffe35e8dc4567f8be0c4c0272c8bd338945e89ce09d36d0ddce86efb65445070ab9609e3c15297c242539a132219c063a7545bf7920b77826172bdfd52a72edc609d7d38d2444607f410ff12cb5e2286b02b1e5409a6326f0b998430baf65630afe03e8ddb2a162248a5e11e83f201a0e8420ca568986aac4ffdbbf631e76aea7277117a91492617485a7b6816675a8f9d450a36f442692dd77870a69bc384b6d00f4e837d69ca07e4998d5f22585326e43bd7f3a27539c78e9aff3087c91964d18afa9fb34a852de88ce3d0777154b6b5b713c608fab4dc9cb41fbad0255d03f6906bbbedbee6cdde94946e0119c9ffca577bb353216e130669d6dcfff17a914e5f656cd3ce7597eab209b4c9314e974eec2a86b870125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a01000000000000c35000000ba1ad1d29626e46b322e97aa64407de7e104d74db35d5737dce7a56632405d92d08142902379d1dcb4022a1c3b46ba09904971c86cd943679755ca4b6bf6d9acf8e0238007bddee9beb4bdfc911d92fb6790e53ada0d0a6c406843596ce7c0819c7dd17a914f68547fbcbe3f81e0ba56147d98ca8bbedbb7ca0870a14e84c54e989d3a8f792dccf52895c537891d42ece33d8e38ca59c684fbcb22e0841f12c20385efddb9e4767dcf38e9f9cdd7c0968ffea093840d37c30e8e0b46a02a8a23b26e1391aa9733acc86c935d876db48f793fe9054e02618e1e784fc2e8717a9146b8a95d91981e614ec0e2b253a0890eec15650fb870ba93430c9c20207d3ce59eebb282b18c6920b16086929ec1f1e8c5876fbeb02ae086e5a06728ac1cee63adaf5852b432699c02ad1c76d615f0fe752bf24896428ce02973b9fc7b31657725773207dd099aa5eb109a399507235dbaabe6962758dff4517a91418a58e1c93f18898e02cf232493f15954171114c870b591147eb33f4b516433f462ca153753d5219dcf3e084e796e57a5c4a80ea42a309750429d7b1956ccbeb665720033b7d2a2bc3eeab18c8538d5349df542edd3aaa0395cdaad807e297e4b2a709adbfdf62e1894d7d55a3ee8f1f07638a17bef2a70317a91442671dc98a48f62ebd5f9a544da31f6311a04b668700000000000002483045022100e8d44bc56fae176b4edaf18db16269bd6d3cfa59ee10d73c25828fa1b9619c3402206572e77cf5a5a9ce5861e7c5869b5b11197b385171e8aca7a81a914bc2e4e7080121022d726e30e0d84bff2b1d4c7a4c3233b678fe10953cae9d913af3c27852ced80f00fd4610403387256b01fda37cc2660ba9076e4fb4e3a2b6df777757a5819d5c1c394cb93450d062da5e56b0be6e202175d0994da95d2335c9c85a65baba57e6266e39b89fdeda09a558df019c8e9f0eee5ed189fcd928e329de4b75f671885d30ae59be1013fb68c5be72f0eb64fbb192a445c34ba328944045ac89c9e505d71f6835db1f546550dac479213548fe822fc67f230746416d2c9ed380cfb933ec9ab6ced90bd5bbf4a8176f8d12ebca2d21d851d3f1bb30af48e648ec54d6da7393a8f0adb467bc66e2fc586a8a13264147e6195bb2db98e12d1b58bb184a7c07effdcd6b42a0e8b245394957b25a1c3b16b618ce9d3958d9481afbadb099078c07cbe169bce6eb623b1975cdf44236f6d2cefe6fc4da4a71b2cd48fd7fd7731afc2fca708408a63f07e96a2cc7eecbbc09dee757ebb3ca20e1c145e711c66e29805101acc81da5b27087819218272e0e672f0f9c40f52fd0156ef3e11b16e188e991d92df030d8d88ef83790d3c50e22de427cbb9ae1b717f0413a811e0057777a811db3bcd3e8e7acfbe6acd08a8c2c85ac7f62411e147d98e041fb777dc2ec50a32ba431571a56453e268bd49d5735a4b0a025c9d6592f47bc2746ddcb345e421dfd5744b994e4c6dbf0be4e0137983ddf597f7fcf85b593038bd5d54bf464be3d551c8a225c7aba1d2ab738b18b0d250acb3dec416d6b0e9df872af3b02ec3a6d178faa9a7ae823c530e20e04bd38966bf7028fc958183c75d5946ee1c5b6ac2d61919e55e5c72847f50d977e797f2b254fe8319f6036b90e5309945dceabb94902b691df67a194579c02fbd69c72a42f90aad30e180c35ae2c23e4286304585d8c802f5ea06f2506f496154f0b7d408d9cfc22e6fd048b7e2a0d43408652ed5b00e0f430c70312a71371d89aea6eadd4ab3215aa7218ea98fec22eadeec989dccc4c9e44330201c216b284b0cf67ff45aee05164aefd638d37aef3091ab24957805ed41adbf1a5ada6f5ce63c5be4ee7f919bfbb15df485210ecf34a88ecfffa024f677c62e85cec228e78bc488b00cf3b63d2c9e891dca7f261edc320ad69da209b9971bd71e96dac7d619e1d3e2349d14e20e3723ae3e313c912f54a6d713a1aa81c74aee49de4b2f676e50a034e31eb761fcc6fa67a0c8b51c50fcdcd8e8afb599485040adbc60de87f78916e1c267ad6811af0e24166a44e83741f9d2cc6fa442e4eb9fde8aead7396751de9914993f6ea95ccb942ca16e69248ad13accd1ecf40f587a91a22db9a54f9291c4fc6252736453cc152aa07af255d10369b3de66659288d27225d498ef10fa919de6fbfbf9df92d2fa3cbbc3bbf655287f45adc177ae0b24fcd47a4d101d35550bb638b44f23d4f12a598ef817ff507f9d9ca1b9987d8ae999b2fb8c22f0e39135755ff904828b2d97d592ff3faf17ba01ba88ddd36e6eb7386e4d0e17cbf22575127bf5be089f54ba3cb7b333c095e27b741b67b9ba7cac57b298033866ad51e1a2dd38ac7cf231951cc33337e06cd1282965ebc71f3a3db659cf2978ee64b4294a829375f1c1ad82b1c239d831852b8f82f2b20a073164b23ffd33b08cac7fe672e4776c215c784dc42922ffa52e6491ef43350fa0fd9151995f80f89775ee98875530dfa7fcb81050c04758f7623185353a2d294944741017f6d2288c815fbc99da7fa98badb190824866eccf9e4b57e6ecd13f80490607644b48869e7d08b9e296ae3f3eeaeebe87d2c1e8585404d672747594441b887bb79fe875479bd777093a567841ca192241cc5042400cfd7885c0fb022d6f8cb19e38c768b5b4f667bb5629344b2b5ad59475be998ca6b6c6c1f153312e5a723fa1c7381bf6fdccc8fb59c0edf49c3b0144b89635337c6bd30cedd9f684887ec5c05f3c348e588e7654955e9535485adb48fef22c73cf674d9d416dabba8afb89a02389dd3a9e94b2a07a08a9620229ce025c36c65ebfa5efec80f23a42a5aed4ac8ce3b8d72b58b757933cd7fffdb36f5595eb61b0720a0a114c88d81f2bf544485d25a447e7772b92f8b0b334d5c63012d765e4f6a98f1ad4b2e0a1b083ad685759af7d909e796fbf5c8e6a5682af1f936c530b332e97994c93a06e7766c8aa36f3c41f9850cc8da223cd978f50ba73b879126e0f5b9c8e2532b7f023dbd0f6f6b79e3f22460cb384a85122c7f6f83ead35d187c55a341827890570c3fffb4591c06818fd2212594a8023a1a8d0f3e1bcfe0da530fd2cd9c28b2f8f64665b053cc9c45fba28049afdb0aad80455b1a878e73594fe90269dac41a59e1ea444dc4da260cbfe8b509dbb5a85c60303ef29106bb4b542f271066ed5fc98d01b0ec88099db0252d6327c871203cd91745933d7758ee28ef3f8a83dcb1e5a509b3e159fde0973dda8e70269a78a7320e17592f6a126c911e24cb6677ecbfbaeba0333c0e0fae44b7cecd5a3664eb7e18f65f3ed829cea8c82c4969debb09b8806f06080e35f62531b65c2509cbd41595e9206d082b762c0a8857d5d0531fce38cb8294fdf9c8ddb912622330d17a5a5d080358d99c3bbea29477f852f40ed3acc460958c37923ffc8652b5a4005c5710ef0d82d1db1ef82b2c8955c41a31043ccc2fcd1450045d8dc87c47875dfbc9369ebb0bb69a4d3421fccff309dcba16eb07bde17afe779e0a65a0ccb5dca2ffbfff6662a944a52d78fd70ec1aa11ab14ca06ba27bace327ecad3cbabdd323032e3cec6af5937f293eb869d1dcd971f8a7ec8f704dbbbf19c3016632728a0be4764b860969a200a2e6b87591d33eb751d2165ddd55f6761e7289b8ecfe918e091fc3c0e64097587b6a6638adeba964e29e35341ba9be787015131233367333fd42314e2bd964d52e6bbbd00de650f02df0ffbc0e3a3d5346340a18f8262f488ee4f2c34d25e1df2ed5af670586e8c23d3e8ceb001f3671f055175bca40d1310f7d4e9913ec36110fc53db29edf5a0852bebc50626a7145368e8f84bfa7f0bdd6abf3fe520a36d7357259940491b2ebd598a274ed663fa3d3b80613762c8cef35ae17c90cd1e6f5a1c4398421c5a30991ddd98c8a6dd88629d9e4a9b6b99723ba34bac7d9c0613c971c2aaa958463cee835c3c2de37a5e92c80f8f038868e550c255e6575eecba58c59a9593751b6f76a5c4d0462174e2468e7ef7ed2d0649a98fa8e6f892a9184ac99a29f0a0882ecea5f6650bd4f5c3110908da30ded8fc39f4689024e072c5949213bd954329b63136df669d49d397e1658838b73d1470d25c6d94f83de23f2b1327a4bd1384ac7525ff6d5dee2e27576c4b92a179b1d9871b44eb943f7affdbad98160d6209cee272266fab409c33d3401dbb5b6394708e195ba3dd08121e35e8a2c0fef73a522984edbc04744f2df888b37f31348cdd0aa9a36785c359e6c5dc10d9bc2702535aa07257ef72c2c4af8c98777b2ccfdf5ce60f9420ca2f5714a11cd3aa8a5f0d033e6968550418940af72e0d635d8df7f9d0e5e5371301abb20c5d7168307c1a5e166a8df84fb5f5f70a8b72b46ad1e874a51c4e652c3a3d01362b93e103d825e82e4967e9084fe17c65b91f03a2e4c13823fc1c37fbfe2ec60be1f0f5546aaa1a6a3d1578b705edca05785b3eab3b26f35d5519a217e17eadfce7a6999cc3498b7d5dc4c3da11da780a5a02bd1909fc11f2de6dcb91f0b0a8a5a1b5b6bd46f114faab5d266b3ee477a2e46a59a2283ce681888f0c06d0bb0bb3f8bf9dc9ab3e65c00e0fdfac000e7c8fea30e03b925394c348fea8bb673b0720ab409c106d2f79a0b4bf27e888c2cd699a8e084f7853d31690a9d3d63619896ee059d5929b83e952b06d2cac5acdb5c1263b02d7193d5797915ac571c5a6efa714c133a5d0e1c956934d99b54dd2d19b40a4d235979705fe10b04be5283fc8105f4d100b96e50593d9c6f258325c8dc83d3f6652b2a1869749e740bd59e44a25336d2f6dfc57f7ec885269dd2ef5b330713bc52e94e8e39336b5af540254bf306679151f75656d3bc35f8be9aa1b878cecfa3671ba8bf2f23f7f6c83deaad27e8a9ddc2bfd5e35f83f74116ae4e1fbc37a494f491df15ca194ad6a9b69cf681b09a8fb064c0bf3643b402384334d7dc5bc226d1c017673471b7997f81a67bba88460ccf275d73e254d0e9bcd6c199ad84582d03fca481e0328a6459cd9ca3284dedae020718f555999bd7279768ccc1e560fb32d423cab16c947651998a478279046799da329f89cacb929699be830d7bb58676d9ec41bf5407edb7adb1ce6fd96f5f91bab9b0396d9dfd1ee995bab5839b3310be7a30e4e3f840e0f0872bcc3cbe7e4a3778aa28af69dfa203321e08e528127e61375435c421d4a80626ead02f3e0370d16c0c1b1201001f7516f575973ae465ba4478bb71b2539a657c1a65a6cc3a08c2691a79a26ff9ea0afbbf4ecc8594ae08c1463f70921b3081ef9612ab330d6e7ac797be06e3a8f392dca2fcbe602751efde821171ba417d5bdb6db8472e1b922513989a15a6adcb29ef32805c1179e9e0e4712962624d092bee9de879cb89da3cc62aeab0e273dafc88ee058d203a80464b26884bfe8783883e6f47b77aa6b079bcc231042d0204506c94caf0e9dfa52fdc8e3959b0a04d87fd12244a2055f8c3600d28c512f8a9b5951d78b5d4233ecc9536df34e5b7bd7f1003391e1a4a9399a5702d07823d3b8462a07fdc8ab18888552214c57f61a91e2a31074201dde7460afe34440b6802107a8a4518bca90e2b50d20b1c7e5fcff8d2de23ac3f8ff680972cefa0cc18b695a2cc4a85645fe30cc669d342e1f8b10564e29ba8dd22cd664e6e0148bca95cae42151674f0c76ab35460d0a676907c1e703031280807b94c3588b363f9ded00e0a76af2db63fd1bd3f4552b9868ae9ba38b984ad995b979da78fdf79c21e95d424170638983b7047fc65e6f63cea3ea08a19cb46c37990cf9b0c6763d9a3b8b0e22013f459fc97b35f875b874ff8d0aa542ca60a3c8645b375a395cee5aaddf467008dc08b9a73d8233090c1def48c30d5431e9c9e2e77ceedc22c46acbe6ced397be70ce34ac7a316293a473ff93f5a6cce35f506436fed6fc497b85f6c4428887c0ec80a0ff5e639b3c129e330a7895ad72a8b22d8425cfe4713d7e7c74333e5f1344658820efd84c5fb70ddc8a5474808e50a0cb212355a0c79a9ddeb7479c66882948c2da46ab92493160aeba8566f89c96df995cdb796159d64ea5df9910df6a372529035ae2a35d06dbd4f902ec354fa68c0c213338163e04edfe3202e827ed76fc30e1d5dfa73bdbf152176e02febb219fe505c3b3d53147682eed8396fc61d2801b4e9bc4c0fad6bb2b45c6468482af0bc7d0f3fbc4c6707ac3ba06fd1853e9077de335ebcefd5ae68a30d11846757e9bf5f160ed1a273a93ad25c07bfa678913606e78587ca9b1a4f1c25b841e7614d335765845bf6d44176210b1c14e8a9803eeca88a949c8cc4e82d83baf37dd05410ecb25ba4b429767d0444be521bf2708bbf6ddf292400d9160da76517b0a55f523a692ae6502b480a348de3730806af09a4cbd580754d384cf7b8c53b1718bb275ca7ce6d6f587f67f99faaac4fca38f1dca48922590ab8822707f9ead8b35d21355dbb673696ce4a9a8d27bae16fcef511b3b0da1abe806db403116bc905a1f49bb1b30983a55e016e72b850ead0ccdb55cdc81da9b2de558a8ea582d27ed7769f8f4c4a659da8de8882af4c6b78bd5e492b6ecbd5a888a114f1353a3f9bbdeaa9828930ff188a23bf03978d2a4e2c5206606d6209d64a2032ee2545e6f5e220ad06ff6cf2cbaa41c55df55df49fa1298b1e751eacf57ba928ac6b1e6584f2340ea9793153a5ec64cfe9f1fd4610403353409d01b08f140e09746a0a52e08d436be391311f80274ea26092090cb99072be9437fcc28ee2fd3fe3089969b7e864e9f55d963d77dac755da856959fa4520cd8a220ec803a2c1b9c7b9bf990d2b6aefc562b8cd2db9c841b35465941cfbd5c6146774bd704249ef5a2bf1320b516368eeff2777aa8b3041cf9517b36783ff58881b33edb592954a0783c51dcfc7ddb4aab54adfd9da80c87a08de1741394a355a4c44f04bc4f376cc858d8d1dcf017a31f104ff60631ab0ab167822a5d98ef2f215fb7bf38677d0b66e4c977e79b2790c9595e2be1592f1c46171b2a92e3738a92aae1498740736f0c91eed86d193ca6aa93f01fed0b426d6ffde7190890ec42e086da7d25bc6f4fc1075a7f73f2d8a620b269586ddf9ff6696ecf7b31b1ef4ffd1eecdfc896aa5b660efa4c41af4cbcac03555b9f2ebe28dac45c4c0f39a0eb1810a286207819d4ca3a583cdcd0cce33be2249c9f6bfc17f1565fd157db9a9eabc89395d3a34b644e45660ebec64063bdb97075444b1176ff7428771f9556f4b43c169ea8fd7eb9e4be955ee7901d0a5386a75eb94d5f8e0d2d1e7b1ef06eb90136f2e66ce2a796a35354849a771172af74710725b8c85b32bf4413be33d3fdfebc280d4cc0abd4a4bdabd8a7959093bec3ad62ed7f45cc7e556d20402e43b829198b5671ba6446bde3b99660eaa2fa9cddc80ccc95fdde5b189f7d145faf288d7fd952eba472e4c93dce4ceb6b240b2c3ad377aa3d34b77d022164b53f1eec0f6f9368add7efd978e5c59e12f57f1bde641e70dfd658e972b9e1c3d6e6193ef72a08e50073c6259f285d4977403ce0b3a7d25b96c0c62a05e5d9eec266d739f14d561460dce83ae8a013984b531d433feac3563d1c5d722829ca783c748a124975033ea8ab93dd917a68752d20d8197766926c62e749375c56a0cef03cbf9702835b27c63fb98e3816c77537b9af4ee3dad65e96101e8c3b33c36aba68375b008be6cea54ead3a4e5732e7efcfb1485ef6cf3535a0cc179a945224726d3007c3a880d1e52c9c5e0970984dc32d488fff066e096d4312c5bf49cfa65722f1436e329b9e3bb4a9415bf6994af2e8081aa5df3cc8d4937cbde0e9a4c4ab8c9086d8ea8b6e33f0f912e7752a9ae5e9235a57897d0a9e13dd89aa0d56b1ba9c83652e539cf8daa0e2df02d42946fcbea42a4646838dba1de5d100af64f355c05bad2509ea0a1725d388b9d2af7470eddcc01685ac56e320484ccf70f2a404c0e9fa261825829e82dde52aa35597d3b7efa4ba72cd451534552d387ef52bc4875a349589cfba59394601ce6182faf4c815e6eb8cd33987045f28c0b45e97c395954cac17625068ad5958255d4ced9eb7a2a22c1df5828c3fba1ef95590ffadb89bb0d36286975665947f1de26410e9cc92825a8a3cc2cfbba195dd49359415efa68ad503a72a0c21af4e1fa522a45e0892000a7203e6ffc5155b5b19261fadbb0f5ca06271f5e1ff7f7324c30e53a3b26a8e3e9e73dcb284c1d1fd7e50628189c911d3765f72e47678297a695ecb9a6d5c15f6447db3b3469cfd3d9823fbbaa78d0ce718af8c096ea8683ad644533496315caeb0ae8060872219c57735807acc240de8f07d0975b4bba4df0c54fa48d2147d77485d381c66a161cd01e923d0e230416ed259a72fcd22e532ba06c3af4ee16f83b03d50d8c1212b4b3f1262e813a299698d03a766299605c8eb87005f2bef44aec12324df783850f93d28087114bc03d114fec7a94be0ab1e73822467de7d3f91a985aa59a5215aaca555d2fb3046dbc082747a99cd398deb119a13224d18d80a6bd5bd919bc40d4c3f98cb263f027272ce752eee347af8b3ca099a26ee9199fc0fe163abe8cc11fbf3d985db2f3fd1240ab2b815212f8a18c674bd894354ed04fe965c19a5b6bb46981322c1d18ad55620f6f9b10e4417b33485a60d2e9605a6ac4816ff6452f777ce35acb982df770329353093646bbd6818d2c402c95c0dba0e3ab807a9fe4ad73919f8ef8dbc26d4ed6c7a56f9c6af91858e3c2b1050cfc28b0e81a40d9bac6f88493778f6c97fde31b8804b9023b12189e21f9bcbf26ee7f19fa959bd39765fee36de1a98484b91745160d3ae4234eb69b20b4af8aea72fa9c852a67c5d339d68377e86c34431148147a8050afdb4546a4d6db0480234e550658216f5685c7390d4496584f26ed2d8acef3e43c32a13d1b16c330b0751500e109243d9b9f2fd56432fccbab10cf6e17e32ef27f5238f35144344cc9eac860f6e746273788d0e40892607a1d0e59e03ac0d731e3e5e7ba5879f60374ae7e42a5bf9236e7a64caf55d2dac49b372f069e42962e1d20d1d382742c418c0bbbe652f00c3d046ce62649504a24d50e3342520a052078c61132b1ef1cc6fd541ac7b7a17c77a82f274915bcdce824bbf1817ef1c62112d9e3f598e79a070413c869f7147fc5fff520644c5c09ddf8acfb25cec136ce936f18295f728d1d9855c19c42869a3d72d06eca298497588b0c6c99444c982b205f8f642cf699c3e5e3a01f48b0fddc0d5a3ebb08745a7c2c3993676c8ae402d4437f926cae6789b6072f0d8fad7778e6c4c01c222b257805bf27afd2b939aa595b77b39e3379db8c93180a2ff5f8413f5df96c97cc2d683c10162b8eb72ab179c1b1ddde2558c1195d207519813d06ed851746e75fbc5bb281560c32dfa871505c4ee411d8fd9be0ca14b06a92b2dad5895fb11caa701680d267a09320b50b1a107b771fd030dfc49281e8051a9181b008d9a1f61deeaff8a95a1146ccf6c3d366ecfb9fff58c5e10cc14bb4ae064b78ab466b901d9b58a134b92aa332a0336f886c2a2c6d2602bdecef8a71efd03f324fbc0f17591a5fd464f5f8045d303623f67bf10cae270ae3912f275480d02d3da5a1401a1cb40abee7047e39006370895d52c163be1de86914e20254ddbde8b9f60943ffb6ae5ac7c6a817ae88366df8dd82052d68ca80c95f778882a132bf1f5ff399406a46a439a607504127b9cd63af6e4fd2bb5a627f4d3713736f46390acb4e22de00f6d95af15701c4cc655a35bbb0bb7c50f75ec2d49d82b0509673972afdd610273894998fa63f230ac494bd0b4962b636213cb01d08d0a2132756d8bc7ab73121704bc9e00cf9bde08ef79deef431386f31e4af7ab9c900b9c92f77061755d87c85c3b0a65436a9c97a036e82bd68c5f3bea1d2a57bf8109bc81cc7442e4cd79a2504bcfc6055cb7ed2823caaf35d4572d007893405ff73b309cf4c629ecc7902e5e84950faeb76c8dc55e4e98ff81d7aa52b959847a175695f7984ec5a3b3007d7fb1a8cffb25ce649d8ebc9fedc94c102282f5c05c58d46de2e4276a4277ac472a0dd18fe3f5fb6824286a07d41058acbaddea1a7e73932584adedee382c6db376b063955ce05ca96001d460b302e27e4d50c67b6f893f0132cb9f7c6ed111ce94a1c28b8c0280faf84bba892e636383ac343dc461546e94ebd3740e808174a99879f08aec52fb1114b52817f07b7936702a6eed38628ae42bee712314ba194856a3634cc1fcde71108f92b636a8e1608767a940b699f0306b9d49e1c14f2115d13c3595c4903cdc499d6cde6cc12b0dd756a0ea680b167dc28827ca18d2d3441e6307952089e30b49b96ccb54b8cb2e34af44a1eba651c985ae14b73cedf57d031ef04132b770eea69af5fac59fa40d3909bab99f336a42f886305de110900a24d3ebcdd8d404fa80e3bec0f168b073a37ae2c69edf58382aa554e8b89686b392762099f0fcb551a8e3b1b8a6955ec3a4e8fb59eceebf3abf78e1375de2975bde604c1e2496fb4178dbc38da7f2c8fecf10d3fb012d203290ed6f35def5f5c4e3cae9612cf0f2e29e3bb5176312899cd89b626ede00855311f0453f3996a7e56236fb851bf9a16af70df098cd66609f5205233c514f47de1cee356755e23d5a2ccc1508a19b93eb92be0544bb6964a86471687b530656389a274a5e08a5657292d739f49afe859a8ba4655a04018f0adb6797f211067a96ca3fb5e242a27a195435b3b977491fc58bf17c74a0209c7aad209f105d53da952e0188d0dfdb72435cbd559bf83e478e2e131472c8083bb3dd46a9cefb7ef4e314e11e06103fda48c98b818f99fbe149076df14b76c3aec0424b5e5c2947ce2d2c3b56855ee1aeb5525ac0d84f888b36d0ed6c31b7f72274c9a22aa3c0eff44c74192df2513b697382bd1c39bce82f64138e7e9fa6ffbce196cde4ca170a8a65264ab0ff847cacf7494ddace5206db72c80f75b1ef13e48cdeba7d45d3f5ff3b05feacb0b87d642c6c16225ec88cdd17e3f952a28d6377c9e49dd97bcb357255a3a3ee31e24676cdd4c2eeb3fd8873f3d785a2f189d80b58230eab02ff08848a03050788dd3c727076dc32974415a5a77bec1afa4317af97e336c47d160ed70eded980e55ab535283111034bbf978297eed584cc9478e14890df339d5d0a76a4ea66a4e0b2c83c7078d528c88ecdfab3e8a1d4f7c0abd0d6eab0cbaa94a938ab3b1cbc31288d08308ae57d3e75cc78ae3554884247a6d724babc5175b9c424aac8e6d72098e8f0fa16cec191cc61644b82810c0b22c5029ce0e41a632eae85242f2ff3fd241e276eae9280c67e3a7fe0e6feb29c386d4c4f8b22e1b62955b20ff4230adbf4736e93667a4d891839bb1bcd0df723dab3003fdce75152753cd45ee8daccbd3910d29980bbc5d80229d257ef7ae593b3b8c26ee7a3bcf820ae122b9ec45e90ddf8e2ecd75942bbcde39a6b275103142a98cdc6f5f036827a3600ddf64ab0559116b338f437aaed32b457e4c9c275b32068f6478545bc192fb7c8e3f3cbdda092146bc5c53316fbf770d0cd116be0ed4bac677b76ce61042e9c1c96e5836061d5b125798d01ec984337532b155fc09a68cb186db31e280eabaed2022409336167251ce85cab3a31114d13948be9097eb234e3d2f24aadfa599dddd17914e12d271f1012138b7fe2df79b1ae28f6f73437eeb854e1ed114ae679072f5faa505eb73dbc65fa3cf8f48d5b05f3b3c760be251b04667011166dabe559418060dc189ec99aa961b2d25890b654a9a792334c5e4679d289a5f90b22e88c09933939d547b91b622afa13ced3ff48eb9be03f090894304659fa48d46ba3d16d71817dd3f8f4b038703a605579ef89cf30dd9e0b0b29267e5bd39af3f40ab5dc6bf79fa2219dd30b4678bfba7f531b9110d50f7efe1bf01a92db7f54cc839dcf3890384a66a6927c8898607c26ae8233d40e44cd9f6b2f37721114e1b8ce04d60cc696bb0fb1f4b3b87e8b2f7c1dfa3b6a31a06dd61abf3a957acf6541b063b20745197314de2c127f9aadae91b5f3823fea5421ca7099caeac63cbe82e51409d675fc74e87623148f497459024b448731e3ebbfeff504777674c6c9649d35f69478eda389c39b81fe2dba933f9bc615894ab74cfa50829f6d22368f36fbdaa0f8ca4137acc08f2c9d5d6eeec8c8e640941da00402dafdcb911e9a86442d58b1c339b7f0751fcd0ef1e062b9793fc45cfcd330bdda8a2ce94f87f58c6da3cc4b76ae54b6056a0731d021dc562d2346f02bd1b3f3fd959fc83030cd71129defd97ff5292d76cf8c419f3193b09c635d1fb609a6a965577348fe9ec19078d52b2ad6b8264472ab0b90577136f6d9ba211976ddc366266ab0753c50662ec63c51dab143089a8c679fa0db110c7d5462e5e86a94f04e6a0b2cec9b597cddedf73cfcf5098b3abfaf3ef5ad0573816c9aca8c4b7bb3cc1374d2869dc3ae24454fad79bb24f325ffc3f3977668d93f59ec1c532578317097982320a74c40e46574e80cb6d213e94ab72d31b78b3860f155c02483045022100b62065108cee72ee98530ab7132e6af049c986fe799541d408b0e9039ecba62102205560fde3098086e382822ed515fb52efb031192aac8a00955f3768a750e85250012102fcb2dc2f2c57dd2482c69a59d98d75f71f0f373713187eb8e979aafb94ed1c9300fd4610403326d79101d4b27b97fdac71560d97efa58bef40d0526dc06aa4789e2ed5301900d6b40c75d538f509fae97de2a5e7114e4eb0fb3aec91a7c3ec5b4616c545966ebe81b337d45256c81cc41a06b7cdc4585ce02d889c5a3ef5605dbaa261c21375781181dd7909d4a66354a6356f8c787126c20ec4ff32228646f287ccf29ee4ee5578ecdd223e6bf35150da0cd4c153db2174bae3e108d089eda087c16989839ae1c30c294223588b4b7326efb77306b4ee611b32ca988b80269a2af5d3ee81bd3a9e568d82c6edc6d286efa77f2d7c1a8781ff0ed588455b10a0b5e9f096852924da448f2d0f8a1a32d871955bfc6580de4e006dcd4637a641b30acc46390f179ced954dd43a47104800809d0a17a883180cedd8e3264e895e725c3ccb7a29e77398318513a050b48ea80f560e4ec15a102f5b68d841d7df0535439b572c24b90f8ca47cdc20fb7737375a8dfccd72e503ab64a608f083a6652a1471e60027e958798ec5de1c8fbe6dfcbf3abd27496802935c0a2368c7fd0233b29b37adc2e3b78581683df824793a09a32e3c8027bbda30d5eb16365649adaf252de0115ebd0fe272fd18842094e3688897508ac158955c430c27d48db7acee4b452d02e1735bf29132f4ea9bec993fcd6acd082a4580b4be0046d2080626508ee86084725dc608558d64901642122b6a4c4e22c0a57f4402020173b02d622e67d7383dc5b110150396f319015dc7e9de514ae457b432bdf69050a9fbb459cb2c0c619ffc93b9747b45951bd8a9295a6148fc32b0c211950271b8313ea31fe638d78946283bf26eb156a5de0e1821cc5ae7e5cef376fb5748748cf80f6bb23310bf11283807b871af5897a848f0eca5907cd0cc13fa9e0665d04370bb3196d253e4622219b2fbc316d55c25521bf92cbf635a75ab1f0b68b7b9fa016e631d591e373110b9f0bf3fe7e7464beb5f85d6e80875a14bddb1ddd3132a272de110c53e248f44fe8c7502ad6a36f20d6844446292319d87d6df49586470cf14fc87bf85871664403890230d72245c02b273438fcead99e005f154587fe87f6b80f7790fdc79a776a3f6db12b0b8fa3693df8ec2dfcad228496849a71e31a746ead8583b92a445220f246d5d56ec32cd3fd8a7e8227f3d8394740bf898976847f1e0c60efee1adbd9f01b5a72f6bf9e4b22b113479d8ab4827faac0926f1ab18cc78283a881823b038e692115a153be5d3133de6387d43b37d1c56da711ad7f54b21d72b6e02286568e2b34c4d98e0b3a0aaff256cd4d57a614cb69e44c26904ebeb8adc14e15692b1ae9bf66ef5d0190609cefe745d849c58de1618c226fd5de18a815e747e8a712f152c3f4dea45a5890d461ec0b7145290ea7654e338e7a4ae7e8a3192c9f59f5063ca737681047b5f283ca70a823fe9183ca79797027755d22ced5d0ef37eb487a0f647c29c2b9ecad39b15b3544a663f232323fcb0aee99d6e75868a61bfe2977209086642a0d29f1012eaef73688397a791cf9c0292faabd60d23918458dba93560549967d3a10e2e95836d923c8265a003450f2786efed172f5f1e89cf415d597f6a4a95e20e18341703038f233f20e4db4d365b0997799503c625a50bf1dae9f400ccffcb3d616fbbdd946687fd17d502d5365fd0f55297b520d2dc28f8a42b9b51f888d47df6e2aa0524de895ba0bd4fd580909e4df3f3c384f3390ec3918972f0a216411288efa079366bbdd36b800941887acc0550e83fd72bd6e69071e54deb0c3e7d3849fb236b031ea1bed081cced8fc9ff2ec36dc90455eb7d192b8756bf845d90eaa55eba83d518579e209491f7f913087594baa55fe5dda08d18f1c85b7c06f5ffceb3c3a9a5c24d9aed6e031e88b351ca8a0ea365e292f9b83c81c71a98ca501a1ea2f448b337345218c940517a6f0477cda1cdf0972d4fbcc0ec57fdde97ee5d66414e076e46bca5eeba411eeabe4228d531c4cab341125a6c89a78ea172ce35a7fbf51e4ba19da2a6d1facfa9a5d7725363c69e90077b653461ac2e432f5acaffd00e896a023f6dfb3ec07769c0e13b14e8e3836a74c24f6232dd9581dda86032f7742ce3e74cb0a7a05c742e049dd156d0116c8b9f9a164a7979f6544abcb21a9f0b746c95d78da6a66f2ac6b2a5068c8e8a954f995ab9d11b44fba35922dcede27d5f5d6099d81cf0b8ed746fb716f98b935caeded55d239a14882d7e9bc1138303ca25595dc4aceceb474170e46580bb493b62e39a16863e9cea7b12a65053a4fc28c5f9617db5d22d6de553d9c94f207d61f0817973e48ca94158cc03659d9dc05b9e27be3f1de257be1924e03dfd487713bc5df0c5e0c8737caedc983750deee877efe5c73d094ba746e0c4f551ea635037939f8676a24623ac47214eb13d899ea1a2a698c99e8042043d393fab04c234b52678fae9dcfbd13b203a6cc4113ab5496b7072ae7d5a002b6676ad07aa71030eb88c496145587466101ae1b3929fa798824693cce601749cc3e15ed561af31582c71917808e9031035f42d62b491b2ff80d4d7d0f2f0c1348c108793ec795b96d2ea0a2b141da224592f9c5d2a361d135dbfacfc4a04febea8b5e79157b91735db48eff19024f0191793b1669c8338c423b0b070b462c9daeb7eaca17778ad9219b90bd3c692735d362ada53ff2315e093cdfa102cef7ad0ca0fd95fb831b66aa8ceadd2ae5ff206f1dc5eb068f283436591f2e1107e2fdd2e55ca1892edb1746648820c2a5afbb1a672e7610bc10d7a26d818754792c5c10045dddab30a1aadedd7153333baecf3e57a7c0b9536f0223dceee913fff5d736a4b8c51e8b0518ad27ed3e80140736a8ef98a68d67e86b88863b78c516818911676bedd054578f470de6a0e707f9f39687dbc18c1cb40e77d322ce7458cdd332423805f00c01e455e14c0ba24186107a8bd02f85445fc99f66af34c9cde3a9c7d691c66f75effd0ca3180caf004b0c72006939ee29b7f56176c8fac7d6dbfac190cbb07c04aca2d78f421f0cadba366d0fe9b1710867d4418a1bcd6639b592e36665650a9eab63917a6022329e605a33aeab5e6ee733f8922694afc13ab276ac6373b4dc9f1f35062d284d2500f71eee687208b82575e9ecf5a78b68afea72070f8a14ee0cfc2a76a437048bc0564f1aef98a3f55fdd46e4b1bf7b62d0447cdb15fb63838163576d63e966dcd88ed59ff14dacc1826ff3d225d174ba3899f476fc6dbd57efd8d7c1505f36f84dc0802461890e41c568dfbf2e670c2501b94b91360dba59e9c897b80f3dcb4ca1588c305f5f3555018caf6d4bb2f489ac932aa395b1a6c8288c2fdba766cec09a5ec3a4f3f858505b21d7ffeb537b0452731a1b689d4fbf06043a13c24db4d8be4f26d89cd59a2c721bdfe12412fa9a29f873ba2167d759cfb62e702dfd063afabb34014bde36931c2a6fff7eb3820cb05e38dca43824bb60a8e4b72d44b1cef6212002fb93cdfb613832b4b4b8db5a02ea880190215d04ed6feebbf083cfd27d520568139cbef55e89b0f375cd384c7450f63e8f29ac3fb536eb0ca3d201c2f93a330bfc91b9839f3147b8a9883c5d62a8c07965e41c9a019f55eac99aaebd1ebb4e3e8f10e6dffdef413c1c7a2b5c5dc219279966b9e6ca360f21aa9962883a59ea8944cc60dda191bc04c6d4294330a8e1845af939ce3153c284a547c72d9d551d729939d715f24a785e8bfb03e99e1bdf60e6241724c5d98b91cd0c409859121a7e04f60724c1f1bf7ddf06e0a4dd5b4f39c90e6a6f468cdf75b8549a731b1c237248f0aa71013ad4c15c5c53cc111a5cbc6d5cdb5e145c21631872145dd66eaf2f1b70c2481a975cd55376bf8b71f60415a56c825b609306f017aed5095acc0d8c509f0538277ecb5c27e7584baa05d21c8561a44039e6d5a3692834e693e809a7093c29d15ecb98fa46e0b76e9b57336cc5834c11cb104cacb7f47322e5c05e324242ffdfdff0c3adad261804340868874c55c119aeae1269b5c5d9ea3d74376b41c7a5b4e3a10d61f902cc420a58e11b316532024a1376da5a69b4cd4055259492c23f15f86372e35b004cb13ad0afd2f857e4403839a9d1aae7a17ddf74a71e5202856b4f688d8d97c994935c09076a0801db62f07311a8459d7d9cd3006aa799425df3bd482cd3f548cdc2a5837a923bda898fbb780c8dfb6d137ac0319e50039779d033961dd6e5cc9ca5f7757946b93b3b983ccfee4b158e8690443f0e9d99053ff5a39b0fbe4696316c70772d9912ffc3b32a36a9c1a9f86f67bf36fdc2da3fcb19876d38f251b61400fbe28aa3a81b4dd5422846a399ec53e64484131d073b783eb35c1e5afbc10e62ee0b5e079fe4eed73ea1d8107c6d2246c7cf0c71f057d57a47408bce0c4263701575edc94f2c3e5786e930911baa616d6d303c1c9ac226bf1bda056a28a96ba3861bf0ac71c5ebc4f32600f47848254e9a0dad5292c6da88a598b7b438f8df8f751317d11107639fbdabeebf5846832ef5c8bf7aa6a005491d07cef9f16458b6a9c5d5b91dc517e50613ee42e7f8947cd4fff421112f52c46c71cdae6dc687b9028a5654fad4238e3c88401908fec4fccc4a94cf41ccde9544412c695ba10d8bc83f36d139274723753e8c282d99a820b8375b1cef8912e347998fc3ad0935c82e6ab9a7de27afdd04139b816bee08d5d8239b6de200095228e9255c43ad4a0356639d43a7e6fe269c95c239d42c1a0c62c74419369fd9fbbf513c98bf4256f5a3f30a9f3909f265b01e2e16a4440814f4ff9f91f329b675de32d3c010930772edf855ad16916e0cbf69c6f704b3f8870841892722ae3a80385aab77ecfa416d30c855a4b1bbac4ad9c31f88a371c517205c0b09d49d01e5b8d1db28ee3b220a622a9602384252e1dcabbf2ef18886c348f3c108f78efb7b76a346a2678b557cc28ac534da4ded86bc84bc8be4210beb96de24b6a1b4c65b3564810a7b8859433c423ec723305f68ab79fb2f532c3b82f7da9e0f763585da7d457ec9ec3cf19262be74a6c008be5f975b50369468acfb48a85723284d658dcbb9ceebf1b95b3b29d559b155b6e5a120e97baf64baada6198dad173eecce0329e9d084b19be847b03ee2c9fdbda82f0b0682e779a2a84f6dd5a76934a31b3e3550807eb9204b85aa9e891f51262b6c683ed1c70e92c42611b421e14092eede4ce7cea3a41361eb57253cc92fb55d448f0f069d555eab7471ba13da4d9dcc0552e6d7e002fdae588737fca56e513008955a9002079487e67b2265109bc4984b886c10c89b00818c5ee1c2bb26cb10a40c846d5af8c3b5d0b86c0c42e5dfc10c3b13169efc0dc107669a173820aeaabd82bb2f316886ecf4895fffd3ce25a050f8f7f1c8471799b5991542411ab4edd27deb597edd2513460d9c012217504d7b504d4f56a65026435a92a7e2a8da1026271f33f2b9118bdee013f63b5fa4aefb153cd70a32188ce40e829bf9b56d2267d102ac39ad94a8364b00ceafe82a5e6c73ca7eafe9b6f813a20213568673101e35799cee642b6d188a4ed98784d17c8aa875332476c6d8a54aa84f102b9d2245ad5bde2cf151dd80773dff824894583928f8e3e22830107799712750bac674b386ed29c73a5f929abdd7d486020b7de4181251bd8774451026b71bc1950c28e3894ad184072928ef5f43566da38d5274ca41741304600bb7324aad71d5b3f4d7b0637a43c9dfee8262a5102a72fe24f383244c2e9d46e1808a63fdeedb71ffea621d523d79c8e29d6984483fc07505c796be0eb6d147b854c88d7711348eac172b5e005e8dbb84a8712729fba4d1c246de87c8a66d70ab7c562f1abe0276989f4570e6613dfd737cde998e30fd461040332bcfe301387752dc1927727da764130bb4ded1a02ca60999401806fa27e42c93aee2d2f26cc0101c1c42690d371d199f97680e16f69783f5f0e4daf87879f40eae1b90f73d35e31e80a16e8a5b238030506a22ceb46e370dbbed47d151aebae2973e0693632a64d490941fa8368bebf0a21445366445aac01fee1be4a231e2e66ebd1395a47560f44e045cc934ff4b1074542ae5ef485f2e759f2e42d7440a4911efeee239424dd2e3f7c7c87f896b85d91fb792a200bd8125644b48dda7823e23c3c122312eacacdb26cc9dd1c3b9c82694f32770d1fb4c5c265dbc84c37936874e4394b8eeca431566f0e9a4c4541ca9e2c65b35e98efe8e16c22ed76179203d61b1d728f37802d2a7d471694de826c8407319e691cad2fff37ba709dc14eb619d6acc7232c463602ddc426c708753a42dc61f65b05c8d362fba373c3885ca3e53f81c5028f1bb727683b9c8e939e661e44f939f807208fb928e0df805cc02826db4cfdc41c56001cace0f65fb25aa3fb738b04dcfed86f14ad0914993fdbc4ed2e9fb7d1b34f7854375d9c776ba7f68c436a306fe2e7fe5f59cac238bb64e9e2ab76cac0795c66c0c603a3c2b2ba1e37ff896a4902196cffa5cc5ee540dd52d8c8d3bd9f09c5bc6d5e4601cad29edde7727a95fabe34e423ef7956f39410155782d308e204c1009b998674ba80fead997e8a4c8b8f58d04e09ad9476f4b04a07607dc4a8323643d35967f6a211c3a17a7f2d42e83b35259dbefecd36cfef687dcfcaf0087012937b44598598be87fb09505b025e4fb3ec6a9485019fc5fb649cae4e8d91a83a54e9571848e32fbc467a08667744557e49af0b25e2b4ee4c5c436f46dd079989111580b0472d3303f13930e2b16d1e138e9d9686257c9d459e72c999cc036566b9a551d966c120e0a6923507e0f625e877113cbfe70b04c320d2f2c8f770010e30a2f1b8bc58d314a6923adb95d48f3f760244692f4f1587805121af8b04d3ac0bbde81c8af6af31ba361753a182593ed09a662b62b86013c6b58788630cb82bf7f21ddef3f9549f5804a5def31ead5ff6244f6449a48938d893946483939554f31e990794de764392c37d70d457cd0d29e5a83312d26e05be76d10e5c17ed2b8199575fba944484fe5aa9a113ff795789fd1b2261da6fb8a1368afcd21c1997f584c7f3903993348af32677079ece005cc97e0c2b82d6248264696d3ac228ec812f0b3451976dc6b5e7373483d24b2838c64ead53bf78bf70ac83275513bf3c76cb31eeae103d126b4121c886868a71888354ff727f876e1e361ae3b6ad5ea4504b951ca6742bdd92e49ae5cec71718335eb33425343aaf8c0757d6be3ed89ac25f0c5c4fdf6c6c2679eb964fa2cbc10f8232beefb22b598a2f38cff753e6146e1ba2bdcd9406061fc1008463575b4ece7665e792b3ecf090e13399103c348bb432d8ddc8053805f49ebdb896c2c2efc1ed0aca1be83e3da7fc2b69da31877af708ba3a7976cbaf23b2fbacedb149da0168958c3614fcb4f3dbc427ba503b0b97f8cb6756e7c0f2c4c4ead3234422738fb10edab44ef961a16e6b94b9031367ba4c71caee0587bad262dcdbb3b56e5da444f5b7f08bfb0578f2d2bffee21362b590829937ca75626ebc855ec400be963c2ddbe585658309f679226a3439aad2f13ed554db5895fd1886bbe82ce3ee1d7c952b304c353e97f44ff20f6735807078615f093af9447026bc6d0b81918a313cbe48a62e9f7db5973c0332802d6f019ccbdf15690a801139cc590798c5b4470da59a3798147ccb3143c0c97fcd02a7190c525ed9288356f1afa4fc61729654c72ebe2f75d456ddfed5dc6b599266eaa1f5358554a7c7790515c9097713446760bf5d85d30cd1a6d7ef6ab3c0825f9a6b6173244b2e9c450b955793a0ec30958a8f85ed49219c5cf417ecf1fd7406d4f494ee7deefe1fcee99368d995b80b59549a077cb0f45b304762d24d1fa5d62666646f94df25b6efb4fa21a6ef60482eb54643a8f6f4a140dc83f1e0e4e34ed9854b3454609e8b452c0189547d87652060ee87c2c15cf7b8fc6a3feeddf7cc4877b5f40773f24f9010a66ae89fca78f3be7386d1840bc9168ff859b6d90e8f6f87603c1f703a7f519093c0c9aa65c9b68407a19fb3bf27dc22caae898318ef0c1df6534f47aaabd08348e0cd77c00c4235b66d587e16d53e999a1a596db26359e1825760040b2fe97a94a88d8a6549dada8942be6ce4899795ad02ff597ded7df11f0b5468b9d8d95394c1320562755e46a9a31e885885ea9c482ffd9328b6f37681ad739fa0613eb567e435b05563a23609a2c872bf4f0b8458a9cd41a4f8758d04762e1977ede553aa1e533338e19573c03fb5c789f7b0c57010c8979c2d8f754b00ac96d4b0be00397840899ff51b5bd53ff9e8bc9671ccf83ab5d2295d621db4c58b42b91bb6baf0a583467f4103dbec99799439b8b0e438abee46a66efecab7d2ce8f9ad3ee429ce8bcab13dd7f4b30842cdac437c94671e9001a84f588c062cdf1e2993b9204c4cacd1e18f24e5b6498381a0e9c399c30e07fbfc227109d740af02cbd7e35fe9ea4b6978e9d8f007b5e544cb8400ba01cf2ddfba52645618fa3449c40dacec63c1936aa42047fda64b7d590a89589a6ce3f95e3b83ef1d9af71648229d0b8477312c2d03b05b836d627e9699997d6c4cc5e007fe91b353b8c37d2b562586527762dbdf66fda0b8c33061a7386f745404758d09d6ceccb55487fde5c08c2862466454f64753b2d5376e94eb6bc4dde7367eff014605c1c48461e8e4fec4e252aca459bf3957f00ea0be2a8da00c28e0e13c9a5229e3e679e3794c33a479ade509a92cc4b234465cdf59584abafa8a98d49226ad5cc5d1a365a3fce55760c42207c00085a035f99d23879e3ac65a739e85cfe1e9895d9c1fbf4f0252e31a99a7c3891c3225b9831a9be93740becaa6207bd33b2dc14734bf33a59b16864fc6cdaa0e60577865874b19cd7792c662e1d44522217a5a7d5a62fd4955da7055162004ab51370fdb18674df02ce6ccb59ff7306a86d7d9904de8e789a588a9f81fe04cf9d3379d1cfcd885bd017b1596c7dd780c10280376393258e14a871b91ef64907afa8fca922ab5055a4226920aa4976b38a0db1ee7a9720b243f74f8cae5df2798b0b7fc81a05d611718542a2bf08cd464daedf791854c53db09317219ab9db1445ed1c98bcbd3f73fa495cb6a1f2ba77ecf89db6bcf8f5b3cc82c3160cd53ab5abf9b2be2139db0e12198f1893aef9e5443d0c1a95fa51de80d53265d9cce07a631488552d340c294f338348f642767f16371846754c8a97e474c85053798a75e397d5e87b992605b327c24338efa07b2240132874a7776c83f17fe03293a48163be5a6942e9652ecaa0357fb8e376b1888820b440d304f3de0de374023bbfd5f77f8e9ebc9ba4b8a2553b51d31d83b368badc31cf9b3180ddf67cfa25b2d20966c00a1092b8c0df02def0b533ed346f35bac60bc831d5a84395c58e282e7e0986ffd4d91debae2a5d80f5fefcc3c15060880ab6c3cb5ce963c94a435ecff324088be28041d4ee0784acd53a7684d9e5028faf7d6d59339c2137c71eb69d59fe76b07366c7fba7930834cda69b16dc2835e67590c934002743786d24bf4d10037b0a5b2f35bfc618b1074f17fcaf39a59951823fa09e430faf64d7d59827514addda00fa27726667b7e341ec69ef00e27cf3ffdd7739a067fb03c15d4116e657c86bf9d1cb98bdc830e1c389633f529312f7443da9f0c9084c68b398c042aaa2b7aa2d4cd49ea037ca88abb1c9e71c8347a7a61ad2607b645faca17a4300b89334879759f85d5eda59bb6f7574f293f2226dcd4dca42ed23427a19f6c99c105b997771ea133cc3a3d443062934caafa66480f2d22d2fecf9f1ce0135cb361f628e8403494932f1b1057de8cf2cf01ceccd83585fad7b02cf693a38c0a44680b407ab5994dabc092a1d586c80b6cb2d9ffe0d1a89a66502d8a6216eb008ab107d76c645a6cd5ba118766cd1e1d9b49c48db5b4bf9fea9108584e0fc7ff9e365a8ba2a7e2506692ead02143b0bb57d12f6dbc0e4de4580821d0040195ba6e0764772a53ae5d3184f91479d941d84fca2d9cfbed386ca721d3ea7a1e7f6dd5fd2d20579184435aa6062c6d31cefd5ecb9c5778752005bb308f50f42f1f0272a3d9ddec27adaa43a8334303ce4887847f0b46f4d93a4bf13b1a8ed3f0ed739dc3d335c09bc9e87ddbf055b972526bba25e9f58fe7c96c6184e23b360e6c0244e80c2f6673800a7d8f3c64153689083a5b1aee390cd65e31536f7f358c9801c336390071ecbae10cd2fff7e72f28d92bb173e08625de65c3392edac7d54a8a8b402fb7463306d7cdd18a582ed676c49e3a0badd7f8ce752f8c9b83288b5c54e4f223ceef301b3ce037097ea76a2e098feb63b6fdd16a8239f104fb7495196c36bc15a3d0852013cd766d3a6fc90fb12218a466e44b859cbe6b5231716bc47810c9b98bce5f5bfd4d7937aa16d22555374fe425d67be7eaf3505469992ee5fcd59640b3bfe5bed6208fbb4771be43d25489c59846f1deff7e0a560c71735874a406e9ce56d197617c04552300894bb12b516a1ed994323b06708789730c540f3b4672747ba20153772764408198a1531c032f6f60e3ad5845e459b58b1bfed30f241350c22dd604d63bf97c117b91d7d044b6cace4d4c36894482b002302aad8a288562b8dace2d39a7a56f37139ef745b9998c47808d85c1fe11ca378fd51e98606d092b06a7f6862af00f85b2ca5d06030e68a0bcc444b1d831b43ccf39644b92c9b9b4860dc48de99a51209c7edcd1f02be1911871e4085c5dbc2792f744ed2b9b96b99650a5538cabe37b4d7da0f02d7c9857f706623b3362b8ce04f1c361dba038e9e528d230f2ae9cf5741992fbc0aa65fad5cf89e71a274d697a5947ef1d85bf46e17baf4336e9e47c911d9d75e5e83f4d992bb6d0cd1ef75de2278c129f252335d9846f7b93b2c92e4786ecd94ab252673cf04091cd5d85a4af37e21c6ce85287adc9d64595f9dd0cd9a286ca5f179c7ed891416a5d120d8d954b215ce5bf68e634c5ecce7c9414d87eb38a9781b5086feea67205a6725f3798895bf56883bc3ae29efb86cd9d73d6cc583c6213f9177956b674ea038598d49c35bb623f6ee82c8fe99b18a5cf6688edf309db2aa2efa33720ef73c7ca2e5e2f4d322e789d65c3b29b3c9190b438b212669f5cc4dba17e09f13a07feec5c23806eecf41a0f76698d217a86eebabf3b6f962f2983afbf4a798389578377c4260a516d81252ce9f361096914347b21724f3bd5b2d864499cae60d666a596b97c85c3629eeea0e742861e1128f3a7bbea4dab7ca1dc4525d73cb54b45d8fc33b078d848004804878c520c9ceb5d4d03a2e3070d099e0779065705ac3775b5a81d1cff9af0959e3c48760af9d61657573683b6fe6053729a94a6eef5cc6a900d70df69fead4dd645e312b34e967353ff311b9bdc883ecc721e6f05be4c0ad018e1e7c479370bba51ee8c2479a006f3cda12786db86f3102819d86ae1a0dcbb99dca5d56f75d9a106258754ac0b47c4c961f2a8bb1467eb3d83d8f1288cae404b4bb2d4fc46b584e2bdc7c1430537b752715468c0f175fe207f9d5fbba60063934549f10a5a5c471d3eee366b416721aaf2b0ebcdb1f7fe6c0418b9432beec5860425b416dcf127e7946914391c1a4b9a975ed309ce4eaedff5f0b924b27642be36f63f6b06460698fcdb4a47c14f941007e705af2b70a53c4c1d590d63276f5c403e3906600875cfc83ff314c2c9146e3e5968e1318ede58594c02473044022001df7e156402ed9cf3a69f9f32edfcf73f1afc8f5bca15b7a10ae6ff16a5e56202202151f124a981a26d50a41e433d14c1a937078b00a6b1aaf1bfc00ff29941173301210205eca89b685d22c6cd1e2d358c8b4af096ce11882e7af767ebf9fb4eda90f9830083070070ea235e0ce06f66735ff4822c352cd38385ffd959ec5d1c9bbd9a1fa6fe6dc714b83d40065a0b8d89e92d3dafc5362d809e9194f3c28005d6416f71cd79eb266f9d38a0933a5a87360aec0b176ea08455bdefa1ad84d9e90954acf1956214ab9ad6e8e82887781a8491ed9ca1814e91ec6d0561b0c1b4ca0f8ef29b357034f6fbfd4e10603300000000000000011b466b00ca689ca7718e6ae3ed483a150b515a21b6d87849a52bf018337714ff0e20b78a1b6006aec9427c84c7fe987e590e451047008be88bcc73f8e695f0180dace84d5cb30cfc92a244029ff360ee63c57f7d2ebff9e939b310654fe440cfd58ae39907a986eacc67cf3b07d3003acecb19f566dcb1319f448d651704f3f841911ccbc9531621b67270cbe3d6faf427f9f3ba7ba799b21b2b7b5f542a1c811766f070378167979207a41ec9799152e2430d03c51d117d6d60ce3d07e9105faf85c2a06b3bac8603262f1fd6aa84da40a0c7e440b3066528b62accfbfb5c78be8f33d2d12d576273ca2be9d128490cadcc7830af90a6df41c79c4a26514d4f7c1e700e47397ed3dd7bf38cb9ad74fbd0e0ac7e0902d155333f0c25e62d05abd19edc154014ad2a365e9dbe5fa4774110752a00ea8dbed57e2632f353cf6ceb4f06736c77512f6040cfabcb0c38f905c7f38596c569834532a3356de8fbc73127f280f7f949d41c4494d3df5fefd9a9ea1be70fc66a6a126dc9e38e03b0c6f4777ea5f16e91f0f4243b041312d5d1c23a1da600b4057441f26cd7bc82940d7f3b83966515e1f2271be4f475d4a091e5f3498084f97f63631fe99b77e50dfc422b999b50744eebb12e83168b3d9d8cc87eb57e834d0297fac0cd5be9112aa85ec35448db7996c53a592fbbb459d7f87e786ecaba14125a0e87b873082118c1f878dcc7f4e04ad3e8f573cf44cff2968ac4cd87843edc7af787c860f4f2cd6b2cb59649ff4ba525df437d99cbd938dee7acf918b430f9b51fe65f1fb5040e1e7459150a9ef0d2f8275dcc583a0a792c15ec3c4382c73ae8bc62d272bf3f130dca6bd35d5b00aa8dd6c6c3936b0cfc6d833e759fd2a8ec635768273cd24e67816a4c29b8a281c91b27aa848d521f65601d6a77445806acc2be115d6985a398e917bab0f7c59f667b603a67f2455aa369dc9ac4cd7bf77ce2e871f8d5d20d90f7f3de0342229b78c31dfabd8a44246ab8f629f45387dd44f8e44aafbda98257552193d7e8cd49657bed1e245cc73b41430894ff4a778d324c3c506f08e697b5a671be0f26e3dc57a070bc7c2655826387a5e98ff43385678437a916984416cd5a036255301827096b6059551a0806fcd30d666105ae7201271ab79eb6907ded5da8a5f121e1ba49c0cefb45626b68b489756bf8267c08391ee2ed49a43690d4dc268ee9139ab9c6baa497e764b830d4bd0f2d9315cdfe859a90e9d009f34ac02e613371ccca08619adc5012c819675485192962d5ea191155f3875eacc18dd28828556ba80b45d1c71b0ff3076e6169ffbd86a4e728cf4e44fee730d1566dcd0c75e3fbd058a4adf628b522609d3718cfb470739273f4fd9824369e5d60ee501367673399a7c0664b7dfddafdfd68f7323716cd4fc4ceca642a91135076fe29dd52e7a009797f57716dc3102861eb131512d3ff6cd7b890916a3e39d69560c2b3ef596006a51b221b4e572d862b1fea7d71d5c19d6ca3df90a027cbaeb18f61ec7f13c63d00a078bf9742d94c9e4ed48b911260cfda4fb0222e3c6faf4bf95db00a34ded9af96e14f35d1038083599e2bd4ff1f7af4d6e3e1c27ada498f9df619009b4bd66164baf52010407fcc449c33f844fd4d55589bf0cba0cfd5c39a0683b137e4e20bbc4fb7e5595706163faf23750041e7ad105b10f4da2ecad7613e2f9100d2e862c2cce91f2117e8281bf7dee25500aa129e409d32d1a1ac7e871d149170821a65be6850d6d8662427e6fadfe845599af18fd1f74bae3019011e498ec4c748b4ef201f58bd73feeef36da9817f1ee8aeac7a01147f9649fbcebc2ed8ad5c0d707e4cfd2546b21a242e98f975b14f07f54c17ec38b61e6e8b9d2c16c5f7e27f5c53f7b53f4711bddde6e796833b0aaa81aa2839c196035a809e9f9a23b02e5f231f9454350321bb962d5d93bcf0a458e04c1f2602ac34425bd9a22044c331aced1eea94ef2115b3af652b3cfb36f3ce657b970f7202f5f77c3e03bc6512f49ea60c06723bcaa1ea97a9011016f188b0cf89bf1dc8a2b5606ae3a1a44400412d8c9024131f39985749a1dfa41681fc4402829e8f79eb075c6aed5da3156c492235820ae71692c4da92114cc7dfb15c8af7277f5a41f9e4f54389bd1dcefb9d6651556986d990243d69fd766d2d123cb941375e33e2c91221aa750928c72f468af8b16f10f1b197ea093a8572b378359451d975bd3f749bc26e41680f1b628203a40afe7065372562556d1793cd31034e5eed7b2822ff89cd7212ca21947e4d233b155f191b6faec87aa8a2be5d36372e8824cfacd4e10179cad0de53bb0e4de362abcb5f6d64f387bced6ed923522a9d56d1fb511708041dda3ce0040e7c0c83eb009ac1c6d5efecf9bdbf9b30576582addd7332e72ab4e9ea27af10d0c09cb4e20b917f85492d1c17874e651ae0e18f2ac2b80ad31717d972a9e11b99d430f2099343a1de5f0f963986962f5971fcbab3d7bf1f5adb3fbe1152575da6c004095ad45ad5579c6cf8b0d88cce7b97b3ea199e012bc8973e0abf2572a3b429e55b8e702b564eff88a63b5d7a9aac577ec1c00e367e498a4567b4773f26e089b9fb4c6bb1799c2592b882f58b681004076745a40e06268c93be2908d737cb675dc03b2bd5780d2ed7848a803e18b0b2c23ac81a5e9381b19ef51105d5ec89a434dafddbaab878901b91dd2adfa0127c51483146ee3d9a4d750d6c4b44022d12c54c708fa0fe0ea0d8012df1a6f2f0961e7b71c03dccc0bdc99da43441ad6b7e861947ab5116f3ccc06e2b112b3d49a9fc5d0be093ed587c198b5ee50084e0acdde16ef3471acebc2c8f678479c0eb134b3fbe37c4662b273892a3f52fbb85418991299ff454ec9fbd4200b855fe21ecd95abc06d2a4acc9cfb8f6d47a285da2a6996916fa43a6615439c78daa7d2889d12667cabc2fc9771f3ee6b7501fb4f36963e41588e20b3fa0e6757e7a30777a7f32471bb5ede9ba81cb7377abfed3e048dcd3355f6243b4032a4491bf0e9121dccf9e0d3919119bdbe6d96d5fbb7a1711788edc2ff6f91fe7b0a6e15ee9d9f9044f43640eeb4828b3c08c19a416919c758d39148837d884fdf56e89d190d6748e385aceeaffaf3a9b1fcb66ea45628c20d74b392d428ae1bda2583a0f3e0295dae10e543dcc51dace3116908633479f58303e6a5a5300d68dfbb04cd96dddc7b0af131a30b662861a193b87fb5053cb62af6e334bf1f81cae514ec3de9708be114fd74dd49a6db3776f24c0d03cca5b1ec33056ba6ef33dcd6fe295ef24397511a42164fc35a28fa732872a57e25e27fd4f9f8d7a5f6c32ddd0c7253cfddd5c55e3e724c2b8d34d06da873d2fadc015bfec891c4a67ba9cb52aa8a10fbecc07f8b8b714a157b1efa7943c943f293a34504cc83fb1d77ec89d2e6f914c6fbe7552fcc81a8358a987cbb76bf4a9fd1693fcb88f3694580921971094aa15a7bfad8c39116967e506599108f251de6691aacd342144b177cec05afab5a94833988a4b9872210eeb58780cc432c0359212d72d1b22dfe54e95ef76939106f1cacfeffbc987e80be27e9c9d8867910ea36489ba78531c63e3eb3f97fa51dbb681c49dc233dcffc743457e4aaf2614612b7cadb2421a5dea248514eaff656aa68dbdbc9af1f2747fa10763a1704b8ca8c794e96704c02d4d2e3fc96b82f1efdcca967561539689fae61201aaac4d998b5ec97bf4a1e2ddf5fb9c0549817362ec9da68391a27f018ec3f95258944f865cb2632aa9f70ece9544126910161468a0e5a2383c6249db392b0135268bfc67df8f10e376d6f6d6e30297035d748c256a869a522330aaa4834fa718e5135b2798170630c15ecdac550eb8e51c00a15941109ca45270796618bbc61202afbd11ce7ac34d258b40b9588a5326db635557fd86789585968e52cba96ecd4dba72b568095b8500ea01387ca0990c2f143612bbd833e92bc28b0aa3d0b9ece35f5e4a0ea282c56cfb43d639513bbcc38584a3003379f5dadcb9d6e2b2c38bbb9c799146d445f064ac7a20c97cb5932aef1cc3ee4d4df7e4ab3224c78a9ea036f6c67b6131d0877fffbf52910365d17404e89f5153ab318ba5c08aeb39df22704a053ea6c35dc5181c96137fd5a98164ca001317e9d20829f9d65d069277a8974107cd7abb5dd8f83770f04c6d57ffa62e802ff9ef30dd39eafa5d74098c8ca56b0140e364a1f8e45dcf299bad6103e78a0d7e24ae706e6158542fd22e2cc6a0a3d4f014dea44956a34463a75082a2cebf05a86f9215fd8351c7cb0cc5a354b5b971aeeb5e4ee08776faf858a617d3a44826562446676fa0cc342376ba971b6e0894a19884e0b955d982482d1a883b4a55658924a8f2824afbc1791c961a31c690824e2a260ee1b3bb8589bafe7827a99a2a3cabe0a339471375dca48e7c390c1655df811a9d37b990361f9510c6b24c0993c1fd9477b082d237cbe76a6ab8f83522f1fb2e0888c0a2df37b515a52b8a2bc3a3674e6c1a587ce16cb8e631de3927174e23b0c3eb234a6dd5ed4dbe70809d470b22352862a9346329dbf42afb1612a8b1e663c5b22a7f5cc4ea8ea1772b7a3cc8ce5a75572da4df6b9430f47aff3a48f8c226b6b618fac01a26b04f1c7899752b154296c89a46d6ed20253562b46f25aa726a4dd088b7dc05eeb1011c0db80eb14bd2379bbc4547169b1c4e789a06eaee49011af7569e2ad031c5117d2dda85da9a559f041506d15236d76f65ab6d2b9d58667b888bf4b716be4d71a845d78bd516b056bc5a8dc6b937bd57f942fdbdcf1084471b55a31a3fc614f3380de5cd70df6e6bc609242e7b76286934607541dd86972480d886ad14ce02e560c68de1d3ddea222f28992964b8dea8eabadd4e90ba0ef61f577fdbcc9bf2d91843745c97c165e8941c825112054494f80ead79d97a01e0c222076ecf376712f6021235604ab2f4d9ef21af34994fe633b2e5c59f98f13cdf820738deb584af852b75f4dec73e0fadc696d357af257548dd2f5d1b9321f53cee0e6d8d2cef5440c4187aef8305681c77c56692b3c6cf464acb2225fe2304b58d088b9e7c37bc384ad4969da07868ac0d155d6b172f3a888d2ddb1ff80b93b1203d949c0ca0ad067c052ff118aa6af95553b7cc8e4a4285fde9cdfe255c5b7b0b646b41ca3942130c86eee307fbaf6f7e333803a21d8b6ae5d1e117d5fa391b2938f272bfd7959540fafb58bdae61f6bc50e3c5db1193b01ad1293a5769c0861a372e5b9816e8d9b743a23e2e51ece96694a2d09ef099217e31f0f55b1a1949af90277eda9ac2240293553bd9a324e837683ecceab0df91052f846c3bc4da5d582b63350f89b65669444c2618ad630903cf11c29c72693fe05e62d5313cfc067db4128fc2ee3728a4253d56260db03961de38775ea2d80c5930ef2cf1de0686512d79cd05aa152c8b38cc4c4c65d4b0ce87e7c7c74b330add1c8691b1771fac04376ea762306076b01229ce589410a334261b6bf76b93eb860c5d0583c3023a2f65e692fe5a8bc5577e0f2d013837c19167aa629ab65eef585e8cbe258039b198e3ec9da3f89135f3a1744026286e8a4ea21e6525872d5ae432e6e3a68f5492f9fc0f36f91bfc17cafe8afc9ee653b7cccb5889e4cc4bfaa3b8ab25a430db480395adc62b71711f7e701a9cce3453182f516abe5f6f280f2257175d8da2453e0e169114c33221b7bd4f6835dea1aaeba8ec92d8901de66de78cca4e271d5d67ff010791bf36dcd60cbfc51b3c132654ef853f95d3d8f275ec8bb637538cabb0ad38ca8da3495d1e273f67fc49c0f5b1449d5903cba72fc720231abd336b61cf0d20b132830700156920d538ffadacf89ddfdc26e05790f437f5948ccc4a1d7059b6b74941f2c849c45ab376562deafef15e49389e96b0468d625560460b1b8c64219f31df969c73356b56370055e028f2f6eeb8e958c193ddb476952d61302726f093a279e37e1e0e1c2b940e4a31168aaadd7603fa97a42578a37648eca29696a18ff9bee564e6fd4e1060330000000000000001a0ac1e01f87fa638689ec9d03064a107a881960ee7e379a4a83b269752b00f206a02c0a1ef849ad4d85b368dbb2df262ed375149bfd5292fc9c4c3ef0c14bf40699a46f14333241ae98511c013efa5ee530ac72329775bd6e64671de77b5863a7bcf4a3240da7741a7237857f59aed6945465098e021f4a065d5c99d3225801baee616c69991a39420a2695bc666940b9514ccf849d20666e09ff11d64b0001b17a77d8f0325582a7a81accd027d6f793a0514546eb0b7a5a83c4c5d3ac7fd41ac1d1d83356c82b71719f1562697f24e854f9cdd109f5738c871777e8370bdf44243ef58b16c353f833e0974367001fe39927e4ee8f791b31501e358c6bfa535048ca7162fea57727cf4089899c7811a5ad30648f22a9da1b6b81bf2fa000ed9ad0a98ec23afc5e5899c0e61116efa37c9adc97c3e0e82f95f25812e49d1eda7e9babc85d1628f5cdb3072283c2c91e8faea3013f922e7f508a9b5cc84c663818937c5b41069151fbc6b11c2463fa4df61447bb6aa679da4f6564d7b36fd2b0bf569e04c31bff5dc634f8f490216647ac73ee23714186032e418833975c0fadb70986457c1bced5b7d607ac15cf26a83ba9e0ea0edebcd7de2199d22e80e536905b372416a5c0d7b4804b29aedf95ebaa7d7df9a9f3a22ba124b2c018472d2c877c5b62acd3b412c6e34b1ec9a10e2528f71a1306a3b13162a6a85c2caed1a1aeb463026ed4dda8750135c0120aaf4bc9deff06d380369a1bc792b278b5301a7e7a4e39e969c3b95cb9e883e1f71bce05e3c0f6e7b56b526aa40fe058a3878a37b93fa53a9668c79740bcc478454e37b39eac9083ff1e4942393d0b0c816a04eab98229413b5a0fb5a53a8084d9a7dfe692005ac2f48885887ef009c266a5efc564027b2217717fb1776ef03bd6b7364b2824b8ea5b1dd3d4ca5f5c40b80ba0295f23a2d1662ca1de668ffa3ec4f0ea17e044ed320349b111814173bfc91ba75767c82b9a69f323933892bce82ca2338acb2d9b3c41374d02e648152b81315399839ff7ed9f38f8418ffd2844ee80c5fc5638f81b3a516e9f9b30da2ddef7985f5d0c969e824feef282af5abdc96ab5d9bc16c1c5d5619596a83ac3921a9c00fd3213d531d5edd8f6080d80202b7e116d20c7561701bba1214bc9b627aecec58124e97a3d1fab835cf7571a7d4947b12899e067208e35815328660ad2f263b2b38069922775de1106ca62fd8a0d0b303944b83bb5ab3e15b0443bf0895766861437bfb88a57197674869eec0ac273cb3a5817bd9162815cb3c3248fff07e3f55a8a9603d8f8f8de838dd8501630fe31531871ef19637bf6eee855ddc7b38eadc7bb31ef9e8d97005841e8a3bf110671b6b185fce0c79cbea8f31a0c3a826cbe50a7287e23383391515e1d84c0a61385a3fcf8aebf39ba9211d907d27e02bd01587212da5708ba2493010565e767bb533dc0592ddcf47606e480623672524a3a7a78e2d42918665c8d2369c1068f4ee38532ae2843b106ec32ad34144de49746c9d20c8ed7f055b97d1b4d5970190aafd7d1356459d65e5023b0ed5fb4aec31010fe07f4ba02c01af3db272c008d43d3feaa7da074763d5a97e93adb4b7d431c54917be62599a73a304e1251f4d22ba54c841baf775233cfbd98b9fb4a744ccc4f4ad298ae9e5eb62f5e58f3a2e78a233ce62d5d5daf15dc821216a46be73b26d3865a5318ce20580335e631082d32bf9ad4322e860814b882243419636bf40eabe18d71de33a17e27182a8cecfabbd093e16ecacc144859f275253cabd2c6a6cd9374cd5c6a6e3c7cf9c96d9e56817a33ea66629c7c5805b8edc674e549000d8953ef81bd8742dddc916fc11a18fc91b898ee5bb2dc7d937e83aebb1ef7be5da422ac3c53f3b19507ba9aee2502c8f13d62ab9630af65647cf92c4f3ed60b2fd72a90838247cba4bdc3c88b627f03b4eff161f07835207b33f8c24bbdd71218f6b7c7217931faefa77c66ab8e852e6f3a1bde1cb47dc49c8a6e9f232c68b8bd026374a88e66045c62ec855513dd12b7d3cf8b61e41bcb2d8d8410cba92e24fb823aa3084037be215d9f8c09a6ecde86e9c8f5f1d29762eed3340151c9b8d8d4d1a7c995b0512f83a7b13a8aa57f95641f70ba4e5075f8fe978da2babbb0501cb0bbb8a889361ec1cfcd06237ab09d03fafd583b75d66b1e815e31685d96dcdbbe7b3d796d353a386dccd44a1645ba1b1c01cc08b9d4b224ed6c3329dc2790219de1ec4f7379525a37ed972659182b85ca454a009b9f422e74588c3fd5df8ded00512ceccc281f4d4763426cdddbc6e8b1ba99f4f37c8ae9009fd7f468a81ce0de8d809e3e1d84f99f2f17b145d45e7322e2e867bfb7b4f4ee9d8bd837cfd624eb05f0ea52302a2976e6aa49a7c463fd6148368f6dd75e493adb80af9af77934c85f9e66689704f79e1b5ff3136a4b0d2246e4319c3b995428e84b3bc443d6e8f6f02d2d7d785aa7fe05d5949bb739e840d095ab44eff0188f339ae1ce0a5d2f034f99ee85f5032ce23121ebea3c36a02b87017ef55b79deafabba0066a141b9705a583354828dd23c23454dcc1b0cf335409d0e2835d832fa0588f2bfcaa1cea4f7967b043f16656b1f77232cd3e6ad64fb79ad1de1ee1e842767045c8f452bbef94884da61d507fdaf71430750471acac3283f301afd43fa6c272e96dbcc76683c3dfaf261ac33a643aca83c416204e4bf2ea93c266f1de9c6a7dc0ef6353e413c0720ea3b275aa9a6c67e493957d2352feead195f0c914abaf9b40f12dbc1f231176c31dad88229ed47caa3e962d880c7278c47b9119bdae8927b87d9e42f6e6dae547db48c673f03bfe74dcc81d65cffcf8a7a4c6e9b0f8813dbb29ee97842f561029a2ab80ae3ced00e81cab824a07cf662c6f69b7a51be96d8b8cbafe5b0271b19131036e6e7c383c2664f0005d5177f1cc2944035bb5bfabb7ef9ef79e418ade134db8efa065e097609e1c992de9b1f42b0e1b761c2e7fad21e670f3cbe1b3e29153b53b20b18356ca8e17882bbe79745f5de1651d6b79a9481e9ab91d6bfdf5c504a292811f49ad4b197d89391165f96943f904bceb5c3f16640f94c54b3f92496633c1456587d3e6b07d6bd5181d6415fab621a1dfea3541a2dbbdbe4dae23d696514b6cd527337c63aa34de79b1092c0d021406495fd8f2bcfc80aa5c32a10d6aacb22de5fd60e132fb0e439836abd87a218107597642e21afede99ea35386e62881d94b9751525714a6aec4cec5bf2e76b40ed0bd9fd316be8510b96636f9b3a87d86f3a5da83dde857eeb36341ecb777441842946d05e722fbf4b1ca95d25017ddb5b6417a51111264da1cfc360723d897d665b889d07dbc0177696ad0fdcb102cb7d97b8598cb23d2e92274002ae411724ca50b1a11e025da95a8113894b44acf9e815ca0e9e6f7e9f4f44e94821fd49dba46323a5f9c1121db947bf52e40c2a82a69c150b6bbbbfa95b65ba41226a27b3588fb15eaff32ecc991bdbff6ffe72b91fc3d5e96537c5b93686adc2f323afbcd74eccdd2fb98bcb04764de69cd4d804db7d9defc9e35e1faef2f5939f7501a9d352c3575e316894fd61f0a84d1c83a6d79b04610eedd95dafb006414cc35eb9f1194d4b94e99d5bbdcf0062eda2818b6a8f68ed66971a5ed597b8da20d466f979191e8d46e1470d488f07ca6d610e86230867c43e340f0997280d5fdeaa93fd66a3d68114ba68d014e3cb74973c322d361e2fb72399336d02d992cf40e75ab115d81d5400e2dcc83a6ddfd572acac97129c56b8afab1a687f1976192b4f1cd939ea5efb1c81f229f723bd72717203abf299234138799de19ae31bb03bda36d7a605b20a59bf265b08eda9b2db130af2d59f4fd3ec3c0cfc249e4b9b30dcd4e6d8342a2b2a1b9290af1db2e474faf2fae3c8cdeb9206874836f809ddecf03f4d1ac4e3626da781697d68c907e54c85a420d0799ebc5dc542164dc0d5aba164c09436b626d72a608b23b1e8a8b995889568c7f0dc2f728e267309ae2e01756ec2db89fec5725897bd5256e845e7f75379a420654e7bcc1eb5e69d04c8d9e930bace2da6cea9315669fd54013def90c69251e881e52989a7b612e5fb6fddb5204e98121078e0e607d38ba1df060110ec573b8c6def861cfafcd292615076986a885f6efbb5abc53c3daeb7343f043c606c55df459d025506b0fe3adf4a631630d8c753c88309ca17d6dea8b0abcc364e816590e9c573dc850997acb9f323ae8467845c87517495725113535e9c697da5918f6281ebc561b9ddd1e8c67db1b0ccedf284f08de997d019c7934b65fbc8d6bcace88e36d818a616036353ed5c00db5be40b9f1646f09d0ef281e0fdd850177ea6cec355a8fead0506618f3f3e6a8bba562779008d0037af4ea80136c408de64005234e4634040aa94cd10d573db2db5ca88c0e1e4fe3565d74cddfff5976b9569e7ba840d90f99fe4d9d9d295d223275339bd8d9dc8ffdafb71a2984130a63a4cf9282089d61c829bea122c8c44f523f7162bf72b9b5615bb107ab9e894b83977ea86a3e5b3e5aa010d33b65408fd641d0c928b9cf3f52d34b56a07f5a989444081b33fd25f9b7ef6bbe603e010d62b70c41c859ceb877aa04851d921e125c36b144dabea1f62d4ff995695f59e31defdd4386cbebff79b1da17eea039d6cc332a7462f9285b7650235a749a445ae3af15bc73a1f48ddc11a7be7ecd362eff21da8e075e2ecb441dc792f62e056689af8178792e7141b7a7050ce3e3008183b6375a7e273431a22e41265fde0b681f81758afbd4e756060c4cbaa58ff8c34ea995d3d7b829f5030145471905d47736c851bbc5380369cf6c830a0cf7bbcd8f6ae2a199dc329bca7142a29a3f4da60e7dbf8b9bb6f0131c8b195217dbf5531a3201c28b98459bc2181eea4cbb137bdc13da354fa385a51baca3213b1f86ec74935c15aa33e917a0556332ae095208df54a9f48c599150299810ba3ef53a5e8ddd19a953154b53e38aaa908c240868319d729c1aebb7e5f9af624b0a3cd656748d233936b496a8a704e1d7414ea094d200f7b79df2854cf35c8f245f00eb66366e10ef829eab5300f6c299334debb11fb5be6d56e17a2a7f1789c7d70e5df2ec44d6f71490fb37b6d53775e27b1f163fff0e490957103044a49cb58137e569591d7ff953d0194184473f029b0e4d609a517b84a1162d722e1a1450d3aa4c322e4e6e8db228de29fb7bf52b181e8f5fa400455572ebe050a2590af2abe08adfff93c81c5d3fb6b556370381e4b968a37ea9b665a6bf7c8bdcbb4c90fcdbca5cdfc2ae683c3ada8a0ca3b3c4b8e4d8b1da70ef7e1aa3e884a1a1bb356f29503d62ed265f034ee3dc00155cbd68c1fff6cb4df8450baabb0f76cbdb7fbba6b6110fd39f8ae0e2c01bf8288f0140c3e5b1e4068db05ba4ace5aef3c455567e10fa1d6d1a40a067204da11817f67e6b8d9bacd894d3442e5a2cf0df5e56934a67bb41701d5130fddbf9cabcb5e52e048ea1708bb5b05a1a3005748c4892e86c73ebae14939719f4480d50cee967dffc6a445b56eb723a7d5c1c5ec1985c2ed4228e1bf0c7b911e4cd9bb063c9c8d989e2540e3c5d48ce1fb0c10244938e3123f84ff03e95aae84470cf2c1f4288fbc3c7d23fae892a0e3c423e8a401beb96a997074024086f814a87cbabb5c7a82414ed3edb249f100884d826f4abf4e2a8a0515fa4d9a4f22d1fdb74b3b273cebafeff4a6868d7fb97871c6c819a5a83785b0e7b6e5c52789ccbfb695646458d70d5f68b74e9358839e0c0df563808c557fa988b57bb94e185cfe8726580dd4833b630298c26e73e96a0110aa2ea83f839ec400008307004c6df4c154f8d7e237fa08311ff519b4db9324a85d6ba537d80750d8426c09518310a2e461275d85dd4e379524c05fa1e3a69c80a1972c7b258413ae4dd2d2e72a5187c90c08867fb8e03677e37cb5148981320fba3a6e6770a0047e82741d1f20fb406868a1edfe77e8b10d422590da63ab5fa3896e0bef42ca982d26b8e0103afd4e1060330000000000000001b6941401a6b724020bb04402ea6b666f4e01e238917ffed5bc9a811c95f6337aa848ac6b1ebde5e4c5fc8e8a46ef5056d89a8fc46dd3a42f43df6e7057ca86c8856524a4aab8c8d218cb7c64bc50caf55b44d776e93f3aa87da3b634ac03462dc0d9cb72506c1ff961fbbf5390c8745b0fc4bc55b5c0acb2e1494864b6dd0c17ab38113fa9b54f02138a51237886dada30dd161b1b0be23b2d578de2edb2fce5934bd600f51eb7788a8b7e06efb7fd22c8cc97e93a32b618215b7a3289aab8b513d86b0d7fd9b7b22fe5344985b669c31e03f90f3501ad72331f39893dd97f517a1114462e89fbe198e05322ab8cf3be94f32e4bb626662d5ecde61ed64d879783e19c3c756be10dcfa126d2b252430823b3246217398366dbf9c4c3db9714ff8f4f1ba62d5cfe78c01e97089997b73bb9c61bc908b4e58fd0a38fd26e8e78ff56b01e85e4c9d282c3321a0cb33e6f72a0a514512a0112841707df28e03a0783aa3d10cbc920db2e3c8887d14ef27d7561aa3a1234c90ab47d55541cd33642286dda19633b7d2a2c738256d151dada265276def320e4659722dd1a5e21dc2e3f997bb385ac7f6590b196e680a43ffe793134a060fd0a7f357f77137ec15fd3f643ee9f64f0c29fedcb977c61c04b14602d7a74edd6602e4859704254095959619fdc564d380dc308ee685f6b9926b61ce096bc2d08809a679b86fd35e14a4d97da414350fd249c940a9486a7b267656e2ac2471a3905300fd658a76bd98a3544683f42f9a9299cc47b3f7485407bf142fda67b4847d5ceb83cfacf0c01134be8fb19163319f6994b492d6f44eb05e48e3754552a8449206341c9c5727b5ed1cf779fe7d138157b01ff1c532b55a6c044e78dbd7ffe85dfac9cdbeb619fca38f370ee9f87ec4cef510ebc09987390c8405c3f511cfc2fb41fe3e06d85726d63b6305dc0563a9c1e08532db643a9772be16d331d297fdf0abeb2f99de8200df2b9e0cf9ee142cdad149001e134b5169fdedac3ef88bac4d765db0235248ad7a9f0efb9e12d6dd6e6dd7541725c43900ca2763231268bc9f58629ec07a415990cfc3e20629006592c89ba41f2e3a0e08609309ceb86eb3119948b399a30326f0cc3027810e7570eaf52d837862e9550afe120bcddf9c3d08b3d96abac95e91df46c1ba51679b748e8406850e87e85b80a8ce142b1691718069cec1c8894680f861df9e8f8b021ece953116b891397693f1bd37e179182635ad7eb556b34d3e87d33ad826241836120458127487ad19d065f6d041f87c8f9c7ef14ef61898b15ab6a596d0a363b9a2aea56117118d11ac8de0b47af9e132db7bb7c0047ffb77d04245db5ecab6e0f8c50467ea20124904d38db4e7b0c5db631708a34cb9908ea0fee8c12a944cb77d7b45799da7817400753301e76be9d5426bb63607bbbbdece67a1ffcd60718ed903868db065e0d7f85a857be729de99a24a5f014857f760ea861bcf85a96fee0cb9617a3cbe9c8a6dda3af975c1e9f20125a3e0aacee6c5155dd82b15f4cc950d269cb5bd71391a0bfbfc94473253cde66a69cc818ae246003c961032627988aae97dfc1cfc7a4d76043648bb7a5b87e1d181b6f76ea2d01b8b794503f782f7823302b0ae275b6989250782b5aa17323237f62fa50ab3eda3a2bb3e3d39d5d6929f9849870575fffb905791ee3e9530c3a734f14517b1e2bd84ec885ce71b5d465d4ab90f03fb30aad5e3531d3065543cd818376e02ada02f9cf576b6afc25f347dd14241bb8aaa11258a32fbf5501e669c4bd4877549090e205ae859d401a16ef179dee70910f7b005e142ce813b47f2eb8484ff9822ccc1eb5e87c4071930cf6132874b1ae43659d338b71ca0f7f90c39710968b48e4ab6961ab9f0d4c7bd76727bd97377b3e5412050c2e9ddead5dea4714999d43097089924e844e4c2bfae3f4a0a6b7585d40377df4b217e3a0aaf77704c0c3527541bc41a3216313ecd54b57ba989d044619d9ce3b432bd47828d4f8b683fb5341e3a8313d273a5201f7d1ddd13ed03bc1d7bbffa792312b5a01f8c362e946684a6600f62c719c7314f3c793a779975e278b8ed1a23a0e361ea0d950caf8584d74a1a72d7a0f8646f02a3e7cf7bcd34de3bdeb537a66e9f4d8e7ba14884018bc0b6539185b2b8ef967514fff31fc75ddb32fb6dc28a5d912538854232f06378dc1e2ed7719fb4f1b57718b816df2c899331de7fae592d8347d39ca0443133d3b89acea14467b0affbd1ca1c477bbf92446a15853d1cddba161dbf82e68b5172ebbc3a5256e3d49fd35e94feb6cbaee09f2d3efbf3df865324e99c3cd2ed21fb633fc95841490b3394fce26a39e4275c567c0e0c8c11ec4851ce9ea79610d1ec0ea859df4839799db26d622318ae589a8ee4c58447be08120b6ceeb6b53e2847c7df1744d44bf23de49617e8c2e1cdd87a0cf088a5de710e596de946864e2374acf91ce17093fd3ef4ce3d5e629fb3bbdf93767775c011963dff1868cfa6ae8e472cfdaa43cd48a23b6ea24e6fb89d0a7ebeb50c5d862dddc6325c130b633c69f0508166fbc4776bdba4fd533751b291acb8b177757d9ec9bbcf6d459f91055c2bfbed25138dd8e6fbb85d0ff547f9f991126752c84f43d2b31934ae8da50de7b37129b6ff6c5144a41e2e4c90488fa5ed519978a54818c23d2efcc90eba3e10479d41ab695920744f3520e3b9ab3cb95a00ba70d50431e93aca250f153768eaed9f10bd6ca0c196bd6b641ae3e7569cfe36cbf580a244303833b74b0057583f8772fd36999aa1ed25f389564a3796adfdece035ea3409bdec2f137f6a693c03761fca4db2d72be7339cbc7f3699b694c0eac575f067a9e0181a26f7e5ea4bdfff835ecde921f60db3fcc445852498452c4ec1fce65e5da8325b73482fba70f3af992ef975fdc031742fac69f7692cdc399733214a7ef3e9176d0a5b149ddffa66cbd1662d13ba10cfddbb7385a6f3f01a436d96aeee9935011df272ca8e74670184e28d9797f9ec52b33dc0deedace69c0b6c519ad72d10f005b51cddcf13075f5aee9fb788e4084e5bde772b5242f83e299334d1cd1c5e11055fb07dae7803d8c5cb3d059c186825560b8eaaff07a2326ade3b7b8fc39906b68d583231084b6be3e0671668543583b173013ce76e9b910820128287a42ba88058f94764fd16651d59a18f4cda556d9847f44193919cf48db4103a682ad4b37ac1cd3bfc1911fbcb779165a576f7d7b1fe9eb362bc8b7081140724a83ad300060a386910906cb387690b79106c7b05cf513f4576b9a6eabf31409741f494300f0d0b0b27e54a47d3c1f335d1ff33279f9fa71c1f55d214e4fa3203ac1d8f3d78d416cc42caae6dee4a33c842f648502253e2c7acb0f0dd3fb1284ab9bac0f15b21a297a184c4485bf5f876ea89a15498427244e6e29b1a399ae943c14cdd47259751250c3dc5b94a4c2a187d1bcc82c64d6de80d840c4e039a3b4c2d059968d39bc3c2d3be09e55563a19f2726968bb67557b5c1966b8f6769635776787e9f1afa6640f18eca81e36fc7e171c7edde586bdfd4efd997b88609595c415e142455e12f7e4c6cbd5fad40af6eaea100dfc69acd3d0a8168fa1d7eee4b4f9927975ec221ddd129860cfad2bc42a7a73ef69df85995bc78b56029d0df3ee4036b0233c226ad983990057d06e19e33711b05ad4ba52f17e05e1798f777cd2bddbe6daea5a5d8cc9a99b7cfef18d67f951943764e0ec0b1c6fc433c67117b42520286ccb48f2c461069141e32a3854bbcd9cc12a32ebff618e5f1c0d93d6b9399fabea9350ae79aeb18afa64115a5f3ce3dc308857354ec843bde9503bf937a442d3e319baf954efaf6afb99438a99e782bbb5e1bb142c1cd1ec77711cc5acbb3788449ec5cae9d3f30177e3023f6bc7f62d5e464062cece764de40267771835c10a8bfa0d5b674d54211ba29be5d4fcd0b832f789675579626571e71b64fa9b019a1b7bcf445c0cba657118d8060ac2b47a56778bae7bda6eb5479e4d7ba6963429009841bbf930ec83187ea585a0236698d883fdfef4518b1c0f1e8954152dd255a93da09f4bf6a5fbc085523f1d21c5571de738b12d85bd9484c52121abdf3f535ea9931ad65ec06bee3eb178cfb95cb7a3a1b543d4cd69894c932891ce83c3b320dcd7d5d6ac77d35f6b4e737d9de449139f100bc39f5988d29b7a97be9becb35782e8467ec3fb7981e8ed41ccab44fb664e1253123cd5270c0a5f55af00af1f353de69d19c237cfdbe497d269cce5aab6fd7958388e43cdb553861a30b13229b441703e21133416a2a7d6de31cdfdd8b5eb3ceca556bcd800f5551c2dc2d0296445729a5080d96c682d620e493663d5d3ca20136c1a977258ce3288f967b331915418dfab09db2e2791c7badcfbac7d9c89d94233f34e0565de6565e8326204ab669758c019c34b704f9cbf1de74e7b12a1f9ef549c2e0a72137682a154d2cb39b8a178c957df1689b5ca65efae9c0c9126cf95b399287e23a04a18840fb6b4c5317f7dc15f7f4ffb33cc5b37e5428e2d025fd4473c03df3a0d1510285a88c9faeedf58287d9831c6b79b0ef3d7dc20c13e294789a111090e48cc58bf1cdf0505cac856a67246ceda33ee0352ce67d9f8e0763c069a099ece597ee8ee804d71807ae2a215d99a2693ef08f35ea002ee7b873a6013189ab342310c182b298d80702262dba649d92d2f9a1cbd0bb734c6d899e08bf6ca3db932503cbc9e4ad7033a3ca705c60cee1fe5e94c359f32d3e104dff28037e33804326f8030f12d1129d6d99ca89133cd3981bd97a7172ea4c72bb0cd0e94df65fc829b892b85d19189646d3849112051c175ea1f994c80dd498938bc3013dee63c4dee2f1a0609cce786279ad7e2e31d156e234ba541434e6ccc95e868b96d32edba3b3f929eca3818d3908d15412b6cb3c49c4b71c55bd686d9064b7d1323b5489afcd7dae4397230a5f23438f33c6a776bbb2a54846dc31476cb17485b3d2c8cbdc47a9be97ba6d6d8a4a540645784d051cfba5f90b0a5d1f15cc5a023ef0f5d456972b1b5d5ca2deff8c28222641dd94ca4755983ff1c6988bd1bf699095ceec03243aad2ca19e42604ad8b6746de358a0b5ab18ddded7b097c3d4309507634d9d82bb2b1659a27396373feb8682bb0b621dd622634f6b3ba6c697de0e2f33d21957d7bb45c128af5dbd5c934848b41901cff3e66c51de58886d36bc767f152d0aa8a87206bb3841651c3ada77f69e4e58d6a760cf8ca7307b779aaca7dbab91ca5f1e214a2ed75999bb934cd2aa100c8c932c32b09710020e528a0888b0524c8be1ea868df8dbfb0a9d3d450c13cdd6888edd337916c3b51a4d617cb854e386105e0bee49606daf8905667f68a1a7663fb588f37d9e0b07b8917cfba727b86a3dce239f4ca65dc12e7961c35e9d9a02deadc1856d152476e494461ebf5626106373b3b546e270f245ec60fd5fc9e01e7a26265885f06e6f6ce9875b312b4b6403f8d3c5de9c8dd8c1ec557d75766e402c8d5d70ea317bed4c5d1a68cbcf3304ee7ca2bf2b9be679b230748425e67bcda587af49271dce366e524989516432c313bc8cc85c15217b68f0859ae9315ea7414675e70963df33e328929063d3780e18457636ca8e5e835b56e85eb3222ce296843189720e7b2c80c11e4575a8c494da3d14896742cfcb87776c0f56791a127ba9b30b9adc423891fa630769b5d654db19966e2fef3f41801cecdf9b5a43a43e32fff66c4898c576840166adf2c23ed7b5dc1d70a66d7453c46edeac03ce3a56cfd1229a7333860aaf31187160649f1e938415f571ce636d77b42f383e4f4b976fd639cea88888307004a9f6640cb55ea0941542ffc3adf6342a8b9bdb68b6051d972b20fe559382b5529c1c4bdff696f04db321c04ef7bb031f72b6c8f4b29ba7c26c0508482a949de05453f3d4791ca97ae9c8830bd0445601ee064ca7828b3447c8bd519b8749b80f69590b804b24bd16e806f0da71829eb4648de9e6498a2a81b39c0576d3699affdfd4e106033000000000000000153395d01da8abf72d4ad6511fcb03e823958b3b59120a022561f5ebf9ca1813bb331aabdd74cd0f5f1ef2c8f610d0a1326210bc514e0cbb6b22096ba29ea2849d05bb2e82dc74a3437832ef63cf9472e078b900ce98795ac53dafbef1825746a4c57df0ef6b3045fe7f0416ee7a4a98f0d66ab82b8a56357dca4c6b86fa47c47c332bdb120f66ba343ede2e4bf27bdb480f7034bb1e0d5a39e1ddeb8c3d7d11ba0921800ac01ed18a3bbf320f8e9789899dab9b767ec116507d3657fbc3ccc4020c85139b5be8bf75a69e72765673bf481d1a2d391ce15823f3602fe36846da9b08fba864283e592459d04fed2e05ee0b4d0999b59cdef00cb169f728bb5f425a6cfa6a6a41d92c5c479925740dd0823bbca8066c75cc8f29b858a5978deef4932dd32237be3556ff97ce51140231fa33de2e188f34f92827a5bdd533335b959bcf5fad446e93d9990bb364ddf382cbcafe1f7f00134b4d3b8ec85cfacb7f9f9f7930dd3cb2e0ab236e0ff5ad368b8ea0b64d1983e2b095c8586a0a532d30843bc4e1f6718fb03057898835171e13acc7e7da4cc5aafe67600572bba393719e7ab43f842997f0f549fbfcb62cfa0648e20f8c277bf3f72676929b93ecce51c65198683faf9efe1f7daa39d78e13cde0a8d6ac283abae029229d66f5b0028389ec2951d49b0e61eb2df23a86db7ebfb27ae3c995a2c88324156e695b25f21d226d6812fa2ab6e6852e527dd4a9ff512a4fe6d66ce0bfc209e773816a2de827bb07fb0967be6a1f6fd6b582747368504d4af795adde76d663925a6748519464882a243e93cd16f02e647286df06478e76cf9e4f9803b3431d775594754b65301cee29c26472ab6d3d75d3c8214c1d040c39ec3468c70a72e38fccde84d6d885c7ffb72b40888d62d7d44000e23ed31680ee4a506393ad3456e9084c1ca3e7afdb16c76dbe72c98681b8b70c4d44aacc2bec716aea2fdcc02f50685a4ce70972fcc2f8c5e0e3c3631cf056d20bdd5f5490cb0d9c27cbd49d04f0f40b8c94067a29b2c25c1daf4af61d022dcc3f95d5066b52378b6c1524461cd2f49a37d5754df635d0e5f5c7c229f8c43504cb383dcae1cbf290a7f110564cb7203c598b7ba6b1b470b4dcceacce82b4a0c514c70dc28daa2cf5e3147e3eee44f0479a57c10127385b4dfe62072dacfb782a8b02ad3f44c61f026f0262269f1f25739f424f36c349e41cf48617e08781f614e133b23f3b338b2bca11b99ee91fb8df890bcb69f08053e763d9db04b320c176754dfd766a9a93f894b6dcbfce01b0c9712c341aeea89030a6ad71f6d66f696498c88a258cdff7626e85f70aad78a48b56e29b6cb0ee55829ab1455bc92c79202a79e7a3f3bb5da29215edab2c857f38bbeee2453ba678bec75dc8008f0b07807af46e74b1b1a9d3504ec63f13a0915a92d4019d00cca73d8a11c3f3addc31f4b5d90a549458311e50d799a792512911dac3df33042c5815b4b7729e88a7d7b509d66a26316aa0427097d08381550d2edeb8e046cbde021316bb30f54c62c19e64b574efb777ed6a279fc6310871d5a4b0cc6e5dd52629ed8d0f020f52246c6dee7529497024315ffa65efbaa6f6f08c5037f48a5bd1cea1ee7f77507c8a352dd9a1625ecd30c1301302643f070f690410b031504c41459f2102b8ae605d085e8a70a3bc87c5b2c452b394d3cab35c32e4b0993ebbe430643c40fab52beada84b03df1cabd5b3b3eeb073047aff0ef43fed890c909869430c26da03130e3f4d9317f46d66c12ec8c01ec5e9615614363e14d4377a3fd8c154e36b5a6f47aa965deacc6eeee2f20dc32f4b6a597962abb40cde61e523429a004db75eb1067e26de8fd458fccbd337931f17c5e20a380f1f34915241e69943aaed8e3b4e0fa3eb654fb357450727d9adf42861c35b37b402d0d63a679f8b2039663254259c6cfd471896e4aeddc40668f58cc04e56ad6a7088dec67673eb395f6b96c86773367d09a3027d05c06b6763778e8e5d82be8b14fd1d80b6add7c3417d2c4a7255bd3818ac70d701c89a04b1e3ac53bf4e551fcd945b3701744be8bdc1c0585073a6e33755d1964936b2cc7611a40f5526b406570cbfe7668013a155d0eaf5c5d8c176dfc8c5b57601ccc757d0fcb4e3110a9fb75236c0db703f65527c0f137e20cea71949cd3b97b82e4c87bfb77924fabb9bf18adeb69ee0d54d433fb454fe43ff977bfbd739398de76af5e48e13c9e58b5e87838f8bd22e805c8cbe75166bcd2080b61ce8a1aa8ff3133f27e06d33bdbd851ea73e6e83fabfa1033f5030a640a359e982cc88d13e0bde27d55b19f5528214eb5d8d44e9adeb9235cde07baf3a8c9bff61581dd255043fe6de29eb31124f04d721a31850990efb2da704281d31d48f5e82c762aa41787f99e25b3143660f2b1410ae35526897e0006bbd0d8916b02dc43e74fbb4153ae9a4f3b20ce0a93282576548601af240577a7330045f8b4d213383ff576332995f101be038912181c415ec16b4699966dd03c129def9b4fc3c0ce803d7c4fd0dbed9820621cf5c228e03ce37562bd3ffa51659027baa887ae346b5ced5a53576f9e1a0fcc45b01cb5d18f1f2a345206cb7f6edb01b194c2f8a6baf5888984a77e8fe04a7a49399a39533bd76677eb02f8b7bc603c7577d22cefc1e3e771ddd16ecc0b056e0d61d75bbf67cc42f74d54706d06537f35ea3a0fd14758cc69dc57b42f898cee234376d97413cc52d2ed73cd39a395b57b370eb160b2baf7504cd406062054e7a00b0df99a988f9b420248fbf42d1d6f8e51281605f180cc18e705bf2c7072bc465b1a3593ca1dbd66ea66f96ed9eaeb40ff009220ec8fc8bc71ec9bf3f8ae4e44db32872ace5ec0af26fcf99af75add3791b3915f60779a759eaa91c55b628830366f00a5a32b8c71aa2e6282f783dcea85fe0263f93dfec83d1e68309d40d94afe98b3c6289584057ba3bef2e1c67c9d1325f90f670cafdcf485b00cf6f92f5be1c719f2c2dba8e7325ee5d63cc74cd4bd3a6f7afeb6a73b861e8201a8a3aa044dfc579a18f2f2fca9049e339adc9f3a91997dd61fcfee1c38e3f94c0d11db2d2079611ffc22375b9e1dbf43a38519d3a7974fae166a6dc99ce3130148e360d7ec1bee0a77e3db7d7ad34f828444e8cd1b3e54e5fc1c86741a2e108d0efdb5f22411eea841a7aa828025cb621171b790037c313ba7db77d87db46b240bdd05e387f993f28511c29a17a72fe6ee9f327d1a1dfd1e609fc079862508a17a62bf115ae65b30935fe1f3038354e1eebe427a0600b80e8350509b6036de3316932bff55d814039d929553c636f424afbb04cd75025f51bf793787345e92f4e8f581f7afa5b18fa77fd3415b5385a819d51dec8509b646f68fb0ea00da4111d61cc7082d2a5adf88257dcd017cf9df1325d74bac75bfb28d3604e73d159c1be3daf17c900020dad4d33b15de6cde744989ce51f6f7de9d5ae0b0dbbe6d3a7428fd0aff972d4de1c2012afeb54c21a9ca508519de8684b0d243ac9a70c31c037fd4b7d88f68849552660830ca83f1391475d59450db127e8f6a7b9c1d5f7b3354bf81ccb218f5bcf512ea80e738125fcc69a27729644048f4fb5665e8ebe5734c458bf86442f8ef368f3e2246386c89f3346b3230b8e30b9ead063d3310a6fc50536f713baaefc793cfc938b61ab48a045dc18d1bea8533f189ca808776c40767998a5d873e531a9aa9ecda96cf51e2f4b75a383d715118e9729de885e0920e0aa70ad0c05dc2ad735e138b9956d9541a625d1c8aba25454442833316b8a4bafb369f5cc7bb763bf0e0110c29a3b158d7a6182639b84ccf3fca63d9086f3f8801dbfc6e4b5857bc05ad727fb9823b454523fb76b72560098497f32ea731aec154326966d361ec5057de5b66da562a65f31b33fbd1708ac55f1ece7860f469680591aacc1d5e21564845ca93d06e95191632f6b840cd1ec7a76ece8a21aba67f0a2f5e60b2e07379a6f6b559596f85719f6ff39b5cb5b6a2a9b7b58e3967b6e6f40b92e7fcdcdd4968e83c7985f6b1c6ddec0e689045bdc0a1e0ab48d71b2e728383edaa4a5ef416b21a48b931391d2da4fb3176f7881f20cd6b314a7f71b74841bb0064caf394d476c4bf03e2e5acf8f57c8e138a3507131fac327a0b8ef65b1ec88483dd6c614fbb1617afbf6ca408c61bcf3a377db1eba6386a1d62f11c0d6184af5f0719809a56c933ce2e62f1442e5818886b7e8384f13a7ceacb29f6ce8312a02f29177d3e2096c220dd42078e8f23cc1cedddac97695c3118c58e37e32d7430995cbb6a3a6325e9f04e6b52eb139d51ecfbc4c3aa6e696ae09cb7d8d609105659a6420bb946708f0088de26a6d2b47f325abf46e45996d996f5e424702a9b784a223879924ea84b85b57dd4f47087751a807a9edac3c8cd1d9b2a811c7976113f1245a3441b8cab2d8945f74db928e0647c9fec05a6220d55b48d31de7bac71224eebb38ea58acf03b70f67a9cd50d5fe452cc763536b033e214c0edc0535eda56826cb93d31dd4b06758a2a1fb2151cceccab2d7c3fcfcf941640679b65ae56a8091ee0530354d97dd2901f59c235d3991c0963dfaabffd87158a327a3d17d531d257c738c215364c6d08c16bacc238c5648a1d2ca55f6145e272ff5fab648eec44784d65fbe069edbe4ad06b4a42730d8085f3f6575a32e58368a3b15e5e9f747d5a59020afa735f213d423d440f706d30e444c3ef5d5229eb21d5c967743b20a898bb3bbfaaeeea191f7815e9367f8ee444a310121c6e909d053a15da48efceaa76945f5d6d32ba2296533abdf36132c0e78ab5479ebefec33dde78635c77a19cbf274a335e1a1928751c79d0a0124ada8a7a7e4351e963432dfc806ead6d9fed2ad59e9011c2360a87a9e7f61ffa311d96680862f1ec21260268a5b1663924e8f295ab22c6a4ed70715e4fc514322cd095419857551c9115afc747be9ed0b0e5178ace7a91697a32352df0072807842dbe5b823c34abc1111cdeb38eb0adf88219f886b27fba7b0ef734ecc84d37c54fa6c65824fe7e65fa98eae4c8b619279d115f86582d85cc6f8b36d70e673aacb7cf978dd7673644a084251fab1d474e3cdb3d47da2c8dccf417ebdb464a99d1d3859d032c12bc836a179a6705d8efd1f26fbcb4a9c09ebc2ce09d1a4347ece3fc908a8c2be2d9afd946f70f29ae6618d4ab70fd8da9f1ccf53eae4aa50ca6f46975f6235db7ee6a4a649e3b17451e38e52424d2e839fa82b7c3959393001b1f303474ae26902e336ac5dab54d76df7f8c3e6476b1aacf79422895a2a16f720ba07e07382317b0137cc4553fa737c8f50666ff0a0d32002e49b83abedbfcafde9bdf3c20d1530a778d4ca24817d2e7dfdc1ec4801dd26e2ecf99b59f07b8fc57d670e473929b5456c89b68eef625354e8eaef41170c3d33354f75d1c6091c8228b0b679a5e5311748fe0379b6e0f460ff2693ac2a926c82ff7f7dc0083ba7830b9c7e8379b07463e9f83d449c164391a365e9928c325d7ebb645d558dd3506448bc14ceea152e0b90350225141cd33329ec97d947a4c4e59347bdfc73436eae5393d45c3f06b5be96eddc25ba5f61b037d7db41765debf780dd0d11ee018ec1d20cc2ae193e9922c6f9fce8a8a03bb534f2498d0f3fe9c571a09a683bf957c68b0ed39f202d94bc767fcbade7d8bcffeefec1c984e9ed05278baf9168c06638ad8feafa0c42968a90e1556a98996ecc46a68f911172ceb866828942b8428ebf1b6d63743f55554c5f67a5d2673b653ea4ff068634212c6bbe5a7fc14444ae42e059554c853e1a95c6692748e0b12acb6750ca5d67292573e9a58d83b58830700618608ebdfebf5e195a24e3c57111ed0440c0ddc8e03b9ca8233a9c889563be1c16fc64c22c9508e3eb2e4eb563d70afadedb8fa0242dfc54dfc59ed0b76edec92491ce156413ba6b0bdf491e542e05d6a64823a3028092aeb7d7f3fc4a8c46fb1636eaf174fae4b14c196de501862f63bb3a12b3ae9e17f61d280ffb722c01fecfd4e106033000000000000000178393d01b1452fd14d9430951ff773a3d9a6d8fc8111db9971cf661e3fb62d132a73d3f95ac4d7ead6b2245407039293cf680bf245db493eb16552cfdc0fb239111b949dd1eec460a56d898f4b54ff2088bad54be29e8c2bdfe3bad9ea18e18bd897e3ee152e0b6f1b7ab5cbc6ad3c98e46870574ad63c94d9ad89e30e7d46f31d239db4dd1a6dcc09055219b3b184121aab60bdcb9cc1df67268cb60a6dab2aed581fedc5135b587afd127c47eadb3d3fc2f8bc41845e5fdbdb2efff5a7a99546949f49acd655d75c55017d9cff28b43fb661c2af1d07c3a25a55d58620e12aa952c540ead35ca0462c40b6ebff602ff7cf1362345feaf26a1f62148b12ed8eaff7803bc44e5cb0d8119fd291776f7fc396a3ceffc36d972bbc372f12ca429f4b66433cc3eb8f706434f5f64c3298bfb7887559b5291445ab3696ae83a0d22981ebbdf029fb3b65f9350f3200ae16af7b1e9f062c62c810b4fdf6eb0756ee11974e123e28a04a32e33c18b3fe0c02464da0f13929d30318e96f96b0a544f650a12b0be541363fdcd72a0edfa691689be825cb3bea350e1b3a3a81e0d5af77b2bc36e792a62372ea7fca319b31a282a747ebcb504b8b4c2bb20b4c2f0bd5482ccd99abab8c654cbc007bb6a7b19ef7f019edffc7233a867383cb0b69fa9bcf7946f2157a267360b5ab841cc75367a2bd267ebd38ce4c4da06d2290b35675f906447477d712893f9816c489193190e0cc5440c804f42ee846054d3600439bf6242f5122f3fefe2e75eacade5ba74bf52f6de5ea46642e3e34b1f7f3e3a1c6b9fa8d087cde94556044d40aa13f588a9b130337be51094f3a3caf3eba79623e4f3e00c05279e923bb9212a25de27389865c7c72eab57489073c04c42b4cebaa43e09f6d2579f4fd60dc43f6954168e28a84cefa8c65c90fc3659a5b6b50719929ac7fd720c9a3a49ebd01db15916eb749bc28e12b7c0e5c00043294d2e34caa1d06a3df95ce81e719c366afff7dec83ee5a91fdb742f2cef5a155b6badc595eca0e3cbf6356f5045c386e0ccf140da871fa8f334320b2ef2773391d15e8da8dc28ce9ac96468e9bf772e897195d722fd8f595bd87258442d58964936991e96ef6074a7f70a79493019909fc3e21739059f18f69e6ea08a7fa9923e1e2e93e494cd5685a402b78ddab4264f6ac71fe81ba7c23af6792fd6a631d72e8eb8ae42347d607b6c268e0ce1675605837d8ec18ab64139d820a38c9cfb0aa0b18e79f2dc0debb73bbf057bbdae821feadc3b0ad1c2698b901b2f6807e833e601e8f194e7657021dbcd2260889689dd47f7bfdc055c727d333696cef20ee2258c682019ec3fb30d1683905ed37099a6d0388eba182e361725fce2c09a2deee4b9bba5138d7a7c82809880c356d1c647b5f8c4493d9e54ca8c36791ffbb203815096d78b1fff0f957b3376a4c1b57cefbab2bf703d4da182aa447d9dce1dd2dce2f54e9083c57979c470953f22ef28206ee0163fedb8e6a7c70fc80e3f815f3502407555e58c29274dc48c8ee7c34ca94477d4a478157bf74da1ed951b5bbfb406ff4d5d5d82e440a56636b34db692f5466943f448410bc791989db23fd8de664085c243c36786573a07c916a9b151eafb43f9a0fc8fd88b2b6a870163ff68ef6b787f9de2368f375d3b465770d54d4da1e694c71e71e629b5a207bbba5127cf66f545bb4cd2e6199600989c10ce68d6cd1b2f23066be1751a0e147d043c3155fd7f7fb9b339204599a97d813f6c96cda715fbbb16e33c7ac26b0cdbee193a317d800105d2a90e4e2c6280a252488420b2e03b872a2ca88551419b62cd37c36daef972affdacf781000b114c543b6f18d74a14f6281f1657bedbe580387d10219dc894384d8a13a728aff51504829abe41767b4bb3e762b5d70e42371b944eed4f9f2e674b280f516fc28214535c232ec18c428cfca7ff1c66e94e85768284721948b6b52e5456e73ff3cb495a94c3fa9aa3402d462fc09f450e36df05831a6e3a1d97d94138054cab4f5dbb4b5be0dc8b4217b119b8ab1868364a3c3500c732f3033f5150f21b8d5b33f129b85cc46d1a00a9b28a05ec73c8ecee213411b4e0609a9d6f8d2dc97a2a507b6f0693ce20093f30cf7510642b313216dd50557bd0487c8f4dac80da57326c3e1909ab6ec174c163a083b13dab79cbcebb5cf1c66ba977d0bedc7cb2cbb846b83391f14fc7f2a3d702f4776bdfc71eeaf9ff2b637384a4ea2e2ad4c31786f4f47fd6e9cdcf9bd48c7e891c6e1ccaae005aab31302c5eaf05754c3f04bf4780d0b8196a3b6016b4a2c02300b2b1ba2a996143626b67268b0699de56a46503ab5e47c4a308d7cfde4b0c0c906c743088b5763e968726fa80b81b9f583fa2257a7548ee58aef54aa57bfd076fa8df028023e86cc629084563f81eb5004a9abd44fc34e8140bbb4286835fcb41d7ae4a68a867763228246411f26253c9f53e6f92029ea5259fafba30551a4ad4de742662dbdcda53110b8bd370a76cfb467a79bb348da4c414d073704a0e2cb51ed1cf02dc02c9a5fcd4c869198e68f757ec85b7df3b4c7765d775cb0cc82726bba9c793e4120b3c8b0cfe490e2f976a22c2002998b72293b6d91d02e6fe3a5cb28ee9b4a783c48804f7c32da5b47f94476d728387d7584da4319f3059906e382f6a944404de1dd4ddc16a6785c545568c66e3b11551422149c8ea80f3bfed19eafe7aa17cfba2f5ecb43e2f4ec791bbd73d0138967c7cd2bd0480985463c946068045797b46ad1a0ba91b7d3f8a8799de7372676c7a3d28fc8e002dd34d378fa5d5cc9b5e12150911fadc65cb150403919f6e65cd2349b9335fdd4f63f25adc388b2a59936862ea6b5c1f3803167467e973277ac28bc60833af11db982f375ef8149564e805406c620b2a8346053fa32d3e4837dc7869500b90e8b520d30093ec65b8cd2dd5ebf1bb37724a29e02dfc947404e98e7da87f3f2380a73cc69d61dcc45cee625a07de95f8acc07cbe9bfccbf32475dd29f24b80b8aa79ceb37f1c9a88219d203f4bcac779cc7cc6a93baa95b65a8f7d55b893e437786c80fe42e0bc71b417feafbfe892cc9a250b406053c48fafb553a67d88988ded0a6c37fb1a6d04d058b557aa4585a3f5c6623ac2540a284ad27addf74f5af1fdb9e2aa128c6907a3dcbd8aed7ce7d3a1ede8d80788f8288203c8f985e8b03fcda47f7b94392b194792c19a2ee3ef4e70a42aff7a9f4344f6b9970202d296939893337d517c7097d4b0c2fc44d295ec7ab61adddf645d6b23692e6ea82a638858896d03420062b580fce66f86ed4f1b866ffb5f492e908b75fb4b0152478fc26417cf35886b56aa51151608191ec08f39994cf60bb32d93c2e01bc896ceba4e77a7679208af4b19ca92b0d89c67b738af6e3cb3a92e4a2dc19634aa2654fa668679ce3f9cb9d38158b55566578560e0a0f871a5b908dcd6e72029ae07343bb32817466e73a0910d60389f2ef85c506b825363c8bd41d5a99bf3d78a42d7ba89e17478280ccc3dc2929924fe8a01765f7e6508a03c21e8bd5dbb097b2e523b0cd0ada7542dd795da2b43ad65aa5dc0638fed8ef280e98be76fee1bc848e327d8b700ef06243256ca1bdeed456a44f5f332f92a1a7d56e5d3d0e0b7660cc093a2351f1bc9c1fc735cf895d43954b8bfdc77ae7f8fd1a3c269d4501d9739bff1c4d56ef190d5824547197bbb8c00c27a61b19f4cd7416ae98f9d7aa20029bc2bcb40fdc468bab3dadf147a5e42c733c098f7fae1a018e76fb07f763d3526f40e24f1a7e1a927e4ca19c306ad448330b0939da84e9efb265fd28c1a24b761b28febc4be65a11e4433dfcb25707538fc815afc4eae18d32325faef45a4d1faff23a97bf685604b8476baa45074f5c8a58137b4a01796f5c925763f83cf88325cc53c39a7d07f3f0e26e9d0fa3337045f9a780a84ac629395fb17de308b1374dca9af5f201a1ad16624753983e25183258c31637e9dc436076f3c9fc51c30aecce17807e1bae50ba4742c0d5eb79ee187fa1dfb599ed6077c4935f3c44bab233d88dfaf8a2ea11b7e9ac7bce9f50752681a45d4e088affd0b09cd8a971e85d923b350a085b3d9a0475e991ebefafb8be2208622c87b5d9cd73f41863d98f8bfe5fa100576015256f622e227ab3a662fade71325e962243727cd90c163957a743ebe4283c8ba9f5e8c6f69b4cbf21d2ef22b474392aac8bf7b951b70f8652582c1172aac74c95ac32ef54f222baf4eeb1e2b4cc225b73ba07a6afc2a43307a47acd4bc472a46db97df70159812c1192bad23d53c3bc381b556ba6e19365d4c501ab449796e35b615e410f9ddd771a54fe3747112ee027e532f4c268a7e8ae275b08bf5fa37946b7a607d9c9859493195f304dbfb160c2c084acdf63d84c637500b54c61c201a7d08fe8c1d5a5291a7438b6351106ebdc94432758f4273651124c9b35c5e0354f4fd64e9ed1d8d84be875c9dec4dbfd1148e0fad0c15194b0f7135df8558dfadff69d5a9bd4919fee20ca4aa886dfb9ab821b3184f6b5606720b7f2e8776874fd17dd7196523b34f1c4394e5caa082d03ebc4f83bed0e412e887be7d130017cf56ac12034b79da338ff30b2ef397a2c55f8c514eb60a4b608083a616fa8afacbcd76d63add41a6bafb61d2e4b5e5ba34604f58b5bbfceb51dd9189436c421e2239b891da081da01faff6e2e48223b6ad86158f140ee540a84cf7b72aac36d4448de5b796ced6cfc81a495df1337a4774b8f3624c4837eb78b1df5e87a8d98cdf57dd0a61aedef5c3efb6da68d250da8609d82809d85a11474f5630e70cfe66819855533884231e5e6ad5dd7efb8626b4fb29f4729702a54774444fbc247fb76da0a947a0e4dcf76433bb1afa61667c51945ce01182b170ae2fd163b20e42b18e022b0473b8d47735b5efc11d188a325ec7761a3fed83c7d4717f532d59931d3a46a339dc4b2eb6b7d4ebbb88066e4723786d4e8dff6809c4e9af5bc38175a69617741bf52bc7bdac78b23c7bf869b532fbb6fdeda83b965313b6391b377d799407f04503bab70d87c3e3a92bc13f66cc858436295d5114cea17e55023eaa68da6226f1e1305927c01bfd00b951156f909de6f7f53b3a4b11d8950c3b6a8d18354e8384d3899340fd6817a1db7a74cb68f78fd8f807d040e53f798c387762744577bddab8c6b5bab13ebd14afe4bc38eb084ff71ace4baf12ce07cd857c02993e83fb1208afd9c6a7b58e86fbfd11156d1a325e0e4985c82a8aabceba120ca7d3d61cb60d19a8b0528215b3f1f69c4b04848b0fc7ff42884d3bc65e06212d57cacd82423f76148126af270a7fe6b699c47a8443c045d2c7908c9323437f78ad13fad5e8df1368abc93ca1d8bf5fd46aace5aee7cff90413bbaa1ed038b801a72674d21a8c083bc7eca5849382450e21e822ecf300d785c90dc6b9b9bfe7dd75300abba3431f9fb837713bb4197012cd107ced3856578fa6ba15c9b6768edf9c0c3fe35c6676076553d6093ae9cb7e0e77ce02228976d6202cd6c7a9b4b329ea83cae0c876651f3c67a934d764bded2436b0fcbb756a67632b8b88b708ae54c7a48a3bd7b6ddec713579fc0f6fcff03676339c78646c185c6f241890576a2f9a2c41f871659a2deb855a2351ffac0e522224969cae68ea88f6f0d24578f45d2efbccbd2746834d314e28bf0e8b0e09e1e68f2eb16697b3616ba2809ea2de60f124712916c125608f5abdaee43c5a5762cb27f76a07368197966fa151553bc2d2293053933a47254802cfd551d8eb9b618e5f311fe202a9ac32245aa33741046e80ce9a9b11b8b64c26b6bba1167fb7242f524e4bf7b340b6583070058060acc4dcbf8890d5da773fdb3b7fcc08fb0f16c05be75eb098b6ecb96a2237ccfd1c8ae61136761ef1738161d3d72a91c764f1066945fb2fe3cfebc1aa23a5551dd48cb5f8bf98ff9a29d4ed921f01bfeab70415170ce56e44b364749ba29dd4984c1d31ebc323b99c67e5265079bef747c46f68ee11b414acd51a2339a0addfd4e106033000000000000000169534b01c61682514cebb88fc221bd67b731eec447e29c488ba4323501a3e089242af5bc639a3b3ca3ec082ff8a3d02bb30f93b088f9163a6082504413ba6e49c16ef043ba02918e87d4de25151946566697401a369ca9a3ef08bb2f7396ab4730ced372671983e49ffd4fed92aea812aeba1907e6249b479185cb802ad1caae285e078781d90323138a3e6563fc20b0803808b10ef7bec4b5246076da30322b8279f85f4bcba6ae5cf7ecffa4d89dcc23721bd247e53e06ba7da5cb31a6dfa0eed22b8b7540c4940bfb5ea576dfede97f654aec8d2a0f2c75dbf0e747b8b83f172c22cf89078f9968c46f0137c336f582ef32ee012997b807771a75d6f523b137bb412c57f76df0c93a2d30f95e2292e398eef8c5068b16d0cc9270292ae9051cfb3b7a0bf232821ff2fd31f7002eea7307e138010e3d9a88546bf4ba65ea2b596727a2488d5052b177091f36366ab2dd9c45139ed3c16dc069774ba0b46ff2699d69131bb26db4cbbb0fe2b9d8340b3f7ea86a90e934af50a32b9d9768ebddf4eb9a392d206300f4bfbc6df31a3e2d199400369b97435340d73fceffb0235a0eb542186624d57024c3238dcd05b3c785b60e722de95758d5b6665f4234019d8df12795f7d0d6e76a31621aa74fbe436cbfc4716e1644a6387ff90df4310c49350e393394c7dfa8a2ffc4f87196570b2d2b8a1e8949136ade4c36beac550c61b58588536d181fbf34d0b3c4abbbda685ebf205d53dda7ae65292594b6bc199118d0f737ccb179f5473d9c4a2ae6ff546932432631f32d61616a0174d1a01509a307a47b3e26c71df22bd5529caf863187dacabeee2174c8eabd92f722e70cc846c2a7646a1082ac0c12504f89023367b4ed367a7c616a672f461147763f20b96df0079f3ad903887a165ec77963c74b20b50a311107fb307163154bcf617863c4d64f5afd7c528a5f15d0cbf4017a6655361d44426ad6b908232f5718580285a5268b2d7c8b39639635e5a571fdde951dec3378a728556aed7ac6a7caedbe436b587f36e32dbd305d708f5906fab28737fba890ebbd9daf5aebf21c52944cc0ee3889a3d80c5e01e7f1d59fa18547a0d4dc3fc5935f44cbb613cddc3c1c3cac0cd207b139e1cdbe8ce0d0a75c12c096f9d56e88a70735b26b385af59f60e02bb1af3c7563b05d41066d4eb752dec6706439adbd083da29b1e2d200e86fe0bfc2638754c0d1fcb790376a1c1a94bb0c2c5c9d8f29f5513255beef166bbb9484b27e692daa44782df6d2a5dc2fa75e42c6275cdd26b63b39819f6e9d624782f1bd83f8a05d850f12141f73c46b51740c3ed572233db7d50cc575be518661271807c77536c1b0532c628b19ae435c96dd2f84cf4aecd78255c680a49226820764005598f25176b3fe6856d52a147af4b2c6f7fd12797208cb379837d41a015d6a96f5bf49712e094be79a3d6f08b487db70688c25506cd19dd38befb157d4b7f1a9f6c706219d8a1c1832223d742bb783ed7f09408d956edb49678cebd2e6c829b5361efcfd2d2a994f574bf7cd1199d458001298519f7496e194dc7ba9e952118353fe3f61a320d59b28b3cd9cf74c7eaf9655b8fcc19acf652d553ddaea452c01e5b9a7ff240690426fe11780a14783c2fde9987406e43039651b80dcc7578d04a33355a8e44dfa9f0178dc0d8d06fa44621b61126789ed76d8081fb77adb2819afe7878a3c6da290264cbc3838187d818e5965b3940a94bbd3efc062ac30cee02fb41d16b25b79137656df67c68c1a6046e052c555750048db6253f7189cf67237cfaa3668f6503348289aa3b3695feed56adaff3a2fc2ccf59cc6e5b19d996378cce59c516809e4fa2f0b0709c8cd6060d2e0f229c23cedc976a9c88d8fbe04d4e7f235bd06941fcfaa7c729e9c6348237e7baba55d63ddc25e98903c49a7b74b66e0e255e3faa665d422a609171ab1940088435ab26c63349a8123a9a3cc00332fa37ffd933e9ad99086bb6e094990c6d4b46338154302523a5a00a8b5c28ea808faf0f3b160ffe9de8d87e80f1d6cd08edd8129d226accf9c1d8da6bf4d03fda1128f26e3d64ea4fdec4b38ae91d7cb929d20cfcb6b8072eebbe6aaa7b2c573f717053465a4f866070b99ad82ec45dd76b8b8d738aea22d34f7e0bd60c8bfa77a592f999c61c94be974e82364ee8e118e32939e3778e1baeafa24965dfd9a91bfdcb5a15c0cbdeae28793dba7727173155402f28ea649b27791ceb97f385e57028b4d85cdd6921ca345b66006accdcc16ee77ca618ba9626afec52e5d7303ab1cb592d63b32e548da7b60a49522f4b5836180b204cb83c70ccd5e14358726c2f117dedf6a38fadf50aa64f5dfbd31402592efa821287b9924dbaaa103d619dc5901cca17769e833668fda7fb1ecd6ebdd6c7888dea32ea2b5c8f3062abe1ab2a25af3632e58d358a4bc6321544756dcef49a4752f62c0d7d8aacef1af77698e79ca62626709bf28e7caa3f4c8295fe27985bb5cc0f312a03c60b57ae8a90549b943ed4e578bfc513a0e74c6b728c85bade1929670bb6e9dc6785729aca85ae4bc62bf980f81e4210fe943e1b6cb94977251cf471cd94b4de9e44d9442166277d151a999ab566afe2ff9893b3c8091159389213c0e74f43d7bbe6c70ed29affbf8a040f3e541063424893988656f96519f9a72ea25f51653d7e51d16575b2ba03734d51063c4cd54fc486e9bbe742bbf10d1fbd3e8d697cb905bb9902f71bd4e4de7eb6de225fdeeed18ee0f9a10883d019f44846936bdb48d41d053c5994525ce04ed760bc9221a25ccf41b492b938603684348e8db7218a01523d43a48f340adf8ac3ccf75c4b7bb9354ce502caf947ca84692fa6f7710a64e07c3ff0aa15444f954e48ddcca49a77acf5f8e34ffc1125efd99fa2d788a7b576b3e3bbff1638c8b5d9bce72c9874b60f234dba99baa1231189d59c7f731b76d9f49eb734b2398d06078136142728401aafca631fbf890061e193e25519332782cd3e8fb24d86101494eb97c2662c707b316f42cf9ba01eaab1d0819f0c4f6b301336c02865bc046bec40c1e7935408cb71b70bb5c891ccbd006667eae9c695f7ab5f2565dde5c08e29bd24b878f6671999de529c7bb6117d884ad83f17db898fb1e320ffd416672652dc25669c7106b2544df522fb39d9f39c317a0f1c1bdb182bf4ed1a38eef759c5c6cc3be2cb127ac2a6da220e1082ef618bc01292e06235a1c0e5cc3dedd4ba666c02ff236a7cff7ed33be3994644891f730e97caae3481503463c54b0b5ae8a4458fd132eebb3b362ab25c04bacef08b679a90fccc2a626fc4a2ff6dfd7779ebb80a35928af17f2aaee468d2f380dba7b13ee3f83afaad2ac6c230d32fbca9921f9d727dcc9b7b0974364da60c987f81ec529ca34a8c519f71aae1a625ae427101be38e1518a09c0a41944fcf1cc11a9c9d41f5fdbecfcbb3ae0eafc407d0dd66bfa1ef4bf571649ed9ab6ddb7b840dc892c45c4838b4fa070fc5a4ad3183a499b0c033e5c3eb8565a237ccd22534ac29771da373a2007a398156229ef056dbcb3476f4081bec55d01ec46d8b970718f496dbfe451f9584e944e1c7fe2888f75599c0ae1fba19e52d502e38627524ea0594c3d60c0bd19558ced6ada165a9bcf49ad516d9c85a50243ed21cff9b7947bcf70068d2aeaffe3b30d2f7d12f7803781b367710bcdcb8579cb72ecb6b092f5bfd183a664cb105cc4cc0caebfa87f4595646417a996be02c2277c7a85e923349d373f1f35f4d8ae51c7b9012e2fbc750f53508b4e91f1c2922bf3488656620017e646cd296f7b41543490f4b9c431c6e406767fa3dc35ae04f6703460767b02d1be650068b4e8af6111841cc49f0ffb631cb2153203b15c7b90418494143050036ac5537f5f24508f2363db27b143148c2df677a463f7b00ce8ebc481889296254a3133c8281d5e6a79816dd94ab691db1792bd4cbb320122eeb778e5249b5103e9e891f105b589e136c58b27d31cbcf686207f744a7c65a8591d388891a54976fa8a2cf58aeb922316727118b5bf89f87564b10c7d101f25ed9439fd6a6c2aa74d5df2975b13b52975659dc9448b39f3a47262789df09057002b931d34a07d8454c9b9e70aed0e7b04491928a8dd7d670bb40e09a0e57db21a4d732e399ed2483e49e4072bc90063bda89e3baeccd9fb5db3d4bf0753f1e2bb8afb5aae87a305aa584c389e268a0b3f51400ca77ddc526465e2ae74ca4fcc0ce7ab5f405c03648f9c946a9762dc5cf290556d1774cc07a09d83b66575050bec08fd49e81ecb60971189a5be8870acc1ab1f86e232d3fb3751451f7b3bb43b18801af4dd7cfc50d1d350266067ef36aa7526d6311adb5e128d7e0ddcb103778b5f79ac6b19233a1b52efaaa0e7a2fadb03a7d8dd066fa1121b32677e41a112c5e555dd0f27a4dbce7100f4cd10d90e94257750c5f2f8bf4b7a9bf38241544e3c2f6c533d04147fe4cc4fd7fb1b76b46fb2e8f9e3e51b5a5f15dc6a439aeb19b231dbd032e335ab2f3902133d9055eb7d7be3d575eea822e57141e7d5353addbb48c80a0aaef328ac678c801396575f3cbd20ffb66330bfa7c1b2b495eb17ebe33723f82f5fce69f196624f9154dd168a0d51e87446e66ba0a89d1e214650c3c671998daafdad69e858e2ab8d53390e202bda39b75ee87b24cfa060ed713702467d43a7730a773e30f79e1cc511ef68e2dd55cd93c9e378f03f483f182c2d9b466833d250d04c4ce0e578213edb0445d2cc779923f1e3c763c682ae9ed14d2534996f5bd204815e93759b9f1bdb904ac74930c6d41851c9bcef7cc40787c0324e2506d8c83e5cca605be49022047c240700825e976a9eca5efe5674c1c420d47988554c3a0742a979d4902bf71e2db3591c23b01ef25cfd2f8b63548923c7e4da8e3d534595f6b126da01139b08192edc6e22a7d1a1868bd5eeb0b97eb167304472196e51b9f049278a2ed7fbc03787e0ff6c76c4e5037e378980d6a58dd46864fd4d26f07e7697fb6827fa623114881705a0f4e4e12be6ac003ad04d940a5b807c8cf3a9039ece6cb2cd6673609945af612231224c51ce91dcc5edbe1c74188cea0c2f2d34973196ff7c2a383386ef2e287f6ef2d8c68f4a96c9c939170569720bd10a7d8995e153298c2ef4fa2dee98cf2a9280f2f7bbb72d72ff7bda0e7a224ac56509a263374e70afa6da028d19e78e1c5334d9e2343a7409d59ba40e42df8bd278696a5f0c97c8d607f08c9deac2835b6d2266003ebb9643c4eda60b8d5c6dd6104f6e47809952499dec1643186b71981324ed00ec467e14a9a15c7153767c25ba9ef740a971bcda3fc84df3935bbc854ebc04e3217dc27063d2ff11a0f1c59c713deb59917c433d3546647f3e8a7260c73c045c7fa2757899af95fe79635e5f08e8f0097f6f7ae165afb6ea1bf0b52fd3e44fc60c362db6a9e9a159d59f71dd5ad499b0d094c215976ed58ffb48322b129c2e885cc6f79ab854132527ec7614b39236a6746fc9f2f9a21e9a048f4fb91dbede0186242b1abad49df200e85a4f3a766502675552c6d36a41d5f549216567ac998c634e53515ea08792486e0a08aa508a1338dfd35afbb71466032dcac9597858fa3930aac782f2e4a6032622f6979facc852cb229d7ef17d48e11a83c673f8df0d72feb0356caa70f67ffad3e92c76697405ab41fb9c895e455d6796901d7def8028fd9c40b3178704f3b29382285379ef18707725f2390fff8dd7856f68e83a6cce94b312b6e96603a7242ae3f0035857f5d0f2d414b676397493edfbff35e09ac34c86d369e3745cdee908b1fe761560f8d5a9f32fbb133b9da7202e4a9c1e';
var walletUtxoList = [{
  bip32Path: "m/44'/0'/0'/0/0",
  txid: '478e4e8ad3e316128ac4e43b0dd2473f93478c282dbf576247bf3a9ebc7c0583',
  vout: 0,
  amount: 5000000,
  valueCommitment: '08167037f11cebe46f7ad39265a319fdf75722624f02df1b2b0be69d2f7438024d',
  redeemScript: '',
  pubkey: '022d726e30e0d84bff2b1d4c7a4c3233b678fe10953cae9d913af3c27852ced80f'
}, {
  bip32Path: "m/44'/0'/0'/0/1",
  txid: '478e4e8ad3e316128ac4e43b0dd2473f93478c282dbf576247bf3a9ebc7c0583',
  vout: 1,
  amount: 5000000,
  valueCommitment: '08db2678b9730337ef1852a32f816cf8b815b4c30dacf41e22e3776c5e8732934a',
  redeemScript: '',
  pubkey: '02fcb2dc2f2c57dd2482c69a59d98d75f71f0f373713187eb8e979aafb94ed1c93'
}, {
  bip32Path: "m/44'/0'/0'/0/4",
  txid: '478e4e8ad3e316128ac4e43b0dd2473f93478c282dbf576247bf3a9ebc7c0583',
  vout: 4,
  amount: 5000000,
  valueCommitment: '09e92805ad0eb4484edec7b09dc58471f9d50c292b5360d4bbb7ed8d4d4d818dcd',
  redeemScript: '',
  pubkey: '0364049c7d19c5e3c5197698b6f81bd32b5622c640bda74111b154a2e18c9c241b'
}];
var authorizationSignature = '30440221009cf6a6f45a91e9a2488f0e28d5cf1be065c278407603d104ae53b96ce6f50807021f2e445fdb8d9bdb6d652d83c6f8c60a576f29c2e9021f5dcb76c5699f08bac1';
document.body.addEventListener("dblclick", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var h21, h22, h23, networkType, liquidLib, connRet, _yield$liquidLib$getW, publicKey, _yield$liquidLib$getX, xpubKey, signatureResult, $err;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          $main.innerHTML = initial;
          _context.prev = 1;
          // const transport = await TransportWebUSB.create();
          // transport.setDebugMode(true);
          //const appBtc = new AppBtc(transport);
          h21 = document.createElement("h2");
          h22 = document.createElement("h2");
          h23 = document.createElement("h2");
          networkType = 'liquidv1';
          liquidLib = new _ledgerLiquidLibWeb.default(networkType);
          _context.next = 9;
          return liquidLib.connect(0);

        case 9:
          connRet = _context.sent;

          if (connRet.success) {
            _context.next = 12;
            break;
          }

          throw Error(connRet.errorMessage);

        case 12:
          $main.innerHTML = "<h1>Your root Key Data:</h1>";
          _context.next = 15;
          return liquidLib.getWalletPublicKey("44'/0'/0'");

        case 15:
          _yield$liquidLib$getW = _context.sent;
          publicKey = _yield$liquidLib$getW.publicKey;
          h21.textContent = 'pubkey: ' + publicKey;
          $main.appendChild(h21);
          _context.next = 21;
          return liquidLib.getXpubKey("44'/0'/0'");

        case 21:
          _yield$liquidLib$getX = _context.sent;
          xpubKey = _yield$liquidLib$getX.xpubKey;
          h22.textContent = 'xpub: ' + xpubKey;
          $main.appendChild(h22);
          h23.textContent = 'getSignature requested.';
          $main.appendChild(h23);
          _context.next = 29;
          return liquidLib.getSignature(proposalTx, walletUtxoList, authorizationSignature);

        case 29:
          signatureResult = _context.sent;
          h23.textContent = 'getSignature success.';
          console.log('signatureResult:', JSON.stringify(signatureResult, function (key, value) {
            return typeof value === 'bigint' ? value.toString() : value;
          }, '  ')); // await appBtc.getWalletPublicKey("44'/0'/0'/0/0", true);

          return _context.abrupt("return", false);

        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](1);
          $err = document.createElement("code");
          $err.style.color = "#f66";
          $err.textContent = String(_context.t0.message || _context.t0);
          $main.appendChild($err);
          console.log(_context.t0);

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 35]]);
})));
},{"babel-polyfill":"../node_modules/babel-polyfill/lib/index.js","@ledgerhq/hw-transport-webusb":"../node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js","ledger-liquid-lib-web":"../node_modules/ledger-liquid-lib-web/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55019" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","renderer.js"], null)
//# sourceMappingURL=./renderer.3db12799.js.map