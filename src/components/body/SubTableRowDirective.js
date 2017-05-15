import SubTableRowController from './SubTableRowController';
import TranslateXY from '../../utils/translate';

export default function SubTableRowDirective() {
  return {
    restrict: 'E',
    controller: SubTableRowController,
    controllerAs: 'subTable',
    bindToController: {
      row: '=',
      onSubTableToggled: '&',
      expanded: '=',
      options: '=',
    },
    scope: true,
    replace: true,
    template: `
      <div class="dt-sub-table-row">
        <span ng-class="subTable.treeClass()"
              ng-click="subTable.onSubTableToggled($event)">
        </span>
        <span class="dt-sub-table-row-label" ng-bind="subTable.row.name">
        </span>
      </div>`,
    link($scope, $elm, $attrs, ctrl) {
      // inital render position
      TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);

      // register w/ the style translator
      ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
    },
  };
}
