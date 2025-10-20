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
   * Add second product to cart
   */
  async addSecondProductToCart() {
    await page.locator(this.getPageElement('addToCartButton')).nth(1).click();
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
   * Sort products by price low to high
   */
  async sortByPriceLowToHigh() {
    await page.locator(this.getPageElement('sortDropdown'))
      .selectOption({label: 'Price (low to high)'});
  }

  /**
   * Get all product prices on the list
   * @return {Promise<number[]>} Array of prices
   */
  async getProductPrices(): Promise<number[]> {
    const priceTexts = await page.locator(this.getPageElement('productPrice')).allTextContents();
    return priceTexts.map((t) => parseFloat((t || '').replace('$', '').trim()));
  }

  /**
   * Verify products are sorted by price low to high
   */
  async expectPricesSortedLowToHigh() {
    const prices = await this.getProductPrices();
    for (let i = 1; i < prices.length; i++) {
      if (prices[i - 1] > prices[i]) {
        throw new Error(`Products not sorted low to high at index ${i - 1} -> ${i}: ${prices[i - 1]} > ${prices[i]}`);
      }
    }
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

