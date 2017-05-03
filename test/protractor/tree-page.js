const EC = protractor.ExpectedConditions;

class TreePage {
  expandRow(index) {
    element.all(by.css('.dt-row')).get(index).element(by.css('.dt-tree-toggle')).click();
  }

  get() {
    browser.get('/tree.html');
    browser.wait(EC.presenceOf($('.dt-row')), 5000, 'Rows should be rendered within 5 seconds.');
  }

  getCurrentPageRows() {
    return element.all(by.css('.dt-row'));
  }
}

module.exports = TreePage;
