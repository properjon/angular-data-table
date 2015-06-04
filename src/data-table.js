import angular from 'angular';

import './utils/polyfill';
import Throttle from './utils/throttle';
import Pager from './directives/footer/pager';

import { Resizable } from './utils/resizable';
import { Sortable } from './utils/sortable';
import { AdjustColumnWidths } from './utils/math';

import { TableDefaults, ColumnDefaults } from './defaults';

import { HeaderController, HeaderDirective } from './directives/header/header';
import { HeaderCellDirective, HeaderCellController } from './directives/header/header-cell';

import { BodyController, BodyHelper, BodyDirective } from './directives/body/body';
import { RowController, RowDirective } from './directives/body/row';
import { CellController, CellDirective } from './directives/body/cell';

import { FooterController, FooterDirective } from './directives/footer/footer';

import './data-table.css!'

class DataTableController {

  /**
   * Creates an instance of the DataTable Controller
   * @param  {scope}
   * @param  {filter}
   */
	constructor($scope, $filter){
    angular.extend(this, {
      $scope: $scope,
      $filter: $filter
    });

    this.defaults($scope);
	}

  /**
   * Creates and extends default options for the grid control
   * @param  {scope}
   */
  defaults($scope){
    $scope.expanded = $scope.expanded || {};
    
    var options = angular.extend(angular.
      copy(TableDefaults), $scope.options);

    options.paging = angular.extend(angular.copy(TableDefaults.paging), 
      $scope.options.paging);

    options.columns.forEach((c, i) => {
      c = angular.extend(angular.copy(ColumnDefaults), c);

      if(!c.height){
        c.height = TableDefaults.headerHeight;
      }

      options.columns[i] = c;
    });

    $scope.options = options;

    if($scope.options.selectable && $scope.options.multiSelect){
      $scope.selected = $scope.selected || [];
    }

    // default sort
    var watch = $scope.$watch('values', (newVal) => {
      if(newVal){
        watch();
        this.onSort($scope);
      }
    });
  }

  /**
   * Returns the css classes for the data table.
   * @param  {scope}
   * @return {style object}
   */
  tableCss(scope){
    return {
      'fixed': scope.options.scrollbarV,
      'selectable': scope.options.selectable,
      'checkboxable': scope.options.checkboxSelection
    };
  }

  /**
   * Adjusts the column widths to handle greed/etc.
   * @return {[type]}
   */
  adjustColumns(){
    AdjustColumnWidths(this.$scope.options.columns, this.$scope.options.internal.innerWidth);
  }

  /**
   * Calculates the page size given the height * row height.
   * @return {[type]}
   */
  calculatePageSize(){
    this.$scope.options.paging.size = Math.ceil(
      this.$scope.options.internal.bodyHeight / this.$scope.options.rowHeight) + 1;
  }

  /**
   * Sorts the values of the grid for client side sorting.
   * @param  {scope}
   */
  onSort(scope){
    if(!scope.values) return;

    var sorts = scope.options.columns.filter((c) => {
      return c.sort;
    });

    if(sorts.length){
      if(this.$scope.onSort){
        this.$scope.onSort({ sorts: sorts });
      }

      var clientSorts = [];
      sorts.forEach((c) => {
        if(c.comparator !== false){
          var dir = c.sort === 'asc' ? '' : '-';
          clientSorts.push(dir + c.prop);
        }
      });

      if(clientSorts.length){
        var sortedValues = this.$filter('orderBy')(scope.values, clientSorts);
        scope.values.splice(0, scope.values.length);
        scope.values.push(...sortedValues);
      }
    }
  }

  /**
   * Invoked when a tree is collasped/expanded
   * @param  {scope}
   * @param  {row model}
   * @param  {cell model}
   */
  onTreeToggle(scope, row, cell){
    scope.onTreeToggle({ 
      row: row, 
      cell: cell 
    });
  }

