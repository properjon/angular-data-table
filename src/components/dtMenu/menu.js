import MenuController from './MenuController';
import MenuDirective from './MenuDirective';

import dropdown from './dropdown/dropdown';

const moduleName = 'dt.menu';

angular
  .module(moduleName, [dropdown])
  .controller('DataTableMenuController', MenuController)
  .directive('dtMenu', MenuDirective);

export default moduleName;
