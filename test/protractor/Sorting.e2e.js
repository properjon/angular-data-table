const SortingPage = require('./sorting-page');

let defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

describe('When Sorting:', () => {
    let page;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        page = new SortingPage();
        page.get();
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeout;
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
