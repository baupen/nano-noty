(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Noty"] = factory();
	else
		root["Noty"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js"
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultMaxVisible: () => (/* binding */ DefaultMaxVisible),
/* harmony export */   Defaults: () => (/* binding */ Defaults),
/* harmony export */   Queue: () => (/* binding */ Queue),
/* harmony export */   Store: () => (/* binding */ Store),
/* harmony export */   addToQueue: () => (/* binding */ addToQueue),
/* harmony export */   build: () => (/* binding */ build),
/* harmony export */   closeFlow: () => (/* binding */ closeFlow),
/* harmony export */   dequeueClose: () => (/* binding */ dequeueClose),
/* harmony export */   ghostFix: () => (/* binding */ ghostFix),
/* harmony export */   openFlow: () => (/* binding */ openFlow),
/* harmony export */   queueClose: () => (/* binding */ queueClose),
/* harmony export */   queueRender: () => (/* binding */ queueRender),
/* harmony export */   removeFromQueue: () => (/* binding */ removeFromQueue)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/utils.js");

var DefaultMaxVisible = 5;
var Queue = {
  currentlyVisible: 0,
  maxVisible: DefaultMaxVisible,
  queue: []
};
var Store = {};
var Defaults = {
  type: 'alert',
  layout: 'topRight',
  theme: 'boostrap-v5',
  text: '',
  timeout: false,
  progressBar: true,
  animation: {
    open: 'noty_effects_open',
    close: 'noty_effects_close'
  },
  id: false,
  first: false,
  container: false
};

/**
 * @param {Noty} ref
 * @return {void}
 */
function addToQueue(ref) {
  Queue.queue.push(ref);
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function removeFromQueue(ref) {
  Queue.queue = Queue.queue.filter(function (i) {
    return i.id !== ref.id;
  });
}

/**
 * @return {void}
 */
function queueRender() {
  var noty = Queue.queue.shift();
  if (noty) noty.show();
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function ghostFix(ref) {
  var ghostID = utils__WEBPACK_IMPORTED_MODULE_0__.generateID('ghost');
  var ghost = document.createElement('div');
  ghost.setAttribute('id', ghostID);
  utils__WEBPACK_IMPORTED_MODULE_0__.css(ghost, {
    height: utils__WEBPACK_IMPORTED_MODULE_0__.outerHeight(ref.barDom) + 'px'
  });
  ref.barDom.insertAdjacentHTML('afterend', ghost.outerHTML);
  utils__WEBPACK_IMPORTED_MODULE_0__.remove(ref.barDom);
  ghost = document.getElementById(ghostID);
  utils__WEBPACK_IMPORTED_MODULE_0__.addClass(ghost, 'noty_fix_effects_height');
  utils__WEBPACK_IMPORTED_MODULE_0__.addListener(ghost, 'animationend', function () {
    utils__WEBPACK_IMPORTED_MODULE_0__.remove(ghost);
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function build(ref) {
  findOrCreateContainer(ref);
  var markup = "<div class=\"noty_body\">".concat(ref.options.text, "</div><div class=\"noty_progressbar\"></div>");
  ref.barDom = document.createElement('div');
  ref.barDom.setAttribute('id', ref.id);
  utils__WEBPACK_IMPORTED_MODULE_0__.addClass(ref.barDom, "noty_bar noty_type__".concat(ref.options.type, " noty_theme__").concat(ref.options.theme));
  ref.barDom.innerHTML = markup;
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function findOrCreateContainer(ref) {
  if (ref.options.container) {
    ref.layoutDom = document.querySelector(ref.options.container);
    return;
  }
  var layoutID = "noty_layout__".concat(ref.options.layout);
  ref.layoutDom = document.querySelector("div#".concat(layoutID));
  if (!ref.layoutDom) {
    ref.layoutDom = document.createElement('div');
    ref.layoutDom.setAttribute('id', layoutID);
    ref.layoutDom.setAttribute('role', 'alert');
    ref.layoutDom.setAttribute('aria-live', 'polite');
    utils__WEBPACK_IMPORTED_MODULE_0__.addClass(ref.layoutDom, 'noty_layout');
    document.querySelector('body').appendChild(ref.layoutDom);
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function queueClose(ref) {
  if (ref.options.timeout) {
    if (ref.options.progressBar && ref.progressDom) {
      utils__WEBPACK_IMPORTED_MODULE_0__.css(ref.progressDom, {
        transition: "width ".concat(ref.options.timeout, "ms linear"),
        width: '0%'
      });
    }
    clearTimeout(ref.closeTimer);
    ref.closeTimer = setTimeout(function () {
      ref.close();
    }, ref.options.timeout);
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function dequeueClose(ref) {
  if (ref.options.timeout && ref.closeTimer) {
    clearTimeout(ref.closeTimer);
    ref.closeTimer = -1;
    if (ref.options.progressBar && ref.progressDom) {
      utils__WEBPACK_IMPORTED_MODULE_0__.css(ref.progressDom, {
        transition: 'width 0ms linear',
        width: '100%'
      });
    }
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function openFlow(ref) {
  queueClose(ref);
  utils__WEBPACK_IMPORTED_MODULE_0__.addListener(ref.barDom, 'mouseenter', function () {
    dequeueClose(ref);
  });
  utils__WEBPACK_IMPORTED_MODULE_0__.addListener(ref.barDom, 'mouseleave', function () {
    queueClose(ref);
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function closeFlow(ref) {
  delete Store[ref.id];
  ref.closing = false;
  utils__WEBPACK_IMPORTED_MODULE_0__.remove(ref.barDom);
  if (ref.layoutDom.querySelectorAll('.noty_bar').length === 0 && !ref.options.container) {
    utils__WEBPACK_IMPORTED_MODULE_0__.remove(ref.layoutDom);
  }
  queueRender();
}

/***/ },

/***/ "./src/utils.js"
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   addListener: () => (/* binding */ addListener),
/* harmony export */   classList: () => (/* binding */ classList),
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   deepExtend: () => (/* binding */ _deepExtend),
/* harmony export */   generateID: () => (/* binding */ generateID),
/* harmony export */   hasClass: () => (/* binding */ hasClass),
/* harmony export */   outerHeight: () => (/* binding */ outerHeight),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   removeClass: () => (/* binding */ removeClass)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _deepExtend = function deepExtend(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    if (!obj) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          out[key] = obj[key];
        } else if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
          out[key] = _deepExtend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }
  return out;
};

function generateID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var id = "noty_".concat(prefix, "_");
  id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return id;
}
function outerHeight(el) {
  var height = el.offsetHeight;
  var style = window.getComputedStyle(el);
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}
var css = function () {
  var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
  var cssProps = {};
  function camelCase(string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
      return letter.toUpperCase();
    });
  }
  function getVendorProp(name) {
    var style = document.body.style;
    if (name in style) return name;
    var i = cssPrefixes.length;
    var capName = name.charAt(0).toUpperCase() + name.slice(1);
    var vendorName;
    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style) return vendorName;
    }
    return name;
  }
  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }
  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }
  return function (element, properties) {
    var args = arguments;
    var prop;
    var value;
    if (args.length === 2) {
      for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) {
            applyCss(element, prop, value);
          }
        }
      }
    } else {
      applyCss(element, args[1], args[2]);
    }
  };
}();
function addListener(el, events, cb) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  events = events.split(' ');
  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      el.addEventListener(events[i], cb, useCapture);
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb);
    }
  }
}
function hasClass(element, name) {
  var list = typeof element === 'string' ? element : classList(element);
  return list.indexOf(' ' + name + ' ') >= 0;
}
function addClass(element, name) {
  var oldList = classList(element);
  var newList = oldList + name;
  if (hasClass(oldList, name)) return;

  // Trim the opening space.
  element.className = newList.substring(1);
}
function removeClass(element, name) {
  var oldList = classList(element);
  var newList;
  if (!hasClass(element, name)) return;

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ');

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1);
}
function remove(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
function classList(element) {
  return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
}
function getExtension(fileName) {
  return fileName.match(/\.([^.]+)$/)[1];
}

/***/ },

