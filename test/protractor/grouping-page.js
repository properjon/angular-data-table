class GroupingPage {
    get() {
        browser.get('/demos/grouping.html');
    }

    getCell(row, column) {
        return element.all(by.css('.dt-row')).get(row).all(by.css('.dt-cell')).get(column);
    }

    getRows() {
        return element.all(by.css('.dt-row'));
    }

    getGroups() {
        return element.all(by.css('.dt-group-row'));
    }

    getGroupRowLabel(index) {
        return element.all(by.css('.dt-group-row-label')).get(index);
    }

    groupByYear() {
        $$('.group-year').click();
    }

    toggleGroupAt(index) {
        element.all(by.css('.dt-tree-toggle')).get(index).click();
    }
}

module.exports = GroupingPage;