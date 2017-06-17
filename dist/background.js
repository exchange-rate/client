/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(8);

var _index2 = _interopRequireDefault(_index);

var _icon = __webpack_require__(7);

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
	_index2.default.yandex.update().then(function (data) {
		console.log(data);

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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _rbc = __webpack_require__(10);

var _rbc2 = _interopRequireDefault(_rbc);

var _yandex = __webpack_require__(11);

var _yandex2 = _interopRequireDefault(_yandex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import moex from './moex'
exports.default = {
	yandex: _yandex2.default,
	rbc: _rbc2.default
};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var URL = 'http://www.rbc.ru/ajax/indicators';
var USD_URL = 'http://www.rbc.ru/money_graph/latest/59111';
var EUR_URL = 'http://www.rbc.ru/money_graph/latest/59090';

exports.default = {
	update: function update() {
		function mapChart(data) {
			return data.data.map(function (item) {
				return {
					date: new Date(item.date),
					value: item.value
				};
			});
		}

		return new Promise(function (resolve, reject) {
			Promise.all([fetch(USD_URL), fetch(EUR_URL)]).then(function (results) {
				return Promise.all(results.map(function (response) {
					return response.json();
				}));
			}).then(function (dataArray) {
				resolve({
					usd: mapChart(dataArray[0]),
					eur: mapChart(dataArray[1])
				});
			}).catch(function () {
				reject();
			});
		});
	},
	getDetailed: function getDetailed() {
		function convertResponse(data) {
			// let date = new Date(item.date);
			return data.data.map(function (item) {
				// let date = new Date(item.date);
				return {
					// date: date.getHours() + ':' + pad(date.getMinutes(), 2),
					date: new Date(item.date),
					value: item.value.toFixed(2)
				};
			});
		}

		return new Promise(function (resolve, reject) {
			Promise.all([fetch(USD_URL), fetch(EUR_URL)]).then(function (results) {
				return Promise.all(results.map(function (response) {
					return response.json();
				}));
			}).then(function (dataArray) {
				return resolve({
					usd: convertResponse(dataArray[0]),
					eur: convertResponse(dataArray[1])
				});
			}).catch(function () {
				reject();
			});
		});
	}
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var USD_URL = 'https://news.yandex.ru/quotes/graph_3005.json';
var EUR_URL = 'https://news.yandex.ru/quotes/graph_3027.json';

function takeRight(array, count) {
	return array.slice(Math.max(array.length - count, 1));
}

exports.default = {
	update: function update() {
		function mapChart(data) {
			return takeRight(data.prices, 1).map(function (item) {
				var _item = _slicedToArray(item, 2),
				    date = _item[0],
				    value = _item[1];

				return {
					date: new Date(date),
					value: value
				};
			});
		}

		return new Promise(function (resolve, reject) {
			Promise.all([fetch(USD_URL), fetch(EUR_URL)]).then(function (results) {
				return Promise.all(results.map(function (response) {
					return response.json();
				}));
			}).then(function (dataArray) {
				var _dataArray = _slicedToArray(dataArray, 2),
				    usd = _dataArray[0],
				    eur = _dataArray[1];

				resolve({
					usd: mapChart(usd),
					eur: mapChart(eur)
				});
			}).catch(function () {
				reject();
			});
		});
	},
	getDetailed: function getDetailed() {
		function convertResponse(data) {
			return takeRight(data.prices, 30).map(function (item) {
				var _item2 = _slicedToArray(item, 2),
				    date = _item2[0],
				    value = _item2[1];

				return {
					date: new Date(date),
					value: value.toFixed(2)
				};
			});
		}

		return new Promise(function (resolve, reject) {
			Promise.all([fetch(USD_URL), fetch(EUR_URL)]).then(function (results) {
				return Promise.all(results.map(function (response) {
					return response.json();
				}));
			}).then(function (dataArray) {
				return resolve({
					usd: convertResponse(dataArray[0]),
					eur: convertResponse(dataArray[1])
				});
			}).catch(function () {
				reject();
			});
		});
	}
};

/***/ })
/******/ ]);