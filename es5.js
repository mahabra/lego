(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lego"] = factory();
	else
		root["lego"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Return list of properties which source haven't
	 *
	 * @param  {object} source Source object
	 * @param  {array<String>} requiredProps Array of keys
	 * @return {array}               Array of losted keys
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.lego = lego;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function getLostedProps(source, requiredProps) {
	  return requiredProps.filter(function (prop) {
	    return !source.hasOwnProperty(prop);
	  });
	}

	/**
	 * Fill object with keys
	 *
	 * @param  {array<String>} keys
	 * @param  {object} target = {} Target
	 * @return {object}
	 */
	function fill(keys) {
	  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  keys.forEach(function (key) {
	    target[key] = target[key] || undefined;
	  });
	  return target;
	}

	/**
	 * Validate property with validator
	 *
	 * @param  {*} value
	 * @param  {function|*} validator Can be a function or strict value
	 * @return {type}
	 */
	function validate(value, validator) {
	  if ("function" === typeof validator) {
	    return Boolean(validator(value));
	  } else {
	    return value === validator;
	  }
	}

	/**
	 * Polyfill for Object.values
	 *
	 * @param  {object} object
	 * @return {array}
	 */
	function objectValues(object) {
	  var values = [];
	  for (var prop in object) {
	    if (object.hasOwnProperty(prop)) {
	      values.push(object[prop]);
	    }
	  }
	  return values;
	}

	function lego(propsTypes, factory) {
	  var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  return function factoryFactory(props) {
	    var got = Object.assign({}, defaultProps);
	    if ("object" !== (typeof props === "undefined" ? "undefined" : _typeof(props))) {
	      if (Object.keys(got).length === Object.keys(propsTypes).length) {
	        return factory.apply(undefined, _toConsumableArray(objectValues(Object.assign(fill(Object.keys(propsTypes)), got))));
	      }
	      throw new Error("Lego factory requires props: " + getLostedProps(got, Object.keys(propsTypes)).join(','));
	    }
	    for (var prop in props) {
	      if (!props.hasOwnProperty(prop)) continue;
	      if (!propsTypes.hasOwnProperty(prop)) {
	        throw new Error('Unexpected property `' + prop + '`');
	      } else if (!validate(props[prop], propsTypes[prop])) {
	        throw new Error('Invalid lego type `' + (typeof prop === "undefined" ? "undefined" : _typeof(prop)) + '` of property `' + prop + '` with value ' + String(prop));
	      } else {
	        if ("undefined" === typeof props[prop] && got.hasOwnProperty(prop)) {
	          // Skip
	        } else {
	          got[prop] = props[prop];
	        }
	      }
	    }

	    return lego(propsTypes, factory, got);
	  };
	}

	var PropTypes = exports.PropTypes = {
	  object: function object(val) {
	    return "object" === (typeof val === "undefined" ? "undefined" : _typeof(val));
	  },
	  function: function _function(val) {
	    return "function" === typeof val;
	  },
	  array: function array(val) {
	    return val instanceof Array;
	  },
	  number: function number(val) {
	    return "number" === typeof val;
	  },
	  string: function string(val) {
	    return "string" === typeof val;
	  },
	  boolean: function boolean(val) {
	    return "boolean" === typeof val;
	  },
	  undefined: function undefined(val) {
	    return "undefined" === typeof val;
	  },
	  mayBe: function mayBe(t) {
	    return function (val) {
	      return "undefined" === typeof val || validate(val, t);
	    };
	  },
	  Date: function (_Date) {
	    function Date(_x3) {
	      return _Date.apply(this, arguments);
	    }

	    Date.toString = function () {
	      return _Date.toString();
	    };

	    return Date;
	  }(function (val) {
	    return val instanceof Date;
	  }),
	  instanceOf: function instanceOf(Constructor) {
	    return function (val) {
	      return val instanceof Constructor;
	    };
	  },
	  oneOf: function oneOf(values) {
	    return function (val) {
	      return Boolean(~values.indexOf(val));
	    };
	  },
	  oneOfTypes: function oneOfTypes(types) {
	    return function (val) {
	      return types.filter(function (t) {
	        return validate(val, t);
	      }).length > 0;
	    };
	  }
	};

	lego.PropTypes = PropTypes;

	exports.default = lego;

/***/ }
/******/ ])
});
;