import { CamelCase } from './utils';

const cache = {};
const testStyle = document.createElement('div').style;

// Get Prefix
// http://davidwalsh.name/vendor-prefix
const prefix = (function getPrefix() {
  const styles = window.getComputedStyle(document.documentElement, '');
  const pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
  const dom = ('WebKit|Moz|MS|O').match(new RegExp(`(${pre})`, 'i'))[1];

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
export default function GetVendorPrefixedName(property) {
  const name = CamelCase(property);
  if (!cache[name]) {
    if (angular.isDefined(testStyle[prefix.css + property])) {
      cache[name] = prefix.css + property;
    } else if (angular.isDefined(testStyle[property])) {
      cache[name] = property;
    }
  }
  return cache[name];
}
