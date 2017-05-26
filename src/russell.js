import './utils/polyfill';

import ResizableDirective from './components/header/ResizableDirective';
import SortableDirective from './components/header/SortableDirective';
import DataTableDirective from './components/DataTableDirective';
import HeaderDirective from './components/header/HeaderDirective';
import HeaderCellDirective from './components/header/HeaderCellDirective';
import BodyDirective from './components/body/BodyDirective';
import ScrollerDirective from './components/body/ScrollerDirective';
import SelectionDirective from './components/body/SelectionDirective';
import RowDirective from './components/body/RowDirective';
import GroupRowDirective from './components/body/GroupRowDirective';
import CellDirective from './components/body/CellDirective';
import FooterDirective from './components/footer/FooterDirective';
import PagerDirective from './components/footer/PagerDirective';

import dtPopover from './components/dtPopover/popover';
import dtMenu from './components/dtMenu/menu';

const moduleName = 'russell';

export { dtPopover, dtMenu };

angular
  .module(moduleName, [
    dtPopover,
    dtMenu,
  ])
  .directive('russell', DataTableDirective)
  .directive('dtResizable', ResizableDirective)
  .directive('dtSortable', SortableDirective)
  .directive('dtHeader', HeaderDirective)
  .directive('dtHeaderCell', HeaderCellDirective)
  .directive('dtBody', BodyDirective)
  .directive('dtScroller', ScrollerDirective)
  .directive('dtSelection', SelectionDirective)
  .directive('dtRow', RowDirective)
  .directive('dtGroupRow', GroupRowDirective)
  .directive('dtCell', CellDirective)
  .directive('dtFooter', FooterDirective)
  .directive('dtPager', PagerDirective);

export default moduleName;
