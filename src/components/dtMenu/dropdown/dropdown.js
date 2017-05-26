import DropdownController from './DropdownController';
import DropdownDirective from './DropdownDirective';
import DropdownToggleDirective from './DropdownToggleDirective';
import DropdownMenuDirective from './DropdownMenuDirective';

const moduleName = 'dt.dropdown';

angular
  .module('dt.dropdown', [])
  .controller('DataTableDropdownController', DropdownController)
  .directive('dtDropdown', DropdownDirective)
  .directive('dtDropdownToggle', DropdownToggleDirective)
  .directive('dtDropdownMenu', DropdownMenuDirective);

export default moduleName;
