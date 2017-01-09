import { requestAnimFrame } from '../../utils/utils';
import StyleTranslator from './StyleTranslator';

export default function ScrollerDirective() {
  return {
    restrict: 'E',
    require: '^dtBody',
    transclude: true,
    replace: true,
    template: '<div ng-style="scrollerStyles()" ng-transclude></div>',
    link($scope, $elm, $attrs, ctrl) {
      const parent = $elm.parent();

      let ticking = false;
      let lastScrollY = 0;
      let lastScrollX = 0;

      ctrl.options.internal.styleTranslator =
        new StyleTranslator(ctrl.options.rowHeight);

      ctrl.options.internal.setYOffset = (offsetY) => {
        parent[0].scrollTop = offsetY;
      };

      function update() {
        ctrl.options.internal.offsetY = lastScrollY;
        ctrl.options.internal.offsetX = lastScrollX;
        ctrl.updatePage();

        if (ctrl.options.scrollbarV) {
          ctrl.getRows();
        }

        // https://github.com/Swimlane/angular-data-table/pull/74
        ctrl.options.$outer.$digest();

        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      }

      parent.on('scroll', function onScroll() {
        lastScrollY = this.scrollTop;
        lastScrollX = this.scrollLeft;

        requestTick();
      });

      $scope.$on('$destroy', () => {
        parent.off('scroll');
      });

      $scope.scrollerStyles = function scrollerStyles() {
        if (ctrl.options.scrollbarV) {
          return {
            height: `${ctrl.count * ctrl.options.rowHeight}px`,
          };
        }

        return undefined;
      };
    },
  };
}
