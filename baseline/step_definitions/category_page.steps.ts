/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Given, When, Then} = require('@cucumber/cucumber');
export const categoryPageSteps = function(categoryPage: any) {
  Given('user is on {string} category_page',
      async function(pageName: string) {
        await categoryPage.navigate(pageName);
      });

  Then('user can see {string} on category_page',
      async function(elementName: string) {
        await categoryPage.expectContent(elementName);
      });

  Then('user can not see {string} on category_page',
      async function(elementName: string) {
        await categoryPage.expectNoContent(elementName);
      });

  Then('user can see {string} with value {string} on category_page',
      async function(elementName: string, expectedValue: string) {
        await categoryPage.expectElementWithValue(elementName, expectedValue);
      });

  When('user click {string} on category_page',
      async function(elementName: string) {
        await categoryPage.clickElement(elementName);
      });

  When('user remember {string} on category_page',
      async function(elementName: string) {
        await categoryPage.rememberElementValue(elementName);
      });

  Then('user hover {string} on category_page',
      async function(elementName: string) {
        await categoryPage.hoverElement(elementName);
      });

  Then('user can see {string} become less or equal {int} on page',
      async function(elementName: string, limitCount: number) {
        await categoryPage
            .checkCurrentItemsBecomeLessOrEqual(elementName, limitCount);
      });

  Then('user can see page url is {string} on category_page',
      async function(pageUrl: string) {
        await categoryPage.expectPageUrlEqualTo(pageUrl);
      });

  When('user scroll to {string} element on category_page',
      async function(elementToScroll: string) {
        await categoryPage.scrollToElement(elementToScroll);
      });

  When('user wait for {string} to load on category_page',
      async function(elementToLoad: string) {
        await page.locator(categoryPage.getPageElement(elementToLoad))
            .first().waitFor();
      });

  When('user fill {string} with value {string} on category_page',
      async function(elementName: string, elementValue: string) {
        await categoryPage.fillElementWithValue(elementName, elementValue);
      });

  Then('user can see input {string} with placeholder {string} on category_page',
      async function(inputElement: string, placeholderValue: string) {
        await categoryPage.expectInputWithPlaceholder(inputElement,
            placeholderValue);
      });

  Then('user remember list of {string} on category_page',
      async function(elementName: string) {
        await categoryPage.rememberArrayOfElementValue(elementName);
      });

  Then('user can see {string} array is not equel to remembered on category_page',
      async function(elementName: string) {
        await categoryPage.expectDifferentRememberArrayElements(elementName);
      });

  Then('user can see different {string} on category_page',
      async function(elementName: string) {
        await categoryPage.expectDifferentRememberElement(elementName);
      });
};

module.exports = {categoryPageSteps};
