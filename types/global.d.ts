import {Page, Browser, BrowserContext} from '@playwright/test';

declare global {
  var browser: Browser;
  var context: BrowserContext;
  var page: Page;
  var device: string;
  var environment: string;
  var environmentName: string;
  var storedInformation: Map<any, any>;
}
