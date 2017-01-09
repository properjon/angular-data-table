/* eslint-disable no-extend-native, no-bitwise */

(function extendArray() {
  /**
   * Array.prototype.find()
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   */
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value(predicate, thisArg) {
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        const list = Object(this);
        const length = list.length >>> 0;

        let value;

        for (let i = 0; i < length; i += 1) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }

        return undefined;
      },
    });
  }

  /**
   * Array.prototype.findIndex()
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
   */
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value(predicate, thisArg) {
        if (this == null) {
          throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        const list = Object(this);
        const length = list.length >>> 0;

        let value;

        for (let i = 0; i < length; i += 1) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return i;
          }
        }
        return -1;
      },
      enumerable: false,
      configurable: false,
      writable: false,
    });
  }
}());
