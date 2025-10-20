import {HomePage} from '../../../baseline/pages/home.page';
import {env} from 'process';
import * as fs from 'fs';

/**
 * Demo Home Page class
 */
export class DemoHomePage extends HomePage {
  private usersDataPath: string;
  private users: any;

  /**
   * Creates DemoHomePage object
   */
  constructor() {
    const dataPath = `projects/${env.PROJECT}/data/pages/home_page.data.json`;
    super(dataPath);
    this.usersDataPath = `projects/${env.PROJECT}/data/users.json`;
    this.users = JSON.parse(fs.readFileSync(this.usersDataPath, 'utf-8'));
  }

  /**
   * Login with specific user credentials
   * @param {string} userId - User identifier from users.json
   */
  async loginAs(userId: string) {
    const user = this.users[userId];
    await this.fillElementWithValue('usernameInput', user.username);
    await this.fillElementWithValue('passwordInput', user.password);
    await this.clickElement('loginButton');
  }
}

