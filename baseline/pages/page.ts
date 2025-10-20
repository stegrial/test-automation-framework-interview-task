/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/
/// <reference path="../../types/global.d.ts" />

const fs = require('fs');
import {expect} from '@playwright/test';
const flatten = require('../../utils/flatten.js');

/** Baseline class for webpage */
export class Page {
  protected pageContent: any;
  protected pageElements: any;
  protected pageName: string;

  /**
   * Creates new instance of Page
   * @param {string} dataPath Path to JSON file with locators
   */
  constructor(dataPath: string) {
    this.pageContent = JSON.parse(fs.readFileSync(dataPath));
    this.pageElements = flatten(this.pageContent);
    this.pageName = this.constructor.name;
  }

  /**
   * Checks if content is present on page
   * @param {string} contentName name of locator in JSON file //
   * name of function to be called //
   * name of locators group in JSON file
   * @example
   * expectContent("logo")
   * @example
   * expectContent("socialLinkContent")
   * @example
   * expectContent("carouselElements")
   */
  async expectContent(contentName: string) {
    if (/.+Content$/.test(contentName)) {
      await eval(`this.expect${contentName.charAt(0).toUpperCase() +
        contentName.slice(1)}()`);
    } else if (/.+Elements$/.test(contentName)) {
      await this.assertElements(this.pageContent[contentName
          .replace('Elements', 'Content')]);
    } else {
      await expect(page.locator(this.getPageElement(contentName)))
          .toBeVisible({timeout: 10000});
      await console.log('I see ' + contentName + ' on ' + this.pageName);
    }
  }

  /**
   * Checks if multiple elements are present on page
   * @param {any} locators list of elements to check
   */
  async assertElements(locators: any) {
    for (const locatorName in locators) {
      if ({}.hasOwnProperty.call(locators, locatorName)) {
        await this.expectContent(locatorName);
      }
    }
  }

  /**
   * Checks if multiple items elements are present on page
   * @param {any} locatorCounter locator to get count of items
   * @param {any} locators list of item elements to check
   * @param {any} limitCount limit of items count to check
   */
  async assertAllElements(
      locatorCounter: any,
      locators: any,
      limitCount?: number) {
    let elementsLimit: number = 0;
    if (typeof limitCount == 'undefined') {
      await page.waitForSelector(this.getPageElement(locatorCounter)!);
      elementsLimit = await this.getTotalElementsCount(locatorCounter);
    } else {
      elementsLimit = limitCount;
    }
    console.log(elementsLimit);
    await Promise.all([...Array(elementsLimit).keys()].map(async (number) => {
      await this.assertContentElements(this.pageContent[locators], number);
    }));
  }

  /**
   * Checks if multiple elements of item are present on page
   * @param {any} locators list of elements to check
   * @param {any} elementNumber number of item to check
   */
  async assertContentElements(locators: any, elementNumber: number) {
    const locatorsElements = Object.keys(locators);
    await Promise.all(locatorsElements.map(async (locatorName) => {
      const locator = this.getPageElement(locatorName);
      await expect(page.locator(locator).nth(elementNumber))
          .toBeVisible({timeout: 10000})
          .then(() => console.log('I see ' + locatorName +
          ' number:' + (elementNumber + 1) + ' on ' + this.pageName));
    })).then(() => {
      console.log('-------------------------------------------');
    });
  }

  /**
   * Checks if content is not present on page
   * @param {string} contentName name of locator in JSON file //
   * name of function to be called //
   * name of locators group in JSON file
   * @example
   * expectNoContent("logo")
   * @example
   * expectNoContent("socialLinkContent")
   * @example
   * expectNoContent("carouselElements")
   */
  async expectNoContent(contentName: string) {
    if (/.+Elements$/.test(contentName)) {
      await this.assertNoElements(this.pageContent[contentName
          .replace('Elements', 'Content')]);
    } else {
      const elementLocator = global.page.locator(this
          .getPageElement(contentName)!);
      await expect(elementLocator).toBeHidden({timeout: 10000}).then(() =>
        console.log('I don\'t see ' + contentName + ' on ' + this.pageName));
    }
  }

  /**
   * Checks if multiple elements are not present on page
   * @param {any} locators list of elements to check
   */
  async assertNoElements(locators: any) {
    for (const locatorName in locators) {
      if ({}.hasOwnProperty.call(locators, locatorName)) {
        await this.expectNoContent(locatorName);
      }
    }
  }

  /**
   * Checks if element has correct text value
   * @param {string} elementName
   * @param {string} elementValue
   */
  async expectElementWithValue(elementName: string, elementValue: string) {
    await expect(page.locator(this.getPageElement(elementName)))
        .toContainText(elementValue, {timeout: 18000});
    await console.log('I see ' + elementName + ' with value ' + elementValue);
  }

  /**
   * Checks if input has correct value
   * @param {string} inputName
   * @param {string} inputValue
   */
  async expectInputWithValue(inputName: string, inputValue: string) {
    await expect(page.locator(this.getPageElement(inputName)))
        .toHaveValue(inputValue);
    await console.log('I see input ' + inputName +
      ' with value ' + inputValue);
  }

