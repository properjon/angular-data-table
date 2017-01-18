const SortingPage = require('./sorting-page');

describe('When Sorting:', () => {
    let page;

    beforeEach(() => {
        page = new SortingPage();
        page.get();
    });

    describe('multi column', () => {
        it('should be able to sort by multiple columns', () => {
            page.clickHeader(0);
            page.clickHeader(1);
            page.clickHeader(2);

            let firstCell = page.getFirstCell();

            expect(page.isColSorted(0)).toBe(false);
            expect(page.isColSortedDesc(1)).toBe(true);
            expect(page.isColSortedDesc(2)).toBe(true);
            expect(firstCell.getText()).toBe('Bruce Strong');
        });
    });

    describe('single column', () => {
        beforeEach(() => {
            element(by.model('multiple')).click();
        });

        it('should only sort by one column at a time', () => {
            page.clickHeader(1);
            
            let firstCell = page.getFirstCell();
            
            expect(page.isColSorted(0)).toBe(false);
            expect(page.isColSortedDesc(1)).toBe(true);
            expect(page.isColSorted(2)).toBe(false);
            expect(firstCell.getText()).toBe('Wilder Gonzales');
        });
    });
});
