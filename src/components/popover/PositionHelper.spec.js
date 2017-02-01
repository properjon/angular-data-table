import PositionHelper from './PositionHelper';

describe('PositionHelper', () => {
  const position = PositionHelper();
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

  it('has two functions to calculate popover alignment', () => {
    expect(position.calculateHorizontalAlignment).toEqual(jasmine.any(Function));
    expect(position.calculateVerticalAlignment).toEqual(jasmine.any(Function));
  });

  it('has two functions to calculate caret alignment', () => {
    expect(position.calculateHorizontalCaret).toEqual(jasmine.any(Function));
    expect(position.calculateVerticalCaret).toEqual(jasmine.any(Function));
  });

  describe('alignment functions', () => {
    beforeEach(() => {
      const $log = {
        warn: jasmine.createSpy('warn'),
      };
      // spyOn($log, 'warn');
    });

    it('tracks that the spy was called', () => {
      expect($log.warn).toHaveBeenCalled();
    });

    it('calculate horizontal alignment with invalid value', () => {
      position.calculateHorizontalAlignment(elementBox, popoverBox, '');
      expect($log.warn).toHaveBeenCalled();
    });

    it('calculate horizontal alignment with center value', () => {
      const calculated = position.calculateHorizontalAlignment(elementBox, popoverBox, 'center');
      expect(calculated).toEqual(3247.46019);
    });

    it('calculate horizontal alignment with left value', () => {
      const calculated = position.calculateHorizontalAlignment(elementBox, popoverBox, 'left');
      expect(calculated).toEqual(595.9375);
    });

    it('calculate horizontal alignment with right value', () => {
      const calculated = position.calculateHorizontalAlignment(elementBox, popoverBox, 'right');
      expect(calculated).toEqual(5898.98288);
    });

    it('calculate vertical alignment with invalid value', () => {
      position.calculateVerticalAlignment(elementBox, popoverBox, '');
      expect($log.warn).toHaveBeenCalled();
    });

    it('calculate vertical alignment with bottom value', () => {
      const calculated = position.calculateVerticalAlignment(elementBox, popoverBox, 'bottom');
      expect(calculated).toEqual(-162);
    });

    it('calculate vertical alignment with middle value', () => {
      const calculated = position.calculateVerticalAlignment(elementBox, popoverBox, 'middle');
      expect(calculated).toEqual(-24.5);
    });

    it('calculate vertical alignment with top value', () => {
      const calculated = position.calculateVerticalAlignment(elementBox, popoverBox, 'top');
      expect(calculated).toEqual(113);
    });

    it('calculate horizontal caret alignment with invalid value', () => {
      position.calculateHorizontalCaret(elementBox, popoverBox, caretBox, '');
      expect($log.warn).toHaveBeenCalled();
    });

    it('calculate horizontal caret alignment with center value', () => {
      const calculated = position.calculateHorizontalCaret(elementBox, popoverBox, caretBox, 'center');
      expect(calculated).toEqual(3247.46019);
    });

    it('calculate horizontal caret alignment with left value', () => {
      const calculated = position.calculateHorizontalCaret(elementBox, popoverBox, caretBox, 'left');
      expect(calculated).toEqual(595.9375);
    });

    it('calculate horizontal caret alignment with right value', () => {
      const calculated = position.calculateHorizontalCaret(elementBox, popoverBox, caretBox, 'right');
      expect(calculated).toEqual(5898.98288);
    });

    it('calculate vertical caret alignment with invalid value', () => {
      position.calculateVerticalCaret(elementBox, popoverBox, caretBox, '');
      expect($log.warn).toHaveBeenCalled();
    });

    it('calculate vertical caret alignment with bottom value', () => {
      const calculated = position.calculateVerticalCaret(elementBox, popoverBox, caretBox, 'bottom');
      expect(calculated).toEqual(-162);
    });

    it('calculate vertical caret alignment with middle value', () => {
      const calculated = position.calculateVerticalCaret(elementBox, popoverBox, caretBox, 'middle');
      expect(calculated).toEqual(-24.5);
    });

    it('calculate vertical caret alignment with top value', () => {
      const calculated = position.calculateVerticalCaret(elementBox, popoverBox, caretBox, 'top');
      expect(calculated).toEqual(5);
    });
  });
});
