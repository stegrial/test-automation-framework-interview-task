/* eslint-disable new-cap */
import {expect} from '@playwright/test';
import {HeaderPage} from '../pages/header.page';
const {When, Then} = require('@cucumber/cucumber');
// eslint-disable-next-line max-len
export const headerPageSteps = function(headerPage: HeaderPage) {
  Then('user can see {string} on header',
      async function(elementName: string) {
        await headerPage.expectContent(elementName);
      });

  Then('user can not see {string} on header',
      async function(elementName: string) {
        await headerPage.expectNoContent(elementName);
      });

  When('user click {string} on header',
      async function(elementName: string) {
        await headerPage.clickElement(elementName);
      });

  When('user remember {string} on header',
      async function(elementName: string) {
        await headerPage.rememberElementValue(elementName);
      });

  When('user fill {string} with value {string} on header',
      async function(elementName: string, elementValue: string) {
        await headerPage.fillElementWithValue(elementName, elementValue);
      });

  Then('user click {string} with value {string} on header',
      async function(elementName: string, value: string) {
        await headerPage.clickElementWithValue(elementName, value);
      });

  Then('user can see {string} with value {string} on header',
      async function(elementName: string, expectedValue: string) {
        await headerPage.expectElementWithValue(elementName, expectedValue);
      });

  Then('user can see input {string} with value {string} on header',
      async function(inputName: string, expectedValue: string) {
        await headerPage.expectInputWithValue(inputName, expectedValue);
      });

  Then('user can see {string} with placeholder {string} on header',
      async function(inputLocator: string, placeholderValue: string) {
        expect(await page.locator(headerPage.getPageElement(inputLocator)!)
            .getAttribute('placeholder'))
            .toEqual(placeholderValue);
      });

  When('user wait for {string} to load on header',
      async function(elementToLoad: string) {
        await page.locator(headerPage.getPageElement(elementToLoad))
            .first().waitFor({timeout: 60000});
      });

  Then('user can see different {string} on header',
      async function(elementName: string) {
        await headerPage.expectDifferentRememberElement(elementName);
      });
};

module.exports = {headerPageSteps};
