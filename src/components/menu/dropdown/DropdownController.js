/* eslint-disable no-param-reassign */

export default class DropdownController {
  /* @ngInject */
  constructor($scope) {
    Object.assign(this, {
      $scope,
    });

    $scope.open = false;
  }

  toggle() {
    this.$scope.open = !this.$scope.open;
  }
}
