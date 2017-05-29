import MenuController from './MenuController';
import MenuDirective from './MenuDirective';

import dropdown from './dropdown/dropdown';

export default angular
  .module('dt.menu', [dropdown.name])
  .controller('DtMenuController', MenuController)
  .directive('dtm', MenuDirective);
