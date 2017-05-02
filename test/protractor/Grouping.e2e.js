const GroupingPage = require('./grouping-page');

describe('On Grouping Page: ', () => {
  let page;

  beforeEach(() => {
    page = new GroupingPage();
    page.get();
  });

  describe('by default', () => {
    it('should have no visible rows', () => {
      page.getRows().then((rows) => {
        expect(rows.length).toBe(0);
      });
    });

    it('should show no rows on expand and collapse', () => {
      page.toggleGroupAt(0);
      page.toggleGroupAt(0);

      page.getRows().then((rows) => {
        expect(rows.length).toBe(0);
      });
    });
  });

  describe('when grouped by country', () => {
    it('should have 8 groups', () => {
      page.getGroups().then((groups) => {
        expect(groups.length).toBe(8);
      });
    });

    it('should have correct first group', () => {
      page.getGroupRowLabel(0).getText().then((text) => {
        expect(text).toBe('United States');
      });
    });

    it('should show correct first row on expand', () => {
      page.toggleGroupAt(0);

      page.getCell(0, 0).getText().then((text) => {
        expect(text).toBe('Michael Phelps');
      });
    });
  });

  describe('when grouped by year', () => {
    beforeEach(() => {
      page.groupByYear();
    });

    it('should have 7 groups', () => {
      page.getGroups().then((groups) => {
        expect(groups.length).toBe(7);
      });
    });

    it('should have the correct first group', () => {
      page.getGroupRowLabel(0).getText().then((text) => {
        expect(text).toBe('2000');
      });
    });

    it('should show correct first row on expand', () => {
      page.toggleGroupAt(0);

      page.getCell(0, 0).getText().then((text) => {
        expect(text).toBe('Aleksey Nemov');
      });
    });
  });
});
