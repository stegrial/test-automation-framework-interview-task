import {Given, When, Then} from '@cucumber/cucumber';
import {DemoHomePage} from '../pages/home.page';

let homePage: DemoHomePage;

Given('user opens the home page', async function() {
  homePage = new DemoHomePage();
  await homePage.navigate();
});

When('user logs in as {string}', async function(userId: string) {
  await homePage.loginAs(userId);
});

Then('user sees the login page', async function() {
  homePage = new DemoHomePage();
  await homePage.expectContent('logo');
  await homePage.expectContent('loginButton');
});

Then('user sees error message', async function() {
  homePage = new DemoHomePage();
  await homePage.expectContent('errorMessage');
});
