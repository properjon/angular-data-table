export default function DropdownMenuDirective($animate) {
  return {
    restrict: 'C',
    require: '?^DtDropdown',
    link($scope, $elm) {
      $scope.$watch('open', () => {
        $animate[$scope.open ? 'addClass' : 'removeClass']($elm, 'ddm-open');
      });
    },
  };
}
