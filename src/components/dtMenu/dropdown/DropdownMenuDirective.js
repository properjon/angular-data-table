export default function DropdownMenuDirective($animate) {
  return {
    restrict: 'C',
    require: '?^DataTableDropdown',
    link($scope, $elm) {
      $scope.$watch('open', () => {
        $animate[$scope.open ? 'addClass' : 'removeClass']($elm, 'ddm-open');
      });
    },
  };
}
