/* global inject */

import SpecHelper from './BodyController.spechelper.json';
import { TableDefaults } from '../../defaults';

describe('BodyController', () => {
  const olympicOptions = {
    columns: angular.copy(SpecHelper.Olympics.Columns),
    paging: {
      size: 0,
      count: 0,
      offset: 0,
    },
  };
  const olympicRows = angular.copy(SpecHelper.Olympics.Rows);

  let scope = null;
  let ctrl = null;
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

      ctrl = $controller('BodyController',
        {
          $scope: scope,
        },
        bindings,
      );
    };
  });

  describe('when initializing', () => {
    it('should set ctrl', () => {
      setController({
        options: olympicOptions,
        rows: olympicRows,
      });

      ctrl.$onInit();

      expect(ctrl.options).not.toEqual(undefined);
      expect(ctrl.options).not.toEqual({});

      expect(ctrl.data).not.toEqual(0);
    });
  });

  describe('when internal paging is enabled', () => {
    beforeEach(() => {
      const options = {
        columns: [
          { name: 'Name', prop: 'name' },
          { name: 'Company', prop: 'company' },
        ],
        paging: {
          mode: 'internal',
          offset: 0,
          size: 3,
        },
      };

      setController({
        options,
        rows: olympicRows,
      });
    });

    it('should have the correct number of rows', () => {
      ctrl.$onInit();
      scope.$digest();

      expect(ctrl.tempRows.length).toBe(3);
    });

    it('should increment page', () => {
      ctrl.$onInit();
      scope.$digest();

      const name = ctrl.tempRows[0].name;
      ctrl.options.paging.offset = 1;
      scope.$digest();

      expect(ctrl.tempRows[0].name).not.toBe(name);
    });

    it('should have the correct total number of items', () => {
      ctrl.$onInit();
      scope.$digest();

      const count = olympicRows.length;

      expect(ctrl.options.paging.count).toBe(count);
    });
  });

  describe('when setting tree and group columns', () => {
    beforeEach(() => {
      setController({
        options: olympicOptions,
        rows: olympicRows,
      });

      ctrl.$onInit();
    });

    it('should set the group column accurately', () => {
      expect(ctrl.groupColumn).toEqual(olympicOptions.columns[1]);
    });

    it('should not set tree column', () => {
      expect(ctrl.treeColumn).toBe(undefined);
    });

    it('should not set tree or group column if options is not set', () => {
      ctrl.options = false;

      ctrl.treeColumn = false;
      ctrl.groupColumn = false;

      ctrl.setHierarchyColumns();

      expect(ctrl.treeColumn).toBe(false);
      expect(ctrl.groupColumn).toBe(false);
    });

    it('should not set group column if a tree column is set', () => {
      ctrl.options.columns[0].isTreeColumn = true;

      ctrl.setHierarchyColumns();

      expect(ctrl.treeColumn).toEqual(olympicOptions.columns[0]);
      expect(ctrl.groupColumn).not.toEqual(ctrl.options.columns[1]);
    });
  });

  describe('when setting conditional watches', () => {
    beforeEach(() => {
      setController({
        options: olympicOptions,
        rows: olympicRows,
      });

      ctrl.$onInit();
    });

    it('should not set watches when no vertical scrollbar or external paging', () => {
      ctrl.options.scrollbarV = false;
      ctrl.options.paging.mode = null;

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
