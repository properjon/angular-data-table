import { ObjectId } from '../utils/utils';
import dTableService from './DataTableService';

describe('DataTableService', () => {
  let dataTableService;
  let parse;

  beforeEach(() => {
    angular.mock.module('data-table.mocks');

    angular.mock.module(($provide) => {
      $provide.constant('DataTableService', dTableService);
    });

    angular.mock.inject((DataTableService, $parse) => {
      dataTableService = DataTableService;
      parse = $parse;
    });
  });

  it('should build and save columns', () => {
    const id = ObjectId();
    const columnElements = [
      '<column name="Name" width="300" flex-grow="1"></column>',
      '<column name="Gender" flex-grow="1">{{monkey}} ---- {{$cell}}</column>',
    ].map(el => angular.element(el)[0]);

    dataTableService.saveColumns(id, columnElements);
    dataTableService.buildColumns({}, parse);

    expect(dataTableService.columns[id]).toBeDefined();
    expect(dataTableService.columns[id].length).toBe(2);
  });
});
