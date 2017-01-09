import { DataTableController } from './DataTableController';

describe('DataTableController', function () {
  let $controller = null;

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

      ctrl = $controller('DataTableController',
        {
          $scope: scope
        },
        bindings
      );
    };
  });

  it('should export a function', () => {
    expect(DataTableController).toEqual(jasmine.any(Function));
  });

  describe('', function () {

  });
});