  /**
   * Performs click upon element
   * @param {string} elementName name of element to be clicked
   */
  async clickElement(elementName: string) {
    if (/^random.+/.test(elementName)) {
      const randomElementName = elementName.replace('random', '');
      await this.clickRandomElement(randomElementName.charAt(0).toLowerCase() +
        randomElementName.slice(1));
    } else {
      await page.click(this.getPageElement(elementName)!, {timeout: 12000});
    }
  }

  /**
   * Dropdown select option element
   * @param {string} option value
   * @param {string} select native select
   */
  async nativeSelectOption(option: string, select: string) {
    const selectXpath = this.getPageElement(select);
    await page.locator(selectXpath).scrollIntoViewIfNeeded();
    await page.selectOption(selectXpath, {label: option});
  }
  /**
   * Performs click upon random element that matches the locator
   * @param {string} elementName element to click
   */
  async clickRandomElement(elementName: string) {
    const elements = await page.$$(this.getPageElement(elementName)!);
    await elements[Math.floor(Math.random() * elements.length)]
        .click({timeout: 12000});
  }

  /**
   * This method hovers over an element matching selector
   * by performing the following steps
   * @param {string} elementName name of element to be hovered
   */
  async hoverElement(elementName: string) {
    await page.hover(this.getPageElement(elementName)!);
  }

  /**
   * Types text in field
   * @param {string} elementName name of required field
   * @param {string} value text
   */
  async fillElementWithValue(elementName: string, value: string) {
    await page.locator(this.getPageElement(elementName)).fill(value);
  }

  /**
   * Saves element text in storedInformation object
   * @param {string} elementName
   */
  async rememberElementValue(elementName: string) {
    const rememberContent = await page.locator(
      this.getPageElement(elementName)!)?.textContent();
    global.storedInformation.set(elementName, rememberContent);
  }

  /**
   * Saves element text in storedInformation object
   * @param {string} elementName
   */
  async rememberInputValue(elementName: string) {
    const rememberContent = await page.locator(
      this.getPageElement(elementName)!)?.getAttribute('value');
    global.storedInformation.set(elementName, rememberContent);
  }

  /**
   * Saves array of element text in storedInformation object
   * @param {string} elementName
   */
  async rememberArrayOfElementValue(elementName: string) {
    const rememberContent = await page.locator(this
        .getPageElement(elementName)).allInnerTexts();
    global.storedInformation.set(elementName, rememberContent);
  }

  /**
   * Returns value of element saved in storedInformation object
   * @param {string} elementName
   * @return {string}
   */
  getRememberedValue(elementName: string): string {
    let elementValue: string;
    try {
      elementValue = storedInformation.get(elementName);
      return elementValue;
    } catch (e: unknown) {
      console.log('No such element to read.');
      return '';
    }
  }

  /**
   * Gets element locator stored in JSON file
   * @param {string} elementName
   * @return {string} element locator
   */
  getPageElement(elementName: string): string {
    return this.pageElements[elementName];
  }

  /** Shorthand device assertion for `desktop` device type
   *  @return {boolean}
   */
  isDesktop(): boolean {
    return global.device === 'desktop';
  }

  /** Shorthand device assertion for `tablet` device type
   *  @return {boolean}
   */
  isTablet(): boolean {
    return global.device === 'tablet';
  }

  /** Shorthand device assertion for `mobile` device type
   *  @return {boolean}
   */
  isMobile(): boolean {
    return global.device === 'mobile';
  }

  /**
   * Compare elements count to be less or equal limit count
   * @param {string} elementName
   * @param {number} limitCount
   */
  async checkCurrentItemsBecomeLessOrEqual(elementName: string,
      limitCount: number) {
    const currentItemsCount = await this.getTotalElementsCount(elementName);
    expect(currentItemsCount).toBeLessThanOrEqual(limitCount);
    console.log('I can see that items count ' + currentItemsCount +
      ' lower than ' + limitCount + ' on ' + this.pageName);
  }

  /**
    * Gets count of element on page
    * @param {string} elementName
    * @return {number} elements count
    */
  async getTotalElementsCount(elementName: string) {
    const elements = await page.$$(this.getPageElement(elementName)!);
    return elements.length;
  }

  /**
    * Check if page have correct url link
    * @param {string} pageUrl
    */
  async expectPageUrlEqualTo(pageUrl: string) {
    if (pageUrl.charAt(0) == '^') {
      await expect(page).toHaveURL(new RegExp(pageUrl));
    } else {
      await expect(page).toHaveURL(pageUrl);
    }
  }

  /**
    * Check if page have correct title
    * @param {string} tabName
    */
  async expectPageTitleEqualTo(tabName: string) {
    await expect(page).toHaveTitle(tabName);
  }

  /**
    * Checks is input has placeholder with correct value
    * @param {string} inputElement
    * @param {string} placeholderValue
    */
  async expectInputWithPlaceholder(
      inputElement: string,
      placeholderValue: string,
  ) {
    expect(await page.locator(this.getPageElement(inputElement)!)
        .getAttribute('placeholder'))
        .toEqual(placeholderValue);
  }

