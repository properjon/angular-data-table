const BasicPage = require('./basic-page');

describe('When Basic:', () => {
  let page;

  beforeEach(() => {
    page = new BasicPage();
    page.get();
  });

  it('should display table body', () => {
    element.all(by.css('.dt-body')).then((items) => {
      expect(items.length).toBe(1);
    });
  });

  it('should have a header height of 50', () => {
    const header = $$('.dt-header');

    header.getCssValue('height').then((val) => {
      expect(val).toEqual(['50px']);
    });
  });

  it('should display 100 rows', () => {
    element.all(by.css('.dt-row')).then((items) => {
      expect(items.length).toBe(100);
    });
  });

  it('should not be sorted by default', () => {
    expect(page.isColSorted(0)).toBe(false);
    expect(page.isColSorted(1)).toBe(false);
    expect(page.isColSorted(2)).toBe(false);
  });
});
