/* global inject */

import TableDefaults from '../defaults';

describe('DataTableController', () => {
  let ctrl = null;
  let scope = null;
  let setController = null;

  let $controller = null;
  let $rootScope = null;

  beforeEach(inject((_$rootScope_, _$controller_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(() => {
    setController = (bindings) => {
      bindings.options = Object.assign({}, TableDefaults, bindings.options);

      scope = $rootScope.$new();

      scope.body = {
        options: bindings.options,
        rows: bindings.rows,
      };

      ctrl = $controller('DataTableController',
        {
          $scope: scope,
        },
        bindings,
      );
    };
  });

  describe('sorting', () => {
    beforeEach(() => {
      const options = {
        columns: [
          { prop: 'name', sort: 'asc' },
          { prop: 'age' },
        ],
      };
      const rows = [
        { name: 'Walter', age: 49 },
        { name: 'Dude', age: 45 },
        { name: 'Donnie', age: 46 },
        { name: 'Maude', age: 48 },
      ];

      setController({
        options,
        rows,
      });

      ctrl.$onInit();
    });

    it('should be sorted', () => {
      ctrl.onSorted();

      const sortOrder = ctrl.rows[0].name < ctrl.rows[1].name;

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
