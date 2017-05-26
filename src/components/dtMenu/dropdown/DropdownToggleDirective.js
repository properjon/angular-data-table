export default function DropdownToggleDirective($timeout) {
  return {
    restrict: 'C',
    controller: 'DataTableDropdownController',
    require: '?^DataTableDropdown',
    link($scope, $elm, $attrs, ctrl) {
      function toggleClick(event) {
        event.preventDefault();
        $timeout(() => {
          ctrl.toggle();
        });
      }

      function toggleDestroy() {
        $elm.unbind('click', toggleClick);
      }

      $elm.bind('click', toggleClick);
      $scope.$on('$destroy', toggleDestroy);
    },
  };
}
