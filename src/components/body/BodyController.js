import { isOldAngular } from '../../utils/utils';

const TREE_TYPES = {
  GROUP: 'refreshGroups',
  TREE: 'refreshTree',
};

export default class BodyController {
  /**
   * A body controller
   * @param  {$scope}
   * @return {BodyController}
   */

  /* @ngInject */
  constructor($scope) {
    Object.assign(this, {
      $scope,
    });

    if (isOldAngular()) {
      this.$onInit();
    }
  }

  $onInit() {
    this.init();
  }

  init() {
    this.tempRows = [];
    this.watchListeners = [];

    this.setTreeAndGroupColumns();
    this.setConditionalWatches();

    this.$scope.$watch('body.options.columns', (newVal) => {
      if (newVal) {
        const origTreeColumn = angular.copy(this.treeColumn);
        const origGroupColumn = angular.copy(this.groupColumn);

        this.setTreeAndGroupColumns();

        this.setConditionalWatches();

        if ((this.treeColumn && origTreeColumn !== this.treeColumn) ||
          (this.groupColumn && origGroupColumn !== this.groupColumn)) {
          this.rowsUpdated(this.rows);

          if (this.treeColumn) {
            this.refreshTree();
          } else if (this.groupColumn) {
            this.refreshGroups();
          }
        }
      }
    }, true);

    this.$scope.$watchCollection('body.rows', this.rowsUpdated.bind(this));
  }

  setTreeAndGroupColumns() {
    if (this.options && this.options.columns) {
      this.treeColumn = this.options.columns.find(c => c.isTreeColumn);

      if (!this.treeColumn) {
        this.groupColumn = this.options.columns.find(c => c.group);
      } else {
        this.groupColumn = undefined;
      }
    }
  }

  /**
   * @description Constructs the rows for the page, assuming we're using internal paging.
   */
  buildInternalPage() {
    let i;
    let rowsIndex;

    this.tempRows.splice(0, this.tempRows.length);

    for (i = 0; i < this.options.paging.size; i += 1) {
      rowsIndex = (this.options.paging.offset * this.options.paging.size) + i;

      if (angular.isDefined(this.rows[rowsIndex])) {
        this.tempRows[i] = this.rows[rowsIndex];
      }
    }
  }

  setConditionalWatches() {
    for (let i = this.watchListeners.length - 1; i >= 0; i -= 1) {
      this.watchListeners[i]();

      this.watchListeners.splice(i, 1);
    }

    if (this.options &&
      (this.options.scrollbarV ||
        (!this.options.scrollbarV &&
          this.options.paging &&
          this.options.paging.size))) {
      let sized = false;

      this.watchListeners.push(this.$scope.$watch('body.options.paging.size', (newVal, oldVal) => {
        if (!sized || newVal > oldVal) {
          this.getRows();
          sized = true;
        }
      }));

      this.watchListeners.push(this.$scope.$watch('body.options.paging.count', (count) => {
        this.count = count;
        this.updatePage();
      }));

      this.watchListeners.push(this.$scope.$watch('body.options.paging.offset', (newVal) => {
        if (this.options.paging.size) {
          if (this.options.paging.mode === 'internal') {
            this.buildInternalPage();
          }

          if (this.onPage) {
            this.onPage({
              offset: newVal,
              size: this.options.paging.size,
            });
          }
        }
      }));
    }
  }

  rowsUpdated(newVal, oldVal) {
    if (!newVal) {
      this.getRows(true);
    } else {
      if (this.options.paging.mode !== 'external') {
        this.options.paging.count = newVal.length;
      }

      this.count = this.options.paging.count;

      if (this.treeColumn || this.groupColumn) {
        this.buildRowsByGroup();
      }

      if (this.options.scrollbarV) {
        const refresh = newVal && oldVal && (newVal.length === oldVal.length
          || newVal.length < oldVal.length);

        this.getRows(refresh);
      } else {
        let rows = this.rows;

        if (this.treeColumn) {
          rows = this.buildTree();
        } else if (this.groupColumn) {
          rows = this.buildGroups();
        }

        if (this.options.paging.mode === 'external') {
          // We're using external paging
          const idxs = this.getFirstLastIndexes();
          let idx = idxs.first;

          this.tempRows.splice(0, this.tempRows.length);
          while (idx < idxs.last) {
            this.tempRows.push(rows[idx += 1]);
          }
        } else if (this.options.paging.mode === 'internal') {
          // We're using internal paging
          this.buildInternalPage();
        } else {
          // No paging
          this.tempRows.splice(0, this.tempRows.length);
          this.tempRows.push(...rows);
        }
      }
    }
  }

  /**
   * Gets the first and last indexes based on the offset, row height, page size, and overall count.
   */
  getFirstLastIndexes() {
    let firstRowIndex;
    let endIndex;

    if (this.options.scrollbarV) {
      firstRowIndex = Math.max(Math.floor((
        this.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0);
      endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);
    } else if (this.options.paging.mode === 'external') {
      firstRowIndex = Math.max(this.options.paging.offset * this.options.paging.size, 0);
      endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);
    } else {
      endIndex = this.count;
    }

    return {
      first: firstRowIndex,
      last: endIndex,
    };
  }

