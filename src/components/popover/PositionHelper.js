/**
 * Position helper for the popover directive.
 */

import POSITION from './Popover.constants';

export default function PositionHelper() {
  return {
    calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
      switch (alignment) {
        case POSITION.LEFT:
          return elDimensions.left;
        case POSITION.RIGHT:
          return elDimensions.left + (elDimensions.width - popoverDimensions.width);
        case POSITION.CENTER:
          return elDimensions.left + ((elDimensions.width / 2) - (popoverDimensions.width / 2));
        default:
          return console.log('calculateHorizontalAlignment issue', this); // eslint-disable-line no-console
      }
    },

    calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
      switch (alignment) {
        case POSITION.TOP:
          return elDimensions.top;
        case POSITION.BOTTOM:
          return elDimensions.top + (elDimensions.height - popoverDimensions.height);
        case POSITION.CENTER:
          return elDimensions.top + ((elDimensions.height / 2) - (popoverDimensions.height / 2));
        default:
          return console.log('calculateVerticalAlignment issue', this); // eslint-disable-line no-console
      }
    },

    calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
      switch (alignment) {
        case POSITION.TOP:
          return (elDimensions.height / 2) - (caretDimensions.height / 2) - 1;
        case POSITION.BOTTOM:
          return popoverDimensions.height - (elDimensions.height / 2) -
            (caretDimensions.height / 2) - 1;
        case POSITION.CENTER:
          return (popoverDimensions.height / 2) -
            (caretDimensions.height / 2) - 1;
        default:
          return console.log('calculateVerticalCaret issue', this); // eslint-disable-line no-console
      }
    },

    calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
      switch (alignment) {
        case POSITION.LEFT:
          return (elDimensions.width / 2) - (caretDimensions.height / 2) - 1;
        case POSITION.RIGHT:
          return popoverDimensions.width - (elDimensions.width / 2) -
            (caretDimensions.height / 2) - 1;
        case POSITION.CENTER:
          return (popoverDimensions.width / 2) -
            (caretDimensions.height / 2) - 1;
        default:
          return console.log('calculateHorizontalCaret issue', this); // eslint-disable-line no-console
      }
    },
  };
}
