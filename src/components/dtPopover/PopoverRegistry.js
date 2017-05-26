export default function PopoverRegistry() {
  const popovers = {};

  return {
    add(id, object) {
      popovers[id] = object;
      return popovers[id];
    },

    find(id) {
      return popovers[id];
    },

    remove(id) {
      delete popovers[id];
    },
  };
}
