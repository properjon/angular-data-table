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

    removeGroup(group, currentId) {
      return angular.forEach(popovers, (popoverOb, id) => {
        if (id === currentId) return;

        if (popoverOb.group && popoverOb.group === group) {
          $animate.removeClass(popoverOb.popover, 'sw-popover-animate').then(() => {
            popoverOb.popover.remove();
            delete popovers[id];
          });
        }
      });
    },
  };
}
