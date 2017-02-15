import PopoverDirective from './PopoverDirective';
import PopoverRegistry from './PopoverRegistry';
import PositionHelper from './PositionHelper';
import POPOVER from './Popover.constants';

describe('PopoverDirective', () => {
  let animate = null,
    attributes = null,
    compile = null,
    element = null,
    getPopoverDirective = null,
    http = null,
    popoverDirective = null,
    q = null,
    scope = null,
    timeout = null,
    templateCache = null;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    element = angular.element(`<span
      popover
      popover-id="5"
      popover-placement="left"
      popover-plain="true"
      popover-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non orci libero. Suspendisse aliquam eu magna ac tristique. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sem erat, suscipit nec faucibus sed, interdum quis enim. Cras id laoreet dolor. Quisque ex odio, consectetur et neque nec, sagittis tempus erat. Donec at maximus purus. Nulla molestie arcu eros, ac pulvinar ligula mattis in. Nulla ut dolor eu metus dignissim auctor. Phasellus auctor quam quis ullamcorper tincidunt."
    >
    </span>`);
    compile(element)(scope);
    scope.$digest();

    popoverDirective = getPopoverDirective();
  }));
  getPopoverDirective = () => {
    animate = {
      addClass: jasmine.createSpy('addClass'),
    };
    http = {
      get: jasmine.createSpy('get'),
    };
    q = {
      when: jasmine.createSpy('when'),
    };
    timeout = {
      cancel: jasmine.createSpy('cancel'),
    };
    templateCache = {
      get: jasmine.createSpy('get'),
    };

    return new PopoverDirective(animate, compile, document, http,
                        q, templateCache, timeout, PopoverRegistry, PositionHelper);
  };

  describe('default setup', () => {
    it('loads as an Object', () => {
      expect(popoverDirective).toEqual(jasmine.any(Object));
    });

    it('has scope.popover undefined before calling link function', () => {
      expect(scope).toEqual(jasmine.any(Object));
      expect(scope.popover).toEqual(undefined);
    });

    it('has scope with no options or popover', () => {
      expect(scope.options).toEqual(undefined);
      expect(scope.popover).toEqual(undefined);
    });
  });

  describe('setup reflecting tooltip example', () => {
    beforeEach(() => {
      attributes = {
        popoverId: '5',
        popoverPlacement: 'left',
        popoverPlain: 'true',
        popoverText: 'Lorem ipsum dolor',
      };
      popoverDirective.link(scope, element, attributes);
    });

    it('builds scope.popover after calling link function', () => {
      expect(scope).toEqual(jasmine.any(Object));
      expect(scope.popover).toEqual(null);
    });

    it('passes popover id from markup to scope options', () => {
      expect(scope.options.popoverId).toEqual('5');
    });

    it('has scope with default options', () => {
      expect(scope.options.alignment).toEqual('middle');
      expect(scope.options.placement).toEqual('left');
      expect(scope.options.plain).toEqual(true);
      expect(scope.options.popoverId).toEqual('5');
      expect(scope.options.showCaret).toEqual(scope.options.plain);
      expect(scope.options.spacing).toEqual(0);
      expect(scope.options.template).toEqual(undefined);
      expect(scope.options.text).toEqual('Lorem ipsum dolor');
    });
  });
});
