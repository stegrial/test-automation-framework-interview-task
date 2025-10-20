/* eslint-disable new-cap */
/* eslint-disable max-len */

import {ProductListPage} from '../pages/product_list.page';

const {When, Then} = require('@cucumber/cucumber');

export const productListPageSteps = function(productListPage: ProductListPage) {
  Then('user can see {string} on product list page',
      async function(elementName: string) {
        await productListPage.expectContent(elementName);
      });

  Then('user can not see {string} on product list page',
      async function(elementName: string) {
        await productListPage.expectNoContent(elementName);
      });

  When('user click {string} on product list page',
      async function(elementName: string) {
        await productListPage.clickElement(elementName);
      });

  Then('user click {string} with value {string} on product list page',
      async function(elementName: string, value: string) {
        await productListPage.clickElementWithValue(elementName, value);
      });

  When('user remember {string} on product list page',
      async function(elementName: string) {
        await productListPage.rememberElementValue(elementName);
      });

  When('user can see {string} items count on product list page',
      async function(expectedItemsCount: string) {
        await productListPage.expectItemsCount(expectedItemsCount);
      });

  Then('user can see different {string} on product list page',
      async function(elementName: string) {
        await productListPage.expectDifferentRememberElement(elementName);
      });

  When('user remember items count on product list page',
      async function() {
        await productListPage.rememberCurrentLoadedItemsCount();
      });

  When('user can see {string} with value {string} on product list page',
      async function(elementName: string, elementValue: string) {
        await productListPage.expectElementWithValue(elementName, elementValue);
      });

  When('user fill {string} with value {string} on product list page',
      async function(elementName: string, elementValue: string) {
        await productListPage.fillElementWithValue(elementName, elementValue);
      });

  When('user wait for {string} to load on product list page',
      async function(elementToLoad: string) {
        await page.locator(productListPage.getPageElement(elementToLoad))
            .first().waitFor();
      });

  Then('user remember list of {string} on product list page',
      async function(elementName: string) {
        await productListPage.rememberArrayOfElementValue(elementName);
      });

  Then('user can see {string} array is not equel to remembered',
      async function(elementName: string) {
        await productListPage.expectDifferentRememberArrayElements(elementName);
      });
};

module.exports = {productListPageSteps};
