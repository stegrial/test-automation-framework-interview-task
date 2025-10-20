/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

import {assert} from 'console';
import {Page} from './page';
const {expect} = require('@playwright/test');

/** Baseline class for Product List Page */
export class ProductListPage extends Page {
  /** Saves number of items on page to storedInformation object */
  async rememberCurrentLoadedItemsCount() {
    await this.expectContent('allItems');
    storedInformation.set('loadedItemsCount', page.locator(
        this.getPageElement('allItems')).count);
  }

  /**
   * Returns list names of all loaded items on page
   * @return {Promise<string[]>} list of names of all loaded items on page
  */
  async getItemsNames() : Promise<string[]> {
    await page.waitForSelector(this.getPageElement('itemsName'));
    const items = await page.$$(this.getPageElement('itemsName'));

    return await Promise.all(items.map(async (item): Promise<string> => {
      return await item.innerText();
    }));
  }

  /** Saves names of all loaded items to storedInformation object */
  async rememberItemsNames() {
    storedInformation.set('itemsNames', await this.getItemsNames());
  }

  /** Checks if items on page differ from saved in storedInformation object */
  async expectDifferentItemsNames() {
    const newItemsNames : string[] = storedInformation.get('itemsNames');
    const oldItemsNames : string[] = await this.getItemsNames();

    expect(JSON.stringify(newItemsNames) !== JSON.stringify(oldItemsNames))
        .toBeTruthy();
  }

  /**
   * Check if items on page are sorted correctly
   * @param {string} sortType Order in which items are sorted
   */
  async expectSortedContent(sortType : string) {
    sortType = sortType.replace('SortedContent', '');
    console.log('Expecting ' + sortType + ' content');

    const prices : number[] = await this.getActualItemsPrices();

    switch (sortType) {
      case 'highToLow':
        for (let i = 1; i++; i < prices.length) {
          assert(prices[i - 1] <= prices[i]);
        }
      case 'lowToHigh':
        for (let i = 1; i++; i < prices.length) {
          assert(prices[i - 1] >= prices[i]);
        }
    }
  }

  /**
   * Returns prices of items on page
   * @return {Promise<number[]>} prices of items on page
   */
  async getActualItemsPrices() : Promise<number[]> {
    const actualPrices = await page.$$(
        this.getPageElement('actualItemsPrices'));
    return await Promise.all(actualPrices.map(
        async (price): Promise<number> => {
          const priceText = await price.innerText();
          return parseInt(priceText.replace(',', '').replace('$', ''));
        }));
  }

  /**
   * Checks of prices of items on page are in given range
   * @param {number} startValue lower range limit
   * @param {number} endValue upper range limit
   */
  async expectFilterPriceInRange(startValue: number, endValue: number) {
    const prices : number[] = await this.getActualItemsPrices();
    console.log(`Expecting prices in range $${startValue} - $${endValue}`);
    prices.forEach((price : number) => {
      assert(price >= startValue && price <= endValue);
    });
  }

  /**
   * Returns number of all loaded items on page
   * @return {Promise<number>} number of all loaded items on page
   */
  async getTotalItemsCount() : Promise<number> {
    const countText : string | null = await page.locator(
        this.getPageElement('totalItemsLabel')).textContent();
    const itemsCount : number = parseInt(countText?.match(/\d/)?.join() || '');
    console.log('Items count: ' + itemsCount);
    return itemsCount;
  }

  /** Saves number of all loaded items on page to storedInformation object */
  async rememberTotalItemsCount() {
    storedInformation.set('itemsCount', await this.getTotalItemsCount());
  }

  /**
   * Checks if number items on page relates to number
   * saved in storedInformation in expected way
   * @param {string} expectedCount Difference between
   * current and saved items count
   * @example
   * expectItemsCount("lessOrEqualExpectedCount")
   * @example
   * expectItemsCount("higherExpectedCount")
  */
  async expectItemsCount(expectedCount : string) {
    console.log('Expecting ' + expectedCount + ' content');

    const itemsCount : number = await this.getTotalItemsCount();

    switch (expectedCount) {
      case 'equal':
        assert(itemsCount === storedInformation.get('itemsCount'));
      case 'lessOrEqual':
        assert(itemsCount === storedInformation.get('itemsCount') ||
               itemsCount <= storedInformation.get('itemsCount'));
      case 'higher':
        assert(itemsCount >= storedInformation.get('itemsCount'));
      case 'lower':
        assert(itemsCount <= storedInformation.get('itemsCount'));
    }
  }
}

module.exports = {ProductListPage};
