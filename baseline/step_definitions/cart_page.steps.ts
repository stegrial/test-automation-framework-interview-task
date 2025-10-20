/* eslint-disable new-cap */
const {When, Then} = require('@cucumber/cucumber');
export const cartPageSteps = function(cartPage: any) {
  Then('user can see {string} on cart page',
      async function(elementName: string) {
        await cartPage.expectContent(elementName);
      });

  Then('user can not see {string} on cart page',
      async function(elementName: string) {
        await cartPage.expectNoContent(elementName);
      });

  When('user click {string} on cart page',
      async function(elementName: string) {
        await cartPage.clickElement(elementName);
      });

  When('user remember {string} on cart page',
      async function(elementName: string) {
        await cartPage.rememberElementValue(elementName);
      });

  When('user can see {int} items count on cart page',
      async function(expectedItemsCount: number) {
        await cartPage.expectItemsCount(expectedItemsCount);
      });

  When('user remember items count on cart page',
      async function() {
        await cartPage.rememberCurrentLoadedItemsCount();
      });

  Then('user select {string} in {string} on cart page',
      async function(option: string, select: string) {
        await cartPage.nativeSelectOption(option, select);
      });

  Then('user can see {string} with value {string} on cart page',
      async function(elementName: string, expectedValue: string) {
        await cartPage.expectElementWithValue(elementName, expectedValue);
      });

  Then('user wait for {string} to load on cart page',
      async function(elementToLoad: string) {
        await page.locator(cartPage.getPageElement(elementToLoad))
            .first().waitFor();
      },
  );
};
module.exports = {cartPageSteps};
