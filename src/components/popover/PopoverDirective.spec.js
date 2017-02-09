import PopoverDirective from './PopoverDirective';
import POPOVER from './Popover.constants';

describe('PopoverDirective', () => {
  let popoverDirective = null,
    scope = null,
    animateMock = null,
    getPopoverDirective = null,
    httpMock = null,
    templateCache = null;

  beforeEach(inject(($rootScope) => {
    getPopoverDirective = () => {
      scope = $rootScope.$new();
      animateMock = {
        addClass: jasmine.createSpy('addClass'),
      };
      httpMock = {
        get: jasmine.createSpy('get'),
      };
      templateCache = {
        get: jasmine.createSpy('get'),
      };

      popoverDirective = new PopoverDirective(scope);
    };
  }));

  describe('when running tests', () => {
    beforeEach(() => {
      getPopoverDirective();
    });

    it('loads as an Object', () => {
      expect(popoverDirective).toEqual(jasmine.any(Object));
    });

    it('has scope with proper defaults', () => {
      const attributes = {};
      console.log(popoverDirective);
      scope.options = {
        alignment: attributes.popoverAlignment || 'middle',
        placement: attributes.popoverPlacement || 'right',
        plain: !!attributes.popoverPlain || false,
        popoverId: attributes.popoverId,
        showCaret: !!attributes.popoverPlain || false,
        spacing: parseInt(attributes.popoverSpacing, 10) || 0,
        template: attributes.popoverTemplate,
        text: attributes.popoverText,
      };
    });
  });
});
