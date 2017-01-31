import PopoverRegistry from './PopoverRegistry';

describe('PopoverRegistry', () => {
  const registry = new PopoverRegistry();
  const popoverObject = { element: 'JQLite', popover: 'JQLite' };

  it('adds a popover object to the registry', () => {
    const popover = registry.add(0, popoverObject);
    expect(popover).toEqual(popoverObject);
  });

  xit('shows me the internal popovers object', () => {
    expect(registry.popovers).toEqual(jasmine.any(Object));
  });

  describe('popover already exists', () => {
    beforeEach(() => {
      registry.add(0, popoverObject);
    });

    it('returns a popover by id', () => {
      expect(registry.find(0)).toEqual(jasmine.any(Object));
    });

    it('removes a popover by id', () => {
      expect(registry.remove(0)).toBeUndefined();
    });
  });
});
