describe('When Paging:', function () {
  browser.get('/demos/paging.html');

  it('should have active class on first pager', () => {
    element.all(by.css('ul.pager li')).then(function(items) {
      expect(items.length).toBe(9);
      expect(items[2].getAttribute('class')).toContain('active');
    });
  });

  it('should display 12 rows', () => {
    element.all(by.css('.dt-row')).then(function(items) {
      expect(items.length).toBe(12);
    });
  });

  // 100 % 12 = 4
  it('should have only 4 rows on the last page', () => {
    let lastButton = $$('.icon-skip');

    lastButton.click();

    element.all(by.css('.dt-row')).then((items) => {
      expect(items.length).toBe(4);
    });
  });
});
