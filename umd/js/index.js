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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getViewportOffset: function getViewportOffset(element) {

        var doc = document.documentElement,
            box = typeof element.getBoundingClientRect !== "undefined" ? element.getBoundingClientRect() : 0,
            scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
            offsetLeft = box.left + window.pageXOffset,
            offsetTop = box.top + window.pageYOffset;

        var left = offsetLeft - scrollLeft,
            top = offsetTop - scrollTop;

        return {
            left: left,
            top: top,
            right: window.document.documentElement.clientWidth - box.width - left,
            bottom: window.document.documentElement.clientHeight - box.height - top,
            right2: window.document.documentElement.clientWidth - left,
            bottom2: window.document.documentElement.clientHeight - top
        };
    },
    bind: function bind(elem, event, handler) {
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll" : event;

            if (document.attachEvent) {

                elem.attachEvent("on" + event, handler);
            } else {

                elem.addEventListener(event, handler, false);
            }
        }
    },
    unbind: function unbind(elem, event, handler) {
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll" : event;

            var handlers = [];
            if (Array.isArray(handler) && handler.length > 0) {
                handlers = handler;
            } else {
                handlers.push(handler);
            }

            if (document.removeEventListener) {

                handlers.forEach(function (e) {
                    elem.removeEventListener(event, e, false);
                });
            } else {

                handlers.forEach(function (e) {
                    elem.removeEventListener('on' + event, e);
                });
            }
        }
    },
    isHtml: function isHtml(val) {
        return (/<[a-z][\s\S]*>/i.test(val)
        );
    },
    getDisplayValue: function getDisplayValue(ele) {

        if (ele) {
            return ele.currentStyle ? ele.currentStyle.display : getComputedStyle(ele, null).display;
        }
    },
    hasHorizontalScrollBar: function hasHorizontalScrollBar(ele) {

        if (ele) {

            return ele.scrollWidth > ele.clientWidth;
        }
    },
    hasVerticalScrollBar: function hasVerticalScrollBar(ele) {

        if (ele) {

            return ele.scrollHeight > ele.clientHeight;
        }
    },
    getScrollbarWidth: function getScrollbarWidth() {

        var outer = document.createElement('div');
        outer.className = _settings2.default.scrollbarClass;
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    },
    getParentCompByName: function getParentCompByName(context, name) {

        var parent = context.$parent;

        while (parent) {
            if (parent.$options.name !== name) {
                parent = parent.$parent;
            } else {
                return parent;
            }
        }

        return null;
    },
    getChildCompsByName: function getChildCompsByName(context, name) {

        var result = [];

        var childrens = context.$children;

        while (childrens && childrens.length > 0) {

            childrens.forEach(function (child) {

                childrens = child.$children ? child.$children : null;

                if (child.$options.name === name) {

                    result.push(child);
                }
            });
        }

        return result;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    sizeMaps: {
        'large': 40,
        'middle': 32,
        'small': 24
    },

    sizeMapDefault: 32,

    scrollbarClass: 'v-scrollbar-wrap'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkboxGroup = __webpack_require__(44);

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkboxGroup2.default.install = function (Vue) {
    Vue.component(_checkboxGroup2.default.name, _checkboxGroup2.default);
};

exports.default = _checkboxGroup2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkbox = __webpack_require__(47);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkbox2.default.install = function (Vue) {
    Vue.component(_checkbox2.default.name, _checkbox2.default);
};

exports.default = _checkbox2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dropdown = __webpack_require__(50);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dropdown2.default.install = function (Vue) {
    Vue.component(_dropdown2.default.name, _dropdown2.default);
};

exports.default = _dropdown2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

function addClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.add(cls);
    } else {

        var clsArr = el.className.split(" ");

        if (clsArr.indexOf(cls) === -1) {
            el.className += " " + cls;
        }
    }
};

function removeClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.remove(cls);
    } else {

        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone = function () {
    'use strict';

    function _instanceof(obj, type) {
        return type != null && obj instanceof type;
    }

    var nativeMap;
    try {
        nativeMap = Map;
    } catch (_) {
        nativeMap = function nativeMap() {};
    }

    var nativeSet;
    try {
        nativeSet = Set;
    } catch (_) {
        nativeSet = function nativeSet() {};
    }

    var nativePromise;
    try {
        nativePromise = Promise;
    } catch (_) {
        nativePromise = function nativePromise() {};
    }

    function clone(parent, circular, depth, prototype, includeNonEnumerable) {
        if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
            depth = circular.depth;
            prototype = circular.prototype;
            includeNonEnumerable = circular.includeNonEnumerable;
            circular = circular.circular;
        }

        var allParents = [];
        var allChildren = [];

        var useBuffer = typeof Buffer != 'undefined';

        if (typeof circular == 'undefined') circular = true;

        if (typeof depth == 'undefined') depth = Infinity;

        function _clone(parent, depth) {
            if (parent === null) return null;

            if (depth === 0) return parent;

            var child;
            var proto;
            if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
                return parent;
            }

            if (_instanceof(parent, nativeMap)) {
                child = new nativeMap();
            } else if (_instanceof(parent, nativeSet)) {
                child = new nativeSet();
            } else if (_instanceof(parent, nativePromise)) {
                child = new nativePromise(function (resolve, reject) {
                    parent.then(function (value) {
                        resolve(_clone(value, depth - 1));
                    }, function (err) {
                        reject(_clone(err, depth - 1));
                    });
                });
            } else if (clone.__isArray(parent)) {
                child = [];
            } else if (clone.__isRegExp(parent)) {
                child = new RegExp(parent.source, __getRegExpFlags(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (clone.__isDate(parent)) {
                child = new Date(parent.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent)) {
                child = new Buffer(parent.length);
                parent.copy(child);
                return child;
            } else if (_instanceof(parent, Error)) {
                child = Object.create(parent);
            } else {
                if (typeof prototype == 'undefined') {
                    proto = Object.getPrototypeOf(parent);
                    child = Object.create(proto);
                } else {
                    child = Object.create(prototype);
                    proto = prototype;
                }
            }

            if (circular) {
                var index = allParents.indexOf(parent);

                if (index != -1) {
                    return allChildren[index];
                }
                allParents.push(parent);
                allChildren.push(child);
            }

            if (_instanceof(parent, nativeMap)) {
                parent.forEach(function (value, key) {
                    var keyChild = _clone(key, depth - 1);
                    var valueChild = _clone(value, depth - 1);
                    child.set(keyChild, valueChild);
                });
            }
            if (_instanceof(parent, nativeSet)) {
                parent.forEach(function (value) {
                    var entryChild = _clone(value, depth - 1);
                    child.add(entryChild);
                });
            }

            for (var i in parent) {
                var attrs;
                if (proto) {
                    attrs = Object.getOwnPropertyDescriptor(proto, i);
                }

                if (attrs && attrs.set == null) {
                    continue;
                }
                child[i] = _clone(parent[i], depth - 1);
            }

            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(parent);
                for (var i = 0; i < symbols.length; i++) {
                    var symbol = symbols[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
                    if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                        continue;
                    }
                    child[symbol] = _clone(parent[symbol], depth - 1);
                    if (!descriptor.enumerable) {
                        Object.defineProperty(child, symbol, {
                            enumerable: false
                        });
                    }
                }
            }

            if (includeNonEnumerable) {
                var allPropertyNames = Object.getOwnPropertyNames(parent);
                for (var i = 0; i < allPropertyNames.length; i++) {
                    var propertyName = allPropertyNames[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
                    if (descriptor && descriptor.enumerable) {
                        continue;
                    }
                    child[propertyName] = _clone(parent[propertyName], depth - 1);
                    Object.defineProperty(child, propertyName, {
                        enumerable: false
                    });
                }
            }

            return child;
        }

        return _clone(parent, depth);
    }

    clone.clonePrototype = function clonePrototype(parent) {
        if (parent === null) return null;

        var c = function c() {};
        c.prototype = parent;
        return new c();
    };

    function __objToStr(o) {
        return Object.prototype.toString.call(o);
    }
    clone.__objToStr = __objToStr;

    function __isDate(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
    }
    clone.__isDate = __isDate;

    function __isArray(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
    }
    clone.__isArray = __isArray;

    function __isRegExp(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
    }
    clone.__isRegExp = __isRegExp;

    function __getRegExpFlags(re) {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    }
    clone.__getRegExpFlags = __getRegExpFlags;

    return clone;
}();

if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    module.exports = clone;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).Buffer, __webpack_require__(34)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __autoAdjustment__events__ = [];

exports.default = {
    methods: {
        layerAdjustmentOnce: function layerAdjustmentOnce(layerElement, targetElement, distance) {

            var viewportOffset = _utils2.default.getViewportOffset(targetElement),
                layerElemHeight = typeof layerElement.getBoundingClientRect !== "undefined" ? layerElement.getBoundingClientRect().height : layerElement.clientHeight;

            if (viewportOffset.bottom < layerElemHeight) {

                layerElement.style.top = viewportOffset.top - layerElemHeight - distance + 'px';
            } else {

                layerElement.style.top = viewportOffset.top + targetElement.clientHeight + distance + 'px';
            }

            layerElement.style.left = viewportOffset.left + 'px';
        },
        layerAdjustmentBind: function layerAdjustmentBind(layerElement, targetElement, distance) {
            var _this = this;

            var handler = function handler(e) {

                setTimeout(function (x) {

                    _this.layerAdjustmentOnce(layerElement, targetElement, distance);
                });
            };

            __autoAdjustment__events__.push(handler);
            _utils2.default.bind(window, 'scroll', handler);
            _utils2.default.bind(window, 'resize', handler);
        }
    },
    beforeDestroy: function beforeDestroy() {

        _utils2.default.unbind(window, 'scroll', __autoAdjustment__events__);
        _utils2.default.unbind(window, 'resize', __autoAdjustment__events__);
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _select = __webpack_require__(60);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_select2.default.install = function (Vue) {
    Vue.component(_select2.default.name, _select2.default);
};

exports.default = _select2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

__webpack_require__(13);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(14);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(55);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(4);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(3);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(9);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(5);

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(63);

var _index14 = _interopRequireDefault(_index13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    Vue.component(_index2.default.name, _index2.default);
    Vue.component(_index4.default.name, _index4.default);
    Vue.component(_index6.default.name, _index6.default);
    Vue.component(_index8.default.name, _index8.default);
    Vue.component(_index10.default.name, _index10.default);
    Vue.component(_index12.default.name, _index12.default);
    Vue.component(_index14.default.name, _index14.default);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    VPagination: _index4.default,
    VTable: _index2.default,
    VCheckbox: _index6.default,
    VCheckboxGroup: _index8.default,
    VSelect: _index10.default,
    VDropdown: _index12.default,
    VTreeitem: _index14.default
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _table = __webpack_require__(15);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_table2.default.install = function (Vue) {
    Vue.component(_table2.default.name, _table2.default);
};

exports.default = _table2.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(54),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-table\\src\\table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9b38949c", Component.options)
  } else {
    hotAPI.reload("data-v-9b38949c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classesMixin = __webpack_require__(17);

var _classesMixin2 = _interopRequireDefault(_classesMixin);

var _scrollControlMixin = __webpack_require__(18);

var _scrollControlMixin2 = _interopRequireDefault(_scrollControlMixin);

var _frozenColumnsMixin = __webpack_require__(19);

var _frozenColumnsMixin2 = _interopRequireDefault(_frozenColumnsMixin);

var _tableResizeMixin = __webpack_require__(20);

var _tableResizeMixin2 = _interopRequireDefault(_tableResizeMixin);

var _sortControlMixin = __webpack_require__(21);

var _sortControlMixin2 = _interopRequireDefault(_sortControlMixin);

var _tableEmptyMixin = __webpack_require__(22);

var _tableEmptyMixin2 = _interopRequireDefault(_tableEmptyMixin);

var _dragWidthMixin = __webpack_require__(23);

var _dragWidthMixin2 = _interopRequireDefault(_dragWidthMixin);

var _cellEditMixin = __webpack_require__(24);

var _cellEditMixin2 = _interopRequireDefault(_cellEditMixin);

var _bodyCellMergeMixin = __webpack_require__(25);

var _bodyCellMergeMixin2 = _interopRequireDefault(_bodyCellMergeMixin);

var _titleCellMergeMixin = __webpack_require__(26);

var _titleCellMergeMixin2 = _interopRequireDefault(_titleCellMergeMixin);

var _checkboxSelectionMixin = __webpack_require__(27);

var _checkboxSelectionMixin2 = _interopRequireDefault(_checkboxSelectionMixin);

var _tableFooterMixin = __webpack_require__(28);

var _tableFooterMixin2 = _interopRequireDefault(_tableFooterMixin);

var _scrollBarControlMixin = __webpack_require__(35);

var _scrollBarControlMixin2 = _interopRequireDefault(_scrollBarControlMixin);

var _tableRowMouseEventsMixin = __webpack_require__(36);

var _tableRowMouseEventsMixin2 = _interopRequireDefault(_tableRowMouseEventsMixin);

var _tableFiltersMixin = __webpack_require__(37);

var _tableFiltersMixin2 = _interopRequireDefault(_tableFiltersMixin);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _deepClone = __webpack_require__(7);

var _deepClone2 = _interopRequireDefault(_deepClone);

var _tableEmpty = __webpack_require__(38);

var _tableEmpty2 = _interopRequireDefault(_tableEmpty);

var _loading = __webpack_require__(41);

var _loading2 = _interopRequireDefault(_loading);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(4);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(5);

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "v-table",
    mixins: [_classesMixin2.default, _tableResizeMixin2.default, _frozenColumnsMixin2.default, _scrollControlMixin2.default, _sortControlMixin2.default, _tableEmptyMixin2.default, _dragWidthMixin2.default, _cellEditMixin2.default, _bodyCellMergeMixin2.default, _titleCellMergeMixin2.default, _checkboxSelectionMixin2.default, _tableFooterMixin2.default, _scrollBarControlMixin2.default, _tableRowMouseEventsMixin2.default, _tableFiltersMixin2.default],
    components: { tableEmpty: _tableEmpty2.default, loading: _loading2.default, VCheckboxGroup: _index2.default, VCheckbox: _index4.default, VDropdown: _index6.default },
    data: function data() {
        return {
            internalTableData: [],

            internalWidth: 0,

            internalHeight: 0,

            internalColumns: [],

            internalTitleRows: [],
            errorMsg: " V-Table error: ",

            maxWidth: 5000,
            hasFrozenColumn: false,
            resizeTimer: null
        };
    },

    props: {
        width: [Number, String],
        minWidth: {
            type: Number,
            default: 50
        },
        height: {
            type: Number,
            require: false
        },
        minHeight: {
            type: Number,
            default: 50
        },
        titleRowHeight: {
            type: Number,
            default: 38
        },

        isHorizontalResize: {
            type: Boolean,
            default: false
        },

        isVerticalResize: {
            type: Boolean,
            default: false
        },

        verticalResizeOffset: {
            type: Number,
            default: 0
        },

        tableBgColor: {
            type: String,
            default: "#fff"
        },

        titleBgColor: {
            type: String,
            default: "#fff"
        },

        oddBgColor: {
            type: String,
            default: ""
        },

        evenBgColor: {
            type: String,
            default: ""
        },

        rowHeight: {
            type: Number,
            default: 40
        },

        multipleSort: {
            type: Boolean,
            default: true
        },

        sortAlways: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            require: true
        },

        titleRows: {
            type: Array,
            require: true,
            default: function _default() {
                return [];
            }
        },
        tableData: {
            type: Array,
            require: true,
            default: function _default() {
                return [];
            }
        },

        pagingIndex: Number,

        errorContent: {
            type: String,
            default: "暂无数据"
        },

        errorContentHeight: {
            type: Number,
            default: 50
        },

        isLoading: {
            type: Boolean,
            default: false
        },
        loadingContent: {
            type: String,
            default: '<span><i class="v-icon-spin5 animate-loading-23" style="font-size: 28px;opacity:0.6;"></i></span>'
        },

        rowHoverColor: {
            type: String
        },
        rowClickColor: {
            type: String
        },
        showVerticalBorder: {
            type: Boolean,
            default: true
        },
        showHorizontalBorder: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        footerRowHeight: {
            type: Number,
            default: 40
        },
        columnWidthDrag: {
            type: Boolean,
            default: false
        },
        loadingOpacity: {
            type: Number,
            default: 0.6
        },

        columnCellClassName: Function,

        footerCellClassName: Function,

        rowClick: Function,

        rowDblclick: Function,

        rowContextmenu: Function,

        titleClick: Function,

        titleDblclick: Function,

        rowMouseEnter: Function,

        rowMouseLeave: Function,

        cellEditDone: Function,

        cellMerge: Function,

        selectAll: Function,

        selectChange: Function,

        selectGroupChange: Function,

        filterMethod: Function
    },
    computed: {
        isComplexTitle: function isComplexTitle() {
            return Array.isArray(this.internalTitleRows) && this.internalTitleRows.length > 0;
        },
        getTableHeight: function getTableHeight() {
            return this.isTableEmpty ? this.tableEmptyHeight : this.internalHeight;
        },
        leftViewWidth: function leftViewWidth() {
            var result = 0;
            if (this.hasFrozenColumn) {
                result = this.frozenCols.reduce(function (total, curr) {
                    return total + curr.width;
                }, 0);
            }
            return result;
        },
        rightViewWidth: function rightViewWidth() {
            var result = this.internalWidth - this.leftViewWidth;

            return this.hasFrozenColumn ? result - 2 : result;
        },
        bodyViewHeight: function bodyViewHeight() {
            var result;
            if (this.internalTitleRows.length > 0) {
                result = this.internalHeight - this.titleRowHeight * (this.internalTitleRows.length + this.getTitleRowspanTotalCount);
            } else {
                result = this.internalHeight - this.titleRowHeight;
            }

            result -= this.footerTotalHeight + 1;

            return result;
        },
        totalColumnsWidth: function totalColumnsWidth() {
            return this.internalColumns.reduce(function (total, curr) {
                return curr.width ? total + curr.width : total;
            }, 0);
        },
        totalNoFrozenColumnsWidth: function totalNoFrozenColumnsWidth() {
            return this.noFrozenCols.reduce(function (total, curr) {
                return curr.width ? total + curr.width : total;
            }, 0);
        },
        getColumnsFields: function getColumnsFields() {
            return this.internalColumns.map(function (item) {
                return item.field;
            });
        },
        getNoFrozenColumnsFields: function getNoFrozenColumnsFields() {
            return this.internalColumns.filter(function (x) {
                return !x.isFrozen;
            }).map(function (item) {
                return item.field;
            });
        },
        getFrozenColumnsFields: function getFrozenColumnsFields() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen;
            }).map(function (item) {
                return item.field;
            });
        }
    },
    methods: {
        customCompFunc: function customCompFunc(params) {
            this.$emit("on-custom-comp", params);
        },
        trBgColor: function trBgColor(num) {
            if (this.evenBgColor && this.evenBgColor.length > 0 || this.oddBgColor && this.oddBgColor.length > 0) {
                return num % 2 === 0 ? { "background-color": this.evenBgColor } : { "background-color": this.oddBgColor };
            }
        },
        setColumnCellClassName: function setColumnCellClassName(rowIndex, field, rowData) {
            return this.columnCellClassName && this.columnCellClassName(rowIndex, field, rowData);
        },
        titleColumnWidth: function titleColumnWidth(fields) {
            var result = 0;
            if (Array.isArray(fields)) {
                var matchItems = this.internalColumns.filter(function (item, index) {
                    return fields.some(function (x) {
                        return x === item.field;
                    });
                });

                result = matchItems.reduce(function (total, curr) {
                    return total + curr.width;
                }, 0);
            } else {
                console.error(this.errorMsg + "the fields attribute must be a array in titleRows");
            }
            return result;
        },
        titleColumnHeight: function titleColumnHeight(rowspan) {
            if (rowspan && rowspan > 0) {
                return this.titleRowHeight * rowspan;
            } else {
                return this.titleRowHeight;
            }
        },
        overflowTitle: function overflowTitle(row, rowIndex, col) {
            var result = "";
            if (typeof col.formatter === "function") {
                var val = col.formatter(row, rowIndex, this.pagingIndex, col.field);

                if (_utils2.default.isHtml(val)) {
                    result = "";
                } else {
                    result = val;
                }
            } else {
                result = row[col.field];
            }
            return result;
        },
        getTotalColumnsHeight: function getTotalColumnsHeight() {
            var titleTotalHeight = this.internalTitleRows && this.internalTitleRows.length > 0 ? this.titleRowHeight * this.internalTitleRows.length : this.titleRowHeight;

            titleTotalHeight += this.footerTotalHeight;

            return titleTotalHeight + this.internalTableData.length * this.rowHeight + 1;
        },
        initTableWidth: function initTableWidth() {
            this.internalWidth = this.isHorizontalResize ? this.maxWidth : this.width;
        },
        initColumns: function initColumns() {
            this.internalHeight = this.height;

            this.footerTotalHeight = this.getFooterTotalRowHeight;

            this.internalColumns = Array.isArray(this.columns) ? (0, _deepClone2.default)(this.columns) : [];

            this.internalTitleRows = Array.isArray(this.titleRows) ? (0, _deepClone2.default)(this.titleRows) : [];

            this.initColumnsFilters();

            this.initResizeColumns();

            this.hasFrozenColumn = this.internalColumns.some(function (x) {
                return x.isFrozen;
            });

            this.initTableWidth();

            this.setSortColumns();

            var self = this,
                widthCountCheck = 0;

            if (self.internalWidth && self.internalWidth > 0) {
                self.internalColumns.map(function (item) {
                    if (!(item.width && item.width > 0)) {
                        widthCountCheck++;
                        if (self.isHorizontalResize) {
                            console.error(self.errorMsg + "If you are using the isHorizontalResize property,Please set the value for each column's width");
                        } else {
                            item.width = self.internalWidth - self.totalColumnsWidth;
                        }
                    }
                });
            }

            if (widthCountCheck > 1) {
                console.error(this.errorMsg + "Only allow one column is not set width");
            }
        },
        initView: function initView() {
            if (!(this.internalWidth && this.internalWidth > 0)) {
                if (this.columns && this.columns.length > 0) {
                    this.internalWidth = this.columns.reduce(function (total, curr) {
                        return total + curr.width;
                    }, 0);
                }
            }

            var totalColumnsHeight = this.getTotalColumnsHeight();

            if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {
                if (!this.isVerticalResize) {
                    this.internalHeight = totalColumnsHeight;
                }
            } else if (this.height <= totalColumnsHeight) {
                this.internalHeight = this.height;
            }
        },
        initInternalTableData: function initInternalTableData() {
            return Array.isArray(this.tableData) ? (0, _deepClone2.default)(this.tableData) : [];
        },
        resize: function resize() {
            var _this = this;

            this.resizeTimer = setTimeout(function (x) {
                _this.tableResize();
            });
        },

        onRowToggle: function onRowToggle(rowIndex, expand) {
            var curLevel = this.tableData[rowIndex]["_level"];
            this.tableData[rowIndex]["_expand"] = expand;
            for (var i = rowIndex + 1; i < this.tableData.length; i++) {
                var row = this.tableData[i];
                if (row["_level"] <= curLevel) {
                    break;
                } else if (row["_level"] == curLevel + 1) {
                    this.$set(row, "_hide", !expand);
                } else {
                    this.$set(row, "_hide", expand ? !row["_parent"]["_expand"] : true);
                }
            }
        },

        selectRow: function selectRow(rowIndex) {
            var curLevel = this.tableData[rowIndex]["_level"];
            if (curLevel != null) {
                for (var i = rowIndex; i < this.tableData.length; i++) {
                    var row = this.tableData[i];
                    if (row["_level"] == curLevel) {
                        this.$set(row, "_hide", false);
                    } else if (row["_level"] < curLevel) {
                        break;
                    }
                }

                for (var _i = rowIndex - 1; _i >= 0; _i--) {
                    var _row = this.tableData[_i];
                    if (_row["_level"] == curLevel) {
                        this.$set(_row, "_hide", false);
                    } else if (_row["_level"] < curLevel) {
                        this.selectRow(_i);
                        break;
                    }
                }
                this.tableData[rowIndex]["_expand"] = true;
            }

            this.clickRowIndex = rowIndex;
        },
        onRowButtonClick: function onRowButtonClick(key, row) {
            this.$emit("on-row-button-click", key, row);
        }
    },
    created: function created() {
        this.internalTableData = this.initInternalTableData(this.tableData);

        if (Array.isArray(this.columns) && this.columns.length > 0) {
            this.initColumns();
        }

        this.updateCheckboxGroupModel();

        this.initView();
    },
    mounted: function mounted() {
        this.setScrollbarWidth();

        this.tableEmpty();

        this.tableResize();

        if (Array.isArray(this.tableData) && this.tableData.length > 0) {
            this.scrollControl();
        }

        this.controlScrollBar();
    },

    watch: {
        columns: {
            handler: function handler(newVal) {
                this.initColumns();

                this.tableResize();
            },
            deep: true
        },

        titleRows: {
            handler: function handler(newVal) {
                this.initColumns();
            },
            deep: true
        },

        tableData: {
            handler: function handler(newVal) {
                this.skipRenderCells = [];

                this.internalTableData = this.initInternalTableData(newVal);

                this.updateCheckboxGroupModel();

                this.tableEmpty();

                if (Array.isArray(newVal) && newVal.length > 0) {
                    this.initView();

                    this.scrollControl();
                }

                this.resize();
            },
            deep: true
        },
        pagingIndex: {
            handler: function handler() {
                this.clearCurrentRow();

                this.bodyScrollTop();
            }
        }
    },
    beforeDestroy: function beforeDestroy() {
        clearTimeout(this.resizeTimer);
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    computed: {
        vTableRightBody: function vTableRightBody() {

            var result = {
                'v-table-rightview-special-border': true
            };

            result[_settings2.default.scrollbarClass] = true;

            return result;
        },
        vTableFooter: function vTableFooter() {

            var result = {

                'v-table-rightview-special-border': true
            };

            result[_settings2.default.scrollbarClass] = true;

            return result;
        },
        vTableBodyInner: function vTableBodyInner() {

            return {
                'v-table-body-inner-pb': !this.hasTableFooter
            };
        },
        vTableBodyCell: function vTableBodyCell() {

            return {
                'vertical-border': this.showVerticalBorder,
                'horizontal-border': this.showHorizontalBorder
            };
        }
    },

    methods: {
        vTableFiltersIcon: function vTableFiltersIcon(filters) {
            var _this = this;

            return {
                'v-icon-filter': true,
                'checked': filters.some(function (x) {
                    return x.selected && x.value !== _this.filterSpecialValue;
                })
            };
        }
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    methods: {
        body1Mousewheel: function body1Mousewheel(e) {

            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * -1;
            body2.scrollTop = body2.scrollTop - scrollHeight;
        },
        bodyScrollTop: function bodyScrollTop() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = 0;
            }
            body2.scrollTop = 0;
        },
        body2Scroll: function body2Scroll(e) {

            var view2 = this.$el.querySelector('.v-table-rightview');
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = body2.scrollTop;
            }

            view2.querySelector('.v-table-header').scrollLeft = body2.scrollLeft;
        },
        rightViewFooterScroll: function rightViewFooterScroll() {

            var view2 = this.$el.querySelector('.v-table-rightview');

            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            view2.querySelector('.v-table-header').scrollLeft = rightViewFooter.scrollLeft;
            view2.querySelector('.v-table-body').scrollLeft = rightViewFooter.scrollLeft;
        },
        scrollControl: function scrollControl() {
            var _this = this;

            this.unbindEvents();

            setTimeout(function (x) {

                var body1 = _this.$el.querySelector('.v-table-leftview .v-table-body');
                var body2 = _this.$el.querySelector('.v-table-rightview .v-table-body');
                var rightViewFooter = _this.$el.querySelector('.v-table-rightview .v-table-footer');

                _utils2.default.bind(body1, 'mousewheel', _this.body1Mousewheel);
                _utils2.default.bind(body2, 'scroll', _this.body2Scroll);
                _utils2.default.bind(rightViewFooter, 'scroll', _this.rightViewFooterScroll);
            });
        },
        unbindEvents: function unbindEvents() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            _utils2.default.unbind(body1, 'mousewheel', this.body1Mousewheel);
            _utils2.default.unbind(body2, 'scroll', this.body2Scroll);
            _utils2.default.unbind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
        },
        scrollToTop: function scrollToTop() {

            this.bodyScrollTop();
        }
    },

    beforeDestroy: function beforeDestroy() {

        this.unbindEvents();
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computed: {
        frozenCols: function frozenCols() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen === true;
            });
        },
        noFrozenCols: function noFrozenCols() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen !== true;
            });
        },
        frozenTitleCols: function frozenTitleCols() {
            var frozenTitleCols = [],
                self = this;

            if (this.internalTitleRows.length > 0) {
                var frozenFields = this.frozenCols.map(function (x) {
                    return x.field;
                });

                this.internalTitleRows.forEach(function (rows) {

                    var frozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            if (row.fields.every(function (field) {
                                return frozenFields.indexOf(field) !== -1;
                            })) {
                                return true;
                            }
                        }
                    });

                    if (frozenTitleRows.length > 0) {

                        frozenTitleCols.push(frozenTitleRows);

                        var minRowspan = self.getMinRowspan(frozenTitleRows);

                        if (minRowspan && minRowspan > 0) {

                            for (var i = 0; i < minRowspan; i++) {

                                frozenTitleCols.push([]);
                            }
                        }
                    }
                });
            }

            return frozenTitleCols;
        },
        noFrozenTitleCols: function noFrozenTitleCols() {
            var noFrozenTitleCols = [],
                self = this;

            if (this.internalTitleRows.length > 0) {
                var noFrozenFields = this.noFrozenCols.map(function (x) {
                    return x.field;
                });

                this.internalTitleRows.forEach(function (rows) {

                    var noFrozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            return row.fields.every(function (field) {
                                return noFrozenFields.indexOf(field) !== -1;
                            });
                        }
                    });

                    if (noFrozenTitleRows.length > 0) {
                        noFrozenTitleCols.push(noFrozenTitleRows);

                        var minRowspan = self.getMinRowspan(noFrozenTitleRows);

                        if (minRowspan && minRowspan > 0) {

                            for (var i = 0; i < minRowspan; i++) {

                                noFrozenTitleCols.push([]);
                            }
                        }
                    }
                });
            }
            return noFrozenTitleCols;
        }
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            resizeColumns: [],
            initTotalColumnsWidth: 0,
            hasContainerWidth: false,
            containerWidthCheckTimer: null
        };
    },


    methods: {
        getResizeColumns: function getResizeColumns() {

            var result = [];

            this.internalColumns.forEach(function (item) {

                if (item.isResize) {
                    result.push({ width: item.width, field: item.field });
                }
            });

            this.resizeColumns = result;
        },
        initResizeColumns: function initResizeColumns() {

            this.initTotalColumnsWidth = this.totalColumnsWidth;
            this.getResizeColumns();
        },
        containerWidthCheck: function containerWidthCheck() {
            var _this = this;

            this.containerWidthCheckTimer = setTimeout(function (x) {

                var tableContainerWidth = _this.$el.clientWidth;

                if (tableContainerWidth - _this.internalWidth > 3) {

                    _this.tableResize();
                }
            });
        },
        adjustHeight: function adjustHeight(hasScrollBar) {

            if (!this.$el || this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                scrollbarWidth = this.scrollbarWidth;

            if (this.hasTableFooter) {

                if (hasScrollBar) {

                    if (this.footerTotalHeight === this.getFooterTotalRowHeight) {

                        this.footerTotalHeight += scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {
                            this.internalHeight += scrollbarWidth;
                        }
                    }
                } else if (!hasScrollBar) {

                    if (this.footerTotalHeight > this.getFooterTotalRowHeight) {

                        this.footerTotalHeight -= scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                            this.internalHeight -= scrollbarWidth;
                        }
                    }
                }
            } else if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                    if (hasScrollBar && this.internalHeight + 2 < totalColumnsHeight + scrollbarWidth) {

                        this.internalHeight += scrollbarWidth;
                    } else if (!hasScrollBar) {

                        this.internalHeight = this.getTotalColumnsHeight();
                    }
                }
        },
        tableResize: function tableResize() {

            if (!this.isHorizontalResize && !this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                maxWidth = this.maxWidth,
                maxHeight = this.height && this.height > 0 ? this.height : totalColumnsHeight,
                minWidth = this.minWidth,
                minHeight = this.minHeight > totalColumnsHeight ? totalColumnsHeight : this.minHeight,
                view = this.$el,
                viewOffset = _utils2.default.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : view.clientWidth,
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : view.clientHeight,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2,
                bottom2 = viewOffset.bottom2,
                scrollbarWidth = this.scrollbarWidth;

            if (this.isHorizontalResize && this.internalWidth && this.internalWidth > 0 && currentWidth > 0) {

                currentWidth = currentWidth > maxWidth ? maxWidth : currentWidth;
                currentWidth = currentWidth < minWidth ? minWidth : currentWidth;

                this.internalWidth = currentWidth;
            }

            if (this.isVerticalResize && currentHeight > 0) {

                bottom -= this.verticalResizeOffset;

                currentHeight = currentHeight + bottom;
                currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                currentHeight = currentHeight < minHeight ? minHeight : currentHeight;

                if (currentWidth <= this.initTotalColumnsWidth && !this.isTableEmpty) {

                    bottom2 -= this.verticalResizeOffset;

                    var differ = bottom2 - totalColumnsHeight;

                    if (bottom2 > totalColumnsHeight + scrollbarWidth) {

                        currentHeight += scrollbarWidth;
                    } else if (differ > 0 && differ < scrollbarWidth) {

                        currentHeight += differ;
                    }
                }

                this.internalHeight = currentHeight;
            }

            this.changeColumnsWidth(currentWidth);
        },
        changeColumnsWidth: function changeColumnsWidth(currentWidth) {
            var _this2 = this;

            var differ = currentWidth - this.totalColumnsWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if (currentWidth <= initResizeWidths && !this.isTableEmpty) {

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'scroll';
                } else {

                    rightViewBody.style.overflowX = 'scroll';
                }

                this.adjustHeight(true);
            } else {
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= this.scrollbarWidth;
                }

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'hidden';
                } else {

                    rightViewBody.style.overflowX = 'hidden';
                }

                this.adjustHeight(false);
            }

            if (this.hasFrozenColumn) {

                differ -= 1;
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                this.setColumnsWidth(differ);
            } else {

                this.columns.forEach(function (col, index) {

                    if (col.isResize) {

                        _this2.internalColumns[index].width = col.width;
                    }
                });
            }

            this.containerWidthCheck();
        },
        setColumnsWidth: function setColumnsWidth(differ) {

            var resizeColumnsLen = this.resizeColumns.length,
                average = Math.floor(differ / resizeColumnsLen),
                totalAverage = average * resizeColumnsLen,
                leftAverage = differ - totalAverage,
                leftAverageFloor = Math.floor(leftAverage),
                averageColumnsWidthArr = new Array(resizeColumnsLen).fill(average),
                index = 0;

            for (var i = 0; i < leftAverageFloor; i++) {

                averageColumnsWidthArr[i] += 1;
            }

            averageColumnsWidthArr[resizeColumnsLen - 1] += leftAverage - leftAverageFloor;

            this.internalColumns.map(function (item) {

                if (item.isResize) {

                    item.width += averageColumnsWidthArr[index++];
                }

                return item;
            });
        }
    },

    mounted: function mounted() {

        _utils2.default.bind(window, 'resize', this.tableResize);
    },
    beforeDestroy: function beforeDestroy() {

        _utils2.default.unbind(window, 'resize', this.tableResize);
        clearTimeout(this.containerWidthCheckTimer);
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {
            sortColumns: {}
        };
    },


    methods: {
        enableSort: function enableSort(val) {
            return typeof val === 'string' ? true : false;
        },
        setSortColumns: function setSortColumns() {
            var self = this,
                sortColumns = {},
                titleRowsToSortInfo = [];

            if (self.internalTitleRows.length > 0) {
                self.internalTitleRows.filter(function (row) {
                    row.filter(function (column, index) {
                        if (typeof column.orderBy === 'string' && column.fields.length === 1) {
                            column.field = column.fields[0];
                            titleRowsToSortInfo.push(column);
                        }
                    });
                });
            }

            var collection = titleRowsToSortInfo.length > 0 ? titleRowsToSortInfo : self.internalColumns;

            collection.filter(function (item, index) {
                if (self.enableSort(item.orderBy)) {
                    sortColumns[item.field] = item.orderBy;
                }
            });

            this.sortColumns = sortColumns;

            this.singleSortInit();
        },
        getCurrentSort: function getCurrentSort(field) {

            return this.sortColumns[field];
        },
        sortControl: function sortControl(field) {

            var orderBy = this.sortColumns[field];

            if (this.enableSort(orderBy)) {

                if (this.sortAlways) {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' : 'asc';
                } else {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' : this.sortColumns[field] === 'desc' ? '' : 'asc';
                }

                if (!this.multipleSort) {

                    for (var col in this.sortColumns) {

                        if (col !== field) {

                            this.sortColumns[col] = '';
                        }
                    }
                }

                this.$emit('sort-change', this.sortColumns);
            }
        },
        singleSortInit: function singleSortInit() {

            var self = this,
                result = false;

            if (!self.multipleSort && self.sortColumns) {

                for (var col in self.sortColumns) {

                    if (result) {

                        self.sortColumns[col] = '';
                    }
                    result = true;
                }
            }
        },
        resetOrder: function resetOrder() {

            this.setSortColumns();

            this.$emit('sort-change', this.sortColumns);
        }
    }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {

            isTableEmpty: false,

            tableEmptyHeight: 0
        };
    },


    methods: {
        tableEmpty: function tableEmpty() {
            var _this = this;

            var tableData = this.internalTableData,
                tableEmptyHeight = 0;

            if (Array.isArray(tableData) && tableData.length > 0) {

                this.isTableEmpty = false;
                return false;
            }

            this.isTableEmpty = true;

            tableEmptyHeight = this.getTotalColumnsHeight() + this.errorContentHeight;

            this.tableEmptyHeight = tableEmptyHeight;

            this.$nextTick(function (x) {

                _this.tableEmptyScroll();
            });
        },
        tableEmptyScrollEvent: function tableEmptyScrollEvent(e) {

            var headerEle = this.$el.querySelector('.v-table-rightview .v-table-header'),
                tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

            if (tableEmptyEle) {

                headerEle.scrollLeft = tableEmptyEle.scrollLeft;
            }
        },
        tableEmptyScroll: function tableEmptyScroll() {

            var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

            _utils2.default.bind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
        }
    },

    beforeDestroy: function beforeDestroy() {

        var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

        _utils2.default.unbind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {

            draggingColumn: null,
            isDragging: false,
            draggingStartX: 0,
            draggingEndX: 0,
            minColumnWidth: 15 };
    },


    methods: {
        handleTitleMouseMove: function handleTitleMouseMove(event, column) {

            if (!this.columnWidthDrag) {
                return false;
            }

            var target = void 0,
                rect = void 0;

            if (this.isDragging) {
                this.setDragLinePosition(event);
            }

            if (Array.isArray(column)) {

                if (column.length > 1) {
                    return false;
                } else {
                    column = column[0];
                }
            }

            if (!this.showVerticalBorder) {
                return false;
            }

            target = event.target;

            while (target && (target.className && !(0, _dom.hasClass)(target, 'v-table-title-cell') || !target.className)) {
                target = target.parentNode;
            }

            rect = target.getBoundingClientRect();

            var bodyStyle = document.body.style;

            if (rect.width >= this.minColumnWidth && rect.right - event.pageX < 10) {

                if (!this.isDragging) {
                    this.draggingColumn = this.internalColumns.find(function (x) {
                        return x.field === column;
                    });
                }

                bodyStyle.cursor = 'col-resize';
            } else {

                if (!this.isDragging) {

                    this.draggingColumn = null;
                    bodyStyle.cursor = '';
                }
            }
        },
        handleTitleMouseOut: function handleTitleMouseOut() {

            if (!this.isDragging) {

                document.body.style.cursor = '';
            }
        },
        handleTitleMouseDown: function handleTitleMouseDown(event, column) {

            if (!this.draggingColumn || !this.showVerticalBorder) {
                return false;
            }

            this.isDragging = true;

            this.draggingStartX = event.clientX;

            this.setDragLinePosition(event);

            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };

            _utils2.default.bind(document, 'mousemove', this.handleDragMouseMove);
            _utils2.default.bind(document, 'mouseup', this.handleDragMouseUp);
        },
        handleDragMouseMove: function handleDragMouseMove(e) {

            if (!this.isDragging) {
                return false;
            }

            this.setDragLinePosition(e);
        },
        setDragLinePosition: function setDragLinePosition(e) {

            var tableLeft = _utils2.default.getViewportOffset(this.$el).left,
                dragLine = this.$el.querySelector('.v-table-drag-line'),
                clientX = e.clientX;

            if (this.draggingColumn.width + (clientX - this.draggingStartX) <= this.minColumnWidth) {
                return;
            }

            dragLine.style.left = clientX - tableLeft + 'px';
        },
        handleDragMouseUp: function handleDragMouseUp(e) {

            if (!this.isDragging) {
                return false;
            }

            this.draggingEndX = e.clientX;

            var differ = this.draggingEndX - this.draggingStartX;

            if (Math.abs(differ) > 1) {

                var draggingColumn = this.draggingColumn;

                if (draggingColumn.width + differ < this.minColumnWidth) {

                    draggingColumn.width = this.minColumnWidth;
                } else {

                    draggingColumn.width += differ;
                }
            }

            var rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer'),
                hasTableFooter = this.hasTableFooter;

            if (this.totalColumnsWidth < this.internalWidth) {

                if (!hasTableFooter) {

                    rightViewBody.style.overflowX = 'hidden';

                    (0, _dom.removeClass)(rightViewBody, 'v-table-rightview-special-border');
                    rightViewBody.classList.remove('v-table-rightview-special-border');
                } else {

                    rightViewFooter.style.overflowX = 'hidden';
                }
            } else {

                if (!hasTableFooter) {

                    rightViewBody.style.overflowX = 'scroll';

                    if (!this.hasFrozenColumn) {

                        (0, _dom.addClass)(rightViewBody, 'v-table-rightview-special-border');
                    }
                } else {

                    rightViewFooter.style.overflowX = 'scroll';
                }
            }

            this.draggingColumn = null;
            document.body.style.cursor = '';
            this.isDragging = false;

            document.onselectstart = function () {
                return true;
            };
            document.ondragstart = function () {
                return true;
            };

            _utils2.default.unbind(document, 'mousemove', this.handleDragMouseMove);
            _utils2.default.unbind(document, 'mouseup', this.handleDragMouseUp);
        }
    }

};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    methods: {
        cellEdit: function cellEdit(e, callback, rowIndex, rowData, field) {

            var target = e.target,
                self = this,
                oldVal = void 0,
                editInput = void 0,
                editInputLen = void 0,
                _actionFun = void 0,
                textAlign = void 0,
                childTarget = void 0;

            while (target.className && target.className.indexOf('v-table-body-cell') === -1 || !target.className) {
                target = target.parentNode;
            }

            childTarget = target.children[0];

            childTarget.style.display = 'none';

            if ((0, _dom.hasClass)(target, 'cell-editing')) {
                return false;
            }

            (0, _dom.addClass)(target, 'cell-editing');

            oldVal = childTarget.innerText.trim();

            if (target.style.textAlign) {

                textAlign = target.style.textAlign;
            }

            editInput = document.createElement('input');
            editInput.value = oldVal;
            editInput.className = 'cell-edit-input';
            editInput.style.textAlign = textAlign;
            editInput.style.width = '100%';
            editInput.style.height = '100%';


            target.appendChild(editInput);

            editInput.focus();

            editInputLen = editInput.value.length;
            if (document.selection) {
                var ctr = editInput.createTextRange();
                ctr.moveStart('character', editInputLen);
                ctr.collapse();
                ctr.select();
            } else if (typeof editInput.selectionStart == 'number' && typeof editInput.selectionEnd == 'number') {
                editInput.selectionStart = editInput.selectionEnd = editInputLen;
            }

            _actionFun = function actionFun(e) {

                if (typeof e.keyCode === 'undefined' || e.keyCode === 0 || e.keyCode == 13) {

                    if ((0, _dom.hasClass)(target, 'cell-editing')) {

                        (0, _dom.removeClass)(target, 'cell-editing');
                    } else {
                        return false;
                    }

                    childTarget.style.display = '';

                    callback(editInput.value, oldVal);

                    _utils2.default.unbind(editInput, 'blur', _actionFun);
                    _utils2.default.unbind(editInput, 'keydown', _actionFun);

                    target.removeChild(editInput);
                }
            };

            _utils2.default.bind(editInput, 'blur', _actionFun);
            _utils2.default.bind(editInput, 'keydown', _actionFun);
        },
        cellEditClick: function cellEditClick(e, isEdit, rowData, field, rowIndex) {
            if (isEdit) {

                var self = this;

                var onCellEditCallBack = function onCellEditCallBack(newValue, oldVal) {

                    self.cellEditDone && self.cellEditDone(newValue, oldVal, rowIndex, rowData, field);
                };

                this.cellEdit(e, onCellEditCallBack, rowIndex, rowData, field);
            }
        }
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {
            skipRenderCells: []
        };
    },


    methods: {
        cellMergeInit: function cellMergeInit(rowIndex, field, rowData, isFrozenColumns) {
            if (this.skipRenderCells.indexOf(rowIndex + '-' + field) !== -1) {
                return false;
            }

            var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

            if (setting && (setting.colSpan && setting.colSpan > 1 || setting.rowSpan && setting.rowSpan > 1)) {

                this.setSkipRenderCells(setting.colSpan, setting.rowSpan, rowIndex, field, isFrozenColumns);
            }

            return true;
        },
        setSkipRenderCells: function setSkipRenderCells(colSpan, rowSpan, rowIndex, field, isFrozenColumns) {

            var columnsFields = isFrozenColumns ? this.getFrozenColumnsFields : this.getNoFrozenColumnsFields,
                skipCell = '',
                startPosX = void 0,
                endPosX = void 0,
                startPosY = void 0,
                endPosY = void 0;

            endPosX = startPosX = columnsFields.indexOf(field);
            if (colSpan && colSpan > 1) {

                endPosX = startPosX + colSpan - 1;
            }

            endPosY = startPosY = rowIndex;
            if (rowSpan && rowSpan > 1) {

                endPosY = rowIndex + rowSpan - 1;
            }

            for (var posX = startPosX; posX <= endPosX; posX++) {

                for (var posY = startPosY; posY <= endPosY; posY++) {

                    if (posX == startPosX && posY == startPosY) {
                        continue;
                    }

                    skipCell = posY + '-' + columnsFields[posX];

                    if (this.skipRenderCells.indexOf(skipCell) === -1) {

                        this.skipRenderCells.push(skipCell);
                    }
                }
            }
        },
        setColRowSpan: function setColRowSpan(rowIndex, field, rowData) {

            var result = {
                colSpan: '',
                rowSpan: ''
            },
                setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

            if (setting) {

                result = {
                    colSpan: setting.colSpan ? setting.colSpan : '',
                    rowSpan: setting.rowSpan ? setting.rowSpan : ''
                };
            }

            return result;
        },
        isCellMergeRender: function isCellMergeRender(rowIndex, field, rowData) {

            var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

            if (setting && (setting.colSpan && setting.colSpan > 0 || setting.rowSpan && setting.rowSpan > 0)) {

                return true;
            }

            return false;
        },
        getRowHeightByRowSpan: function getRowHeightByRowSpan(rowIndex, field, rowData) {

            var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

            if (setting && setting.rowSpan && setting.rowSpan > 1) {

                return this.rowHeight * setting.rowSpan;
            }

            return this.rowHeight;
        },
        getRowWidthByColSpan: function getRowWidthByColSpan(rowIndex, field, rowData) {

            var endPosX = void 0,
                startPosX = void 0,
                columnsFields = this.getColumnsFields,
                setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field),
                colSpan = setting.colSpan,
                totalWidth = 0;

            if (setting && colSpan && colSpan >= 1) {

                startPosX = columnsFields.indexOf(field);

                endPosX = startPosX + colSpan - 1;

                for (var i = startPosX; i <= endPosX; i++) {

                    this.internalColumns.forEach(function (x) {

                        if (columnsFields[i] === x.field) {

                            totalWidth += x.width;
                        }
                    });
                }
            }

            return totalWidth;
        },
        cellMergeContentType: function cellMergeContentType(rowIndex, field, rowData) {

            var result = {
                isComponent: false,
                isContent: false
            };

            var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

            if (setting) {

                if (setting.componentName && typeof setting.componentName === 'string' && setting.componentName.length > 0) {

                    result.isComponent = true;
                } else if (setting.content && setting.content.length > 0) {

                    result.isContent = true;
                }
            }

            return result;
        }
    }

};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    computed: {
        getTitleRowspanTotalCount: function getTitleRowspanTotalCount() {
            var _this = this;

            var titleRowspanTotalCount1 = 0,
                titleRowspanTotalCount2 = 0,
                rowspanCountArr = void 0,
                minVal = void 0;

            this.noFrozenTitleCols.forEach(function (row) {

                rowspanCountArr = _this.getTitleRowspanCountArr(row);

                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount1 += minVal - 1;
                }
            });

            this.frozenTitleCols.forEach(function (row) {

                rowspanCountArr = _this.getTitleRowspanCountArr(row);

                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount2 += minVal - 1;
                }
            });

            return titleRowspanTotalCount1 < titleRowspanTotalCount2 ? titleRowspanTotalCount1 : titleRowspanTotalCount2;
        }
    },
    methods: {
        getTitleRowspanCountArr: function getTitleRowspanCountArr(row) {

            var rowspanCountArr = [];

            var shouldDeal = row.every(function (col) {

                if (col.rowspan && parseInt(col.rowspan) > 1) {

                    rowspanCountArr.push(parseInt(col.rowspan));
                    return true;
                } else {
                    return false;
                }
            });

            if (shouldDeal) {
                return rowspanCountArr;
            } else {
                return [];
            }
        },
        getMinRowspan: function getMinRowspan(row) {

            var result = void 0;

            var rowspanCountArr = this.getTitleRowspanCountArr(row);

            if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                result = Math.min.apply(null, rowspanCountArr);
            }
            return result - 1;
        }
    }

};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            isAllChecked: false,

            checkboxGroupModel: [],

            indeterminate: false

        };
    },


    computed: {
        disabledUnChecked: function disabledUnChecked() {

            var result = [];

            this.internalTableData.filter(function (item, index) {

                if (item._disabled && !item._checked) {
                    result.push(index);
                }
            });
            return result;
        },
        getCheckedTableRow: function getCheckedTableRow() {
            var _this = this;

            return this.internalTableData.filter(function (item, index) {

                return _this.checkboxGroupModel.indexOf(index) > -1;
            });
        },
        hasSelectionColumns: function hasSelectionColumns() {

            return this.internalColumns.some(function (x) {

                return x.type && x.type === 'selection';
            });
        }
    },

    methods: {
        isSelectionCol: function isSelectionCol(fileds) {

            if (Array.isArray(fileds) && fileds.length === 1) {

                return this.internalColumns.some(function (x) {
                    return x.field === fileds[0] && x.type === 'selection';
                });
            }

            return false;
        },
        disabledChecked: function disabledChecked() {

            var result = [];

            this.internalTableData.filter(function (item, index) {

                if (item._disabled && item._checked) {
                    result.push(index);
                }
            });
            return result;
        },
        handleCheckAll: function handleCheckAll() {

            if (this.isAllChecked) {

                this.checkboxGroupModel = [];

                var allLen = this.internalTableData.length;

                if (allLen > 0) {

                    for (var i = 0; i < allLen; i++) {

                        if (this.disabledUnChecked.indexOf(i) === -1) {

                            this.checkboxGroupModel.push(i);
                        }
                    }
                }
            } else {

                this.checkboxGroupModel = this.disabledChecked();
            }

            this.selectAll && this.selectAll(this.getCheckedTableRow);

            this.setIndeterminateState();
        },
        handleCheckChange: function handleCheckChange(rowData) {
            var _this2 = this;

            this.$nextTick(function (x) {
                _this2.selectChange && _this2.selectChange(_this2.getCheckedTableRow, rowData);
            });
        },
        handleCheckGroupChange: function handleCheckGroupChange() {

            this.selectGroupChange && this.selectGroupChange(this.getCheckedTableRow);

            this.setCheckState();
        },
        setIndeterminateState: function setIndeterminateState() {

            var checkedLen = this.checkboxGroupModel.length,
                allLen = this.internalTableData.length;

            if (checkedLen > 0 && checkedLen === allLen) {

                this.indeterminate = false;
            } else if (checkedLen > 0 && checkedLen < allLen) {

                this.indeterminate = true;
            } else {

                this.indeterminate = false;
            }
        },
        setCheckState: function setCheckState() {

            var checkedLen = this.checkboxGroupModel.length,
                allLen = this.internalTableData.length;

            if (checkedLen > 0 && checkedLen === allLen) {

                this.indeterminate = false;

                this.isAllChecked = true;
            } else if (checkedLen > 0 && checkedLen < allLen) {

                this.isAllChecked = false;

                this.indeterminate = true;
            } else {

                this.indeterminate = false;

                this.isAllChecked = false;
            }
        },
        updateCheckboxGroupModel: function updateCheckboxGroupModel() {
            var _this3 = this;

            if (!this.hasSelectionColumns) {
                return false;
            }

            this.checkboxGroupModel = [];

            this.internalTableData.filter(function (item, index) {

                if (item._checked) {

                    _this3.checkboxGroupModel.push(index);
                }
            });

            this.setCheckState();
        }
    }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deepClone = __webpack_require__(7);

