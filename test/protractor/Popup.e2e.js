const PopupPage = require('./popup-page');

describe('On Popup Page: ', () => {
  let page;

  beforeEach(() => {
    page = new PopupPage();
    page.get();
  });

  it('pops up when comment is moused over', () => {
    page.showPopup();
    expect(page.getPopups().count()).toBe(1);
  });

  it('closes popup when comment is moused out', () => {
    page.showPopup();
    expect(page.getPopups().count()).toBe(1);
    page.hidePopup();
    expect(page.getPopups().count()).toBe(0);
  });
});
