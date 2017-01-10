import { DataTableController } from './DataTableController';
import { TableDefaults } from '../defaults';

describe('DataTableController', function () {
  let $controller = null,
      ctrl = null,
      scope = null,
      setController = null;

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
});