  /**
    * Click on element with specific text
    * @param {string} elementName
    * @param {string} value
    */
  async clickElementWithValue(elementName: string, value: string) {
    if (/.+remember$/.test(elementName)) {
      value = this.getRememberedValue(elementName.replace('remember', ''));
      await page.locator(this.getPageElement(elementName)!
          , {hasText: value}).first().click({timeout: 12000});
    } else {
      await page.locator(this.getPageElement(elementName)!
          , {hasText: value}).first().click({timeout: 12000});
    }
  }

  /**
    * Hover on element with specific text
    * @param {string} elementName
    * @param {string} value
    */
  async hoverElementWithValue(elementName: string, value: string) {
    await page.locator(this.getPageElement(elementName)!
        , {hasText: value}).hover();
  }

  /**
    * Setting cookie with value on page
    * @param {string} cookie
    * @param {string} value
    */
  async setCookie(cookie: string, value: string) {
    await page.context().addCookies([...await page.context().cookies(),
      {
        name: cookie,
        value: value,
        url: page.url(),
      }]);
  }

  /**
    * Reloading page
    */
  async updatePage() {
    await page.reload();
  }

  /**
    * Looking for element and scrolling into view
    * @param {string} contentName
    */
  async scrollToElement(contentName: string) {
    await page.locator(this.getPageElement(contentName))
        .scrollIntoViewIfNeeded();
  }


  /**
    * Check if content has changed
    * @param {string} contentName name of locator and key of stored information
    */
  async expectDifferentRememberElement(contentName: string) {
    const newElement: any = await page.locator(
      this.getPageElement(contentName)!).textContent();

    const oldElement: any = storedInformation.get(contentName);

    expect(newElement).not.toEqual(oldElement);
    console.log(newElement + '==!' + oldElement);
  }


  /**
    * Check if array of content has changed
    * @param {string} contentName name of locator and key of stored information
    */
  async expectDifferentRememberArrayElements(contentName: string) {
    const currentContent = await page.locator(this
        .getPageElement(contentName)).allInnerTexts();
    const rememberedContent = global.storedInformation.get(contentName);
    expect(currentContent).not.toEqual(rememberedContent);
  }

  /**
    * Check if input value has changed
    * @param {string} contentName name of locator and key of stored information
    */
  async expectDifferentRememberInput(contentName: string) {
    const newElement = await page.locator(
      this.getPageElement(contentName)!)?.getAttribute('value');
    const oldElement: any = storedInformation.get(contentName);
    console.log(newElement + '==!' + oldElement);
    expect(newElement !== oldElement)
        .toBeTruthy();
  }


  /**
    * Check if input value remains the same
    * @param {string} contentName name of locator and key of stored information
    */
  async expectSameRememberInput(contentName: string) {
    const newElement = await page.locator(
      this.getPageElement(contentName)!)?.getAttribute('value');
    const oldElement: any = storedInformation.get(contentName);
    console.log(newElement + '==' + oldElement);
    expect(newElement == oldElement)
        .toBeTruthy();
  }

  /**
    * Check if content value remains the same
    * @param {string} contentName name of locator and key of stored information
    */
  async expectSameRememberContent(contentName: string) {
    const newElement = await page.locator(
      this.getPageElement(contentName)!).textContent();
    const oldElement: any = storedInformation.get(contentName);
    console.log(newElement + '==' + oldElement);
    expect(newElement).toEqual(oldElement);
  }

  /**
   * Checks if quantity of elements is equal to expected on page
   * @param {string} elementName
   * @param {number} expectedCount
   */
  async expectElementsCounts(elementName: string, expectedCount: number) {
    const elementLocator = page.locator(
      this.getPageElement(elementName)!);
    await expect(elementLocator).toHaveCount(expectedCount);
    console.log('I see ${expectedCount} of ${elementName}' +
      ' elements on ${this.pageName}');
  }

  /**
 * Checks if quantity of elements is less then expected on page
 * @param {string} elementName
 * @param {number} expectedCount
 */
  async expectElementsCountLess(elementName: string, expectedCount: number) {
    const elements = await page.$$(
      this.getPageElement(elementName)!);
    expect(elements.length).toBeLessThan(expectedCount);
    console.log('I see less then ${expectedCount} of ${elementName}' +
      ' elements on ${this.pageName}');
  }


  /**
   * Scroll page to the buttom
   */
  async scrollPage() {
    await page.evaluate(async () => {
      // eslint-disable-next-line max-len, require-jsdoc
      const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let i = 0; i < document.body.scrollHeight; i += 100) {
        window.scrollTo(0, i);
        await delay(100);
      }
    });
  }

  /**
 * Checks if elements is not disabled on page
 * @param {string} elementName
 * @param {number} expectedCount
 */
  async expectElementNotToBeDisabled(elementName: string) {
    const locator = page.locator(this.getPageElement(elementName));
    await expect(locator).not.toBeDisabled();
  }
}
