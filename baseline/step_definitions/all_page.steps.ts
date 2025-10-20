/* eslint-disable new-cap */
const {Given, When, Then} = require('@cucumber/cucumber');

export const allPageSteps = function(allPage: any) {
  Then('user can see {string} on page',
      async function(elementName: string) {
        await allPage.expectContent(elementName);
      });

  Then('user can not see {string} on page',
      async function(elementName: string) {
        await allPage.expectNoContent(elementName);
      });

  Then('user can see {string} with value {string} on page',
      async function(elementName: string, expectedValue: string) {
        await allPage.expectElementWithValue(elementName, expectedValue);
      });

  Then('user can see input {string} with value {string} on page',
      async function(inputName: string, expectedValue: string) {
        await allPage.expectInputWithValue(inputName, expectedValue);
      });

  When('user click {string} on page',
      async function(elementName: string) {
        await allPage.clickElement(elementName);
      });

  When('user remember {string} on page',
      async function(elementName: string) {
        await allPage.rememberElementValue(elementName);
      });

  When('user scroll page',
      async function() {
        await allPage.scrollPage();
      });

  When('user update page',
      async function() {
        await allPage.updatePage();
      });

  When('user navigates to {string} page',
      async function(route: string) {
        await allPage.navigateToPage(route);
      });

  When('user set cookie {string} as {string} on page',
      async function(cookie: string, value: string) {
        await allPage.setCookie(cookie, value);
      });

  Then('user can see {string} become less or equal {int} on page',
      async function(elementName: string, limitCount: number) {
        await allPage.checkCurrentItemsBecomeLessOrEqual(elementName,
            limitCount);
      });

  Given('test steps are under design',
      async function() {
      });

  Then('user can see page url is {string} on page',
      async function(pageUrl: string) {
        await allPage.expectPageUrlEqualTo(pageUrl);
      });

  //This step is used to change context and to switch tabs in browser
  When('user switch to {int} tab',
      async function(tabNumber: number) {
        await page.waitForTimeout(3000).then(async ()=> {
          const pages = context.pages();
          await pages[tabNumber].bringToFront();
          page = pages[tabNumber];
        });
      });

  When('user can see page title is {string} on page',
      async function(tabName: string) {
        await allPage.expectPageTitleEqualTo(tabName);
      });

  When('user fill {string} with value {string} on page',
      async function(elementName: string, elementValue: string): Promise<void> {
        await allPage.fillElementWithValue(elementName, elementValue);
      });

  When('user wait for {string} to load on all page',
      async function(elementToLoad: string) {
        await page.locator(allPage.getPageElement(elementToLoad))
            .first().waitFor({timeout: 45000});
      });

  When('user press Escape button',
      async function() {
        await page.keyboard.press('Escape');
      },
  );
};

module.exports = {allPageSteps};
