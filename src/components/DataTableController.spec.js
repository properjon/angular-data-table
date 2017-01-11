import DataTableController from './DataTableController';
import TableDefaults from '../defaults';
import * as utils from '../utils/utils';

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

  describe('sorting', () => {

    beforeEach(() => {
      let options = {
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age'}
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
              { prop: 'age'}
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
      });

      describe('setting column defaults', function () {
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

      describe('creating column groups', function () {
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
});
