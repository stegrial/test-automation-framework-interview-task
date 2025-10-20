/* eslint-disable new-cap */
import {ProductPage} from '../pages/product.page';
/* eslint-disable max-len */
const {Given, When, Then} = require('@cucumber/cucumber');

export const productPageSteps = function(productPage: ProductPage) {
  Given('user is on {string} page',
      async function(itemLink: string) {
        await productPage.visitPage(itemLink);
      });

  Then('user can see {string} on product page',
      async function(elementName: string) {
        await productPage.expectContent(elementName);
      });

  Then('user can not see {string} on product page',
      async function(elementName: string) {
        await productPage.expectNoContent(elementName);
      });

  Then('user hover {string} on product page',
      async function(elementName: string) {
        await productPage.hoverElement(elementName);
      });

  When('user click {string} on product page',
      async function(elementName: string) {
        await productPage.clickElement(elementName);
      });

  Then('user click {string} with value {string} on product page',
      async function(elementName: string, value: string) {
        await productPage.clickElementWithValue(elementName, value);
      });

  When('user remember {string} on product page',
      async function(elementName: string) {
        await productPage.rememberElementValue(elementName);
      });

  When('user can see {string} with value {string} on product page',
      async function(elementName: string, elementValue: string) {
        await productPage.expectElementWithValue(elementName, elementValue);
      });

  Then('user can see input {string} with value {string} on product page',
      async function(inputName: string, expectedValue: string) {
        await productPage.expectInputWithValue(inputName, expectedValue);
      });

  When('user fill {string} with value {string} on product page',
      async function(elementName: string, elementValue: string) {
        await productPage.fillElementWithValue(elementName, elementValue);
      });

  Then('user can see different {string} on product page',
      async function(elementName: string) {
        await productPage.expectDifferentRememberElement(elementName);
      });

  Then('user can see different input {string} on product page',
      async function(elementName: string) {
        await productPage.expectDifferentRememberInput(elementName);
      });

  When('user scroll to {string} element on product page',
      async function(elementToScroll: string) {
        await productPage.scrollToElement(elementToScroll);
      });

  When('user wait for {string} to load on product page',
      async function(elementToLoad: string) {
        await page.locator(productPage.getPageElement(elementToLoad))
            .first().waitFor({timeout: 60000});
      });

  Then('user select {string} in {string} on product page',
      async function(option: string, select: string) {
        await productPage.nativeSelectOption(option, select);
      });

  When('user can see elements {string} count equal to {int} on product page',
      async function(elementName: string, expectedCount: number) {
        await productPage.expectElementsCounts(elementName, expectedCount);
      });

  When('user can see {string} count less then {int} on product page',
      async function(elementName: string, expectedCount: number) {
        await productPage.expectElementsCountLess(elementName, expectedCount);
      });

  Then('user can see same {string} content on product page',
      async function(elementName: string) {
        await productPage.expectSameRememberContent(elementName);
      });

  Then('user can see {string} is not disabled on product page',
      async function(elementName: string) {
        await productPage.expectElementNotToBeDisabled(elementName);
      });
};

module.exports = {productPageSteps};
