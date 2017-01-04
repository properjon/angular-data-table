/**
 * Debounce helper
 * @param  {function}
 * @param  {int}
 * @param  {boolean}
 */
export function debounce(func, wait, immediate) {
  let timeout;
  let context;
  let timestamp;
  let result;

  return (...args) => {
    context = this;

    timestamp = new Date();
    const later = () => {
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
  const localOptions = options || {};

  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;

  const later = () => {
    previous = localOptions.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
  };

  return (...throttleArgs) => {
    const now = new Date();

    if (!previous && localOptions.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    context = this;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, throttleArgs);
    } else if (!timeout && localOptions.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
