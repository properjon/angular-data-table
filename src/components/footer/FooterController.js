import { isOldAngular } from '../../utils/utils';

export default class FooterController {
  /**
   * Creates an instance of the Footer Controller
   * @param  {scope}
   * @return {[type]}
   */

  /* @ngInject*/
  constructor($scope) {
    Object.assign(this, {
      $scope,
    });

    if (isOldAngular()) {
      this.$onInit();
    }
  }

  get selectedCount() {
    const size = this.selected && this.selected.length;
    return size > 0 ? `/ ${size} selected` : '';
  }

  $onInit() {
    this.init();
  }

  init() {
    this.page = this.paging.offset + 1;

    this.$scope.$watch('footer.paging.offset', (newVal) => {
      this.offsetChanged(newVal);
    });
  }

  /**
   * The offset ( page ) changed externally, update the page
   * @param  {new offset}
   */
  offsetChanged(newVal) {
    this.page = newVal + 1;
  }

  /**
   * The pager was invoked
   * @param  {scope}
   */
  onPaged(page) {
    this.paging.offset = page - 1;
    this.onPage({
      offset: this.paging.offset,
      size: this.paging.size,
    });
  }

}
