describe('DataTableDirective', function () {
  it('should compile e2e tests', function () {
    browser.get('http://localhost:9000/demos/basic.html');

    expect(element.all(by.css('dt-body')).count()).toBe(1);
  });

  describe('sorting', function () {
      it('be able to sort by multiple columns', function() {
          browser.get('http://localhost:9000/demos/sort.html');

          var colHeaderList = by.repeater('column in header.columns[\'center\'] track by column.$id'),
               colHeader1 = element(colHeaderList.row(0)),
               colHeader1Icon = colHeader1.element(by.css('.sort-btn')),
               colHeader2 = element(colHeaderList.row(1)),
               colHeader2Icon = colHeader2.element(by.css('.sort-btn')),
               row1Column1 = element.all(by.css('.dt-cell')).first();

          colHeader1.click();

          expect(hasClass(colHeader1Icon, 'icon-up')).toBe(true);
          expect(hasClass(colHeader2Icon, 'icon-down')).toBe(true);
          expect(row1Column1.getText()).toBe('Valarie Atkinson');
      });
  });
});

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
});