  /**
   * Updates the page's offset given the scroll position.
   */
  updatePage() {
    const curPage = this.options.paging.offset;
    const idxs = this.getFirstLastIndexes();

    if (angular.isUndefined(this.options.internal.oldScrollPosition)) {
      this.options.internal.oldScrollPosition = 0;
    }

    const oldScrollPosition = this.options.internal.oldScrollPosition;
    let newPage = idxs.first / this.options.paging.size;

    this.options.internal.oldScrollPosition = newPage;

    if (newPage < oldScrollPosition) {
      // scrolling up
      newPage = Math.floor(newPage);
    } else if (newPage > oldScrollPosition) {
      // scrolling down
      newPage = Math.ceil(newPage);
    } else {
      // equal, just stay on the current page
      newPage = curPage;
    }

    if (!isNaN(newPage)) {
      this.options.paging.offset = newPage;
    }
  }

  /**
   * Recursively calculate row depth for unsorted backend data
   * @param row
   * @param depth
   * @return {Integer}
  */
  calculateDepth(row, depth = 0) {
    const parentProp = this.treeColumn ? this.treeColumn.relationProp : this.groupColumn.prop;
    const prop = this.treeColumn.prop;

    if (!row[parentProp]) {
      return depth;
    }

    if (row.$$depth) {
      return row.$$depth + depth;
    }

    /* Get data from cache, if exists*/
    const cachedParent = this.index[row[parentProp]];

    if (cachedParent) {
      depth += 1;
      return this.calculateDepth(cachedParent, depth);
    }

    for (let i = 0, len = this.rows.length; i < len; i += 1) {
      const parent = this.rows[i];
      if (parent[prop] === row[parentProp]) {
        depth += 1;
        return this.calculateDepth(parent, depth);
      }
    }

    return depth;
  }

  /**
   * Matches groups to their respective parents by index.
   *
   * Example:
   *
   *  {
   *    "Acme" : [
   *      { name: "Acme Holdings", parent: "Acme" }
   *    ],
   *    "Acme Holdings": [
   *      { name: "Acme Ltd", parent: "Acme Holdings" }
   *    ]
   *  }
   *
   */
  buildRowsByGroup() {
    this.index = {};
    this.rowsByGroup = {};

    const parentProp = this.treeColumn ?
      this.treeColumn.relationProp :
      this.groupColumn.prop;

    for (let i = 0, len = this.rows.length; i < len; i += 1) {
      const row = this.rows[i];
      // build groups
      const relVal = row[parentProp];
      if (relVal) {
        if (this.rowsByGroup[relVal]) {
          this.rowsByGroup[relVal].push(row);
        } else {
          this.rowsByGroup[relVal] = [row];
        }
      }

      // build indexes
      if (this.treeColumn) {
        const prop = this.treeColumn.prop;
        this.index[row[prop]] = row;

        if (angular.isUndefined(row[parentProp])) {
          row.$$depth = 0;
        } else {
          let parent = this.index[row[parentProp]];
          if (angular.isUndefined(parent)) {
            for (let j = 0; j < len; j += 1) {
              if (this.rows[j][prop] === relVal) {
                parent = this.rows[j];
                break;
              }
            }
          }

          if (angular.isUndefined(parent.$$depth)) {
            parent.$$depth = this.calculateDepth(parent);
          }

          row.$$depth = parent.$$depth + 1;

          if (parent.$$children) {
            parent.$$children.push(row[prop]);
          } else {
            parent.$$children = [row[prop]];
          }
        }
      }
    }
  }

  /**
   * Rebuilds the groups based on what is expanded.
   * This function needs some optimization, todo for future release.
   * @return {Array} the temp array containing expanded rows
   */
  buildGroups() {
    const temp = [];

    angular.forEach(this.rowsByGroup, (v, k) => {
      temp.push({
        name: k,
        group: true,
      });

      if (this.expanded[k]) {
        temp.push(...v);
      }
    });

    return temp;
  }

  /**
   * Returns if the row is selected
   * @param  {row}
   * @return {Boolean}
   */
  isSelected(row) {
    let selected = false;

    if (this.options.selectable) {
      if (this.options.multiSelect) {
        selected = this.selected.indexOf(row) > -1;
      } else {
        selected = this.selected === row;
      }
    }

    return selected;
  }

  /**
   * Creates a tree of the existing expanded values
   * @return {array} the built tree
   */
  buildTree() {
    const temp = [];
    const self = this;

    const addChildren = (fromArray, toArray, level) => {
      fromArray.forEach((row) => {
        const relVal = row[self.treeColumn.relationProp];
        const key = row[self.treeColumn.prop];
        const groupRows = self.rowsByGroup[key];
        const expanded = self.expanded[key];

        if (level > 0 || !relVal) {
          toArray.push(row);
          if (groupRows && groupRows.length > 0 && expanded) {
            addChildren(groupRows, toArray, level + 1);
          }
        }
      });
    };

    addChildren(this.rows, temp, 0);

    return temp;
  }

