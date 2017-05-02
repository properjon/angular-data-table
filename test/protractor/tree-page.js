const EC = protractor.ExpectedConditions;

class TreePage {

  expandRow(index) {
    element.all(by.css('.dt-row')).get(index).element(by.css('.dt-tree-toggle')).click();
  }

  get() {
    browser.get('/demos/tree.html');
    browser.wait(EC.presenceOf($('.dt-row')), 500);
  }

  getCurrentPageRows() {
    return element.all(by.css('.dt-row'));
  }
}

module.exports = TreePage;
