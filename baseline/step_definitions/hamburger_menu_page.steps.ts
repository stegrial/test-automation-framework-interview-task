/* eslint-disable new-cap */
import {HamburgerPage} from '../pages/hamburger_menu.page';

const {When, Then} = require('@cucumber/cucumber');

export const hamburgerPageSteps = function(hamburgerPage: HamburgerPage) {
  Then('user can see {string} on hamburger menu',
      async function(elementName: string) {
        await hamburgerPage.expectContent(elementName);
      });

  Then('user can not see {string} on hamburger menu',
      async function(elementName: string) {
        await hamburgerPage.expectNoContent(elementName);
      });

  When('user click {string} on hamburger menu',
      async function(elementName: string) {
        await hamburgerPage.clickElement(elementName);
      });

  When('user remember {string} on hamburger menu',
      async function(elementName: string) {
        await hamburgerPage.rememberElementValue(elementName);
      });

  When('user fill {string} with value {string} on hamburger menu',
      async function(elementName: string, elementValue: string) {
        await hamburgerPage.fillElementWithValue(elementName, elementValue);
      });
};

module.exports = {hamburgerPageSteps};
