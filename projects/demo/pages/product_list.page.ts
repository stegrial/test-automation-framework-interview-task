import {Page} from '../../../baseline/pages/page';
import {env} from 'process';

/**
 * Demo Product List Page class
 */
export class DemoProductListPage extends Page {
  /**
   * Creates DemoProductListPage object
   */
  constructor() {
    const dataPath = `projects/${env.PROJECT}/data/pages/product_list_page.data.json`;
    super(dataPath);
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart() {
    await page.locator(this.getPageElement('addToCartButton')).first().click();
  }

  /**
   * Get shopping cart items count
   * @return {Promise<number>} Number of items in cart
   */
  async getCartItemsCount(): Promise<number> {
    const badge = await page.locator(this.getPageElement('shoppingCartBadge'));
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }

  /**
   * Open hamburger menu and logout
   */
  async logout() {
    await this.clickElement('hamburgerMenu');
    await page.waitForTimeout(500); // Wait for menu animation
    await this.clickElement('logoutLink');
  }
}

