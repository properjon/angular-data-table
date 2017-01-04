/* eslint-disable */

describe('DataTable: Basic Demo', () => {
  browser.get('http://localhost:9000/demos/basic.html');

  it('should display table body', () => {
    element.all(by.css('.dt-body')).then((items) => {
      expect(items.length).toBe(1);
    });
  });

  it('should display 10 rows', () => {
    element.all(by.css('.dt-row')).then((items) => {
      expect(items.length).toBe(10);
    });
  });
});
