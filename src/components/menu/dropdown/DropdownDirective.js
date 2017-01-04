export default function DropdownDirective($document, $timeout) {
  return {
    restrict: 'C',
    controller: 'DropdownController',
    /* eslint-disable no-param-reassign */
    link($scope, $elm) {
      function closeDropdown(ev) {
        if ($elm[0].contains(ev.target)) {
          return;
        }

        $timeout(() => {
          $scope.open = false;
          off(); // eslint-disable-line no-use-before-define
        });
      }

      function keydown(ev) {
        if (ev.which === 27) {
          $timeout(() => {
            $scope.open = false;
            off(); // eslint-disable-line no-use-before-define
          });
        }
      }

      function off() {
        $document.unbind('click', closeDropdown);
        $document.unbind('keydown', keydown);
      }

      $scope.$on('$destroy', () => {
        off();
      });

      $scope.$watch('open', (newVal) => {
        if (newVal) {
          $document.bind('click', closeDropdown);
          $document.bind('keydown', keydown);
        }
      });
    },
  };
}
