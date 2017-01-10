import PopoverDirective from './PopoverDirective';
import PopoverRegistry from './PopoverRegistry';
import PositionHelper from './PositionHelper';

export default angular
  .module('dt.popover', [])
  .factory('PopoverRegistry', PopoverRegistry)
  .factory('PositionHelper', PositionHelper)
  .directive('popover', PopoverDirective);
