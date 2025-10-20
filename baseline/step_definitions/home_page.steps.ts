import {HomePage} from '../pages/home.page';
const {Given, When, Then} = require('@cucumber/cucumber');
/* eslint-disable new-cap */
export const homePageSteps = function(homePage: HomePage) {
  Given('user is on home_page',
      async function() {
        await homePage.navigate();
      });

  Then('user can see {string} on home_page',
      async function(elementName: string) {
        await homePage.expectContent(elementName);
      });

  Then('user can see input {string} with value {string} on home_page',
      async function(inputName: string, expectedValue: string) {
        await homePage.expectInputWithValue(inputName, expectedValue);
      });

  Then('user can not see {string} on home_page',
      async function(elementName: string) {
        await homePage.expectNoContent(elementName);
      });

  When('user click {string} on home_page',
      async function(elementName: string) {
        await homePage.clickElement(elementName);
      });

  When('user remember {string} on home_page',
      async function(elementName: string) {
        await homePage.rememberElementValue(elementName);
      });

  Then('user can see {string} become less or equal {int} on home page',
      async function(elementName: string, limitCount: number) {
        await homePage.checkCurrentItemsBecomeLessOrEqual(elementName,
            limitCount);
      });

  Then('user can see {string} with value {string} on home_page',
      async function(elementName: string, expectedValue: string) {
        await homePage.expectElementWithValue(elementName, expectedValue);
      });

  Then('user select {string} in {string} on home_page',
      async function(option: string, select: string) {
        await homePage.nativeSelectOption(option, select);
      });

  Then('user hover {string} on home_page',
      async function(elementName: string) {
        await homePage.hoverElement(elementName);
      });

  Then('user click {string} with value {string} on home_page',
      async function(elementName: string, value: string) {
        await homePage.clickElementWithValue(elementName, value);
      });

  When('user fill {string} with value {string} on home_page',
      async function(elementName: string, elementValue: string) {
        await homePage.fillElementWithValue(elementName, elementValue);
      });

  When('user scroll to {string} element on home_page',
      async function(elementToScroll: string) {
        await homePage.scrollToElement(elementToScroll);
      });

  Then('user can see different {string} on home_page',
      async function(elementName: string) {
        await homePage.expectDifferentRememberElement(elementName);
      });

  When('user wait for {string} to load on home page',
      async function(elementToLoad: string) {
        await page.locator(homePage.getPageElement(elementToLoad))
            .first().waitFor();
      });

  When('user can see elements {string} count equal to {int} on home page',
      async function(elementName: string, expectedCount: number) {
        await homePage.expectElementsCounts(elementName, expectedCount);
      });

  Then('user can see input {string} with placeholder {string} on home page',
      async function(inputElement: string, placeholderValue: string) {
        await homePage.expectInputWithPlaceholder(inputElement,
            placeholderValue);
      });
};

module.exports = {homePageSteps};
