import PopoverRegistry from './PopoverRegistry';

describe('PopoverRegistry', () => {
  const registry = new PopoverRegistry();
  const popoverId = 0;
  const popoverObject = { element: 'JQLite', popover: 'JQLite' };

  it('adds a popover object to the registry', () => {
    const popover = registry.add(popoverId, popoverObject);
    expect(popover).toEqual(popoverObject);
  });

  it('denies me the internal popovers object', () => {
    expect(registry.popovers).not.toEqual(jasmine.any(Object));
  });

  describe('popover already exists', () => {
    beforeEach(() => {
      registry.add(popoverId, popoverObject);
    });

    it('returns a popover by id', () => {
      expect(registry.find(popoverId)).toEqual(jasmine.any(Object));
    });

    it('removes a popover by id', () => {
      expect(registry.remove(popoverId)).toBeUndefined();
    });
  });
});
