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
import {Page} from './page';

/** Baseline class for Sign In Page */
export class AccountPage extends Page {
  protected usersDataPath: string;

  /**
   * Creates Product Page object
   * @param {string} dataPath path to JSON file with locators data
   * @param {string} usersDataPath path to JSON file with users' data
   */
  constructor(dataPath: string, usersDataPath: string) {
    super(dataPath);
    this.usersDataPath = usersDataPath;
  }
  /**
   * Fills in user data and clicks login button
   * @param {string} userId id of user in JSON file
   */
  async makeLoginAs(userId: string) {
    const userInfo = this.getUserInfo(userId);
    await this.fillElementWithValue('emailInput', userInfo['email']);
    await this.fillElementWithValue('passwordInput', userInfo['password']);
    await this.clickElement('signInButton');

    console.log('I have logged in as ' + userId);
  }

  /**
   * Returns email and password of user
   * @param {string} userId
   * @return {any}
   * */
  getUserInfo(userId: string) {
    const userData = JSON.parse(fs.readFileSync(this.usersDataPath));
    return userData[userId];
  }
}
