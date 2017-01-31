class PopupPage {
  get() {
    browser.get('/demos/tooltip.html');
  }

  mouseOverComment() {
    return browser.actions().mouseMove($$('span[popover]').first(), { x: 5, y: 5 }).perform();
  }

  mouseOffComment() {
    return browser.actions().mouseMove($$('span[popover]').first(), { x: -50, y: -50 }).perform();
  }

  getComments() {
    return element.all(by.css('span[popover]'));
  }

  getPopups() {
    return element.all(by.css('.dt-popover'));
  }
}

module.exports = PopupPage;
