import { isOldAngular } from '../../utils/utils';

export default class PagerController {
  /**
   * Creates an instance of the Pager Controller
   * @param  {object} $scope
   */

  /* @ngInject*/
  constructor($scope) {
    Object.assign(this, {
      $scope,
    });

    if (isOldAngular()) {
      this.$onInit();
    }

    $scope.$on('dtable:page', (event, page) => {
      this.selectPage(page)
    })
  }

  $onInit() {
    this.init();
  }

  init() {
    this.$scope.$watch('pager.count', () => {
      this.findAndSetPages();
    });

    this.$scope.$watch('pager.size', () => {
      this.findAndSetPages();
    });

    this.$scope.$watch('pager.page', (newVal) => {
      if (newVal !== 0 && newVal <= this.totalPages) {
        this.getPages(newVal);
      }
    });

    if (this.size && this.count && this.page) {
      this.findAndSetPages();
    }
  }

  findAndSetPages() {
    this.calcTotalPages(this.size, this.count);
    this.getPages(this.page || 1);
  }

  /**
   * Calculates the total number of pages given the count.
   * @return {int} page count
   */
  calcTotalPages(size, count) {
    const localCount = size < 1 ? 1 : Math.ceil(count / size);

    this.totalPages = Math.max(localCount || 0, 1);
  }

  /**
   * Select a page
   * @param  {int} num
   */
  selectPage(num) {
    if (num > 0 && num <= this.totalPages) {
      this.page = num;
      this.onPage({
        page: num,
      });
    }
  }

  /**
   * Selects the previous pager
   */
  prevPage() {
    if (this.canPrevious()) {
      this.selectPage(this.page -= 1);
    }
  }

  /**
   * Selects the next page
   */
  nextPage() {
    if (this.canNext()) {
      this.selectPage(this.page += 1);
    }
  }

  /**
   * Determines if the pager can go previous
   * @return {boolean}
   */
  canPrevious() {
    return this.page > 1;
  }

  /**
   * Determines if the pager can go forward
   * @return {boolean}
   */
  canNext() {
    return this.page < this.totalPages;
  }

  /**
   * Gets the page set given the current page
   * @param  {int} page
   */
  getPages(page) {
    const pages = [];
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    let startPage = 1;
    let endPage = this.totalPages;

    if (isMaxSized) {
      startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
      endPage = Math.min((startPage + maxSize) - 1, this.totalPages);
    }

    for (let number = startPage; number <= endPage; number += 1) {
      pages.push({
        number,
        text: number,
        active: number === page,
      });
    }

    /*
    if (isMaxSized) {
      if (startPage > 1) {
        pages.unshift({
          number: startPage - 1,
          text: '...'
        });
      }

      if (endPage < this.totalPages) {
        pages.push({
          number: endPage + 1,
          text: '...'
        });
      }
    }
    */

    this.pages = pages;
  }

}
