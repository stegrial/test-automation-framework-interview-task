import {Given, When, Then} from '@cucumber/cucumber';
import {DemoCartPage} from '../pages/cart.page';

let cartPage: DemoCartPage;

When('user continues shopping', async function() {
  cartPage = new DemoCartPage();
  await cartPage.continueShopping();
});

When('user removes first item from cart', async function() {
  cartPage = new DemoCartPage();
  await cartPage.removeFirstItem();
});

Then('cart contains {string} items', async function(count: string) {
  cartPage = new DemoCartPage();
  const actualCount = await cartPage.getCartItemsCount();
  if (actualCount.toString() !== count) {
    throw new Error(`Expected ${count} items in cart, but found ${actualCount}`);
  }
});

Then('cart total is greater than zero', async function() {
  cartPage = new DemoCartPage();
  const total = await cartPage.getCartTotal();
  if (total <= 0) {
    throw new Error(`Expected cart total to be greater than zero, but found ${total}`);
  }
});
