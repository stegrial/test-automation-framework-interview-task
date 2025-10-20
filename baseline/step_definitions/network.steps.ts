/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import {Network} from '../pages/network';

const {Given, When, Then} = require('@cucumber/cucumber');

export const networkSteps = function(network: Network) {
  When('user subscribe to GA event {string} on browser network',
      async function(eventName: string) {
        await network.subscribeToGAEvent(eventName);
      });

  Then('user can see GA event {string} on browser network',
      async function(eventName: string) {
        await network.expectGAEvent(eventName);
      });
  When('user subscribe to Analytics event {string} on browser network',
      async function(eventName: string) {
        await network.subscribeToAnalyticsEvent(eventName);
      });

  Then('user can see Analytics event {string} on browser network',
      async function(eventName: string) {
        await network.expectAnalyticsEvent(eventName);
      });
  When('user subscribe to Create Session event {string} on browser network',
      async function(eventName: string) {
        await network.subscribeToCreateSessionEvent(eventName);
      });

  Then('user can see Create Session event {string} on browser network',
      async function(eventName: string) {
        await network.expectCreateSessionEvent(eventName);
      });
};

module.exports = {networkSteps};
