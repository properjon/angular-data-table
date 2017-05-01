const PagingPage = require('./paging-page');

describe('When Paging:', () => {
  let page;
  
  beforeEach(() => {
    page = new PagingPage();
    page.get();
  });

  it('should have active class on first pager', () => {
    element.all(by.css('ul.pager li')).then(items => {
      expect(items.length).toBe(9);
      expect(items[2].getAttribute('class')).toContain('active');
    });
  });

  it('should display 12 rows', () => {
    page.getCurrentPageRows().then(rows => {
      expect(rows.length).toBe(12);
    }); 
  });

  it('should advance to the second page', () => {
    element.all(by.css('.dt-cell')).first().getText().then(firstVal => {
      page.goToNextPage();

      $$('.dt-cell').first().getText().then(secondVal => {
        expect(firstVal).not.toBe(secondVal);
      });
    });
  });

  // 100 % 12 = 4
  it('should have only 4 rows on the last page', () => {
    page.goToLastPage();

    page.getCurrentPageRows().then(rows => {
      expect(rows.length).toBe(4);
    });
  });
});
