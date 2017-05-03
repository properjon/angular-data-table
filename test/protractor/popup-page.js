const EC = protractor.ExpectedConditions;

class PopupPage {
  get() {
    browser.get('/tooltip.html');
    browser.wait(EC.presenceOf($('.dt-row')), 5000, 'Rows should be rendered within 5 seconds.');
  }

  mouseOverComment() {
    const popover = element.all(by.css('span[popover]')).first();
    return browser.actions().mouseMove(popover, {
      x: 5,
      y: 5,
    }).perform();
  }

  mouseOffComment() {
    const firstHeader = element.all(by.css('.dt-header-cell-label')).first();
    return browser.actions().mouseMove(firstHeader, {
      x: -15,
      y: -15,
    }).perform();
  }

  getComments() {
    return element.all(by.css('span[popover]'));
  }

  getPopups() {
    return element.all(by.css('.dt-popover'));
  }
}

module.exports = PopupPage;
