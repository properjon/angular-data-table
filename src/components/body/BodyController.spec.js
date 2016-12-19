import { BodyController } from './BodyController';
import { module } from 'angular';

describe('BodyController', function () {
  let $scope = null,
    ctrl = null,
    setCtrl = null;

  beforeEach(() => {
    angular.module('DataTables.Mock', []);
    angular.mock.module('DataTables.Mock');
  });

  beforeEach(
    inject((_$rootScope_) => {

      setCtrl = () => {
        $scope = _$rootScope_.$new();

        $scope.body = {
          options: {
            columns: [],
            paging: {
              size: 0,
              count: 0,
              offset: 0
            }
          },
          rows: []
        };

        ctrl = new BodyController($scope);
      };
    })
  )

  it('should export a function', () => {
    expect(BodyController).toEqual(jasmine.any(Function));
  })

  describe('when initializing', () => {
    beforeEach(() => {
      setCtrl();
    })

    it('should', () => {
      expect(ctrl).not.toBe({});
    })
  })
});
