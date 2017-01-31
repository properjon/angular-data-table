const PopupPage = require('./popup-page');

const EC = protractor.ExpectedConditions;

describe('On Popup Page: ', () => {
  let page;

  beforeEach(() => {
    page = new PopupPage();
    page.get();
  });

  it('pops up when comment is moused over', () => {
    page.mouseOverComment();
    expect(page.getPopups().count()).toBe(1);
  });

  xit('closes popup when comment is moused out', () => {
    page.mouseOverComment();
    expect(EC.presenceOf($('span[popover]'))).toBeTruthy();
    page.mouseOffComment();
    expect(EC.presenceOf($('span[popover]'))).toBeFalsy();

    browser.wait(page.mouseOffComment(), 700, 'mouse off timeout').then(() => {
      expect(EC.presenceOf($('span[popover]'))).toBeFalsy();
    });

    browser.wait(page.mouseOffComment(), 700, 'mouse off timeout').then(() => {
      browser.wait(page.getPopups().count(), 200, 'popup counting timeout').then((popupCount) => {
        expect(popupCount).toBe(0);
      });
    });
  });

  it('closes popup when comment is moused out with visibilityOf', () => {
    page.mouseOverComment();
    const popover = $('span[popover]');
    page.mouseOffComment();
    expect(popover.isDisplayed()).toBe(false);
    browser.wait(EC.visibilityOf(popover), 700, 'popover timeout').then((isPopupVisible) => {
      expect(isPopupVisible).toBeFalsy();
    });
  });
});
