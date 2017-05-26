import PopoverDirective from './PopoverDirective';
import PopoverRegistry from './PopoverRegistry';
import PositionHelper from './PositionHelper';

const moduleName = 'dt.popover';

angular
  .module(moduleName, [])
  .factory('DataTablePopoverRegistry', PopoverRegistry)
  .factory('DataTablePositionHelper', PositionHelper)
  .directive('dtPopover', PopoverDirective);

export default moduleName;
