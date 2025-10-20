/* eslint-disable new-cap */
const {When} = require('@cucumber/cucumber');
export const debugSteps = function() {
  When('user wait for navigation',
      async function() {
        await page.waitForNavigation();
      },
  );

  When('user wait {float} sec',
      {timeout: 300 * 1000},
      async function(arg: number) {
        await page.waitForTimeout(arg * 1000);
      },
  );

  When('user make screenshot',
      async function(arg: number) {
        await page.screenshot();
      },
  );

  When('user press Enter button',
      async function() {
        await page.keyboard.press('Enter');
      },
  );
};
module.exports = {debugSteps};
