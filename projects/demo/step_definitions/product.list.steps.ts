import {Given, When, Then} from '@cucumber/cucumber';
import {DemoProductListPage} from '../pages/product_list.page';

let productListPage: DemoProductListPage;

When('user adds first product to cart', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.addFirstProductToCart();
});

When('user adds second product to cart', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.addSecondProductToCart();
});

When('user sorts products by price low to high', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.sortByPriceLowToHigh();
});

When('user opens shopping cart', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.clickElement('shoppingCartLink');
});

When('user logs out', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.logout();
});

Then('user sees the products page', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.expectContent('pageTitle');
});

Then('products are sorted by price low to high', async function() {
  productListPage = new DemoProductListPage();
  await productListPage.expectPricesSortedLowToHigh();
});

Then('shopping cart badge shows {string} items', async function(count: string) {
  productListPage = new DemoProductListPage();
  const actualCount = await productListPage.getCartItemsCount();
  if (actualCount.toString() !== count) {
    throw new Error(`Expected ${count} items in cart, but found ${actualCount}`);
  }
});
