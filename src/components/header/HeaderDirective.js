import DataTableHeaderController from './HeaderController';

export default function HeaderDirective($timeout) {
  return {
    restrict: 'E',
    controller: DataTableHeaderController,
    controllerAs: 'header',
    scope: true,
    bindToController: {
      options: '=',
      columns: '=',
      columnWidths: '=',
      selectedRows: '=?',
      allRows: '=',
      onSort: '&',
      onResize: '&',
    },
    template: `
      <div class="dt-header" ng-style="header.styles()">
        <div class="dt-header-inner" ng-style="header.innerStyles()">
          <div class="dt-row-left"
               ng-style="header.stylesByGroup('left')"
               ng-if="header.columns['left'].length"
               dt-sortable="header.options.reorderable"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['left'] track by column.$id"
              on-sort="header.onSorted(column, modifierPressed)"
              options="header.options"
              sort-type="header.options.sortType"
              on-resize="header.onResized(column, width)"
              all-rows="header.allRows"
              column="column">
            </dt-header-cell>
          </div>
          <div class="dt-row-center"
               dt-sortable="header.options.reorderable"
               ng-style="header.stylesByGroup('center')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['center'] track by column.$id"
              on-checkbox-change="header.onCheckboxChanged()"
              on-sort="header.onSorted(column, modifierPressed)"
              sort-type="header.options.sortType"
              selected="header.isSelected()"
              on-resize="header.onResized(column, width)"
              options="header.options"
              column="column">
            </dt-header-cell>
          </div>
          <div class="dt-row-right"
               ng-if="header.columns['right'].length"
               dt-sortable="header.options.reorderable"
               ng-style="header.stylesByGroup('right')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['right'] track by column.$id"
              on-checkbox-change="header.onCheckboxChanged()"
              on-sort="header.onSorted(column, modifierPressed)"
              sort-type="header.options.sortType"
              selected="header.isSelected()"
              on-resize="header.onResized(column, width)"
              options="header.options"
              column="column">
            </dt-header-cell>
          </div>
        </div>
      </div>`,
    replace: true,
    link($scope, $elm, $attrs, ctrl) {
      $scope.columnsResorted = function columnsResorted(event, columnId) {
        const col = findColumnById(columnId);
        const parent = angular.element(event.currentTarget);

        let newIdx = -1;

        angular.forEach(parent.children(), (c, i) => {
          if (columnId === angular.element(c).attr('data-id')) {
            newIdx = i;
          }
        });

        $timeout(() => {
          angular.forEach(ctrl.columns, (group) => {
            const idx = group.indexOf(col);
            if (idx > -1) {
              // this is tricky because we want to update the index
              // in the orig columns array instead of the grouped one
              const curColAtIdx = group[newIdx];
              const siblingIdx = ctrl.options.columns.indexOf(curColAtIdx);
              const curIdx = ctrl.options.columns.indexOf(col);

              ctrl.options.columns.splice(curIdx, 1);
              ctrl.options.columns.splice(siblingIdx, 0, col);

              return false;
            }

            return undefined;
          });
        });
      };

      let findColumnById = function findColumnById(columnId) {
        const columns = ctrl.columns.left.concat(ctrl.columns.center).concat(ctrl.columns.right);
        return columns.find(c => c.$id === columnId);
      };
    },
  };
}
