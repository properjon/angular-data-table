import { CamelCase } from './utils';

const cache = {};
const testStyle = document.createElement('div').style;

function getWithPrefix(name) {
  for (let i = 0; i < prefixes.length; i++) {
    const prefixedName = prefixes[i] + name;
    if (prefixedName in testStyle) {
      return prefixedName;
    }
  }
  return null;
}

// Get Prefix
// http://davidwalsh.name/vendor-prefix
const prefix = (function () {
  let styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp(`(${pre})`, 'i'))[1];
  return {
    dom,
    lowercase: pre,
    css: `-${pre}-`,
    js: pre[0].toUpperCase() + pre.substr(1),
  };
}());

/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
export function GetVendorPrefixedName(property) {
  const name = CamelCase(property);
  if (!cache[name]) {
    if (testStyle[prefix.css + property] !== undefined) {
      cache[name] = prefix.css + property;
    } else if (testStyle[property] !== undefined) {
      cache[name] = property;
    }
  }
  return cache[name];
}
