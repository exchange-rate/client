/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 193:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 194:
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
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
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
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

exports.isBuffer = __webpack_require__(194);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(193);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(196), __webpack_require__(0)))

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ratio = window.devicePixelRatio || 1;
var defaultTextSize = 10;
var fontWeight = 'bold';
var fontFamily = 'Verdana';
var canvasWidth = 19;
var canvasHeight = 19;
var colors = {
	DEFAULT: 'black',
	COURSE_UP: '#008d45',
	COURSE_DOWN: '#d0021b'
};

function shortenPrice(price) {
	return price.toString().substring(0, 4);
}

function setCourseColor(newCourse, oldCourse) {
	if (newCourse > oldCourse) {
		return colors.COURSE_UP;
		/*} else if (newCourse === oldCourse) {
   return colors.DEFAULT;*/
	} else {
		return colors.COURSE_DOWN;
	}
}

var canvas = document.createElement('canvas');
canvas.width = canvasWidth * ratio;
canvas.height = canvasHeight * ratio;

var ctx = canvas.getContext('2d');
ctx.scale(ratio, ratio);

// let data = null;
// let values = null;
var lastValues = null;

function update(values) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = fontWeight + ' ' + defaultTextSize + 'px ' + fontFamily;
	var textWidths = Object.keys(values).map(function (key) {
		return ctx.measureText(shortenPrice(values[key])).width;
	});
	var longestTextWidth = Math.max.apply(Math, _toConsumableArray(textWidths));
	var textSize = defaultTextSize * canvasWidth / longestTextWidth;
	ctx.font = fontWeight + ' ' + textSize + 'px ' + fontFamily;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = lastValues ? setCourseColor(values.usd, lastValues.usd) : colors.DEFAULT;
	ctx.fillText(shortenPrice(values.usd), canvasWidth / 2, textSize / 2);
	ctx.fillStyle = lastValues ? setCourseColor(values.eur, lastValues.eur) : colors.DEFAULT;
	ctx.fillText(shortenPrice(values.eur), canvasWidth / 2, canvasHeight - textSize / 2);

	chrome.browserAction.setIcon({
		imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
	});

	chrome.browserAction.setTitle({
		title: ['USD \u2014 ' + values.usd, 'EUR \u2014 ' + values.eur, 'Кликните для показа динамики'].join('\n')
	});

	lastValues = values;
}

exports.default = {
	update: update
};

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dynamoConverters = __webpack_require__(92);

