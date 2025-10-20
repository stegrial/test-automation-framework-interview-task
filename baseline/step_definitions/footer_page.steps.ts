/* eslint-disable new-cap */
const {When, Then} = require('@cucumber/cucumber');
export const footerPageSteps = function(footerPage: any) {
  Then('user can see {string} on footer',
      async function(elementName: string) {
        await footerPage.expectContent(elementName);
      });

  Then('user can not see {string} on footer',
      async function(elementName: string) {
        await footerPage.expectNoContent(elementName);
      });

  When('user navigates to {string} on footer',
      async function(navigatePath: string) {
        await footerPage.navigate(navigatePath);
      });

  When('user click {string} on footer',
      async function(elementName: string) {
        await footerPage.clickElement(elementName);
      });

  When('user remember {string} on footer',
      async function(elementName: string) {
        await footerPage.rememberElementValue(elementName);
      });

  When('user fill {string} with value {string} on footer',
      async function(elementName: string, elementValue: string) {
        await footerPage.fillElementWithValue(elementName, elementValue);
      });

  When('user wait for {string} to load on footer',
      async function(elementToLoad: string) {
        await page.locator(footerPage.getPageElement(elementToLoad))
            .first().waitFor({timeout: 60000});
      });
};

module.exports = {footerPageSteps};
