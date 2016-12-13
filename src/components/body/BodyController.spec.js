import { BodyController } from './BodyController';
import { module } from 'angular';

describe('BodyController', function () {
  beforeEach(() => {
    angular.module('DataTables.Mock', []);
    angular.mock.module('DataTables.Mock');
  })

  it('should export a function', () => {
    expect(BodyController).toBe(jasmine.any(Function));
  })

  describe('when initializing', () => {
    it('should', () => {
      expect(ctrl).not.toBe({});
    })
  })
});
