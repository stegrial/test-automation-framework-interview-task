/// <reference path="../../types/global.d.ts" />
/* eslint-disable new-cap */
/* eslint-disable max-len */

import {After, AfterAll, Before, BeforeAll} from '@cucumber/cucumber';
import {chromium, devices, firefox, webkit, BrowserType} from '@playwright/test';
import {env} from 'process';

function initBeforeAll(): void {
  BeforeAll(async function(): Promise<void> {
    const isHeadless: boolean = env.HEADLESS === 'true';

    const browserName: string = env.BROWSER!;
    const browserType: BrowserType =
      browserName === 'webkit' ? webkit :
        browserName === 'firefox' ? firefox :
          chromium;
    global.browser = await browserType.launch({
      headless: isHeadless,
      slowMo: isHeadless ? 0 : 50,
    });

    global.device = env.DEVICE!;
    global.environmentName = env.ENVIRONMENT_NAME!;
    global.environment = env.ENVIRONMENT!;
  });
}

function initBefore(): void {
  Before(async function(): Promise<void> {
    const scenarioArgs =
      global.device === 'mobile' ? devices['Pixel 5'] :
        global.device === 'tablet' ? devices['iPad (gen 7)'] :
          devices['Desktop Chrome'];

    global.context = await global.browser.newContext({
      permissions: ['clipboard-read', 'clipboard-write'],
      ...scenarioArgs,
    });
    global.page = await global.context.newPage();
    global.storedInformation = new Map<any, any>();
  });
}

function initAfter(): void {
  After(async function(): Promise<void> {
    global.storedInformation.clear();
    await global.page.close();
    await global.context.close();
  });
}

function initAfterAll(): void {
  AfterAll(async function(): Promise<void> {
    await global.browser.close();
  });
}

function initAllHooks(): void {
  initBeforeAll();
  initBefore();
  initAfter();
  initAfterAll();
}

export {initBeforeAll, initBefore, initAfter, initAfterAll, initAllHooks};