/***/ "./src/noty.scss"
/*!***********************!*\
  !*** ./src/noty.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Noty)
/* harmony export */ });
/* harmony import */ var noty_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! noty.scss */ "./src/noty.scss");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils */ "./src/utils.js");
/* harmony import */ var api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api */ "./src/api.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var Noty = /*#__PURE__*/function () {
  /**
   * @param {object} options
   * @return {Noty}
   */
  function Noty() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Noty);
    this.options = utils__WEBPACK_IMPORTED_MODULE_1__.deepExtend({}, api__WEBPACK_IMPORTED_MODULE_2__.Defaults, options);
    if (api__WEBPACK_IMPORTED_MODULE_2__.Store[this.options.id]) {
      return api__WEBPACK_IMPORTED_MODULE_2__.Store[this.options.id];
    }
    this.id = this.options.id || utils__WEBPACK_IMPORTED_MODULE_1__.generateID('bar');
    this.closeTimer = -1;
    this.barDom = null;
    this.layoutDom = null;
    this.progressDom = null;
    this.showing = false;
    this.shown = false;
    this.closed = false;
    this.closing = false;
    this.promises = {
      show: null,
      close: null
    };
    return this;
  }

  /**
   * @return {Noty}
   */
  return _createClass(Noty, [{
    key: "show",
    value: function show() {
      var _this = this;
      if (this.showing || this.shown) {
        return this; // preventing multiple show
      }
      if (api__WEBPACK_IMPORTED_MODULE_2__.Queue.currentlyVisible >= api__WEBPACK_IMPORTED_MODULE_2__.Queue.maxVisible) {
        api__WEBPACK_IMPORTED_MODULE_2__.addToQueue(this);
        return this;
      }
      api__WEBPACK_IMPORTED_MODULE_2__.Store[this.id] = this;
      this.showing = true;
      api__WEBPACK_IMPORTED_MODULE_2__.Queue.currentlyVisible++;
      if (this.closing) {
        this.showing = false;
        return this;
      }
      api__WEBPACK_IMPORTED_MODULE_2__.build(this);
      if (this.options.first) {
        this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
      } else {
        this.layoutDom.appendChild(this.barDom);
      }
      this.shown = true;
      this.closed = false;
      this.progressDom = this.barDom.querySelector('.noty_progressbar');
      utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, 'noty_close_with_click');
      utils__WEBPACK_IMPORTED_MODULE_1__.addListener(this.barDom, 'click', function (e) {
        e.stopPropagation();
        _this.close();
      }, false);
      if (this.options.timeout) {
        utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, 'noty_has_timeout');
      }
      if (this.options.progressBar) {
        utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, 'noty_has_progressbar');
      }
      utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, this.options.animation.open);
      this.promises.show = new Promise(function (resolve) {
        utils__WEBPACK_IMPORTED_MODULE_1__.addListener(_this.barDom, 'animationend', function () {
          utils__WEBPACK_IMPORTED_MODULE_1__.removeClass(_this.barDom, _this.options.animation.open);
          resolve();
        });
      });
      this.promises.show.then(function () {
        var _t = _this;
        setTimeout(function () {
          api__WEBPACK_IMPORTED_MODULE_2__.openFlow(_t);
        }, 100);
      });
      return this;
    }

    /**
     * @return {Noty}
     */
  }, {
    key: "stop",
    value: function stop() {
      api__WEBPACK_IMPORTED_MODULE_2__.dequeueClose(this);
      return this;
    }

    /**
     * @return {Noty}
     */
  }, {
    key: "resume",
    value: function resume() {
      api__WEBPACK_IMPORTED_MODULE_2__.queueClose(this);
      return this;
    }

    /**
     * @param {int|boolean} ms
     * @return {Noty}
     */
  }, {
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x) {
        return _setTimeout.apply(this, arguments);
      }
      setTimeout.toString = function () {
        return _setTimeout.toString();
      };
      return setTimeout;
    }(function (ms) {
      this.stop();
      this.options.timeout = ms;
      if (this.barDom) {
        if (this.options.timeout) {
          utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, 'noty_has_timeout');
        } else {
          utils__WEBPACK_IMPORTED_MODULE_1__.removeClass(this.barDom, 'noty_has_timeout');
        }
        var _t = this;
        setTimeout(function () {
          // ugly fix for progressbar display bug
          _t.resume();
        }, 100);
      }
      return this;
    }

    /**
     * @param {string} html
     * @param {boolean} optionsOverride
     * @return {Noty}
     */)
  }, {
    key: "setText",
    value: function setText(html) {
      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.barDom) {
        this.barDom.querySelector('.noty_body').innerHTML = html;
      }
      if (optionsOverride) this.options.text = html;
      return this;
    }

    /**
     * @param {string} type
     * @param {boolean} optionsOverride
     * @return {Noty}
     */
  }, {
    key: "setType",
    value: function setType(type) {
      var _this2 = this;
      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.barDom) {
        var classList = utils__WEBPACK_IMPORTED_MODULE_1__.classList(this.barDom).split(' ');
        classList.forEach(function (c) {
          if (c.substring(0, 11) === 'noty_type__') {
            utils__WEBPACK_IMPORTED_MODULE_1__.removeClass(_this2.barDom, c);
          }
        });
        utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, "noty_type__".concat(type));
      }
      if (optionsOverride) this.options.type = type;
      return this;
    }

    /**
     * @param {string} theme
     * @param {boolean} optionsOverride
     * @return {Noty}
     */
  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      var _this3 = this;
      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.barDom) {
        var classList = utils__WEBPACK_IMPORTED_MODULE_1__.classList(this.barDom).split(' ');
        classList.forEach(function (c) {
          if (c.substring(0, 12) === 'noty_theme__') {
            utils__WEBPACK_IMPORTED_MODULE_1__.removeClass(_this3.barDom, c);
          }
        });
        utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, "noty_theme__".concat(theme));
      }
      if (optionsOverride) this.options.theme = theme;
      return this;
    }

    /**
     * @return {Noty}
     */
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;
      if (this.closed) return this;
      if (!this.shown) {
        // it's in the queue
        api__WEBPACK_IMPORTED_MODULE_2__.removeFromQueue(this);
        return this;
      }
      this.closing = true;
      utils__WEBPACK_IMPORTED_MODULE_1__.addClass(this.barDom, this.options.animation.close);
      this.promises.close = new Promise(function (resolve) {
        utils__WEBPACK_IMPORTED_MODULE_1__.addListener(_this4.barDom, 'animationend', function () {
          if (_this4.options.first) {
            utils__WEBPACK_IMPORTED_MODULE_1__.remove(_this4.barDom);
          } else {
            api__WEBPACK_IMPORTED_MODULE_2__.ghostFix(_this4);
          }
          resolve();
        });
      });
      this.promises.close.then(function () {
        api__WEBPACK_IMPORTED_MODULE_2__.closeFlow(_this4);
      });
      this.closed = true;
      api__WEBPACK_IMPORTED_MODULE_2__.Queue.currentlyVisible--;
      return this;
    }

    // API functions

    /**
     * @return {Noty}
     */
  }], [{
    key: "closeAll",
    value: function closeAll() {
      Object.keys(api__WEBPACK_IMPORTED_MODULE_2__.Store).forEach(function (id) {
        api__WEBPACK_IMPORTED_MODULE_2__.Store[id].close();
      });
      return this;
    }

    /**
     * @return {Noty}
     */
  }, {
    key: "clearQueue",
    value: function clearQueue() {
      api__WEBPACK_IMPORTED_MODULE_2__.Queue.queue = [];
      return this;
    }

    /**
     * @param {Object} obj
     * @return {Noty}
     */
  }, {
    key: "overrideDefaults",
    value: function overrideDefaults(obj) {
      Object.assign(api__WEBPACK_IMPORTED_MODULE_2__.Defaults, utils__WEBPACK_IMPORTED_MODULE_1__.deepExtend({}, api__WEBPACK_IMPORTED_MODULE_2__.Defaults, obj));
      return this;
    }

    /**
     * @param {int} amount
     * @return {Noty}
     */
  }, {
    key: "setMaxVisible",
    value: function setMaxVisible() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : api__WEBPACK_IMPORTED_MODULE_2__.DefaultMaxVisible;
      api__WEBPACK_IMPORTED_MODULE_2__.Queue.maxVisible = amount;
      return this;
    }
  }]);
}();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=noty.js.map