var _deepClone2 = _interopRequireDefault(_deepClone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {

        return {

            footerTotalHeight: 0
        };
    },

    computed: {
        frozenFooterCols: function frozenFooterCols() {

            var result = [];

            if (this.initInternalFooter.length > 0) {

                this.initInternalFooter.forEach(function (columns) {

                    result.push(columns.filter(function (col) {
                        return col.isFrozen;
                    }));
                });
            }

            return result;
        },
        noFrozenFooterCols: function noFrozenFooterCols() {
            var result = [];

            if (this.initInternalFooter.length > 0) {

                this.initInternalFooter.forEach(function (columns) {

                    result.push(columns.filter(function (col) {
                        return !col.isFrozen;
                    }));
                });
            }

            return result;
        },
        getFooterTotalRowHeight: function getFooterTotalRowHeight() {

            if (Array.isArray(this.footer) && this.footer.length > 0) {

                return this.footer.length * this.footerRowHeight;
            }
            return 0;
        },
        hasTableFooter: function hasTableFooter() {

            return Array.isArray(this.footer) && this.footer.length;
        },
        initInternalFooter: function initInternalFooter() {

            if (!(Array.isArray(this.footer) && this.footer.length > 0)) {

                return [];
            }

            var result = [],
                resultRow = [],
                cloneInternalColumns;

            cloneInternalColumns = (0, _deepClone2.default)(this.internalColumns);

            cloneInternalColumns.sort(function (a, b) {

                if (a.isFrozen) {

                    return -1;
                } else if (b.isFrozen) {

                    return 1;
                }
                return 0;
            });

            this.footer.forEach(function (items, rows) {

                resultRow = [];

                items.forEach(function (value, index) {

                    resultRow.push({
                        content: value,
                        width: cloneInternalColumns[index].width,
                        align: cloneInternalColumns[index].columnAlign,
                        isFrozen: cloneInternalColumns[index].isFrozen ? true : false
                    });
                });

                result.push(resultRow);
            });
            return result;
        }
    },

    methods: {
        setFooterCellClassName: function setFooterCellClassName(isLeftView, rowIndex, colIndex, value) {

            var _colIndex = colIndex;

            if (!isLeftView && this.hasFrozenColumn) {

                _colIndex += this.frozenCols.length;
            }

            return this.footerCellClassName && this.footerCellClassName(rowIndex, _colIndex, value);
        }
    }

};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(31)
var ieee754 = __webpack_require__(32)
var isArray = __webpack_require__(33)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  for (var i = 0; i < len; i += 4) {
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


/***/ }),
/* 32 */
/***/ (function(module, exports) {

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


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {

        return {

            scrollbarWidth: 0
        };
    },


    methods: {
        controlScrollBar: function controlScrollBar() {

            if (this.hasTableFooter) {

                var body = this.$el.querySelector('.v-table-rightview .v-table-body');
                body.style.overflowX = 'hidden';
            }
        },
        setScrollbarWidth: function setScrollbarWidth() {

            this.scrollbarWidth = _utils2.default.getScrollbarWidth();
        }
    }

};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {

            hoverRowIndex: -1,
            clickRowIndex: -1
        };
    },


    methods: {
        handleMouseEnter: function handleMouseEnter(rowIndex) {

            if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                this.hoverRowIndex = rowIndex;
            }

            this.rowMouseEnter && this.rowMouseEnter(rowIndex);
        },
        handleMouseOut: function handleMouseOut(rowIndex) {

            if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                this.hoverRowIndex = -1;
            }

            this.rowMouseLeave && this.rowMouseLeave(rowIndex);
        },
        titleCellClick: function titleCellClick(field, title) {

            this.titleClick && this.titleClick(title, field);
        },
        titleCellDblClick: function titleCellDblClick(field, title) {

            this.titleDblclick && this.titleDblclick(title, field);
        },
        rowCellClick: function rowCellClick(rowIndex, rowData, column) {
            if (this.rowClickColor && this.rowClickColor.length > 0) {

                this.clickRowIndex = rowIndex;
            }

            this.rowClick && this.rowClick(rowIndex, rowData, column);
        },
        rowCellDbClick: function rowCellDbClick(rowIndex, rowData, column) {

            this.rowDblclick && this.rowDblclick(rowIndex, rowData, column);
        },
        rowCellContextmenu: function rowCellContextmenu(event, rowIndex, rowData, column) {
            this.rowContextmenu && this.rowContextmenu(event, rowIndex, rowData, column);
        },
        getHighPriorityBgColor: function getHighPriorityBgColor(rowIndex) {

            var result = '';

            if (this.clickRowIndex === rowIndex) {

                result = this.rowClickColor;
            } else if (this.hoverRowIndex === rowIndex) {

                result = this.rowHoverColor;
            }

            if (result.length <= 0) {

                if (this.evenBgColor && this.evenBgColor.length > 0 || this.oddBgColor && this.oddBgColor.length > 0) {

                    result = (rowIndex + 1) % 2 === 0 ? this.evenBgColor : this.oddBgColor;
                }
            }

            if (result.length <= 0) {

                result = this.tableBgColor;
            }

            return result;
        },
        setRowBgColor: function setRowBgColor(newVal, oldVal, color) {
            var _this = this;

            var el = this.$el;

            if (!el) {
                return false;
            }

            var rowsCollection = [],
                oldRow = void 0,
                newRow = void 0;

            if (this.hasFrozenColumn) {

                rowsCollection.push(el.querySelectorAll('.v-table-leftview .v-table-row'));
            }

            rowsCollection.push(el.querySelectorAll('.v-table-rightview .v-table-row'));

            rowsCollection.forEach(function (rows) {

                oldRow = rows[oldVal];
                newRow = rows[newVal];

                if (oldRow) {

                    oldRow.style.backgroundColor = _this.getHighPriorityBgColor(oldVal);
                }

                if (newRow) {

                    newRow.style.backgroundColor = color;
                }
            });
        },
        clearCurrentRow: function clearCurrentRow() {

            this.clickRowIndex = -1;
        }
    },

    watch: {

        'hoverRowIndex': function hoverRowIndex(newVal, oldVal) {

            this.setRowBgColor(newVal, oldVal, this.rowHoverColor);
        },

        'clickRowIndex': function clickRowIndex(newVal, oldVal) {

            this.setRowBgColor(newVal, oldVal, this.rowClickColor);
        }
    }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {

            filterSpecialValue: '__all__'
        };
    },

    methods: {
        initColumnsFilters: function initColumnsFilters() {
            var _this = this;

            if (this.isComplexTitle) {

                this.internalTitleRows.forEach(function (rows) {

                    rows.forEach(function (col) {

                        if (_this.enableFilters(col.filters, col.fields) && !col.filterMultiple) {

                            col.filters.unshift({ label: '全部', value: _this.filterSpecialValue, selected: true });
                        }
                    });
                });
            } else {

                this.internalColumns.map(function (col) {

                    if (_this.enableFilters(col.filters) && !col.filterMultiple) {

                        col.filters.unshift({ label: '全部', value: _this.filterSpecialValue, selected: true });
                    }
                });
            }
        },
        filterConditionChange: function filterConditionChange(filterMultiple) {
            if (!filterMultiple) {

                this.filterSummary();
            }
        },
        enableFilters: function enableFilters(filters, fields) {

            var result = false;

            if (Array.isArray(fields) && fields.length > 1) {

                result = false;
            }
            if (Array.isArray(filters) && filters.length > 0) {

                result = true;
            }
            return result;
        },
        filterEvent: function filterEvent() {

            this.filterSummary();
        },
        filterSummary: function filterSummary() {
            var _this2 = this;

            var result = {},
                columns = [],
                tempArr = [];

            if (this.isComplexTitle) {

                columns = this.internalTitleRows;

                columns.forEach(function (rows) {

                    rows.forEach(function (col) {

                        tempArr = [];
                        if (_this2.enableFilters(col.filters, col.fields)) {

                            col.filters.forEach(function (f) {

                                if (f.selected && f.value !== _this2.filterSpecialValue) {
                                    tempArr.push(f.value);
                                }
                            });

                            result[col.fields[0]] = tempArr.length > 0 ? tempArr : null;
                        }
                    });
                });
            } else {

                columns = this.internalColumns;

                columns.forEach(function (col) {

                    tempArr = [];
                    if (_this2.enableFilters(col.filters)) {

                        col.filters.forEach(function (f) {

                            if (f.selected && f.value !== _this2.filterSpecialValue) {
                                tempArr.push(f.value);
                            }
                        });

                        result[col.field] = tempArr.length > 0 ? tempArr : null;
                    }
                });
            }

            this.filterMethod && this.filterMethod(result);
        }
    }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(40),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-table\\src\\table-empty.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] table-empty.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9a55191c", Component.options)
  } else {
    hotAPI.reload("data-v-9a55191c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    props: {
        titleHeight: [Number, String],

        contentHeight: [Number, String],

        width: [Number, String],

        totalColumnsWidth: [Number, String],

        errorContent: {
            type: [String]
        },

        isLoading: [Boolean]

    },

    computed: {
        getCurrentContent: function getCurrentContent() {

            var result = '';

            if (!this.isLoading) {
                result = this.errorContent;
            }

            return result;
        }
    }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-table-empty"
  }, [_c('div', {
    staticClass: "v-table-empty-content",
    style: ({
      'height': _vm.contentHeight + 'px',
      'width': _vm.width + 'px',
      'top': _vm.titleHeight + 'px'
    })
  }, [_c('div', {
    staticClass: "v-table-empty-inner",
    style: ({
      'height': _vm.contentHeight + 'px',
      'width': '100%',
      'line-height': _vm.contentHeight + 'px'
    }),
    domProps: {
      "innerHTML": _vm._s(_vm.getCurrentContent)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "v-table-empty-scroll",
    style: ({
      'height': _vm.contentHeight + 'px',
      'width': _vm.width + 'px',
      'top': _vm.titleHeight + 'px'
    })
  }, [_c('div', {
    staticClass: "v-table-empty-inner",
    style: ({
      'height': '1px',
      'width': _vm.totalColumnsWidth + 'px'
    })
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9a55191c", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(43),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-table\\src\\loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c8cddc0", Component.options)
  } else {
    hotAPI.reload("data-v-6c8cddc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    props: {

        loadingContent: [String],

        loadingOpacity: [Number],

        titleRows: [Array],

        titleRowHeight: [Number],

        columns: [Array]
    },

    methods: {
        setPosition: function setPosition() {

            var loadingEle = this.$el,
                loadingContentEle = this.$el.querySelector('.v-table-loading-content'),
                titleHeight = 0;

            if (this.columns && this.columns.length > 0) {

                titleHeight = this.titleRows && this.titleRows.length > 0 ? this.titleRows.length * this.titleRowHeight : this.titleRowHeight;
            }

            loadingContentEle.style.top = (loadingEle.clientHeight + titleHeight) / 2 - loadingContentEle.clientHeight / 2 + 'px';
        }
    },

    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function (x) {
            _this.setPosition();
        });
    }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "100%"
    }
  }, [_c('div', {
    staticClass: "v-table-loading",
    style: ({
      'opacity': _vm.loadingOpacity
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "v-table-loading-content",
    domProps: {
      "innerHTML": _vm._s(_vm.loadingContent)
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c8cddc0", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(46),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-checkbox-group\\src\\checkbox-group.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkbox-group.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d463caa", Component.options)
  } else {
    hotAPI.reload("data-v-3d463caa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-checkbox-group',

    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        },

        isVerticalShow: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        updateModel: function updateModel(label, checkedVal) {

            var index = this.value.indexOf(label);
            if (index > -1) {

                if (!checkedVal) {

                    this.value.splice(index, 1);
                }
            } else {

                if (checkedVal) {

                    this.value.push(label);
                }
            }

            this.$emit('input', this.value);
            this.$emit('change');
        }
    },

    watch: {
        'value': function value(newVal) {

            var children = _utils2.default.getChildCompsByName(this, 'v-checkbox');

            if (children.length > 0) {

                children.forEach(function (child) {

                    child.updateModelByGroup(newVal);
                });
            }
        }
    }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-checkbox-group"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3d463caa", module.exports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(49),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-checkbox\\src\\checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d5d81ac", Component.options)
  } else {
    hotAPI.reload("data-v-3d5d81ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
    name: 'v-checkbox',
    props: {
        value: {
            type: [String, Number, Boolean]
        },

        label: {
            type: [String, Number],
            require: true
        },
        disabled: Boolean,

        indeterminate: Boolean,
        showSlot: {
            type: Boolean,
            default: true
        }

    },
    data: function data() {
        return {
            model: this.value,
            _checkboxGroup: {}
        };
    },


    computed: {
        checkboxClasses: function checkboxClasses() {
            var _ref;

            return ['v-checkbox', (_ref = {}, _defineProperty(_ref, 'v-checkbox-checked', this.model), _defineProperty(_ref, 'v-checkbox-disabled', this.disabled), _defineProperty(_ref, 'v-checkbox-indeterminate', this.indeterminate), _ref)];
        },
        isCheckBoxGroup: function isCheckBoxGroup() {

            this._checkboxGroup = _utils2.default.getParentCompByName(this, 'v-checkbox-group');
            return this._checkboxGroup ? true : false;
        },
        displayType: function displayType() {

            var style = 'inline-block';

            if (this._checkboxGroup) {
                style = this._checkboxGroup.isVerticalShow ? 'block' : 'inline-block';
            }
            return style;
        }
    },

    methods: {
        change: function change(event) {
            if (this.disabled) {

                this.model = !this.model;
                return false;
            }
            var checked = event.target.checked;

            this.$emit('input', checked);
            this.$emit('change');

            if (this.isCheckBoxGroup) {

                this._checkboxGroup.updateModel(this.label, checked);
            }
        },
        initModel: function initModel() {

            if (this.isCheckBoxGroup) {

                var checkboxGroup = this._checkboxGroup;
                if (Array.isArray(checkboxGroup.value) && checkboxGroup.value.length > 0) {

                    if (checkboxGroup.value.indexOf(this.label) > -1) {

                        this.model = true;
                    }
                }
            } else {

                this.model = this.value;
            }
        },
        updateModelBySingle: function updateModelBySingle() {

            if (!this.disabled) {
                this.model = this.value;
            }
        },
        updateModelByGroup: function updateModelByGroup(checkBoxGroup) {

            if (checkBoxGroup.indexOf(this.label) > -1) {

                if (!this.disabled) {
                    this.model = true;
                }
            } else {

                if (!this.disabled) {
                    this.model = false;
                }
            }
        }
    },

    created: function created() {

        this.initModel();
    },


    watch: {
        'value': function value(val) {

            this.updateModelBySingle();
        }
    }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "v-checkbox-wrapper",
    style: ({
      'display': _vm.displayType
    })
  }, [_c('span', {
    class: _vm.checkboxClasses
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.model),
      expression: "model"
    }],
    staticClass: "v-checkbox-input",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "value": _vm.label,
      "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.label) > -1 : (_vm.model)
    },
    on: {
      "change": [function($event) {
        var $$a = _vm.model,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = _vm.label,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.model = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.model = $$c
        }
      }, _vm.change]
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "v-checkbox-inner"
  })]), _vm._v(" "), _c('span', [(_vm.showSlot) ? _vm._t("default", [_vm._v(_vm._s(_vm.label))]) : _vm._e()], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3d5d81ac", module.exports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(53),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-dropdown\\src\\dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18df642c", Component.options)
  } else {
    hotAPI.reload("data-v-18df642c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

var _clickoutside = __webpack_require__(52);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(4);

var _index4 = _interopRequireDefault(_index3);

var _layerAdjustment = __webpack_require__(8);

var _layerAdjustment2 = _interopRequireDefault(_layerAdjustment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-dropdown',
    components: {
        VCheckboxGroup: _index2.default, VCheckbox: _index4.default
    },
    mixins: [_layerAdjustment2.default],
    directives: {
        'click-outside': _clickoutside2.default
    },
    data: function data() {
        return {

            visible: false,

            internalOptions: [],

            checkboxGroupList: [],

            textAlignPrefix: 'v-dropdown-items-li-a-',

            inputValue: '',

            isOperationChange: null
        };
    },

    props: {
        isSelect: {
            type: Boolean,
            default: false
        },
        showOperation: {
            type: Boolean,
            default: false
        },
        size: {
            type: String
        },

        width: {
            type: Number,
            default: 90

        },

        maxWidth: {
            type: Number
        },

        isMultiple: {
            type: Boolean,
            default: false
        },

        value: [Object, Array],

        placeholder: {
            type: String,
            default: '请选择',
            validator: function validator(value) {
                return value.length > 0;
            }
        },

        textAlign: {
            type: String,
            default: 'left'
        },

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 999
        },

        isInput: {
            type: Boolean,
            default: false
        }

    },
    computed: {
        sizeClass: function sizeClass() {
            var size = _settings2.default.sizeMaps[this.size] || _settings2.default.sizeMapDefault;
            return size === _settings2.default.sizeMaps['large'] ? ' v-dropdown--large' : size === _settings2.default.sizeMaps['middle'] ? ' v-dropdown--middle' : ' v-dropdown--small';
        },
        getMaxWidth: function getMaxWidth() {
            var result = Infinity,
                maxWidth = this.maxWidth,
                width = this.width;

            if (maxWidth && maxWidth > 0 && maxWidth > width) {

                result = maxWidth;
            }

            return result;
        }
    },
    methods: {
        init: function init() {
            this.internalOptions = Object.assign([], this.value);

            this.checkboxGroupList = this.selectedLabels();

            if (this.isInput) {

                this.setInputValue();
            }
        },
        confirm: function confirm() {

            if (this.isOperationChange) {

                this.$emit('on-filter-method', this.internalOptions);
                this.isOperationChange = false;
            }
            this.hideDropDown();
        },
        rest: function rest() {
            var _this = this;

            if (this.internalOptions.some(function (x) {
                return x.selected;
            })) {

                this.internalOptions.map(function (x) {

                    if (x.selected) {
                        x.selected = false;
                    }
                    return x;
                });

                this.checkboxGroupList = [];

                this.$emit('input', this.internalOptions);

                this.$emit('change');
            }

            setTimeout(function (x) {

                _this.hideDropDown();
            }, 50);
        },
        hideDropDown: function hideDropDown() {

            if (this.showOperation && this.isOperationChange) {

                this.$emit('on-filter-method', this.internalOptions);
                this.isOperationChange = false;
            }

            this.visible = false;
        },
        showDropDown: function showDropDown() {

            this.visible = true;
        },
        setInputValue: function setInputValue() {

            var result, labels;

            labels = this.selectedLabels();
            if (Array.isArray(labels) && labels.length > 0) {
                result = labels.join();
            }

            this.inputValue = result;
        },
        checkboxGroupChange: function checkboxGroupChange() {

            this.selectOptionClick();
        },
        toggleItems: function toggleItems() {
            var _this2 = this;

            if (this.visible) {

                this.hideDropDown();
            } else {

                this.showDropDown();

                this.$nextTick(function (x) {
                    _this2.dropDownClick();
                });
            }
        },
        selectOptionClick: function selectOptionClick(item) {
            var _this3 = this;

            if (!this.isMultiple) {
                this.internalOptions.map(function (x) {

                    if (item.label === x.label) {
                        x.selected = true;
                    } else {
                        x.selected = false;
                    }
                    return x;
                });
            } else {
                this.internalOptions.map(function (x) {

                    if (_this3.checkboxGroupList.includes(x.label)) {
                        x.selected = true;
                    } else {
                        x.selected = false;
                    }
                    return x;
                });
            }

            if (!this.isMultiple) {
                this.toggleItems();
            }

            if (this.isInput) {

                this.setInputValue();
            }

            this.$emit('input', this.internalOptions);

            this.$emit('change');
        },
        getTextAlignClass: function getTextAlignClass() {

            return this.textAlignPrefix + this.textAlign;
        },
        selectedLabels: function selectedLabels() {

            return this.internalOptions.filter(function (x) {
                return x.selected;
            }).map(function (x) {

                if (x.selected) {
                    return x.label;
                }
            });
        },
        clickOutside: function clickOutside() {

            this.hideDropDown();
        },
        dropDownClick: function dropDownClick() {

            var dtEle = this.$el.querySelector('.v-dropdown-dt'),
                ddItem = this.$el.querySelector('.v-dropdown-items');
            this.layerAdjustmentOnce(ddItem, dtEle, 2);
            return false;
        },
        dropdownAdjust: function dropdownAdjust() {

            var dtEle = this.$el.querySelector('.v-dropdown-dt'),
                ddItem = this.$el.querySelector('.v-dropdown-items');
            this.layerAdjustmentBind(ddItem, dtEle, 2);
        }
    },

    created: function created() {

        this.init();
    },
    mounted: function mounted() {

        this.dropdownAdjust();
    },

    watch: {
        'value': function value(val) {
            this.init();
        },
        'internalOptions': function internalOptions(val) {

            this.isOperationChange = this.showOperation && this.isOperationChange !== null ? true : false;
        }
    }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    bind: function bind(el, binding, vNode) {
        if (typeof binding.value !== 'function') {

            var msg = 'in [clickoutside] directives, provided expression \'' + binding.expression + '\' is not a function ';

            var compName = vNode.context.name;

            if (compName) {
                msg += 'in ' + compName;
            }
            console.error(msg);
        }

        var handler = function handler(e) {
            if (!el.contains(e.target) && el !== e.target) {
                binding.value(e);
            } else {
                return false;
            }
        };

        el.__clickOutSide__ = handler;

        document.addEventListener('click', handler, true);
    },

    unbind: function unbind(el) {
        document.removeEventListener('click', el.__clickOutSide__, true);
        el.__clickOutSide__ = null;
    }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('dl', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: (_vm.clickOutside),
      expression: "clickOutside"
    }],
    class: ['v-dropdown', _vm.sizeClass]
  }, [_c('dt', {
    staticClass: "v-dropdown-dt"
  }, [_c('a', {
    class: [_vm.isSelect ? 'v-dropdown-selected' : ''],
    style: ({
      'width': _vm.width + 'px'
    }),
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.toggleItems()
      }
    }
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('dd', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible),
      expression: "visible"
    }],
    staticClass: "v-dropdown-dd"
  }, [_c('ul', {
    staticClass: "v-dropdown-items",
    style: ({
      'min-width': _vm.width + 'px',
      'max-width': _vm.getMaxWidth + 'px'
    })
  }, [(_vm.isMultiple) ? [_c('v-checkbox-group', {
    attrs: {
      "is-vertical-show": "",
      "min": _vm.min,
      "max": _vm.max
    },
    on: {
      "change": _vm.checkboxGroupChange
    },
    model: {
      value: (_vm.checkboxGroupList),
      callback: function($$v) {
        _vm.checkboxGroupList = $$v
      },
      expression: "checkboxGroupList"
    }
  }, _vm._l((_vm.internalOptions), function(item) {
    return _c('li', {
      class: ['v-dropdown-items-multiple', _vm.getTextAlignClass()]
    }, [_c('v-checkbox', {
      key: item.label,
      attrs: {
        "label": item.label,
        "showLine": item.showLine
      }
    })], 1)
  }), 0)] : _vm._l((_vm.internalOptions), function(item) {
    return _c('li', {
      class: ['v-dropdown-items-li', item.selected ? 'active' : ''],
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.selectOptionClick(item)
        }
      }
    }, [_c('a', {
      class: ['v-dropdown-items-li-a', _vm.getTextAlignClass()],
      attrs: {
        "href": "javascript:void(0);"
      }
    }, [_vm._v(_vm._s(item.label))])])
  }), _vm._v(" "), (_vm.showOperation) ? _c('li', {
    staticClass: "v-dropdown-operation"
  }, [_c('a', {
    staticClass: "v-dropdown-operation-item",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.confirm($event)
      }
    }
  }, [_vm._v("确认")]), _vm._v(" "), _c('a', {
    staticClass: "v-dropdown-operation-item",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.rest($event)
      }
    }
  }, [_vm._v("重置")])]) : _vm._e()], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-18df642c", module.exports)
  }
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-table-views v-table-class",
    style: ({
      'width': _vm.internalWidth + 'px',
      'height': _vm.getTableHeight + 'px',
      'background-color': _vm.tableBgColor
    })
  }, [(_vm.frozenCols.length > 0) ? [_c('div', {
    staticClass: "v-table-leftview",
    style: ({
      'width': _vm.leftViewWidth + 'px'
    })
  }, [_c('div', {
    staticClass: "v-table-header v-table-title-class",
    style: ({
      'width': _vm.leftViewWidth + 'px',
      'background-color': _vm.titleBgColor
    })
  }, [_c('div', {
    staticClass: "v-table-header-inner",
    staticStyle: {
      "display": "block"
    }
  }, [_c('table', {
    staticClass: "v-table-htable",
    attrs: {
      "border": "0",
      "cellspacing": "0",
      "cellpadding": "0"
    }
  }, [_c('tbody', [(_vm.frozenTitleCols.length > 0) ? _vm._l((_vm.frozenTitleCols), function(row) {
    return _c('tr', _vm._l((row), function(col) {
      return _c('td', {
        class: [col.titleCellClassName],
        attrs: {
          "colspan": col.colspan,
          "rowspan": col.rowspan
        },
        on: {
          "mousemove": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseMove($event, col.fields)
          },
          "mousedown": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseDown($event)
          },
          "mouseout": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseOut()
          },
          "click": function($event) {
            $event.stopPropagation();
            return _vm.titleCellClick(col.fields, col.title);
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.titleCellDblClick(col.fields, col.title)
          }
        }
      }, [_c('div', {
        class: ['v-table-title-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': _vm.titleColumnWidth(col.fields) + 'px',
          'height': _vm.titleColumnHeight(col.rowspan) + 'px',
          'text-align': col.titleAlign
        })
      }, [_c('span', {
        staticClass: "table-title"
      }, [(_vm.isSelectionCol(col.fields)) ? _c('span', [_c('v-checkbox', {
        attrs: {
          "indeterminate": _vm.indeterminate,
          "show-slot": false,
          "label": "check-all"
        },
        on: {
          "change": _vm.handleCheckAll
        },
        model: {
          value: (_vm.isAllChecked),
          callback: function($$v) {
            _vm.isAllChecked = $$v
          },
          expression: "isAllChecked"
        }
      })], 1) : _c('span', {
        domProps: {
          "innerHTML": _vm._s(col.title)
        }
      }), _vm._v(" "), (_vm.enableSort(col.orderBy)) ? _c('span', {
        staticClass: "v-table-sort-icon",
        on: {
          "click": function($event) {
            $event.stopPropagation();
            return _vm.sortControl(col.fields[0])
          }
        }
      }, [_c('i', {
        class: ["v-icon-up-dir", _vm.getCurrentSort(col.fields[0]) === "asc" ? "checked" : ""]
      }), _vm._v(" "), _c('i', {
        class: ["v-icon-down-dir", _vm.getCurrentSort(col.fields[0]) === "desc" ? "checked" : ""]
      })]) : _vm._e()]), _vm._v(" "), (_vm.enableFilters(col.filters, col.fields)) ? _c('v-dropdown', {
        staticClass: "v-table-dropdown",
        attrs: {
          "show-operation": col.filterMultiple,
          "is-multiple": col.filterMultiple
        },
        on: {
          "on-filter-method": _vm.filterEvent,
          "change": function($event) {
            return _vm.filterConditionChange(col.filterMultiple)
          }
        },
        model: {
          value: (col.filters),
          callback: function($$v) {
            _vm.$set(col, "filters", $$v)
          },
          expression: "col.filters"
        }
      }, [_c('i', {
        class: ['v-table-filter-icon', _vm.vTableFiltersIcon(col.filters)]
      })]) : _vm._e()], 1)])
    }), 0)
  }) : [_c('tr', {
    staticClass: "v-table-header-row"
  }, _vm._l((_vm.frozenCols), function(col) {
    return _c('td', {
      class: [col.titleCellClassName],
      on: {
        "mousemove": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseMove($event, col.field)
        },
        "mousedown": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseDown($event)
        },
        "mouseout": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseOut()
        },
        "click": function($event) {
          $event.stopPropagation();
          return _vm.titleCellClick(col.field, col.title);
        },
        "dblclick": function($event) {
          $event.stopPropagation();
          return _vm.titleCellDblClick(col.field, col.title)
        }
      }
    }, [_c('div', {
      class: ['v-table-title-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
      style: ({
        'width': col.width + 'px',
        'height': _vm.titleRowHeight + 'px',
        'text-align': col.titleAlign
      })
    }, [_c('span', {
      staticClass: "table-title"
    }, [(col.type === 'selection') ? _c('span', [_c('v-checkbox', {
      attrs: {
        "indeterminate": _vm.indeterminate,
        "show-slot": false,
        "label": "check-all"
      },
      on: {
        "change": _vm.handleCheckAll
      },
      model: {
        value: (_vm.isAllChecked),
        callback: function($$v) {
          _vm.isAllChecked = $$v
        },
        expression: "isAllChecked"
      }
    })], 1) : _c('span', {
      domProps: {
        "innerHTML": _vm._s(col.title)
      }
    }), _vm._v(" "), (_vm.enableSort(col.orderBy)) ? _c('span', {
      staticClass: "v-table-sort-icon",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.sortControl(col.field)
        }
      }
    }, [_c('i', {
      class: ["v-icon-up-dir", _vm.getCurrentSort(col.field) === "asc" ? "checked" : ""]
    }), _vm._v(" "), _c('i', {
      class: ["v-icon-down-dir", _vm.getCurrentSort(col.field) === "desc" ? "checked" : ""]
    })]) : _vm._e()]), _vm._v(" "), (_vm.enableFilters(col.filters)) ? _c('v-dropdown', {
      staticClass: "v-table-dropdown",
      attrs: {
        "show-operation": col.filterMultiple,
        "is-multiple": col.filterMultiple
      },
      on: {
        "on-filter-method": _vm.filterEvent,
        "change": function($event) {
          return _vm.filterConditionChange(col.filterMultiple)
        }
      },
      model: {
        value: (col.filters),
        callback: function($$v) {
          _vm.$set(col, "filters", $$v)
        },
        expression: "col.filters"
      }
    }, [_c('i', {
      class: ['v-table-filter-icon', _vm.vTableFiltersIcon(col.filters)]
    })]) : _vm._e()], 1)])
  }), 0)]], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "v-table-body v-table-body-class",
    style: ({
      'width': _vm.leftViewWidth + 'px',
      'height': _vm.bodyViewHeight + 'px'
    })
  }, [_c('div', {
    class: ['v-table-body-inner', _vm.vTableBodyInner]
  }, [_c('v-checkbox-group', {
    on: {
      "change": _vm.handleCheckGroupChange
    },
    model: {
      value: (_vm.checkboxGroupModel),
      callback: function($$v) {
        _vm.checkboxGroupModel = $$v
      },
      expression: "checkboxGroupModel"
    }
  }, [_c('table', {
    staticClass: "v-table-btable",
    attrs: {
      "cellspacing": "0",
      "cellpadding": "0",
      "border": "0"
    }
  }, [_c('tbody', _vm._l((_vm.internalTableData), function(item, rowIndex) {
    return _c('tr', {
      staticClass: "v-table-row",
      style: ([_vm.trBgColor(rowIndex + 1)]),
      on: {
        "mouseenter": function($event) {
          $event.stopPropagation();
          return _vm.handleMouseEnter(rowIndex)
        },
        "mouseleave": function($event) {
          $event.stopPropagation();
          return _vm.handleMouseOut(rowIndex)
        }
      }
    }, _vm._l((_vm.frozenCols), function(col, colIndex) {
      return (_vm.cellMergeInit(rowIndex, col.field, item, true)) ? _c('td', {
        key: colIndex,
        class: [_vm.setColumnCellClassName(rowIndex, col.field, item)],
        attrs: {
          "colSpan": _vm.setColRowSpan(rowIndex, col.field, item).colSpan,
          "rowSpan": _vm.setColRowSpan(rowIndex, col.field, item).rowSpan
        }
      }, [(_vm.isCellMergeRender(rowIndex, col.field, item)) ? _c('div', {
        class: ['v-table-body-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': _vm.getRowWidthByColSpan(rowIndex, col.field, item) + 'px',
          'height': _vm.getRowHeightByRowSpan(rowIndex, col.field, item) + 'px',
          'line-height': _vm.getRowHeightByRowSpan(rowIndex, col.field, item) + 'px',
          'text-align': col.columnAlign
        }),
        attrs: {
          "title": col.overflowTitle ? _vm.overflowTitle(item, rowIndex, col) : ''
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            _vm.rowCellClick(rowIndex, item, col);
            _vm.cellEditClick($event, col.isEdit, item, col.field, rowIndex)
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.rowCellDbClick(rowIndex, item, col)
          },
          "contextmenu": function($event) {
            $event.preventDefault();
            return _vm.rowContextmenu($event, rowIndex, item, col)
          }
        }
      }, [(_vm.cellMergeContentType(rowIndex, col.field, item).isComponent) ? _c('span', [_c(_vm.cellMerge(rowIndex, item, col.field).componentName, {
        tag: "component",
        attrs: {
          "rowData": item,
          "field": col.field ? col.field : '',
          "index": rowIndex
        },
        on: {
          "on-custom-comp": _vm.customCompFunc
        }
      })], 1) : _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.cellMerge(rowIndex, item, col.field).content)
        }
      })]) : _c('div', {
        class: ['v-table-body-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': col.width + 'px',
          'height': _vm.rowHeight + 'px',
          'line-height': _vm.rowHeight + 'px',
          'text-align': col.columnAlign
        }),
        attrs: {
          "title": col.overflowTitle ? _vm.overflowTitle(item, rowIndex, col) : ''
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            _vm.rowCellClick(rowIndex, item, col);
            _vm.cellEditClick($event, col.isEdit, item, col.field, rowIndex)
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.rowCellDbClick(rowIndex, item, col)
          },
          "contextmenu": function($event) {
            $event.preventDefault();
            return _vm.rowContextmenu($event, rowIndex, item, col)
          }
        }
      }, [(typeof col.componentName === 'string' && col.componentName.length > 0) ? _c('span', [_c(col.componentName, {
        tag: "component",
        attrs: {
          "rowData": item,
          "field": col.field ? col.field : '',
          "index": rowIndex
        },
        on: {
          "on-custom-comp": _vm.customCompFunc
        }
      })], 1) : (typeof col.formatter === 'function') ? _c('span', {
        domProps: {
          "innerHTML": _vm._s(col.formatter(item, rowIndex, _vm.pagingIndex, col.field))
        }
      }) : (col.type === 'selection') ? _c('span', [_c('v-checkbox', {
        attrs: {
          "show-slot": false,
          "disabled": item._disabled,
          "label": rowIndex
        },
        on: {
          "change": function($event) {
            return _vm.handleCheckChange(item)
          }
        }
      })], 1) : _c('span', [_vm._v(_vm._s(item[col.field]))])])]) : _vm._e()
    }), 0)
  }), 0)])])], 1)]), _vm._v(" "), (_vm.frozenFooterCols.length > 0) ? _c('div', {
    class: ['v-table-footer', 'v-table-footer-class'],
    style: ({
      'width': _vm.leftViewWidth + 'px',
      'height': _vm.footerTotalHeight
    })
  }, [_c('table', {
    staticClass: "v-table-ftable",
    attrs: {
      "cellspacing": "0",
      "cellpadding": "0",
      "border": "0"
    }
  }, _vm._l((_vm.frozenFooterCols), function(item, rowIndex) {
    return _c('tr', {
      staticClass: "v-table-row"
    }, _vm._l((item), function(col, colIndex) {
      return _c('td', {
        class: _vm.setFooterCellClassName(true, rowIndex, colIndex, col.content)
      }, [_c('div', {
        class: ['v-table-body-cell', _vm.vTableBodyCell],
        style: ({
          'height': _vm.footerRowHeight + 'px',
          'line-height': _vm.footerRowHeight + 'px',
          'width': col.width + 'px',
          'text-align': col.align
        }),
        domProps: {
          "innerHTML": _vm._s(col.content)
        }
      })])
    }), 0)
  }), 0)]) : _vm._e()])] : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "v-table-rightview",
    style: ({
      'width': _vm.rightViewWidth + 'px'
    })
  }, [_c('div', {
    staticClass: "v-table-header v-table-title-class",
    style: ({
      'width': (_vm.rightViewWidth - 1) + 'px',
      'background-color': _vm.titleBgColor
    })
  }, [_c('div', {
    staticClass: "v-table-header-inner",
    staticStyle: {
      "display": "block"
    }
  }, [_c('table', {
    staticClass: "v-table-htable",
    attrs: {
      "border": "0",
      "cellspacing": "0",
      "cellpadding": "0"
    }
  }, [_c('tbody', [(_vm.noFrozenTitleCols.length > 0) ? _vm._l((_vm.noFrozenTitleCols), function(row) {
    return _c('tr', _vm._l((row), function(col) {
      return _c('td', {
        class: [col.titleCellClassName],
        attrs: {
          "colspan": col.colspan,
          "rowspan": col.rowspan
        },
        on: {
          "mousemove": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseMove($event, col.fields)
          },
          "mousedown": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseDown($event)
          },
          "mouseout": function($event) {
            $event.stopPropagation();
            return _vm.handleTitleMouseOut()
          },
          "click": function($event) {
            $event.stopPropagation();
            return _vm.titleCellClick(col.fields, col.title);
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.titleCellDblClick(col.fields, col.title)
          }
        }
      }, [_c('div', {
        class: ['v-table-title-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': _vm.titleColumnWidth(col.fields) + 'px',
          'height': _vm.titleColumnHeight(col.rowspan) + 'px',
          'text-align': col.titleAlign
        })
      }, [_c('span', {
        staticClass: "table-title"
      }, [(_vm.isSelectionCol(col.fields)) ? _c('span', [_c('v-checkbox', {
        attrs: {
          "indeterminate": _vm.indeterminate,
          "show-slot": false,
          "label": "check-all"
        },
        on: {
          "change": _vm.handleCheckAll
        },
        model: {
          value: (_vm.isAllChecked),
          callback: function($$v) {
            _vm.isAllChecked = $$v
          },
          expression: "isAllChecked"
        }
      })], 1) : _c('span', {
        domProps: {
          "innerHTML": _vm._s(col.title)
        }
      }), _vm._v(" "), (_vm.enableSort(col.orderBy)) ? _c('span', {
        staticClass: "v-table-sort-icon",
        on: {
          "click": function($event) {
            $event.stopPropagation();
            return _vm.sortControl(col.fields[0])
          }
        }
      }, [_c('i', {
        class: ["v-icon-up-dir", _vm.getCurrentSort(col.fields[0]) === "asc" ? "checked" : ""]
      }), _vm._v(" "), _c('i', {
        class: ["v-icon-down-dir", _vm.getCurrentSort(col.fields[0]) === "desc" ? "checked" : ""]
      })]) : _vm._e()]), _vm._v(" "), (_vm.enableFilters(col.filters, col.fields)) ? _c('v-dropdown', {
        staticClass: "v-table-dropdown",
        attrs: {
          "show-operation": col.filterMultiple,
          "is-multiple": col.filterMultiple
        },
        on: {
          "on-filter-method": _vm.filterEvent,
          "change": function($event) {
            return _vm.filterConditionChange(col.filterMultiple)
          }
        },
        model: {
          value: (col.filters),
          callback: function($$v) {
            _vm.$set(col, "filters", $$v)
          },
          expression: "col.filters"
        }
      }, [_c('i', {
        class: ['v-table-filter-icon', _vm.vTableFiltersIcon(col.filters)]
      })]) : _vm._e()], 1)])
    }), 0)
  }) : [_c('tr', {
    staticClass: "v-table-header-row"
  }, _vm._l((_vm.noFrozenCols), function(col, colIndex) {
    return _c('td', {
      class: [col.titleCellClassName],
      on: {
        "mousemove": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseMove($event, col.field)
        },
        "mousedown": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseDown($event)
        },
        "mouseout": function($event) {
          $event.stopPropagation();
          return _vm.handleTitleMouseOut()
        },
        "click": function($event) {
          $event.stopPropagation();
          return _vm.titleCellClick(col.field, col.title);
        },
        "dblclick": function($event) {
          $event.stopPropagation();
          return _vm.titleCellDblClick(col.field, col.title)
        }
      }
    }, [_c('div', {
      class: ['v-table-title-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
      style: ({
        'width': col.width + 'px',
        'height': _vm.titleRowHeight + 'px',
        'text-align': col.titleAlign
      })
    }, [_c('span', {
      staticClass: "table-title"
    }, [(col.type === 'selection') ? _c('span', [_c('v-checkbox', {
      attrs: {
        "indeterminate": _vm.indeterminate,
        "show-slot": false,
        "label": "check-all"
      },
      on: {
        "change": _vm.handleCheckAll
      },
      model: {
        value: (_vm.isAllChecked),
        callback: function($$v) {
          _vm.isAllChecked = $$v
        },
        expression: "isAllChecked"
      }
    })], 1) : _c('span', {
      domProps: {
        "innerHTML": _vm._s(col.title)
      }
    }), _vm._v(" "), (_vm.enableSort(col.orderBy)) ? _c('span', {
      staticClass: "v-table-sort-icon",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.sortControl(col.field)
        }
      }
    }, [_c('i', {
      class: ["v-icon-up-dir", _vm.getCurrentSort(col.field) === "asc" ? "checked" : ""]
    }), _vm._v(" "), _c('i', {
      class: ["v-icon-down-dir", _vm.getCurrentSort(col.field) === "desc" ? "checked" : ""]
    })]) : _vm._e(), _vm._v(" "), (_vm.enableFilters(col.filters)) ? _c('v-dropdown', {
      staticClass: "v-table-dropdown",
      attrs: {
        "show-operation": col.filterMultiple,
        "is-multiple": col.filterMultiple
      },
      on: {
        "on-filter-method": _vm.filterEvent,
        "change": function($event) {
          return _vm.filterConditionChange(col.filterMultiple)
        }
      },
      model: {
        value: (col.filters),
        callback: function($$v) {
          _vm.$set(col, "filters", $$v)
        },
        expression: "col.filters"
      }
    }, [_c('i', {
      class: ['v-table-filter-icon', _vm.vTableFiltersIcon(col.filters)]
    })]) : _vm._e()], 1)])])
  }), 0)]], 2)])])]), _vm._v(" "), _c('div', {
    class: ['v-table-body v-table-body-class', _vm.vTableRightBody],
    style: ({
      'width': _vm.rightViewWidth + 'px',
      'height': _vm.bodyViewHeight + 'px'
    })
  }, [_c('v-checkbox-group', {
    on: {
      "change": _vm.handleCheckGroupChange
    },
    model: {
      value: (_vm.checkboxGroupModel),
      callback: function($$v) {
        _vm.checkboxGroupModel = $$v
      },
      expression: "checkboxGroupModel"
    }
  }, [_c('table', {
    staticClass: "v-table-btable",
    attrs: {
      "cellspacing": "0",
      "cellpadding": "0",
      "border": "0"
    }
  }, [_c('tbody', _vm._l((_vm.internalTableData), function(item, rowIndex) {
    return _c('tr', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item['_hide'] !== true),
        expression: "item['_hide']!==true"
      }],
      key: rowIndex,
      staticClass: "v-table-row",
      style: ([_vm.trBgColor(rowIndex + 1)]),
      on: {
        "mouseenter": function($event) {
          $event.stopPropagation();
          return _vm.handleMouseEnter(rowIndex)
        },
        "mouseleave": function($event) {
          $event.stopPropagation();
          return _vm.handleMouseOut(rowIndex)
        }
      }
    }, _vm._l((_vm.noFrozenCols), function(col, colIndex) {
      return (_vm.cellMergeInit(rowIndex, col.field, item, false)) ? _c('td', {
        key: colIndex,
        class: [_vm.setColumnCellClassName(rowIndex, col.field, item)],
        attrs: {
          "colSpan": _vm.setColRowSpan(rowIndex, col.field, item).colSpan,
          "rowSpan": _vm.setColRowSpan(rowIndex, col.field, item).rowSpan
        }
      }, [(_vm.isCellMergeRender(rowIndex, col.field, item)) ? _c('div', {
        class: ['v-table-body-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': _vm.getRowWidthByColSpan(rowIndex, col.field, item) + 'px',
          'height': _vm.getRowHeightByRowSpan(rowIndex, col.field, item) + 'px',
          'line-height': _vm.getRowHeightByRowSpan(rowIndex, col.field, item) + 'px',
          'text-align': col.columnAlign
        }),
        attrs: {
          "title": col.overflowTitle ? _vm.overflowTitle(item, rowIndex, col) : ''
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            _vm.rowCellClick(rowIndex, item, col);
            _vm.cellEditClick($event, col.isEdit, item, col.field, rowIndex)
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.rowCellDbClick(rowIndex, item, col)
          },
          "contextmenu": function($event) {
            $event.preventDefault();
            return _vm.rowContextmenu($event, rowIndex, item, col)
          }
        }
      }, [(_vm.cellMergeContentType(rowIndex, col.field, item).isComponent) ? _c('span', [_c(_vm.cellMerge(rowIndex, item, col.field).componentName, {
        tag: "component",
        attrs: {
          "rowData": item,
          "field": col.field ? col.field : '',
          "index": rowIndex
        },
        on: {
          "on-custom-comp": _vm.customCompFunc
        }
      })], 1) : _c('span', {
        domProps: {
          "innerHTML": _vm._s(_vm.cellMerge(rowIndex, item, col.field).content)
        }
      })]) : _c('div', {
        class: ['v-table-body-cell', _vm.showVerticalBorder ? 'vertical-border' : '', _vm.showHorizontalBorder ? 'horizontal-border' : ''],
        style: ({
          'width': col.width + 'px',
          'height': _vm.rowHeight + 'px',
          'line-height': _vm.rowHeight + 'px',
          'text-align': col.columnAlign
        }),
        attrs: {
          "title": col.overflowTitle ? _vm.overflowTitle(item, rowIndex, col) : ''
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            _vm.rowCellClick(rowIndex, item, col);
            _vm.cellEditClick($event, col.isEdit, item, col.field, rowIndex)
          },
          "dblclick": function($event) {
            $event.stopPropagation();
            return _vm.rowCellDbClick(rowIndex, item, col)
          },
          "contextmenu": function($event) {
            $event.preventDefault();
            return _vm.rowContextmenu($event, rowIndex, item, col)
          }
        }
      }, [(typeof col.componentName === 'string' && col.componentName.length > 0) ? _c('span', [_c(col.componentName, {
        tag: "component",
        attrs: {
          "rowData": item,
          "field": col.field ? col.field : '',
          "index": rowIndex
        },
        on: {
          "on-custom-comp": _vm.customCompFunc
        }
      })], 1) : (col.type === 'treeitem') ? _c('v-treeitem', {
        attrs: {
          "row-index": rowIndex,
          "level": item['_level'],
          "has-child": _vm.internalTableData[rowIndex + 1] && _vm.internalTableData[rowIndex + 1]['_level'] > item['_level']
        },
        on: {
          "toggle": _vm.onRowToggle
        },
        model: {
          value: (item['_expand']),
          callback: function($$v) {
            _vm.$set(item, '_expand', $$v)
          },
          expression: "item['_expand']"
        }
      }, [_vm._v("\n                                        " + _vm._s(item[col.field]) + "\n                                    ")]) : (col.type === 'action') ? _c('span', _vm._l((col.buttons), function(btn) {
        return _c('a', {
          staticClass: "operation",
          on: {
            "click": function($event) {
              return _vm.onRowButtonClick(btn.key, item)
            }
          }
        }, [_vm._v(_vm._s(btn.name))])
      }), 0) : (typeof col.formatter === 'function') ? _c('span', {
        domProps: {
          "innerHTML": _vm._s(col.formatter(item, rowIndex, _vm.pagingIndex, col.field))
        }
      }) : (col.type === 'selection') ? _c('span', [_c('v-checkbox', {
        attrs: {
          "show-slot": false,
          "disabled": item._disabled,
          "label": rowIndex
        },
        on: {
          "change": function($event) {
            return _vm.handleCheckChange(item)
          }
        }
      })], 1) : _c('span', [_vm._v(_vm._s(item[col.field]))])], 1)]) : _vm._e()
    }), 0)
  }), 0)])])], 1), _vm._v(" "), (_vm.noFrozenFooterCols.length > 0) ? _c('div', {
    class: ['v-table-footer', 'v-table-footer-class', _vm.vTableFooter],
    style: ({
      'width': _vm.rightViewWidth + 'px',
      'height': _vm.footerTotalHeight
    })
  }, [_c('table', {
    staticClass: "v-table-ftable",
    attrs: {
      "cellspacing": "0",
      "cellpadding": "0",
      "border": "0"
    }
  }, _vm._l((_vm.noFrozenFooterCols), function(item, rowIndex) {
    return _c('tr', {
      staticClass: "v-table-row"
    }, _vm._l((item), function(col, colIndex) {
      return _c('td', {
        class: _vm.setFooterCellClassName(false, rowIndex, colIndex, col.content)
      }, [_c('div', {
        class: ['v-table-body-cell', _vm.vTableBodyCell],
        style: ({
          'height': _vm.footerRowHeight + 'px',
          'line-height': _vm.footerRowHeight + 'px',
          'width': col.width + 'px',
          'text-align': col.align
        }),
        domProps: {
          "innerHTML": _vm._s(col.content)
        }
      })])
    }), 0)
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.isTableEmpty) ? _c('table-empty', {
    attrs: {
      "width": _vm.internalWidth,
      "total-columns-width": _vm.totalColumnsWidth,
      "content-height": _vm.errorContentHeight,
      "title-height": _vm.getTotalColumnsHeight(),
      "error-content": _vm.errorContent,
      "is-loading": _vm.isLoading
    }
  }) : _vm._e(), _vm._v(" "), (_vm.isLoading) ? _c('loading', {
    attrs: {
      "loading-content": _vm.loadingContent,
      "title-rows": _vm.internalTitleRows,
      "title-row-height": _vm.titleRowHeight,
      "columns": _vm.internalColumns,
      "loading-opacity": _vm.loadingOpacity
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isDragging),
      expression: "isDragging"
    }],
    staticClass: "v-table-drag-line"
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9b38949c", module.exports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pagination = __webpack_require__(56);

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pagination2.default.install = function (Vue) {
    Vue.component(_pagination2.default.name, _pagination2.default);
};

exports.default = _pagination2.default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pager = __webpack_require__(57);

var _pager2 = _interopRequireDefault(_pager);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-pagination',
    props: {
        layout: {
            type: Array,
            default: function _default() {
                return ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'];
            }
        },

        size: {
            type: String
        },

        total: {
            type: Number,
            require: true
        },

        pageIndex: {
            type: Number
        },

        showPagingCount: {
            type: Number,
            default: 5
        },

        pageSize: {
            type: Number,
            default: 10
        },

        pageSizeOption: {
            type: Array,
            default: function _default() {
                return [10, 20, 30];
            }
        }
    },
    data: function data() {
        return {
            newPageIndex: this.pageIndex && this.pageIndex > 0 ? parseInt(this.pageIndex) : 1,

            newPageSize: this.pageSize,

            newPageSizeOption: []
        };
    },


    computed: {
        pageCount: function pageCount() {
            return Math.ceil(this.total / this.newPageSize);
        }
    },

    render: function render(h) {
        var template = h("ul", { "class": "v-page-ul" });

        var comps = {
            'total': h("total"),
            'prev': h("prev"),
            'pager': h("pager", {
                attrs: { pageCount: this.pageCount, pageIndex: this.newPageIndex,
                    showPagingCount: this.showPagingCount
                },
                on: {
                    "jumpPageHandler": this.jumpPageHandler
                }
            }),
            'next': h("next"),
            'sizer': h("sizer"),
            'jumper': h("jumper", {
                on: {
                    "jumpPageHandler": this.jumpPageHandler
                }
            })
        };

        template.children = template.children || [];

        this.layout.forEach(function (item) {
            template.children.push(comps[item]);
        });

        var size = _settings2.default.sizeMaps[this.size] || _settings2.default.sizeMapDefault;
        var sizeClass = size === _settings2.default.sizeMaps['large'] ? ' v-page--large' : size === _settings2.default.sizeMaps['middle'] ? ' v-page--middle' : ' v-page--small';

        template.data.class += sizeClass;

        return template;
    },


    components: {

        Total: {
            render: function render(h) {
                return h(
                    "span",
                    { "class": "v-page-total" },
                    ["\xA0\u5171\xA0", this.$parent.total, "\xA0\u6761\xA0"]
                );
            }
        },

        Prev: {
            render: function render(h) {
                return h(
                    "li",
                    {
                        on: {
                            "click": this.$parent.prevPage
                        },

                        "class": [this.$parent.newPageIndex === 1 ? 'v-page-disabled' : '', 'v-page-li', 'v-page-prev']
                    },
                    [h("a", [h("i", { "class": "v-icon-angle-left" })])]
                );
            }
        },

        pager: _pager2.default,

        Next: {
            render: function render(h) {
                return h(
                    "li",
                    {
                        on: {
                            "click": this.$parent.nextPage
                        },

                        "class": [this.$parent.newPageIndex === this.$parent.pageCount ? 'v-page-disabled' : '', 'v-page-li', 'v-page-next']
                    },
                    [h("a", [h("i", { "class": "v-icon-angle-right" })])]
                );
            }
        },

        Sizer: {
            components: {
                VSelect: _index2.default
            },

            render: function render(h) {
                return h("v-select", {
                    attrs: { size: this.$parent.size,
                        value: this.$parent.newPageSizeOption
                    },
                    "class": "v-page-select", on: {
                        "input": this.handleChange
                    },
                    directives: [{
                        name: "model",
                        value: this.$parent.newPageSizeOption
                    }]
                });
            },


            methods: {
                handleChange: function handleChange(items) {

                    if (Array.isArray(items) && items.length > 0) {
                        var item = items.find(function (x) {
                            return x.selected;
                        });
                        if (item) {
                            this.$parent.pageSizeChangeHandler(item.value);
                        }
                    }
                }
            },

            created: function created() {}
        },

        Jumper: {
            methods: {
                jumperEnter: function jumperEnter(event) {
                    if (event.keyCode !== 13) return;

                    var val = this.$parent.getValidNum(event.target.value);

                    this.$parent.newPageIndex = val;

                    this.$emit('jumpPageHandler', val);
                }
            },
            render: function render(h) {
                return h(
                    "span",
                    { "class": "v-page-goto" },
                    ["\xA0\u524D\u5F80\xA0", h("input", {
                        "class": "v-page-goto-input",
                        domProps: {
                            "value": this.$parent.newPageIndex
                        },
                        on: {
                            "keyup": this.jumperEnter
                        },
                        attrs: {
                            type: "input"
                        }
                    }), "\xA0\u9875\xA0"]
                );
            }
        }
    },

    methods: {
        getValidNum: function getValidNum(value) {
            var result = 1;

            value = parseInt(value, 10);

            if (isNaN(value) || value < 1) {
                result = 1;
            } else {
                if (value < 1) {
                    result = 1;
                } else if (value > this.pageCount) {
                    result = this.pageCount;
                } else {
                    result = value;
                }
            }
            return result;
        },
        jumpPageHandler: function jumpPageHandler(newPageIndex) {
            this.newPageIndex = newPageIndex;
            this.$emit('page-change', this.newPageIndex);
        },
        prevPage: function prevPage() {
            if (this.newPageIndex > 1) {
                this.newPageIndex = this.newPageIndex - 1;
                this.$emit('page-change', this.newPageIndex);
            }
        },
        nextPage: function nextPage() {
            if (this.newPageIndex < this.pageCount) {
                this.newPageIndex = this.newPageIndex + 1;
                this.$emit('page-change', this.newPageIndex);
            }
        },
        pageSizeChangeHandler: function pageSizeChangeHandler() {
            var item = this.newPageSizeOption.find(function (x) {
                return x.selected;
            });

            if (item) {
                this.newPageSize = item.value;
                this.newPageIndex = 1;
                this.$emit('page-size-change', this.newPageSize);
            }
        },
        initSelectOption: function initSelectOption() {
            var _this = this;

            this.newPageSizeOption = this.pageSizeOption.map(function (x) {
                var temp = {};

                temp.value = x;
                temp.label = x + ' 条/页';
                if (_this.newPageSize == x) {
                    temp.selected = true;
                }

                return temp;
            });
        },
        goBackPageIndex: function goBackPageIndex() {

            this.newPageIndex = this.pageIndex && this.pageIndex > 0 ? parseInt(this.pageIndex) : 1;
        },
        goBackPageSize: function goBackPageSize() {

            if (this.pageSize > 0) {

                this.newPageSize = this.pageSize;
                this.initSelectOption();
            }
        }
    },
    watch: {
        pageIndex: function pageIndex(newVal, oldVal) {
            this.newPageIndex = newVal;
        },

        pageSize: function pageSize(newVal, oldVal) {
            this.newPageSize = newVal;
            this.initSelectOption();
        }
    },
    created: function created() {
        this.initSelectOption();
    }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(59),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-pagination\\src\\pager.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pager.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b88fe83", Component.options)
  } else {
    hotAPI.reload("data-v-4b88fe83", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        pageCount: Number,
        pageIndex: Number,
        showPagingCount: Number
    },
    computed: {
        numOffset: function numOffset() {
            return Math.floor((this.showPagingCount + 2) / 2) - 1;
        },
        showJumpPrev: function showJumpPrev() {
            if (this.pageCount > this.showPagingCount + 2) {
                if (this.pageIndex > this.showPagingCount) {
                    return true;
                }
            }
            return false;
        },
        showJumpNext: function showJumpNext() {
            if (this.pageCount > this.showPagingCount + 2) {
                if (this.pageIndex <= this.pageCount - this.showPagingCount) {

                    return true;
                }
            }
            return false;
        },
        pagingCounts: function pagingCounts() {
            var vm = this,
                startNum = void 0,
                result = [],
                showJumpPrev = vm.showJumpPrev,
                showJumpNext = vm.showJumpNext;

            if (showJumpPrev && !showJumpNext) {
                startNum = vm.pageCount - vm.showPagingCount;
                for (var i = startNum; i < vm.pageCount; i++) {
                    result.push(i);
                }
            } else if (!showJumpPrev && showJumpNext) {
                for (var _i = 2; _i < vm.showPagingCount + 2; _i++) {
                    result.push(_i);
                }
            } else if (showJumpPrev && showJumpNext) {
                for (var _i2 = vm.pageIndex - vm.numOffset; _i2 <= vm.pageIndex + vm.numOffset; _i2++) {
                    result.push(_i2);
                }
            } else {
                for (var _i3 = 2; _i3 < vm.pageCount; _i3++) {
                    result.push(_i3);
                }
            }

            return result;
        }
    },
    methods: {
        jumpPage: function jumpPage(pageIndex) {
            this.$emit('jumpPageHandler', pageIndex);
        }
    },
    created: function created() {}
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "v-page-pager"
  }, [_c('li', {
    class: [_vm.pageIndex === 1 ? "v-page-li-active" : "", "v-page-li"],
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.jumpPage(1)
      }
    }
  }, [_c('a', [_vm._v("1")])]), _vm._v(" "), (_vm.showJumpPrev) ? _c('li', {
    class: [_vm.pageIndex === 1 ? 'disabled' : '', 'v-page-li', 'v-page-jump-prev'],
    attrs: {
      "title": '向前 ' + _vm.showPagingCount + ' 页'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.jumpPage(_vm.pageIndex - _vm.showPagingCount)
      }
    }
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), _vm._l((_vm.pagingCounts), function(num) {
    return _c('li', {
      class: [num === _vm.pageIndex ? "v-page-li-active" : "", "v-page-li"],
      on: {
        "click": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.jumpPage(num)
        }
      }
    }, [_c('a', [_vm._v(_vm._s(num))])])
  }), _vm._v(" "), (_vm.showJumpNext) ? _c('li', {
    staticClass: "v-page-li v-page-jump-next",
    attrs: {
      "title": '向后 ' + _vm.showPagingCount + ' 页'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.jumpPage(_vm.pageIndex + _vm.showPagingCount)
      }
    }
  }, [_vm._m(1)]) : _vm._e(), (_vm.pageCount > 1) ? _c('li', {
    class: [_vm.pageIndex === _vm.pageCount ? "v-page-li-active" : "", "v-page-li"],
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.jumpPage(_vm.pageCount)
      }
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.pageCount))])]) : _vm._e()], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', [_c('i', {
    staticClass: "v-icon-angle-double-left"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', [_c('i', {
    staticClass: "v-icon-angle-double-right"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b88fe83", module.exports)
  }
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(62),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-select\\src\\select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] select.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8479116c", Component.options)
  } else {
    hotAPI.reload("data-v-8479116c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

var _layerAdjustment = __webpack_require__(8);

var _layerAdjustment2 = _interopRequireDefault(_layerAdjustment);

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-select',
    components: {
        VDropdown: _index2.default
    },
    mixins: [_layerAdjustment2.default],
    data: function data() {
        return {

            visible: false,

            internalOptions: [],

            textAlignPrefix: 'v-select-items-li-a-',

            inputValue: ''
        };
    },

    props: {
        size: {
            type: String
        },

        width: {
            type: Number,
            default: 90

        },

        maxWidth: {
            type: Number
        },

        isMultiple: {
            type: Boolean,
            default: false
        },

        value: [Object, Array],

        placeholder: {
            type: String,
            default: '请选择',
            validator: function validator(value) {
                return value.length > 0;
            }
        },

        textAlign: {
            type: String,
            default: 'left'
        },

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 999
        },

        isInput: {
            type: Boolean,
            default: false
        }

    },
    methods: {
        init: function init() {
            this.internalOptions = Object.assign([], this.value);

            if (this.isInput) {

                this.setInputValue();
            }
        },
        showSelectInfo: function showSelectInfo() {
            var result, labels;

            labels = this.selectedLabels();
            if (Array.isArray(labels) && labels.length > 0) {
                result = labels.join();
            } else {
                result = this.placeholder;
            }

            return result;
        },
        selectedLabels: function selectedLabels() {

            return this.internalOptions.filter(function (x) {
                return x.selected;
            }).map(function (x) {

                if (x.selected) {
                    return x.label;
                }
            });
        },
        dropdownChange: function dropdownChange() {
            this.$emit('input', this.internalOptions);

            this.$emit('change');
        }
    },

    created: function created() {

        this.init();
    },

    watch: {
        'value': function value(val) {
            this.init();
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dropdown', {
    staticClass: "v-select",
    style: ({
      width: _vm.width
    }),
    attrs: {
      "is-select": "",
      "size": _vm.size,
      "width": _vm.width,
      "maxWidth": _vm.maxWidth,
      "isMultiple": _vm.isMultiple,
      "textAlign": _vm.textAlign,
      "min": _vm.min,
      "max": _vm.max,
      "isInput": _vm.isInput
    },
    on: {
      "change": _vm.dropdownChange
    },
    model: {
      value: (_vm.internalOptions),
      callback: function($$v) {
        _vm.internalOptions = $$v
      },
      expression: "internalOptions"
    }
  }, [_c('span', [(_vm.isInput) ? [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.inputValue),
      expression: "inputValue"
    }],
    staticClass: "v-select-input",
    attrs: {
      "placeholder": _vm.placeholder,
      "type": "text"
    },
    domProps: {
      "value": (_vm.inputValue)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.inputValue = $event.target.value
      }
    }
  })] : [_c('span', {
    staticClass: "v-select-selected-span"
  }, [_vm._v(_vm._s(_vm.showSelectInfo()))])], _vm._v(" "), _c('i', {
    staticClass: "v-select-selected-i v-icon-down-dir"
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8479116c", module.exports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _treeitem = __webpack_require__(64);

var _treeitem2 = _interopRequireDefault(_treeitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_treeitem2.default.install = function (Vue) {
    Vue.component(_treeitem2.default.name, _treeitem2.default);
};

exports.default = _treeitem2.default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(69),
  /* template */
  __webpack_require__(70),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\mycode\\vue-easytable.git\\trunk\\packages\\v-treeitem\\src\\treeitem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] treeitem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d42b9c2c", Component.options)
  } else {
    hotAPI.reload("data-v-d42b9c2c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(67)("0b0b2ea4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d42b9c2c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./treeitem.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d42b9c2c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./treeitem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "\n.treeitem > i {\n    font-size: 1.2em;\n}\n.treeitem > i.expanded {\n}\n.treeitem > i.collapsed {\n        color: #a6a6a6;\n}\n.treeitem .tree-space {\n    position: relative;\n    top: 1px;\n    display: inline-block;\n    font-style: normal;\n    font-weight: 400;\n    line-height: 1em;\n    width: 12px;\n    /*height: 18px;*/\n}\n.treeitem .tree-space::before {\n        content: \"\";\n}\n", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(68)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "v-treeitem",
    data: function data() {
        return {
            expand: this.value
        };
    },

    props: {
        rowIndex: Number,

        level: Number,

        hasChild: Boolean,
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle: function toggle() {
            this.expand = !this.expand;
            this.$emit("input", this.expand);
            this.$emit("toggle", this.rowIndex, this.expand);
        }
    },
    watch: {
        value: function value(val) {
            this.expand = val;
        }
    }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "treeitem"
  }, [_vm._l(((_vm.level - 1)), function(s) {
    return _c('i', {
      staticClass: "tree-space"
    })
  }), _vm._v(" "), (_vm.hasChild) ? [(_vm.expand) ? _c('i', {
    staticClass: "ivu-icon ivu-icon-md-arrow-dropdown expanded",
    on: {
      "click": _vm.toggle
    }
  }) : _c('i', {
    staticClass: "ivu-icon ivu-icon-md-arrow-dropright collapsed",
    on: {
      "click": _vm.toggle
    }
  })] : _c('i', {
    staticClass: "tree-space"
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d42b9c2c", module.exports)
  }
}

/***/ })
/******/ ]);