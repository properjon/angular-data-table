import PositionHelper from './PositionHelper';
import POPOVER from './Popover.constants';

describe('PositionHelper', () => {
  const elementBox = {
    bottom: 138,
    height: 25,
    left: 595.9375,
    right: 6147.984,
    top: 113,
    width: 5553.04538,
  };
  const popoverBox = {
    bottom: 275.5,
    height: 300,
    left: 342.8125,
    right: 592.8125,
    top: -24.5,
    width: 250,
  };
  const caretBox = {
    bottom: 508.5,
    height: 11,
    left: 480.328125,
    right: 486.328125,
    top: 497.5,
    width: 6,
  };

  let positionHelper = null,
    logMock = null,
    getPositionHelper = null;

  beforeEach(() => {
    getPositionHelper = () => {
      logMock = {
        warn: jasmine.createSpy('warn')
      };

      positionHelper = new PositionHelper(logMock);
    };
  });

  describe('when calculating popover alignment', () => {
    beforeEach(() => {
      getPositionHelper();
    });

    it('uses two functions to calculate popover alignment', () => {
      expect(positionHelper.calculateHorizontalAlignment).toEqual(jasmine.any(Function));
      expect(positionHelper.calculateVerticalAlignment).toEqual(jasmine.any(Function));
    });

    it('uses two functions to calculate caret alignment', () => {
      expect(positionHelper.calculateHorizontalCaret).toEqual(jasmine.any(Function));
      expect(positionHelper.calculateVerticalCaret).toEqual(jasmine.any(Function));
    });

    it('calculate horizontal alignment with invalid value', () => {
      positionHelper.calculateHorizontalAlignment(elementBox, popoverBox, '');
      expect(logMock.warn).toHaveBeenCalled();
    });

    it('calculate horizontal alignment with center value', () => {
      const calculated = positionHelper.calculateHorizontalAlignment(elementBox, popoverBox, POPOVER.CENTER);
      expect(calculated).toEqual(3247.46019);
    });

    it('calculate horizontal alignment with left value', () => {
      const calculated = positionHelper.calculateHorizontalAlignment(elementBox, popoverBox, POPOVER.LEFT);
      expect(calculated).toEqual(595.9375);
    });

    it('calculate horizontal alignment with right value', () => {
      const calculated = positionHelper.calculateHorizontalAlignment(elementBox, popoverBox, POPOVER.RIGHT);
      expect(calculated).toEqual(5898.98288);
    });

    it('calculate vertical alignment with invalid value', () => {
      positionHelper.calculateVerticalAlignment(elementBox, popoverBox, '');
      expect(logMock.warn).toHaveBeenCalled();
    });

    it('calculate vertical alignment with bottom value', () => {
      const calculated = positionHelper.calculateVerticalAlignment(elementBox, popoverBox, POPOVER.BOTTOM);
      expect(calculated).toEqual(-162);
    });

    it('calculate vertical alignment with middle value', () => {
      const calculated = positionHelper.calculateVerticalAlignment(elementBox, popoverBox, POPOVER.MIDDLE);
      expect(calculated).toEqual(-24.5);
    });

    it('calculate vertical alignment with top value', () => {
      const calculated = positionHelper.calculateVerticalAlignment(elementBox, popoverBox, POPOVER.TOP);
      expect(calculated).toEqual(113);
    });

    it('calculate horizontal caret alignment with invalid value', () => {
      positionHelper.calculateHorizontalCaret(elementBox, popoverBox, caretBox, '');
      expect(logMock.warn).toHaveBeenCalled();
    });

    it('calculate horizontal caret alignment with center value', () => {
      const calculated = positionHelper.calculateHorizontalCaret(elementBox, popoverBox, caretBox, POPOVER.CENTER);
      expect(calculated).toEqual(118.5);
    });

    it('calculate horizontal caret alignment with left value', () => {
      const calculated = positionHelper.calculateHorizontalCaret(elementBox, popoverBox, caretBox, POPOVER.LEFT);
      expect(calculated).toEqual(2770.02269);
    });

    it('calculate horizontal caret alignment with right value', () => {
      const calculated = positionHelper.calculateHorizontalCaret(elementBox, popoverBox, caretBox, POPOVER.RIGHT);
      expect(calculated).toEqual(-2533.02269);
    });

    it('calculate vertical caret alignment with invalid value', () => {
      positionHelper.calculateVerticalCaret(elementBox, popoverBox, caretBox, '');
      expect(logMock.warn).toHaveBeenCalled();
    });

    it('calculate vertical caret alignment with bottom value', () => {
      const calculated = positionHelper.calculateVerticalCaret(elementBox, popoverBox, caretBox, POPOVER.BOTTOM);
      expect(calculated).toEqual(281);
    });

    it('calculate vertical caret alignment with middle value', () => {
      const calculated = positionHelper.calculateVerticalCaret(elementBox, popoverBox, caretBox, POPOVER.MIDDLE);
      expect(calculated).toEqual(143.5);
    });

    it('calculate vertical caret alignment with top value', () => {
      const calculated = positionHelper.calculateVerticalCaret(elementBox, popoverBox, caretBox, POPOVER.TOP);
      expect(calculated).toEqual(6);
    });
  });
});
