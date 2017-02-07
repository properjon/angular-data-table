const PopupPage = require('./popup-page');

describe('On Popup Page: ', () => {
  let page;

  beforeEach(() => {
    page = new PopupPage();
    page.get();
  });

  it('popup opens when comment is moused over', () => {
    page.mouseOverComment();
    expect(page.getPopups().count()).toBe(1);
  });

  it('popup closes when comment is moused out', () => {
    page.mouseOverComment();
    expect(page.getPopups().count()).toBe(1);

    page.mouseOffComment();
    expect(page.getPopups().count()).toBe(0);
  });
});
