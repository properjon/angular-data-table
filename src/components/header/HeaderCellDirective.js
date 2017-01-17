import HeaderCellController from './HeaderCellController';

export default function HeaderCellDirective($compile) {
  return {
    restrict: 'E',
    controller: HeaderCellController,
    controllerAs: 'hcell',
    scope: true,
    bindToController: {
      options: '=',
      column: '=',
      onSort: '&',
      sortType: '=',
      onResize: '&',
      selected: '=',
    },
    replace: true,
    template:
      `<div ng-class="hcell.cellClass()"
            class="dt-header-cell"
            draggable="true"
            data-id="{{column.$id}}"
            ng-style="hcell.styles()"
            title="{{::hcell.column.name}}">
        <div resizable="hcell.column.resizable"
             on-resize="hcell.onResized(width, hcell.column)"
             min-width="hcell.column.minWidth"
             max-width="hcell.column.maxWidth">
          <label ng-if="hcell.column.isCheckboxColumn && hcell.column.headerCheckbox" class="dt-checkbox">
            <input type="checkbox"
                   ng-model="hcell.column.allRowsSelected"
                   ng-change="hcell.checkboxChangeCallback()" />
          </label>
          <span class="dt-header-cell-label"
                ng-click="hcell.onSorted($event)">
          </span>
          <span ng-class="hcell.sortClass()">{{hcell.column.sortPriority}}</span>
        </div>
      </div>`,
    compile() {
      return {
        pre($scope, $elm, $attrs, ctrl) {
          const label = $elm[0].querySelector('.dt-header-cell-label');

          let cellScope;

          if (ctrl.column.headerTemplate || ctrl.column.headerRenderer) {
            cellScope = ctrl.options.$outer.$new(false);

            // copy some props
            cellScope.$header = ctrl.column.name;
            cellScope.$index = $scope.$index;
          }

          if (ctrl.column.headerTemplate) {
            const elm = angular.element(`<span>${ctrl.column.headerTemplate.trim()}</span>`);
            angular.element(label).append($compile(elm)(cellScope));
          } else if (ctrl.column.headerRenderer) {
            const elm = angular.element(ctrl.column.headerRenderer($elm));
            angular.element(label).append($compile(elm)(cellScope)[0]);
          } else {
            let val = ctrl.column.name;
            if (angular.isUndefined(val) || val === null) val = '';
            label.textContent = val;
          }
        },
      };
    },
  };
}
