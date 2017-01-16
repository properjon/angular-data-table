import DataTableController from './DataTableController';
import TableDefaults from '../defaults';

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

    it('should have scrollbarV: true', () => {
      expect(ctrl.options.scrollbarV).toBe(true);
    });

    it('should have paging.mode: null', () => {
      expect(ctrl.options.paging.mode).toBeNull();
    });

    it('should have paging.size: 10', () => {
      expect(ctrl.options.paging.size).toBe(10);
    });
  });

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

  describe('table level sorting', () => {
      beforeEach(() => {
          let options = {
            sortable: false,
            columns: [
              { prop: 'name', sort: 'asc', sortable: true },
              { prop: 'age'},
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
