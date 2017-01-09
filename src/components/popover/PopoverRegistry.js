/**
 * Registering to deal with popovers
 * @param {function} $animate
 */
export default function PopoverRegistry($animate) {
  const popovers = {};
  this.add = function add(id, object) {
    popovers[id] = object;

    return true;
  };
  this.find = function find(id) {
    return popovers[id];
  };
  this.remove = function remove(id) {
    delete popovers[id];
  };
  this.removeGroup = function removeGroup(group, currentId) {
    angular.forEach(popovers, (popoverOb, id) => {
      if (id === currentId) return;

      if (popoverOb.group && popoverOb.group === group) {
        $animate.removeClass(popoverOb.popover, 'sw-popover-animate').then(() => {
          popoverOb.popover.remove();
          delete popovers[id];
        });
      }
    });
  };
}
