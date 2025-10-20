/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

import {Page} from './page';
import {expect} from '@playwright/test';

/** Baseline class for Cart Page */
export class CartPage extends Page {
  /**
   * Checks quantity of items on page
   * @param {number} itemsCount
   */
  async expectItemsCount(itemsCount: number) {
    const elementLocator = await page.locator(
      this.getPageElement('cartItemName')!).all();
    expect(elementLocator.length).toEqual(itemsCount);
    console.log('I see ' + itemsCount + ' items on ' + this.pageName);
  }
}
module.exports = {CartPage};
