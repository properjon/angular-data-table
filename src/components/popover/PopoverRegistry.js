/**
 * Registering to deal with popovers
 * @param {function} $animate
 */

export default function PopoverRegistry($animate) {
  const popovers = {};

  return {
    add(id, object) {
      popovers[id] = object;
    },

    find(id) {
      return popovers[id];
    },

    remove(id) {
      delete popovers[id];
    },
  };
}
