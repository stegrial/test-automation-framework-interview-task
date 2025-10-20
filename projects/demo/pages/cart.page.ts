import {Page} from '../../../baseline/pages/page';
import {env} from 'process';

/**
 * Demo Cart Page class
 */
export class DemoCartPage extends Page {
  /**
   * Creates DemoCartPage object
   */
  constructor() {
    const dataPath = `projects/${env.PROJECT}/data/pages/cart_page.data.json`;
    super(dataPath);
  }

  /**
   * Get number of items in cart
   * @return {Promise<number>} Number of cart items
   */
  async getCartItemsCount(): Promise<number> {
    return await this.getTotalElementsCount('cartItem');
  }

  /**
   * Remove first item from cart
   */
  async removeFirstItem() {
    await page.locator(this.getPageElement('removeButton')).first().click();
  }

  /**
   * Get cart total amount
   * @return {Promise<number>} Cart total amount
   */
  async getCartTotal(): Promise<number> {
    const cartItems = await page.locator(this.getPageElement('cartItem')).all();
    let total = 0;
    
    for (const item of cartItems) {
      const priceText = await item.locator(this.getPageElement('cartItemPrice')).textContent();
      const price = parseFloat(priceText?.replace('$', '') || '0');
      total += price;
    }
    
    return total;
  }

  /**
   * Click Continue Shopping
   */
  async continueShopping() {
    await this.clickElement('continueShoppingButton');
  }
}
