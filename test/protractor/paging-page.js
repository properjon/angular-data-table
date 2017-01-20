class PagingPage {
    get() {
        browser.get('/demos/paging.html');
    }

    getCurrentPageRows() {
        return element.all(by.css('.dt-row'));
    }

    goToLastPage() {
        let lastButton = $$('.icon-skip');

        lastButton.click();
    }

    goToNextPage() {
        let nextButton = $$('.icon-right');

        nextButton.click();
    }
}

module.exports = PagingPage;