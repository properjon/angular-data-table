/**
 * Debounce helper
 * @param  {function}
 * @param  {int}
 * @param  {boolean}
 */
export function debounce(func, wait, immediate) {
  let timeout,
    args,
    context,
    timestamp,
    result;
  return function () {
    context = this;
    args = arguments;
    timestamp = new Date();
    const later = function () {
      const last = new Date() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      }
    };
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
}

/**
 * Throttle helper
 * @param  {function}
 * @param  {boolean}
 * @param  {object}
 */
export function throttle(func, wait, options) {
  let context,
    args,
    result;
  let timeout = null;
  let previous = 0;
  options || (options = {});
  const later = function () {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
  };
  return function () {
    const now = new Date();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
