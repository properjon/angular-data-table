/**
 * Resizable directive
 * http://stackoverflow.com/questions/18368485/angular-js-resizable-div-directive
 * @param {object}
 * @param {function}
 * @param {function}
 */
export default function ResizableDirective($document, $timeout) {
  return {
    restrict: 'A',
    scope: {
      isResizable: '=resizable',
      minWidth: '=',
      maxWidth: '=',
      onResize: '&',
    },
    link($scope, $element) {
      if ($scope.isResizable) {
        $element.addClass('resizable');
      }

      const handle = angular.element('<span class="dt-resize-handle" title="Resize"></span>');
      const parent = $element.parent();

      let prevScreenX;

      handle.on('mousedown', (event) => {
        if (!$element[0].classList.contains('resizable')) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        event = event.originalEvent || event;

        const width = parent[0].clientWidth;
        const movementX = event.movementX || event.mozMovementX || (event.screenX - prevScreenX);
        const newWidth = width + (movementX || 0);

        prevScreenX = event.screenX;

        if ((!$scope.minWidth || newWidth >= $scope.minWidth) &&
          (!$scope.maxWidth || newWidth <= $scope.maxWidth)) {
          parent.css({
            width: `${newWidth}px`,
          });
        }
      }

      function mouseup() {
        if ($scope.onResize) {
          $timeout(() => {
            let width = parent[0].clientWidth;
            if (width < $scope.minWidth) {
              width = $scope.minWidth;
            }
            $scope.onResize({ width });
          });
        }

        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }

      $element.append(handle);
    },
  };
}
