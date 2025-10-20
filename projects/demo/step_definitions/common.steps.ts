import {Given, When, Then} from '@cucumber/cucumber';
import {DemoHomePage} from '../pages/home.page';
import {DemoProductListPage} from '../pages/product_list.page';
import {DemoCartPage} from '../pages/cart.page';

let homePage: DemoHomePage;
let productListPage: DemoProductListPage;
let cartPage: DemoCartPage;

When('wait {string}', async function(ms: string) {
  const duration = parseInt(ms, 10);
  if (Number.isNaN(duration)) {
    throw new Error(`Invalid wait duration: ${ms}`);
  }
  await page.waitForTimeout(duration);
});

Given('user is logged in as {string}', async function(userId: string) {
  homePage = new DemoHomePage();
  await homePage.navigate();
  await homePage.loginAs(userId);
  productListPage = new DemoProductListPage();
  await productListPage.expectContent('pageTitle');
});