var _dynamoConverters2 = _interopRequireDefault(_dynamoConverters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var awsKey = 'n2ZKFrQL5Z5YNKb3tio4j4vtwPUVTrOi7hTveQnJ';
var startDate = new Date(2017, 4, 12);
var endDate = new Date(2017, 4, 9);

function formatDate(date) {
	return date.toISOString().slice(0, 10);
}

var url = 'https://mc010i3rae.execute-api.eu-central-1.amazonaws.com/prod/exchange?before_date=' + formatDate(startDate) + '&after_date=' + formatDate(endDate);
var request = new Request(url, {
	headers: new Headers({
		'x-api-key': awsKey
	})
});

exports.default = {
	update: function update() {
		return fetch(request).then(function (response) {
			return response.json();
		}).then(function (data) {
			var result = {
				usd: [],
				eur: []
			};

			data.Items.forEach(function (awsItem) {
				var item = _dynamoConverters2.default.itemToData(awsItem);
				var date = new Date(item.date);

				result.usd.push({
					date: date,
					value: item.currencies.USDRUB.rate
				});

				result.eur.push({
					date: date,
					value: item.currencies.EURRUB.rate
				});
			});

			return result;
		});
	}
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _aws = __webpack_require__(85);

var _aws2 = _interopRequireDefault(_aws);

var _icon = __webpack_require__(84);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const startTimeout = .1 * 60 * 1000; //15000;
var okIntervalTime = .2 * 60 * 1000;
var errorIntervalTime = .4 * 60 * 1000;

function updateIcon(values) {
	// console.log('values', values);
	_icon2.default.update({
		usd: values.usd[values.usd.length - 1].value,
		eur: values.eur[values.eur.length - 1].value
	});
}

chrome.storage.local.get(function (data) {
	// console.log('get', data);
	if (data.currencyList) {
		updateIcon(data.currencyList);
	}
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	// console.log('changed', changes);
	if (changes.currencyList && changes.currencyList.newValue && namespace === 'local') {
		updateIcon(changes.currencyList.newValue);
	}
});

setTimeout(function interval() {
	_aws2.default.update().then(function (data) {
		data.usd.forEach(function (item) {
			item.date = Number(item.date);
		});
		data.eur.forEach(function (item) {
			item.date = Number(item.date);
		});
		chrome.storage.local.set({ currencyList: data }, function () {
			console.log('saved');
		});
		setTimeout(interval, okIntervalTime);
	}).catch(function () {
		setTimeout(interval, errorIntervalTime);
	});
}, 2000);

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

const reservedWords = __webpack_require__(93);
const util = __webpack_require__(195);

function convert (value) {
    if (value === null) {
        return {
            NULL: true
        };
    }

    if (typeof value === 'boolean') {
        return {
            BOOL: value
        };
    }

    if (typeof value === 'number') {
        return {
            N: value.toString()
        };
    }

    if (typeof value === 'string') {
        return {
            S: value
        };
    }

    if (util.isArray(value)) {
        return {
            L: value.map(convert)
        };
    }

    if (typeof value === 'object') {
        const map = {};

        for (const key in value) {
            if (value[key] !== undefined) {
                map[key] = convert(value[key]);
            }
        }

        return {
            M: map
        };
    }

    throw new Error('Unsupported data type');
}

function isReservedWord (property) {
    return reservedWords.some(function (reservedWord) {
        return reservedWord === property.toUpperCase();
    });
}

function formStatement (property, expressionAttributeNames) {
    if (isReservedWord(property)) {
        expressionAttributeNames['#' + property] = property;

        return '#' + property + ' = :' + property;
    }

    return property + ' = :' + property;
}

module.exports = {

    dataToItem: function (data) { // eslint-disable-line object-shorthand
        const item = {};
        const now = Date.now();

        for (const property in data) {
            if (data[property] !== undefined) {
                item[property] = convert(data[property]);
            }
        }

        item.created = {
            N: now.toString()
        };
        item.modified = {
            N: now.toString()
        };

        return item;
    },

    deltaToExpression: function (delta) { // eslint-disable-line object-shorthand
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};
        const removeStatements = [];
        const setStatements = [];
        const updateExpressions = [];

        setStatements.push('modified = :modified');
        expressionAttributeValues[':modified'] = {
            N: Date.now().toString()
        };

        for (const property in delta) {
            const value = delta[property];

            if (value === undefined) {
                if (isReservedWord(property)) {
                    expressionAttributeNames['#' + property] = property;
                    removeStatements.push('#' + property);
                } else {
                    removeStatements.push(property);
                }
            } else if (typeof value === 'boolean' ||
                    typeof value === 'number' ||
                    typeof value === 'string' ||
                    typeof value === 'object') {
                setStatements.push(formStatement(property, expressionAttributeNames));
                expressionAttributeValues[':' + property] = convert(value);
            }
        }

        if (removeStatements.length > 0) {
            updateExpressions.push('REMOVE ' + removeStatements.join(', '));
        }
        if (setStatements.length > 0) {
            updateExpressions.push('SET ' + setStatements.join(', '));
        }

        return {
            expressionAttributeNames: (Object.keys(expressionAttributeNames).length > 0) ? expressionAttributeNames : undefined,
            expressionAttributeValues: expressionAttributeValues, // eslint-disable-line object-shorthand
            updateExpression: updateExpressions.join(' ')
        };
    },

    itemToData: function (item) { // eslint-disable-line object-shorthand
        const data = {};

        function parse (value) {
            if (value.BOOL !== undefined) {
                return value.BOOL;
            }

            if (value.L !== undefined) {
                return value.L.map(parse);
            }

            if (value.M !== undefined) {
                const map = {};

                for (const key in value.M) {
                    map[key] = parse(value.M[key]);
                }

                return map;
            }

            if (value.N !== undefined) {
                if (value.N.match(/\./)) {
                    return parseFloat(value.N);
                }

                return parseInt(value.N, 10);
            }

            if (value.NULL === true) {
                return null;
            }

            if (value.S !== undefined) {
                return value.S;
            }

            throw new Error('Unsupported data type');
        }

        for (const property in item) {
            if (item[property] !== undefined) {
                data[property] = parse(item[property]);
            }
        }

        return data;
    }

};


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

module.exports = [
	"ABORT",
	"ABSOLUTE",
	"ACTION",
	"ADD",
	"AFTER",
	"AGENT",
	"AGGREGATE",
	"ALL",
	"ALLOCATE",
	"ALTER",
	"ANALYZE",
	"AND",
	"ANY",
	"ARCHIVE",
	"ARE",
	"ARRAY",
	"AS",
	"ASC",
	"ASCII",
	"ASENSITIVE",
	"ASSERTION",
	"ASYMMETRIC",
	"AT",
	"ATOMIC",
	"ATTACH",
	"ATTRIBUTE",
	"AUTH",
	"AUTHORIZATION",
	"AUTHORIZE",
	"AUTO",
	"AVG",
	"BACK",
	"BACKUP",
	"BASE",
	"BATCH",
	"BEFORE",
	"BEGIN",
	"BETWEEN",
	"BIGINT",
	"BINARY",
	"BIT",
	"BLOB",
	"BLOCK",
	"BOOLEAN",
	"BOTH",
	"BREADTH",
	"BUCKET",
	"BULK",
	"BY",
	"BYTE",
	"CALL",
	"CALLED",
	"CALLING",
	"CAPACITY",
	"CASCADE",
	"CASCADED",
	"CASE",
	"CAST",
	"CATALOG",
	"CHAR",
	"CHARACTER",
	"CHECK",
	"CLASS",
	"CLOB",
	"CLOSE",
	"CLUSTER",
	"CLUSTERED",
	"CLUSTERING",
	"CLUSTERS",
	"COALESCE",
	"COLLATE",
	"COLLATION",
	"COLLECTION",
	"COLUMN",
	"COLUMNS",
	"COMBINE",
	"COMMENT",
	"COMMIT",
	"COMPACT",
	"COMPILE",
	"COMPRESS",
	"CONDITION",
	"CONFLICT",
	"CONNECT",
	"CONNECTION",
	"CONSISTENCY",
	"CONSISTENT",
	"CONSTRAINT",
	"CONSTRAINTS",
	"CONSTRUCTOR",
	"CONSUMED",
	"CONTINUE",
	"CONVERT",
	"COPY",
	"CORRESPONDING",
	"COUNT",
	"COUNTER",
	"CREATE",
	"CROSS",
	"CUBE",
	"CURRENT",
	"CURSOR",
	"CYCLE",
	"DATA",
	"DATABASE",
	"DATE",
	"DATETIME",
	"DAY",
	"DEALLOCATE",
	"DEC",
	"DECIMAL",
	"DECLARE",
	"DEFAULT",
	"DEFERRABLE",
	"DEFERRED",
	"DEFINE",
	"DEFINED",
	"DEFINITION",
	"DELETE",
	"DELIMITED",
	"DEPTH",
	"DEREF",
	"DESC",
	"DESCRIBE",
	"DESCRIPTOR",
	"DETACH",
	"DETERMINISTIC",
	"DIAGNOSTICS",
	"IRECTORIES",
	"DISABLE",
	"DISCONNECT",
	"DISTINCT",
	"DISTRIBUTE",
	"DO",
	"DOMAIN",
	"DOUBLE",
	"DROP",
	"DUMP",
	"DURATION",
	"DYNAMIC",
	"EACH",
	"ELEMENT",
	"ELSE",
	"ELSEIF",
	"EMPTY",
	"ENABLE",
	"END",
	"EQUAL",
	"EQUALS",
	"ERROR",
	"ESCAPE",
	"ESCAPED",
	"EVAL",
	"EVALUATE",
	"EXCEEDED",
	"EXCEPT",
	"EXCEPTION",
	"EXCEPTIONS",
	"EXCLUSIVE",
	"EXEC",
	"EXECUTE",
	"EXISTS",
	"EXIT",
	"EXPLAIN",
	"EXPLODE",
	"EXPORT",
	"EXPRESSION",
	"EXTENDED",
	"EXTERNAL",
	"EXTRACT",
	"FAIL",
	"FALSE",
	"FAMILY",
	"FETCH",
	"FIELDS",
	"FILE",
	"FILTER",
	"FILTERING",
	"FINAL",
	"FINISH",
	"FIRST",
	"FIXED",
	"FLATTERN",
	"FLOAT",
	"FOR",
	"FORCE",
	"FOREIGN",
	"FORMAT",
	"FORWARD",
	"FOUND",
	"FREE",
	"FROM",
	"FUNCTION",
	"FUNCTIONS",
	"GENERAL",
	"GENERATE",
	"GET",
	"GLOB",
	"GLOBAL",
	"GO",
	"GOTO",
	"GRANT",
	"GREATER",
	"GROUP",
	"GROUPING",
	"HANDLER",
	"HASH",
	"HAVE",
	"HAVING",
	"HEAP",
	"HIDDEN",
	"HOLD",
	"HOUR",
	"IDENTIFIED",
	"IDENTITY",
	"IF",
	"IGNORE",
	"IMMEDIATE",
	"IMPORT",
	"IN",
	"INCLUDING",
	"INCLUSIVE",
	"INCREMENT",
	"INCREMENTAL",
	"INDEX",
	"INDEXED",
	"INDEXES",
	"INDICATOR",
	"INFINITE",
	"INITIALLY",
	"INLINE",
	"INNER",
	"INNTER",
	"INOUT",
	"INPUT",
	"INSENSITIVE",
	"INSERT",
	"INSTEAD",
	"INT",
	"INTEGER",
	"INTERSECT",
	"INTERVAL",
	"INTO",
	"INVALIDATE",
	"IS",
	"ISOLATION",
	"ITEM",
	"ITEMS",
	"ITERATE",
	"JOIN",
	"KEY",
	"KEYS",
	"LAG",
	"LANGUAGE",
	"LARGE",
	"LAST",
	"LATERAL",
	"LEAD",
	"LEADING",
	"LEAVE",
	"LEFT",
	"LENGTH",
	"LESS",
	"LEVEL",
	"LIKE",
	"LIMIT",
	"LIMITED",
	"LINES",
	"LIST",
	"LOAD",
	"LOCAL",
	"LOCALTIME",
	"LOCALTIMESTAMP",
	"LOCATION",
	"LOCATOR",
	"LOCK",
	"LOCKS",
	"LOG",
	"LOGED",
	"LONG",
	"LOOP",
	"LOWER",
	"MAP",
	"MATCH",
	"MATERIALIZED",
	"MAX",
	"MAXLEN",
	"MEMBER",
	"MERGE",
	"METHOD",
	"METRICS",
	"MIN",
	"MINUS",
	"MINUTE",
	"MISSING",
	"MOD",
	"MODE",
	"MODIFIES",
	"MODIFY",
	"MODULE",
	"MONTH",
	"MULTI",
	"MULTISET",
	"NAME",
	"NAMES",
	"NATIONAL",
	"NATURAL",
	"NCHAR",
	"NCLOB",
	"NEW",
	"NEXT",
	"NO",
	"NONE",
	"NOT",
	"NULL",
	"NULLIF",
	"NUMBER",
	"NUMERIC",
	"OBJECT",
	"OF",
	"OFFLINE",
	"OFFSET",
	"OLD",
	"ON",
	"ONLINE",
	"ONLY",
	"OPAQUE",
	"OPEN",
	"OPERATOR",
	"OPTION",
	"OR",
	"ORDER",
	"ORDINALITY",
	"OTHER",
	"OTHERS",
	"OUT",
	"OUTER",
	"OUTPUT",
	"OVER",
	"OVERLAPS",
	"OVERRIDE",
	"OWNER",
	"PAD",
	"PARALLEL",
	"PARAMETER",
	"PARAMETERS",
	"PARTIAL",
	"PARTITION",
	"PARTITIONED",
	"PARTITIONS",
	"PATH",
	"PERCENT",
	"PERCENTILE",
	"PERMISSION",
	"PERMISSIONS",
	"PIPE",
	"PIPELINED",
	"PLAN",
	"POOL",
	"POSITION",
	"PRECISION",
	"PREPARE",
	"PRESERVE",
	"PRIMARY",
	"PRIOR",
	"PRIVATE",
	"PRIVILEGES",
	"PROCEDURE",
	"PROCESSED",
	"PROJECT",
	"PROJECTION",
	"PROPERTY",
	"PROVISIONING",
	"PUBLIC",
	"PUT",
	"QUERY",
	"QUIT",
	"QUORUM",
	"RAISE",
	"RANDOM",
	"RANGE",
	"RANK",
	"RAW",
	"READ",
	"READS",
	"REAL",
	"REBUILD",
	"RECORD",
	"RECURSIVE",
	"REDUCE",
	"REF",
	"REFERENCE",
	"REFERENCES",
	"REFERENCING",
	"REGEXP",
	"REGION",
	"REINDEX",
	"RELATIVE",
	"RELEASE",
	"REMAINDER",
	"RENAME",
	"REPEAT",
	"REPLACE",
	"REQUEST",
	"RESET",
	"RESIGNAL",
	"RESOURCE",
	"RESPONSE",
	"RESTORE",
	"RESTRICT",
	"RESULT",
	"RETURN",
	"RETURNING",
	"RETURNS",
	"REVERSE",
	"REVOKE",
	"RIGHT",
	"ROLE",
	"ROLES",
	"ROLLBACK",
	"ROLLUP",
	"ROUTINE",
	"ROW",
	"ROWS",
	"RULE",
	"RULES",
	"SAMPLE",
	"SATISFIES",
	"SAVE",
	"SAVEPOINT",
	"SCAN",
	"SCHEMA",
	"SCOPE",
	"SCROLL",
	"SEARCH",
	"SECOND",
	"SECTION",
	"SEGMENT",
	"SEGMENTS",
	"SELECT",
	"SELF",
	"SEMI",
	"SENSITIVE",
	"SEPARATE",
	"SEQUENCE",
	"SERIALIZABLE",
	"SESSION",
	"SET",
	"SETS",
	"SHARD",
	"SHARE",
	"SHARED",
	"SHORT",
	"SHOW",
	"SIGNAL",
	"SIMILAR",
	"SIZE",
	"SKEWED",
	"SMALLINT",
	"SNAPSHOT",
	"SOME",
	"SOURCE",
	"SPACE",
	"SPACES",
	"SPARSE",
	"SPECIFIC",
	"SPECIFICTYPE",
	"SPLIT",
	"SQL",
	"SQLCODE",
	"SQLERROR",
	"SQLEXCEPTION",
	"SQLSTATE",
	"SQLWARNING",
	"START",
	"STATE",
	"STATIC",
	"STATUS",
	"STORAGE",
	"STORE",
	"STORED",
	"STREAM",
	"STRING",
	"STRUCT",
	"STYLE",
	"SUB",
	"SUBMULTISET",
	"SUBPARTITION",
	"SUBSTRING",
	"SUBTYPE",
	"SUM",
	"SUPER",
	"SYMMETRIC",
	"SYNONYM",
	"SYSTEM",
	"TABLE",
	"TABLESAMPLE",
	"TEMP",
	"TEMPORARY",
	"TERMINATED",
	"TEXT",
	"THAN",
	"THEN",
	"THROUGHPUT",
	"TIME",
	"TIMESTAMP",
	"TIMEZONE",
	"TINYINT",
	"TO",
	"TOKEN",
	"TOTAL",
	"TOUCH",
	"TRAILING",
	"TRANSACTION",
	"TRANSFORM",
	"TRANSLATE",
	"TRANSLATION",
	"TREAT",
	"TRIGGER",
	"TRIM",
	"TRUE",
	"TRUNCATE",
	"TTL",
	"TUPLE",
	"TYPE",
	"UNDER",
	"UNDO",
	"UNION",
	"UNIQUE",
	"UNIT",
	"UNKNOWN",
	"UNLOGGED",
	"UNNEST",
	"UNPROCESSED",
	"UNSIGNED",
	"UNTIL",
	"UPDATE",
	"UPPER",
	"URL",
	"USAGE",
	"USE",
	"USER",
	"USERS",
	"USING",
	"UUID",
	"VACUUM",
	"VALUE",
	"VALUED",
	"VALUES",
	"VARCHAR",
	"VARIABLE",
	"VARIANCE",
	"VARINT",
	"VARYING",
	"VIEW",
	"VIEWS",
	"VIRTUAL",
	"VOID",
	"WAIT",
	"WHEN",
	"WHENEVER",
	"WHERE",
	"WHILE",
	"WINDOW",
	"WITH",
	"WITHIN",
	"WITHOUT",
	"WORK",
	"WRAPPED",
	"WRITE",
	"YEAR",
	"ZONE"
];

/***/ })

/******/ });