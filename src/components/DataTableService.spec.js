import { ObjectId } from '../utils/utils';
import dataTableService from './DataTableService';

describe('DataTableService', () => {
  let service;
  let parse;

  beforeEach(() => {
    angular.mock.module('data-table.mocks');

    angular.mock.module(($provide) => {
      $provide.constant('DataTableService', dataTableService);
    });

    angular.mock.inject((DataTableService, $parse) => {
      service = DataTableService;
      parse = $parse;
    });
  });

  it('should build and save columns', () => {
    const id = ObjectId();
    const columnElements = [
      '<column name="Name" width="300" flex-grow="1"></column>',
      '<column name="Gender" flex-grow="1">{{monkey}} ---- {{$cell}}</column>',
    ].map(el => angular.element(el)[0]);

    service.saveColumns(id, columnElements);
    service.buildColumns({}, parse);

    expect(service.columns[id]).toBeDefined();
    expect(service.columns[id].length).toBe(2);
  });
});
