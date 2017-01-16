import { TableDefaults, ColumnDefaults } from '../defaults';
import { AdjustColumnWidths, ForceFillColumnWidths } from '../utils/math';
import { isOldAngular, ColumnsByPin, ColumnGroupWidths, CamelCase, ObjectId } from '../utils/utils';

export default class DataTableController {
  /**
   * Creates an instance of the DataTable Controller
   * @param  {scope}
   * @param  {filter}
   */

  /* @ngInject */
  constructor($scope, $filter) {
    Object.assign(this, {
      $scope,
      $filter,
    });

    if (isOldAngular()) {
      this.$onInit();
    }
  }

  $onInit() {
    this.init();
  }

  init() {
    this.defaults();

    // set scope to the parent
    this.options.$outer = this.$scope.$parent;

    this.$scope.$watch('dt.options.columns', (newVal, oldVal) => {
      this.transposeColumnDefaults();

      if (newVal.length !== oldVal.length) {
        this.adjustColumns();
      }

      this.calculateColumns();
    }, true);

    // default sort
    const watch = this.$scope.$watch('dt.rows', (newVal) => {
      if (newVal) {
        watch();

        this.onSorted();
      }
    });
  }

  /**
   * Creates and extends default options for the grid control
   */
  defaults() {
    this.expanded = this.expanded || {};

    this.options = Object.assign({}, TableDefaults, this.options);

    angular.forEach(TableDefaults.paging, (v, k) => {
      if (!this.options.paging[k]) {
        this.options.paging[k] = v;
      }
    });

    if (this.options.selectable && this.options.multiSelect) {
      this.selected = this.selected || [];

      this.$scope.$watch('dt.selected', () => {
        angular.forEach(this.options.columns, (column) => {
          if (column.headerCheckbox && angular.isFunction(column.headerCheckboxCallback)) {
            column.headerCheckboxCallback(this);
          }
        });
      }, true);
    }
  }

  /**
   * On init or when a column is added, we need to
   * make sure all the columns added have the correct
   * defaults applied.
   */
  transposeColumnDefaults() {
    for (let i = 0, len = this.options.columns.length; i < len; i += 1) {
      const column = this.options.columns[i];
      column.$id = ObjectId();

      angular.forEach(ColumnDefaults, (v, k) => {
        if (!Object.prototype.hasOwnProperty.call(column, k)) {
          column[k] = v;
        }
      });

      if (column.name && !column.prop) {
        column.prop = CamelCase(column.name);
      }

      this.options.columns[i] = column;
    }
  }

  /**
   * If undefined, set column sortable property to table sortable property value
   */
  inheritColumnSortableProps() {
    angular.forEach(this.options.columns, (column) => {
      column.sortable = angular.isDefined(column.sortable) ?
        column.sortable : this.options.sortable;
    });
  }

  /**
   * Calculate column groups and widths
   */
  calculateColumns() {
    const columns = this.options.columns;
    this.columnsByPin = ColumnsByPin(columns);
    this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
  }

  /**
   * Returns the css classes for the data table.
   * @return {style object}
   */
  tableCss() {
    return {
      fixed: this.options.scrollbarV,
      selectable: this.options.selectable,
      checkboxable: this.options.checkboxSelection,
    };
  }

