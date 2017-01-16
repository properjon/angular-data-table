/**
 * Default Table Options
 * @type {object}
 */
export const TableDefaults = {

  /**
   * Checkbox selection (true) vs. row click (false)
   * @type {boolean}
   */
  checkboxSelection: false,

  /**
   * Options: 'flex', 'force', 'standard'
   * @type {string}
   */
  columnMode: 'standard',

  /**
   * Message to show when array is presented
   * but contains no values
   * @type {string}
   */
  emptyMessage: 'No data to display',

  /**
   * The minimum footer height in pixels.
   * pass falsey for no footer
   * @type {number}
   */
  footerHeight: 0,

  /**
   * The minimum header height in pixels.
   * pass falsey for no header
   * @type {number}
   */
  headerHeight: 30,

  /**
   * Internal options
   * @type {Object}
   */
  internal: {
    offsetX: 0,
    offsetY: 0,
    innerWidth: 0,
    bodyHeight: 300,
  },

  /**
   * Loading indicator
   * @type {boolean}
   */
  loadingIndicator: false,

  /**
   *Loading message presented when the array is undefined
   * @type {boolean}
   */
  loadingMessage: 'Loading...',

  /**
   * Whether multiple rows can be selected at once.
   * @type {boolean}
   */
  multiSelect: false,

  /**
   * The default paging Options
   * @type {Object}
   */
  paging: {
    /**
     * Total count
     * @type {number}
     */
    count: 0,

    /**
     * Page offset
     * @type {number}
     */
    offset: 0,

    /**
     * The paging mode to use: 'internal', 'external', null (none)
     * @type: {string}
     */
    mode: null,

    /**
     * Page size
     * @type {number}
     */
    size: 10,
  },

  /**
   * Whether columns can be reordered.
   * @type {boolean}
   */
  reorderable: true,

  /**
   * The row height, which is necessary to calculate
   * the height for the lazy rendering.
   * @type {number}
   */
  rowHeight: 30,

  /**
   * Enable vertical scrollbars
   * @type {boolean}
   */
  scrollbarV: true,

  /**
   * Whether rows are selectable.
   * @type {boolean}
   */
  selectable: false,

  /**
   * Whether sorting can be done on single or multiple columns.
   * @type {string}
   */
  sortType: 'multiple',
};

/**
 * Default Column Options
 * @type {object}
 */
export const ColumnDefaults = {

  /**
   * Whether the column can automatically resize to fill space in the table.
   * @type {boolean}
   */
  canAutoResize: true,

  /**
   * The getter function(value) that returns the cell data for the cellRenderer.
   * If not provided, the cell data will be collected from row data instead.
   * @type {function}
   */
  cellDataGetter: undefined,

  /**
   * The cell renderer function(scope, elm) that returns React-renderable content for table cell.
   * @type {function}
   */
  cellRenderer: undefined,

  /**
   * body cell css class name
   * @type {string}
   */
  className: undefined,

  /**
   * Custom sort comparator
   * pass false if you want to server sort
   * @type {function|boolean}
   */
  comparator: undefined,

  /**
   * The grow factor relative to other columns. Same as the flex-grow
   * API from http://www.w3.org/TR/css3-flexbox/. Basically,
   * take any available extra width and distribute it proportionally
   * according to all columns' flexGrow values.
   * @type {number}
   */
  flexGrow: 0,

  /**
   * Pinned to the left
   * @type {boolean}
   */
  frozenLeft: false,

  /**
   * Pinned to the right
   * @type {boolean}
   */
  frozenRight: false,

  /**
   * Grows all rows by this column value
   * Only one column can have this set, cannot be combined with isTreeColumn
   * @type {boolean}
   */
  group: false,

  /**
   * Toggles the checkbox column in the header
   * for selecting all values given to the grid
   * @type {boolean}
   */
  headerCheckbox: false,

  /**
   * header cell css class name
   * @type {string}
   */
  headerClassName: undefined,

  /**
   * The cell renderer that returns content for table column header
   * @type {function}
   */
  headerRenderer: undefined,

  /**
   * Adds the checkbox selection to the column
   * @type {boolean}
   */
  isCheckboxColumn: false,

  /**
   * Adds +/- button and makes a secondary call to load nested data
   * Only one column can have this set, cannot be combined with isGroupColumn
   * @type {boolean}
   */
  isTreeColumn: false,

  /**
   * Maximum width of the column.
   * @type {number}
   */
  maxWidth: undefined,

  /**
   * Minimum width of the column.
   * @type {number}
   */
  minWidth: 100,

  /**
   * If yes then the column can be resized, otherwise it cannot.
   * @type {boolean}
   */
  resizable: true,

  /**
   * Default sort ('asc' or 'desc') for the column
   * @type {string}
   */
  sort: undefined,

  /**
   * If yes then the column can be sorted.
   * @type {boolean}
   */
  sortable: true,

  /**
   * If you want to sort a column by a special property
   * See an example in demos/sort.html
   * @type {string}
   */
  sortBy: undefined,

  /**
   * The width of the column, by default (in pixels).
   * @type {number}
   */
  width: 150,
};