  /**
   * Invoked when the body triggers a page change.
   * @param  {scope}
   * @param  {offset}
   * @param  {size}
   */
  onBodyPage(scope, offset, size){
    scope.onPage({
      offset: offset,
      size: size
    });
  }

  /**
   * Invoked when the footer triggers a page change.
   * @param  {scope}
   * @param  {offset}
   * @param  {size}
   */
  onFooterPage(scope, offset, size){
    var pageBlockSize = scope.options.rowHeight * size,
        offsetY = pageBlockSize * offset;

    BodyHelper.setYOffset(offsetY);

    scope.onPage({
      offset: offset,
      size: size
    });
  }

  /**
   * Invoked when the header checkbox directive has changed.
   * @param  {scope}
   */
  onHeaderCheckboxChange(scope){
    if(scope.values){
      console.log('checkbox header', scope.selected.length, scope.values.length)
      var matches = scope.selected.length === scope.values.length;

      scope.selected.splice(0, scope.selected.length);

      if(!matches){
        scope.selected.push(...scope.values);
      }
    }
  }

  isAllRowsSelected(scope){
    if(!scope.values) return false;
    return scope.selected.length === scope.values.length;
  }

}

function DataTableDirective($window, $timeout, throttle){
  return {
    restrict: 'E',
    replace: true,
    controller: 'DataTable',
    scope: {
      options: '=',
      values: '=',
      selected: '=',
      expanded: '=',
      onSelect: '&',
      onSort: '&',
      onTreeToggle: '&',
      onPage: '&'
    },
    controllerAs: 'dt',
    template: 
      `<div class="dt material" ng-class="dt.tableCss(this)">
        <dt-header options="options" 
                   on-checkbox-change="dt.onHeaderCheckboxChange(this)"
                   ng-if="options.headerHeight"
                   selected="dt.isAllRowsSelected(this)"
                   on-sort="dt.onSort(this)">
        </dt-header>
        <dt-body values="values" 
                 selected="selected"
                 expanded="expanded"
                 options="options"
                 on-page="dt.onBodyPage(this, offset, size)"
                 on-tree-toggle="dt.onTreeToggle(this, row, cell)">
         </dt-body>
        <dt-footer ng-if="options.footerHeight"
                   ng-style="{ height: options.footerHeight + 'px' }"
                   on-page="dt.onFooterPage(this, offset, size)"
                   paging="options.paging">
         </dt-footer>
      </div>`,
    compile: function(tElem, tAttrs){
      return {
        pre: function($scope, $elm, $attrs, ctrl){

          function resize(){
            $scope.options.internal.innerWidth = $elm[0].offsetWidth;

            if($scope.options.scrollbarV){
              var height = $elm[0].offsetHeight;

              if($scope.options.headerHeight){
                height = height - $scope.options.headerHeight;
              }

              if($scope.options.footerHeight){
                height = height - $scope.options.footerHeight;
              }

              $scope.options.internal.bodyHeight = height;
            }

            ctrl.adjustColumns();
            ctrl.calculatePageSize();
          }

          resize();
          angular.element($window).bind('resize', throttle(() => {
            $timeout(resize);
          }));
        }
      }
    }
  };
};

export default angular
  .module('data-table', [ 
    Throttle.name,
    Pager.name
  ])

  .controller('DataTable', DataTableController)
  .directive('dt', DataTableDirective)
  
  .directive('resizable', Resizable)
  .directive('sortable', Sortable)

  .controller('HeaderController', HeaderController)
  .directive('dtHeader', HeaderDirective)

  .controller('HeaderCellController', HeaderCellController)
  .directive('dtHeaderCell', HeaderCellDirective)

  .controller('BodyController', BodyController)
  .directive('dtBody', BodyDirective)

  .controller('RowController', RowController)
  .directive('dtRow', RowDirective)

  .controller('CellController', CellController)
  .directive('dtCell', CellDirective)

  .controller('FooterController', FooterController)
  .directive('dtFooter', FooterDirective)