  /**
   * Creates the intermediate collection that is shown in the view.
   * @param  {boolean} refresh - bust the tree/group cache
   */
  getRows(refresh) {
    // only proceed when we have pre-aggregated the values
    if ((this.treeColumn || this.groupColumn) && !this.rowsByGroup) {
      return false;
    }

    let temp;

    if (this.treeColumn) {
      temp = this.treeTemp || [];
      // cache the tree build
      if ((refresh || !this.treeTemp)) {
        this.treeTemp = temp = this.buildTree();
        this.count = temp.length;

        // have to force reset, optimize this later
        this.tempRows.splice(0, this.tempRows.length);
      }
    } else if (this.groupColumn) {
      temp = this.groupsTemp || [];
      // cache the group build
      if ((refresh || !this.groupsTemp)) {
        this.groupsTemp = temp = this.buildGroups();
        this.count = temp.length;
      }
    } else {
      temp = this.rows;
      if (refresh === true) {
        this.tempRows.splice(0, this.tempRows.length);
      }
    }

    let idx = 0;
    const indexes = this.getFirstLastIndexes();
    let rowIndex = indexes.first;

    // slice out the old rows so we don't have duplicates
    this.tempRows.splice(0, indexes.last - indexes.first);

    while (rowIndex < indexes.last && rowIndex < this.count) {
      const row = temp[rowIndex];

      if (row) {
        row.$$index = rowIndex;
        this.tempRows[idx] = row;
      }

      idx += 1;
      rowIndex += 1;
    }

    if (this.options.internal && this.options.internal.styleTranslator) {
      this.options.internal.styleTranslator.update(this.tempRows);
    }

    return this.tempRows;
  }

  /**
   * Returns the styles for the table body directive.
   * @return {object}
   */
  styles() {
    const styles = {
      width: `${this.options.internal.innerWidth}px`,
    };

    if (!this.options.scrollbarV) {
      styles.overflowY = 'hidden';
    } else if (this.options.scrollbarH === false) {
      styles.overflowX = 'hidden';
    }

    if (this.options.scrollbarV) {
      styles.height = `${this.options.internal.bodyHeight}px`;
    }

    return styles;
  }

  /**
   * Returns the styles for the row diretive.
   * @param  {row}
   * @return {styles object}
   */
  rowStyles() {
    const styles = {};

    if (this.options.rowHeight === 'auto') {
      styles.height = `${this.options.rowHeight}px`;
    }

    return styles;
  }

  /**
   * Builds the styles for the row group directive
   * @param  {object} row
   * @return {object} styles
   */
  groupRowStyles(row) {
    const styles = this.rowStyles(row);
    styles.width = `${this.columnWidths.total}px`;
    return styles;
  }

  /**
   * Returns the css classes for the row directive.
   * @param  {row}
   * @return {css class object}
   */
  rowClasses(row) {
    const styles = {
      selected: this.isSelected(row),
      'dt-row-even': row && row.$$index % 2 === 0,
      'dt-row-odd': row && row.$$index % 2 !== 0,
    };

    if (this.treeColumn) {
      // if i am a child
      styles['dt-leaf'] = this.rowsByGroup[row[this.treeColumn.relationProp]];
      // if i have children
      styles['dt-has-leafs'] = this.rowsByGroup[row[this.treeColumn.prop]];
      // the depth
      styles[`dt-depth-${row.$$depth}`] = true;
    }

    return styles;
  }

  /**
   * Returns the row model for the index in the view.
   * @param  {index}
   * @return {row model}
   */
  getRowValue(idx) {
    return this.tempRows[idx];
  }

  /**
   * Calculates if a row is expanded or collasped for tree grids.
   * @param  {row}
   * @return {boolean}
   */
  getRowExpanded(row) {
    if (this.treeColumn) {
      return this.expanded[row[this.treeColumn.prop]];
    } else if (this.groupColumn) {
      return this.expanded[row.name];
    }

    return undefined;
  }

  refresh(type) {
    if (this.options.scrollbarV) {
      this.getRows(true);
    } else {
      const values = this[type]();
      this.tempRows.splice(0, this.tempRows.length);
      this.tempRows.push(...values);
    }
  }

  /**
   * Calculates if the row has children
   * @param  {row}
   * @return {boolean}
   */
  getRowHasChildren(row) {
    if (!this.treeColumn) return undefined;

    const children = this.rowsByGroup[row[this.treeColumn.prop]];

    return angular.isDefined(children) || (children && !children.length);
  }

  refreshTree() {
    this.refresh(TREE_TYPES.TREE);
  }

  /**
   * Tree toggle event from a cell
   * @param  {row model}
   * @param  {cell model}
   */
  onTreeToggled(row, cell) {
    const val = row[this.treeColumn.prop];
    this.expanded[val] = !this.expanded[val];

    this.refreshTree();

    this.onTreeToggle({
      row,
      cell,
    });
  }

  refreshGroups() {
    this.refresh(TREE_TYPES.GROUP);
  }

  /**
   * Invoked when the row group directive was expanded
   * @param  {object} row
   */
  onGroupToggle(row) {
    this.expanded[row.name] = !this.expanded[row.name];

    this.refreshGroups();
  }
}
