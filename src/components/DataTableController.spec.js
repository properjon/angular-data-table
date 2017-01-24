import DataTableController from './DataTableController';
import TableDefaults from '../defaults';
import * as utils from '../utils/utils';
import * as math from '../utils/math';

describe('DataTableController', () => {
  let ctrl = null;
  let scope = null;
  let setController = null;

  beforeEach(inject(($rootScope, $filter) => {
    scope = $rootScope.$new();

    setController = (bindings) => {
      bindings.options = Object.assign({}, TableDefaults, bindings.options);
      bindings.data = bindings.rows;

      ctrl = new DataTableController(scope, $filter);

      Object.assign(ctrl, bindings);
    };
  }));

  describe('assigning defaults', () => {
    beforeEach(() => {
      let options = {
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age' }
        ]
      };
      let rows = [
        { name: 'Walter', age: 49 },
        { name: 'Dude', age: 45 },
        { name: 'Donnie', age: 46 },
        { name: 'Maude', age: 48 }
      ];

      setController({
        options: options,
        rows: rows
      });

      ctrl.$onInit();
    });

    it('should use default options', () => {
      let expectedOptions = {
        checkboxSelection: false,
        columnMode: 'standard',
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age' }
        ],
        emptyMessage: 'No data to display',
        footerHeight: 0,
        headerHeight: 30,
        internal: {
          offsetX: 0,
          offsetY: 0,
          innerWidth: 0,
          bodyHeight: 300,
        },
        loadingIndicator: false,
        loadingMessage: 'Loading...',
        multiSelect: false,
        paging: {
          count: 0,
          offset: 0,
          mode: null,
          size: 10,
        },
        reorderable: true,
        rowHeight: 30,
        scrollbarV: true,
        selectable: false,
        sortable: true,
        sortType: 'multiple',
      };

      let options = ctrl.options;
      delete options.$outer;      

      expect(ctrl.options).toEqual(expectedOptions);
    });
  });

  describe('sorting', () => {
    beforeEach(() => {
      let options = {
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age' }
        ]
      };
      let rows = [
        { name: 'Walter', age: 49 },
        { name: 'Dude', age: 45 },
        { name: 'Donnie', age: 46 },
        { name: 'Maude', age: 48 }
      ];

      setController({
        options: options,
        rows: rows
      });

      ctrl.$onInit();
    });

    it('should be sorted', () => {
      ctrl.onSorted();

      let sortOrder = ctrl.rows[0].name < ctrl.rows[1].name;

      expect(sortOrder).toBe(true);
    });

    it('should re-sort', () => {
      ctrl.onSorted();

      let sortedAscending = ctrl.rows[0].name < ctrl.rows[1].name;

      expect(sortedAscending).toBe(true);

      ctrl.options.columns[0].sort = 'desc';
      ctrl.onSorted();

      sortedAscending = ctrl.rows[0].name < ctrl.rows[1].name;

      expect(sortedAscending).toBe(false);
    });
  });

  describe('initializations', () => {
    beforeEach(() => {
      let options = {
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age' }
        ],
        internal: {
          innerWidth: 100,
          scrollBarWidth: 10
        }
      };
      let rows = [
        { name: 'Walter', age: 49 },
        { name: 'Dude', age: 45 },
        { name: 'Donnie', age: 46 },
        { name: 'Maude', age: 48 }
      ];

      setController({
        options: options,
        rows: rows
      });
    });

    describe('setting column defaults', () => {
      beforeEach(() => {
        ctrl.transposeColumnDefaults();
      });

      it('should set the column defaults', () => {
        var col = ctrl.options.columns[0];
        delete col.$id;
        expect(col).toEqual({
          prop: 'name',
          sort: 'asc',
          frozenLeft: false,
          frozenRight: false,
          className: undefined,
          headerClassName: undefined,
          flexGrow: 0,
          minWidth: 100,
          maxWidth: undefined,
          width: 150,
          resizable: true,
          comparator: undefined,
          sortable: true,
          sortBy: undefined,
          headerRenderer: undefined,
          cellRenderer: undefined,
          cellDataGetter: undefined,
          group: false,
          isTreeColumn: false,
          isCheckboxColumn: false,
          headerCheckbox: false,
          canAutoResize: true
        });
        col = ctrl.options.columns[1];
        delete col.$id;
        expect(col).toEqual({
          prop: 'age',
          sort: undefined,
          frozenLeft: false,
          frozenRight: false,
          className: undefined,
          headerClassName: undefined,
          flexGrow: 0,
          minWidth: 100,
          maxWidth: undefined,
          width: 150,
          resizable: true,
          comparator: undefined,
          sortable: true,
          sortBy: undefined,
          headerRenderer: undefined,
          cellRenderer: undefined,
          cellDataGetter: undefined,
          group: false,
          isTreeColumn: false,
          isCheckboxColumn: false,
          headerCheckbox: false,
          canAutoResize: true
        });
      });
    });

    describe('creating column groups', () => {
      beforeEach(() => {
        spyOn(utils, 'ColumnsByPin').and.returnValue('columnsByPinResponse');
        spyOn(utils, 'ColumnGroupWidths').and.returnValue('columnGroupWidthsResponse');

        ctrl.calculateColumns();
      });

      it('sets the column groups', () => {
        ctrl.columnsByPin = 'columnsByPinResponse';
        ctrl.columnWidths = 'columnGroupWidthsResponse';
      });
    });

    describe('adjusting column sizes', () => {
      beforeEach(() => {
        spyOn(math, 'ForceFillColumnWidths');
        spyOn(math, 'AdjustColumnWidths');
      });

      describe('when columnMode is force', () => {
        beforeEach(() => {
          ctrl.options.columnMode = 'force';
          ctrl.adjustColumns(2);
        });

        it('calls ForceFillColumnWidths', () => {
          expect(math.ForceFillColumnWidths).toHaveBeenCalledWith(ctrl.options.columns, 90, 2);
        });
      });

      describe('when columnMode is flex', () => {
        beforeEach(() => {
          ctrl.options.columnMode = 'flex';
          ctrl.adjustColumns(2);
        });

        it('calls AdjustColumnWidths', () => {
          expect(math.AdjustColumnWidths).toHaveBeenCalledWith(ctrl.options.columns, 90);
        });
      });
    });

    describe('setting css', () => {
      beforeEach(() => {
        ctrl.options.scrollbarV = 1;
        ctrl.options.selectable = true;
        ctrl.options.checkboxSelection = false;
      });

      it('should return the correct table css', () => {
        expect(ctrl.tableCss()).toEqual({
          fixed: 1,
          selectable: true,
          checkboxable: false,
        });
      });
    });
  });

  describe('table level sorting', () => {
    beforeEach(() => {
      let options = {
        sortable: false,
        columns: [
          { prop: 'name', sort: 'asc', sortable: true },
          { prop: 'age' },
          { prop: 'occupation', sortable: false }
        ]
      };

      setController({
        options: options,
        rows: []
      });
    });

    it('should populate the sortable property in all appropriate columns', () => {
      ctrl.inheritColumnSortableProps();

      expect(ctrl.options.columns[0].sortable).toBe(true);
      expect(ctrl.options.columns[1].sortable).toBe(false);
      expect(ctrl.options.columns[2].sortable).toBe(false);
    });
  });
});
