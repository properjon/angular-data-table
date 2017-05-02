const EC = protractor.ExpectedConditions;

class SortingPage {
  constructor() {
    this.colHeaderList = null;
  }

  clickHeader(index) {
    if (!this.colHeaderList) {
      this.loadColHeaderList();
    }

    return element(this.colHeaderList.row(index)).element(by.css('.dt-header-cell-label')).click();
  }

  get() {
    browser.get('/sort.html');
    browser.wait(EC.presenceOf($('.dt-row')), 5000);
  }

  getColHeaderIcon(index) {
    if (!this.colHeaderList) {
      this.loadColHeaderList();
    }

    return element(this.colHeaderList.row(index)).element(by.css('.sort-btn'));
  }

  getFirstCell() {
    return element.all(by.css('.dt-cell')).first();
  }

  isColSortedAsc(index) {
    if (!this.colHeaderList) {
      this.loadColHeaderList();
    }

    return this.getColHeaderIcon(index).getAttribute('class').then(classes => (
      classes.split(' ').indexOf('sort-asc') !== -1
    ));
  }

  isColSortedDesc(index) {
    if (!this.colHeaderList) {
      this.loadColHeaderList();
    }

    return this.getColHeaderIcon(index).getAttribute('class').then(classes => (
      classes.split(' ').indexOf('sort-desc') !== -1
    ));
  }

  isColSorted(index) {
    if (!this.colHeaderList) {
      this.loadColHeaderList();
    }

    return this.getColHeaderIcon(index).getAttribute('class').then((classes) => {
      const splits = classes.split(' ');
      for (let i = 0; i < splits.length; ++i) {
        if (splits[i] === 'sort-asc' || splits[i] === 'sort-desc') {
          return true;
        }
      }
      return false;
    });
  }

  loadColHeaderList() {
    this.colHeaderList = by.repeater('column in header.columns[\'center\'] track by column.$id');
  }
}

module.exports = SortingPage;
