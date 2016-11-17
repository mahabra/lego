"use strict";

/**
 * Return list of properties which source haven't
 *
 * @param  {object} source Source object
 * @param  {array<String>} requiredProps Array of keys
 * @return {array}               Array of losted keys
 */
function getLostedProps(source, requiredProps) {
  return requiredProps.filter((prop) => !source.hasOwnProperty(prop));
}

/**
 * Fill object with keys
 *
 * @param  {array<String>} keys
 * @param  {object} target = {} Target
 * @return {object}
 */
function fill(keys, target = {}) {
  keys.forEach((key) => { target[key] = target[key] || undefined; })
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
  if ("function"===typeof validator) {
    return Boolean(validator(value));
  } else {
    return value===validator;
  }
}


/**
 * Polyfill for Object.values
 *
 * @param  {object} object
 * @return {array}
 */
function objectValues(object) {
  let values = [];
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      values.push(object[prop]);
    }
  }
  return values;
}

export function lego(propsTypes, factory, defaultProps = {}) {
  return function factoryFactory(props) {
    const got = Object.assign({}, defaultProps);
    if ("object"!==typeof props) {
      if (Object.keys(got).length===Object.keys(propsTypes).length) {
        return factory(...objectValues(Object.assign(fill(Object.keys(propsTypes)), got)));
      }
      throw new Error("Lego factory requires props: "+getLostedProps(got, Object.keys(propsTypes)).join(','));
    }
    for (let prop in props) {
      if (!props.hasOwnProperty(prop)) continue;
      if (!propsTypes.hasOwnProperty(prop)) {
        throw new Error('Unexpected property `'+prop+'`')
      } else if (!validate(props[prop], propsTypes[prop])) {
        throw new Error('Invalid lego type `'+(typeof props[prop])+'` of property `'+prop+'` with value '+String(props[prop]));
      } else {
        if ("undefined"===typeof props[prop] && got.hasOwnProperty(prop)) {
          // Skip
        } else {
          got[prop] = props[prop];
        }
      }
    }

    return lego(propsTypes, factory, got);
  }
}

export const PropTypes = {
  object: function(val) { return "object"===typeof val},
  function: function(val) { return "function"===typeof val},
  array: function(val) { return val instanceof Array },
  number: function(val) { return "number"===typeof val },
  string: function(val) { return "string"===typeof val },
  boolean: function(val) { return "boolean"===typeof val },
  undefined: function(val) { return "undefined"===typeof val },
  mayBe: function(t) {
    return function(val) {
      return "undefined"===typeof val || validate(val, t)
    }
  },
  Date: function(val) { return val instanceof Date },
  instanceOf: function(Constructor) {
    return function(val) {
      return val instanceof Constructor;
    }
  },
  oneOf: function(values) {
    return function(val) {
      return Boolean(~values.indexOf(val))
    }
  },
  oneOfTypes: function(types) {
    return function(val) {
      return types.filter((t) => validate(val, t)).length>0;
    }
  }
}

lego.PropTypes = PropTypes;

export default lego;
