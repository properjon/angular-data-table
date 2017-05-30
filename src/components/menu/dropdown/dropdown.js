import DropdownController from './DropdownController';
import DropdownDirective from './DropdownDirective';
import DropdownToggleDirective from './DropdownToggleDirective';
import DropdownMenuDirective from './DropdownMenuDirective';

export default angular
  .module('dt.dropdown', [])
  .controller('DtDropdownController', DropdownController)
  .directive('dtDropdown', DropdownDirective)
  .directive('dropdownToggle', DropdownToggleDirective)
  .directive('dropdownMenu', DropdownMenuDirective);
