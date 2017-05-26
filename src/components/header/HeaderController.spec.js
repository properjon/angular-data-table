 import DataTableHeaderController from './HeaderController';

 describe('DataTableHeaderController', () => {
   let ctrl = null;
   let setController = null;

   beforeEach(() => {
     setController = (options, columns) => {
       ctrl = new DataTableHeaderController();

       ctrl.options = options;
       ctrl.columns = columns;

       ctrl.onSort = jasmine.createSpy('onSort');
     };
   });

   describe('when sorting is multiple', () => {
     const options = {};
     let columns = {};

     beforeEach(() => {
       options.sortType = 'multiple';
       columns = {
         left: [
           {
             name: 'Name',
             prop: 'name',
             sort: 'desc',
             sortPriority: 1,
           },
           {
             name: 'Gender',
             prop: 'gender',
           },
         ],
         center: [],
         right: [],
       };
     });

     describe('when modifierActive is true', () => {
       beforeEach(() => {
         options.modifierActive = true;
         setController(options, columns);
       });

       it('adds a sorted column when not holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], false);

         expect(ctrl.columns.left[0].sort).toBe('desc');
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });

       it('removes sorting on all other columns when holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], true);

         expect(ctrl.columns.left[0].sort).toBeUndefined();
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });
     });

     describe('when modifierActive is false', () => {
       beforeEach(() => {
         options.modifierActive = false;
         setController(options, columns);
       });

       it('add a sorted column when not holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], false);

         expect(ctrl.columns.left[0].sort).toBe('desc');
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });

       it('add a sorted column when holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], true);

         expect(ctrl.columns.left[0].sort).toBe('desc');
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });
     });
   });

   describe('when sorting is single', () => {
     const options = {};
     let columns = [];

     beforeEach(() => {
       options.sortType = 'single';
       columns = {
         left: [
           {
             name: 'Name',
             prop: 'name',
             sort: 'desc',
             sortPriority: 1,
           },
           {
             name: 'Gender',
             prop: 'gender',
           },
         ],
         center: [],
         right: [],
       };
     });

     describe('when the modifier is active', () => {
       beforeEach(() => {
         options.modifierActive = true;
         setController(options, columns);
       });

       it('adds a sorted column when holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], true);

         expect(ctrl.columns.left[0].sort).toBe('desc');
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });

       it('removes sorting on all other columns when not holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], false);

         expect(ctrl.columns.left[0].sort).toBeUndefined();
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });
     });

     describe('when the modifier is not active', () => {
       beforeEach(() => {
         options.modifierActive = false;
         setController(options, columns);
       });

       it('remove sorting on all other columns when not holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], false);

         expect(ctrl.columns.left[0].sort).toBeUndefined();
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });

       it('remove sorting on all other columns when holding the modifier', () => {
         ctrl.columns.left[1].sort = 'asc';
         ctrl.onSorted(ctrl.columns.left[1], true);

         expect(ctrl.columns.left[0].sort).toBeUndefined();
         expect(ctrl.columns.left[1].sort).toBe('asc');

         expect(ctrl.onSort).toHaveBeenCalled();
       });
     });
   });
 });
