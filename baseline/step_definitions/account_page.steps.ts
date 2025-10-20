import {AccountPage} from '../pages/account.page';
const {Given, When, Then} = require('@cucumber/cucumber');
/* eslint-disable new-cap */
export const accountPageSteps = function(accountPage: AccountPage) {
  Given('user make login as {string} on sign in page',
      async function(userId: string) {
        await accountPage.makeLoginAs(userId);
      });

  Then('user can see {string} on account page',
      async function(elementName: string) {
        await accountPage.expectContent(elementName);
      });

  Then('user can not see {string} on account page',
      async function(elementName: string) {
        await accountPage.expectNoContent(elementName);
      });

  When('user click {string} on account page',
      async function(elementName: string) {
        await accountPage.clickElement(elementName);
      });

  When('user remember {string} on account page',
      async function(elementName: string) {
        await accountPage.rememberElementValue(elementName);
      });

  When('user can see {string} with value {string} on account page',
      async function(elementName: string, elementValue: string) {
        await accountPage.expectElementWithValue(elementName, elementValue);
      });

  When('user fill {string} with value {string} on account page',
      async function(elementName: string, elementValue: string) {
        await accountPage.fillElementWithValue(elementName, elementValue);
      });

  Then('user wait for {string} to load on account page',
      async function(elementToLoad: string) {
        await page.locator(accountPage.getPageElement(elementToLoad))
            .first().waitFor();
      });
};

module.exports = {accountPageSteps};
