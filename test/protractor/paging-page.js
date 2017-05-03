const EC = protractor.ExpectedConditions;

class PagingPage {
  get() {
    browser.get('/paging.html');
    browser.wait(EC.presenceOf($('.dt-row')), 5000, 'Rows should be rendered within 5 seconds.');
  }

  getCurrentPageRows() {
    return element.all(by.css('.dt-row'));
  }

  goToLastPage() {
    const lastButton = $$('.icon-skip');

    lastButton.click();
  }

  goToNextPage() {
    const nextButton = $$('.icon-right');

    nextButton.click();
  }
}

module.exports = PagingPage;
