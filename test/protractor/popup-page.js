class PopupPage {
  get() {
    browser.get('/demos/tooltip.html');
  }

  mouseOverComment() {
    const popover = element(by.css('span[popover]'));
    return browser.actions().mouseMove(popover, { x: 5, y: 5 }).perform();
  }

  mouseOffComment() {
    const firstHeader = element(by.css('.dt-header-cell-label'));
    return browser.actions().mouseMove(firstHeader, { x: 5, y: 5 }).perform();
  }

  getComments() {
    return element.all(by.css('span[popover]'));
  }

  getPopups() {
    return element.all(by.css('.dt-popover'));
  }
}

module.exports = PopupPage;
