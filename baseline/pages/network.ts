/* eslint-disable max-len */
import {expect, Response} from '@playwright/test';

export class Network {
  private _gaList!: Map<string, Promise<Response>>;

  private getGAList(): Map<string, Promise<Response>> {
    return this._gaList || (this._gaList = new Map<string, Promise<Response>>());
  }

  async subscribeToGAEvent(eventName: string) {
    const responseRegex = new RegExp(`^https://www\\.google-analytics\\.com/(?:[a-z]/)?collect\\?.*${encodeURIComponent(eventName)}.*$`);
    const responsePromise = page.waitForResponse(responseRegex);
    this.getGAList().set(eventName, responsePromise);
  }

  async expectGAEvent(eventName: string): Promise<void> {
    const responsePromise = this.getGAList().get(eventName);
    if (responsePromise) {
      const response = await responsePromise;
      expect(response.ok()).toBeTruthy();
    } else {
      throw new Error(`You are not subscribed to "${eventName}" GA event!`);
    }
  }

  async subscribeToAnalyticsEvent(eventName: string) {
    const requestRegex = new RegExp(`^https://dreamhubuat\\.mattressfirm\\.com/api/trpc/sendAnalyticsEvent$`);
    const requestPromise = page.waitForRequest(requestRegex);
    global.storedInformation.set(eventName, requestPromise);
  }

  async expectAnalyticsEvent(actionName: string): Promise<void> {
    const requestPromise = await global.storedInformation.get(actionName);
    if (requestPromise) {
      const requestPayload = JSON.parse(requestPromise.postData());
      console.log(requestPayload);
      expect(requestPayload.action).toEqual(actionName);
      if (requestPayload.noteId) {
        expect(requestPayload.eventName).toEqual('Note');
      } else if (requestPayload.orderNumber) {
        expect(requestPayload.eventName).toEqual('Order');
      } else if (actionName == 'launch') {
        expect(requestPayload.eventName).toEqual('New');
        expect(requestPayload.salesforceID).toMatch(/^[a-zA-Z0-9_.-]{18}$/);
        expect(requestPayload.employeeId).toMatch(/^\d{9}$/);
        expect(requestPayload.recordName).toBeTruthy();
      } else {
        expect(requestPayload.eventName).toEqual('Customer');
      }
      expect(requestPayload.unifyEventId).toMatch(/^\d{19}$/);
      expect(requestPayload.unifySessionId).toMatch(/^\d{19}$/);
      if (requestPayload.eventName == 'Order') {
        expect(requestPayload.orderNumber);
      } else if (actionName == 'View') {
        expect(requestPayload.recordName).toEqual('Kristen Rush');
        expect(requestPayload.contactID).toMatch(/^[a-zA-Z0-9_.-]{18}$/);
      }
    } else {
      throw new Error(`You are not subscribed to "${actionName}" Analytics event!`);
    }
  }

  async subscribeToCreateSessionEvent(eventName: string) {
    const requestRegex = new RegExp(`^https://dreamhubuat\\.mattressfirm\\.com/api/trpc/createSession$`);
    const requestPromise = page.waitForRequest(requestRegex);
    global.storedInformation.set(eventName, requestPromise);
  }

  async expectCreateSessionEvent(actionName: string): Promise<void> {
    const requestPromise = await global.storedInformation.get(actionName);
    if (requestPromise) {
      const requestPayload = JSON.parse(requestPromise.postData());
      console.log(requestPayload);
      expect(requestPayload.deviceType).toEqual(actionName);
      expect(requestPayload.unifySessionStartUTC).toBeTruthy();
      expect(requestPayload.employeeId).toBeTruthy();
      expect(requestPayload.storeNumber).toBeTruthy();
      expect(requestPayload.unifySessionId).toBeTruthy();
    } else {
      throw new Error(`You are not subscribed to "${actionName}" Create Session event!`);
    }
  }
}

module.exports = {Network};
