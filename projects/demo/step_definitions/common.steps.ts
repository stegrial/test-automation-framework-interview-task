import {Given, When, Then} from '@cucumber/cucumber';
import {DemoHomePage} from '../pages/home.page';
import {DemoProductListPage} from '../pages/product_list.page';
import {DemoCartPage} from '../pages/cart.page';

let homePage: DemoHomePage;
let productListPage: DemoProductListPage;
let cartPage: DemoCartPage;

Given('user opens the home page', async function() {
  homePage = new DemoHomePage();
  await homePage.navigate();
});

Given('user is logged in as {string}', async function(userId: string) {
  homePage = new DemoHomePage();
  await homePage.navigate();
  await homePage.loginAs(userId);
  productListPage = new DemoProductListPage();
  await productListPage.expectContent('pageTitle');
});

When('user logs in as {string}', async function(userId: string) {
  await homePage.loginAs(userId);
});

When('user adds first product to cart', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.addFirstProductToCart();
});

When('user opens shopping cart', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.clickElement('shoppingCartLink');
});

When('user removes first item from cart', async function() {
  cartPage = new DemoCartPage();
  await cartPage.removeFirstItem();
});

When('user logs out', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.logout();
});

Then('user sees the login page', async function() {
  homePage = new DemoHomePage();
  await homePage.expectContent('logo');
  await homePage.expectContent('loginButton');
});

Then('user sees the products page', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.expectContent('pageTitle');
});

Then('user sees error message', async function() {
  homePage = new DemoHomePage();
  await homePage.expectContent('errorMessage');
});

Then('shopping cart badge shows {string} items', async function(count: string) {
  productListPage = new DemoProductListPage();
  const actualCount = await productListPage.getCartItemsCount();
  if (actualCount.toString() !== count) {
    throw new Error(`Expected ${count} items in cart, but found ${actualCount}`);
  }
});

Then('cart contains {string} items', async function(count: string) {
  cartPage = new DemoCartPage();
  const actualCount = await cartPage.getCartItemsCount();
  if (actualCount.toString() !== count) {
    throw new Error(`Expected ${count} items in cart, but found ${actualCount}`);
  }
});

Then('user sees {string} element', async function(elementName: string) {
  const currentPage = productListPage || homePage || cartPage;
  await currentPage.expectContent(elementName);
});

