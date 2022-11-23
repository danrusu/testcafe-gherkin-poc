import HomePage from '../pageObjects/HomePage';
import { SmartTestController } from '../pageObjects/SmartTestController';

import { expect } from 'chai';
import { Given } from '@cucumber/cucumber';
import { TimeoutError } from 'testcafe/lib/errors/runtime';
import { Selector } from 'testcafe';

const ERRORS = {
  AssertionError: message => expect.fail(message),
  Error: message => {
    throw new Error(message);
  },
  TimeoutError: message => {
    throw new TimeoutError(message);
  },
  CustomError: message => {
    throw new CustomError(message);
  },
};

Given(
  'Step fails with {string} and message {string}',
  (_t, [errorType, errorMessage]) => {
    if (ERRORS[errorType] === undefined) {
      throw new Error(`UnknownError: ${errorMessage}`);
    }
    ERRORS[errorType](errorMessage);
  }
);

Given('Step passes', () => {
  console.log(`Step passed`);
});

function CustomError(message) {
  this.message = message;
  try {
    throw new Error();
  } catch (e) {
    this.stack = e.stack;
  }
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = 'CustomError';
CustomError.prototype.constructor = CustomError;

Given('User navigates to simple calculator page', async () => {
  const controler = new SmartTestController();
  await controler.navigateTo(HomePage.url);

  await controler.click(Selector(HomePage.submitButton));
});
