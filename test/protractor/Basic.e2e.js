describe('When Basic:', function () {
  browser.get('/demos/basic.html');

  it('should display table body', () => {
    element.all(by.css('.dt-body')).then((items) => {
      expect(items.length).toBe(1);
    });
  });

  it('should display 12 rows', () => {
    element.all(by.css('.dt-row')).then((items) => {
      expect(items.length).toBe(12);
    });
  });
});
