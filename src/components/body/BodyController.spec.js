import SpecHelper from './BodyController.spechelper.json';
import { TableDefaults } from '../../defaults';

describe('BodyController', function () {
  const defaultOptions = {
      columns: [],
      paging: {}
    },
    olympicOptions = {
      columns: angular.copy(SpecHelper.Olympics.Columns),
      paging: {
        size: 0,
        count: 0,
        offset: 0
      }
    },
    olympicRows = angular.copy(SpecHelper.Olympics.Rows);

  let scope = null,
    ctrl = null,
    setController = null,
    $controller = null,
    $rootScope = null;

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
        rows: bindings.rows
      };

      ctrl = $controller('BodyController',
        {
          $scope: scope
        },
        bindings
      );
    };
  });

  describe('when initializing', () => {
    const angularVersion = angular.copy(angular.version);

    it('should set ctrl', () => {
      setController({
        options: olympicOptions,
        rows: olympicRows
      });

      ctrl.$onInit();

      expect(ctrl.options).not.toEqual(undefined);
      expect(ctrl.options).not.toEqual({});

      expect(ctrl.data).not.toEqual(0);
    });

    it('should have the correct number of rows', () => {
      let options = {
        columns: [
          { name: 'Name', prop: 'name' },
          { name: 'Company', prop: 'company' }
        ],
        paging: {
          offset: 0,
          size: 3
        }
      };

      setController({
        options: options,
        rows: olympicRows
      });

      ctrl.$onInit();
      scope.$digest();

      expect(ctrl.tempRows.length).toBe(3);
    });

    it('should increment page', () => {
      let options = {
        columns: [
          { name: 'Name', prop: 'name' },
          { name: 'Company', prop: 'company' }
        ],
        paging: {
          offset: 0,
          size: 3
        }
      };

      setController({
        options: options,
        rows: olympicRows
      });

      ctrl.$onInit();
      scope.$digest();

      let name = ctrl.tempRows[0].name;
      ctrl.options.paging.offset = 1;
      scope.$digest();

      expect(ctrl.tempRows[0].name).not.toBe(name);
    });
  });

  describe('when setting tree and group columns', () => {
    beforeEach(() => {
      setController({
        options: olympicOptions,
        rows: olympicRows
      });

      ctrl.$onInit();
    });

    it('should set the group column accurately', () => {
      expect(ctrl.groupColumn).toEqual(olympicOptions.columns[1])
    });

    it('should not set tree column', () => {
      expect(ctrl.treeColumn).toBe(undefined);
    });

    it('should not set tree or group column if options is not set', () => {
      ctrl.options = false;

      ctrl.treeColumn = false;
      ctrl.groupColumn = false;

      ctrl.setTreeAndGroupColumns();

      expect(ctrl.treeColumn).toBe(false);
      expect(ctrl.groupColumn).toBe(false);
    });

    it('should not set group column if a tree column is set', () => {
      ctrl.options.columns[0].isTreeColumn = true;

      ctrl.setTreeAndGroupColumns();

      expect(ctrl.treeColumn).toEqual(olympicOptions.columns[0]);
      expect(ctrl.groupColumn).not.toEqual(ctrl.options.columns[1]);
    });
  });

  describe('when setting conditional watches', () => {
    beforeEach(() => {
      setController({
        options: olympicOptions,
        rows: olympicRows
      });

      ctrl.$onInit();
    });

    it('should not set watches when no vertical scrollbar or external paging', () => {
      ctrl.options.scrollbarV = false;
      ctrl.options.paging.externalPaging = false;

      ctrl.setConditionalWatches();

      expect(ctrl.watchListeners.length).toBe(0);
    });

    it('should set watches when vertical scrollbar', () => {
      ctrl.options.scrollbarV = true;

      ctrl.setConditionalWatches();

      expect(ctrl.watchListeners.length).toBe(3);
    });
  });
});