  /**
   * Adjusts the column widths to handle greed/etc.
   * @param  {int} forceIdx
   */
  adjustColumns(forceIdx) {
    const width = this.options.internal.innerWidth - this.options.internal.scrollBarWidth;

    if (this.options.columnMode === 'force') {
      ForceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if (this.options.columnMode === 'flex') {
      AdjustColumnWidths(this.options.columns, width);
    }
  }

  /**
   * Calculates the page size given the height * row height.
   * @return {[type]}
   */
  calculatePageSize() {
    this.options.paging.size = Math.ceil(
      this.options.internal.bodyHeight / this.options.rowHeight) + 1;
  }

  /**
   * Sorts the values of the grid for client side sorting.
   */
  onSorted() {
    if (!this.rows) {
      return;
    }

    // return all sorted column, in the same order in which they were sorted
    const sorts = this.options.columns
      .filter(c => c.sort)
      .sort((a, b) => {
        // sort the columns with lower sortPriority order first
        if (a.sortPriority && b.sortPriority) {
          if (a.sortPriority > b.sortPriority) return 1;
          if (a.sortPriority < b.sortPriority) return -1;
        } else if (a.sortPriority) {
          return -1;
        } else if (b.sortPriority) {
          return 1;
        }

        return 0;
      })
      .map((c, i) => {
        // update sortPriority
        c.sortPriority = i + 1;
        return c;
      });

    if (sorts.length) {
      if (this.onSort) {
        this.onSort({ sorts });
      }

      if (this.options.onSort) {
        this.options.onSort(sorts);
      }


      const clientSorts = [];

      for (let i = 0, len = sorts.length; i < len; i += 1) {
        const c = sorts[i];
        if (c.comparator !== false) {
          const dir = c.sort === 'asc' ? '' : '-';
          if (angular.isDefined(c.sortBy)) {
            clientSorts.push(dir + c.sortBy);
          } else {
            clientSorts.push(dir + c.prop);
          }
        }
      }

      if (clientSorts.length) {
        // todo: more ideal to just resort vs splice and repush
        // but wasn't responding to this change ...
        const sortedValues = this.$filter('orderBy')(this.rows, clientSorts);
        this.rows.splice(0, this.rows.length);
        this.rows.push(...sortedValues);
      }
    }

    if (this.options.internal && this.options.internal.setYOffset) {
      this.options.internal.setYOffset(0);
    }
  }

  /**
   * Invoked when a tree is collasped/expanded
   * @param  {row model}
   * @param  {cell model}
   */
  onTreeToggled(row, cell) {
    this.onTreeToggle({
      row,
      cell,
    });
  }

  /**
   * Invoked when the body triggers a page change.
   * @param  {offset}
   * @param  {size}
   */
  onBodyPage(offset, size) {
    this.onPage({
      offset,
      size,
    });
  }

  /**
   * Invoked when the footer triggers a page change.
   * @param  {offset}
   * @param  {size}
   */
  onFooterPage(offset, size) {
    const pageBlockSize = this.options.rowHeight * size;
    const offsetY = pageBlockSize * offset;

    this.options.internal.setYOffset(offsetY);
  }

  selectAllRows() {
    this.selected.splice(0, this.selected.length);

    this.selected.push(...this.rows);

    return this.isAllRowsSelected();
  }

  deselectAllRows() {
    this.selected.splice(0, this.selected.length);

    return this.isAllRowsSelected();
  }

  /**
   * Returns if all the rows are selected
   * @return {Boolean} if all selected
   */
  isAllRowsSelected() {
    return (!this.rows || !this.selected) ? false : this.selected.length === this.rows.length;
  }

  /**
   * Occurs when a header directive triggered a resize event
   * @param  {object} column
   * @param  {int} width
   */
  onResized(column, width) {
    const idx = this.options.columns.indexOf(column);

    let localColumn = column;

    if (idx > -1) {
      localColumn = this.options.columns[idx];
      column.width = width;
      column.canAutoResize = false;

      this.adjustColumns(idx);
      this.calculateColumns();
    }

    if (this.onColumnResize) {
      this.onColumnResize({
        column: localColumn,
        width,
      });
    }
  }

  /**
   * Occurs when a row was selected
   * @param  {object} rows
   */
  onSelected(rows) {
    this.onSelect({
      rows,
    });
  }

  /**
   * Occurs when a row was click but may not be selected.
   * @param  {object} row
   */
  onRowClicked(row) {
    this.onRowClick({
      row,
    });
  }

  /**
   * Occurs when a row was double click but may not be selected.
   * @param  {object} row
   */
  onRowDblClicked(row) {
    this.onRowDblClick({
      row,
    });
  }
}
