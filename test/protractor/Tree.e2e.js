const TreePage = require('./tree-page');

describe('On Tree Page: ', () => {
    let page;

    beforeEach(() => {
        page = new TreePage();
        page.get();
    });

    it('should show 1 row by default', () => {
        page.getCurrentPageRows().then(rows => {
            expect(rows.length).toBe(1);
        });
    });

    it('should show 3 rows after expanding tree', () => {
        page.expandRow(0);
        page.getCurrentPageRows().then(rows => {
            expect(rows.length).toBe(3);
        });
    });

    it('should show 5 rows after expanding tree twice', () => {
        page.expandRow(0);
        page.expandRow(1);
        page.getCurrentPageRows().then(rows => {
            expect(rows.length).toBe(5);
        });
    });
});