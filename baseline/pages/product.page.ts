/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

const fs = require('fs');
const flatten = require('../../modules/flatten.js');
import {Page} from './page';

/** Baseline class for Product Page */
export class ProductPage extends Page {
  protected itemsLinks: any;

  /**
   * Creates Product Page object
   * @param {string} dataPath path to JSON file with locators data
   * @param {string} itemsDataPath path to JSON file with items' links
   */
  constructor(dataPath: string, itemsDataPath: string) {
    super(dataPath);
    this.itemsLinks = flatten(JSON.parse(fs.readFileSync(itemsDataPath)));
  }

  /** Visits product page url
  * @param {string} itemLink item link in test_items.json
  */
  async visitPage(itemLink: string) {
    const pageUrl = global.environment + this.itemsLinks[itemLink];
    await global.page.goto(pageUrl,
        {timeout: 0, waitUntil: 'load'});
  }
}
