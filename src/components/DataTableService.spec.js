import { ObjectId } from '../utils/utils';
import dataTableService from './DataTableService';

describe('DataTableService', () => {
  beforeEach(() => {
    angular.mock.module('data-table.mocks');

    angular.mock.module(($provide) => {
      $provide.constant('DataTableService', dataTableService);
    });

    angular.mock.inject((DataTableService, $parse) => {
      this.DataTableService = DataTableService;
      this.$parse = $parse;
    });
  });

  it('should build and save columns', () => {
    const id = ObjectId();
    const columnElements = [
      '<column name="Name" width="300" flex-grow="1"></column>',
      '<column name="Gender" flex-grow="1">{{monkey}} ---- {{$cell}}</column>',
    ].map(el => angular.element(el)[0]);

    this.DataTableService.saveColumns(id, columnElements);
    this.DataTableService.buildColumns({}, this.$parse);

    expect(this.DataTableService.columns[id]).toBeDefined();
    expect(this.DataTableService.columns[id].length).toBe(2);
  });
});
