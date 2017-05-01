/**
 * Position helper for the popover directive.
 */

/* eslint-disable angular/log */

import POSITION from './Popover.constants';

/* @ngInject */
export default function PositionHelper($log) {
  function subtractAll(items) {
    let total = 0;

    items.forEach((count, index) => {
      total = (index === 0) ? total += count : total -= count;
    });

    return total;
  }

  return {
    calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
      switch (alignment) {
        case POSITION.LEFT:
          return elDimensions.left;
        case POSITION.RIGHT:
          return elDimensions.left + (elDimensions.width - popoverDimensions.width);
        case POSITION.CENTER:
          return elDimensions.left +
            ((elDimensions.width / 2) - (popoverDimensions.width / 2));
        default:
          return $log.warn('calculateHorizontalAlignment issue', this);
      }
    },

    calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
      switch (alignment) {
        case POSITION.TOP:
          return elDimensions.top;
        case POSITION.BOTTOM:
          return elDimensions.top + (elDimensions.height - popoverDimensions.height);
        case POSITION.MIDDLE:
          return elDimensions.top + ((elDimensions.height / 2) - (popoverDimensions.height / 2));
        default:
          return $log.warn('calculateVerticalAlignment issue', this);
      }
    },

    calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
      switch (alignment) {
        case POSITION.TOP:
          return subtractAll([
            elDimensions.height / 2,
            caretDimensions.height / 2,
            1,
          ]);
        case POSITION.BOTTOM:
          return subtractAll([
            popoverDimensions.height,
            elDimensions.height / 2,
            caretDimensions.height / 2,
            1,
          ]);
        case POSITION.MIDDLE:
          return subtractAll([
            popoverDimensions.height / 2,
            caretDimensions.height / 2,
            1,
          ]);
        default:
          return $log.warn('calculateVerticalCaret issue', this);
      }
    },

    calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
      switch (alignment) {
        case POSITION.LEFT:
          return subtractAll([
            elDimensions.width / 2,
            caretDimensions.height / 2,
            1,
          ]);
        case POSITION.RIGHT:
          return subtractAll([
            popoverDimensions.width,
            elDimensions.width / 2,
            caretDimensions.height / 2,
            1,
          ]);
        case POSITION.CENTER:
          return subtractAll([(popoverDimensions.width / 2), (caretDimensions.height / 2), 1]);
        default:
          return $log.warn('calculateHorizontalCaret issue', this);
      }
    },
  };
}
