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

/** Baseline class for Homepage */
export class HomePage extends Page {
  /**
   * Creates HomePage object
   * @param {string} dataPath path to JSON file with locators
   */
  constructor(dataPath: string) {
    super(dataPath);
  }

  /** Visits homepage url */
  async navigate() {
    await global.page.goto(global.environment,
        {timeout: 0, waitUntil: 'load'});
  }
}
module.exports = {HomePage};
