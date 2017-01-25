import CellController from './CellController';

describe('CellController', () => {
  let ctrl = null;

  beforeEach(() => {
      ctrl = new CellController();
  });

  describe('styles', () => {
    beforeEach(() => {
      ctrl.column = {width: 10};
    });

    it('returns the width and min-width', () => {
      expect(ctrl.styles()).toEqual({
        width: '10px',
        'min-width': '10px',
      });
    });
  });

  describe('cellClass', () => {
    beforeEach(() => {
        ctrl.column = {isTreeColumn: true, className: 'colClassName',};
    });

    it('returns the cell class obejct', () => {
        expect(ctrl.cellClass()).toEqual({
          'dt-tree-col': true,
          'colClassName': true,
      });
    });
  });

  describe('treeClass', () => {
    beforeEach(() => {
        ctrl.expanded = true;
    });

    it('returns the tree class obejct', () => {
        expect(ctrl.treeClass()).toEqual({
          'dt-tree-toggle': true,
          'icon-right': false,
          'icon-down': true,
        });
    });
  });

  describe('toggling the tree', () => {
    let mockEvent = {};

    beforeEach(() => {
      ctrl.value = 'val';
      ctrl.column = 'colName';
      ctrl.expanded = true;

      mockEvent = {
        stopPropagation: jasmine.createSpy('stopPropagation')
      };

      ctrl.onTreeToggle = jasmine.createSpy('onTreeToggle');

      ctrl.onTreeToggled(mockEvent);
    });

    it('changes the tree related properties', () => {
      expect(ctrl.expanded).toBe(false);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(ctrl.onTreeToggle).toHaveBeenCalledWith({
        cell: {
          value: 'val',
          column: 'colName',
          expanded: false,
        }
      });
    });
  });

  describe('clicking the checkbox', () => {
    let mockEvent = {};

    beforeEach(() => {
      mockEvent = {
        stopPropagation: jasmine.createSpy('stopPropagation')
      };

      ctrl.onCheckboxChange = jasmine.createSpy('onCheckboxChange');

      ctrl.onCheckboxChanged(mockEvent);
    });

    it('passes the event to the handler', () => {
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(ctrl.onCheckboxChange).toHaveBeenCalledWith({
        $event: mockEvent
      });
    });
  });

  describe('getValue', () => {
    beforeEach(() => {
        ctrl.value = 'abc';
    });

    describe('when there is a getter defined', () => {
      beforeEach(() => {
        ctrl.column = {
            cellDataGetter: jasmine.createSpy('cellDataGetter').and.returnValue('getterVal')
        };
      });

      it('returns the width and min-width', () => {
        expect(ctrl.getValue()).toBe('getterVal');
      });
    });

    describe('when no getter is defined', () => {
      beforeEach(() => {
        ctrl.column = {
          cellDataGetter: undefined
        };
      });

      it('returns the value field', () => {
        expect(ctrl.getValue()).toBe('abc');
      });

      describe('when the value field is null', () => {
        beforeEach(() => {
          ctrl.value = null;
        });

        it('returns and empty string', () => {
          expect(ctrl.getValue()).toBe('');
        });
      });
    });
  });
});
