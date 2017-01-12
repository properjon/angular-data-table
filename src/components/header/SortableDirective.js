/**
 * Sortable Directive
 * http://jsfiddle.net/RubaXa/zLq5J/3/
 * https://jsfiddle.net/hrohxze0/6/
 * @param {function}
 */
export default function SortableDirective() {
  return {
    restrict: 'A',
    scope: {
      isSortable: '=sortable',
      onSortableSort: '&',
    },
    link($scope, $element) {
      let dragEl;
      let nextEl;

      function isbefore(a, b) {
        if (a.parentNode === b.parentNode) {
          for (let cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
              return true;
            }
          }
        }
        return false;
      }

      function onDragEnter(e) {
        const target = e.target;
        if (isbefore(dragEl, target)) {
          target.parentNode.insertBefore(dragEl, target);
        } else if (target.nextSibling && target.hasAttribute('draggable')) {
          target.parentNode.insertBefore(dragEl, target.nextSibling.nextSibling);
        }
      }

      function onDragEnd(evt) {
        evt.preventDefault();

        dragEl.classList.remove('dt-clone');

        $element.off('dragend', onDragEnd);
        $element.off('dragenter', onDragEnter);

        if (nextEl !== dragEl.nextSibling) {
          $scope.onSortableSort({
            event: evt,
            columnId: angular.element(dragEl).attr('data-id'),
          });
        }
      }

      function onDragStart(evt) {
        if (!$scope.isSortable) return;

        evt = evt.originalEvent || evt;

        dragEl = evt.target;
        nextEl = dragEl.nextSibling;
        dragEl.classList.add('dt-clone');

        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);

        $element.on('dragenter', onDragEnter);
        $element.on('dragend', onDragEnd);
      }

      $element.on('dragstart', onDragStart);

      $scope.$on('$destroy', () => {
        $element.off('dragstart', onDragStart);
      });
    },
  };
}
