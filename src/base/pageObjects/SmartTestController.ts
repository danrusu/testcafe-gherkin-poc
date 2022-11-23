import { ClientFunction, Selector, t } from 'testcafe';
import { mapError, mapErrorSync } from '../../support/error/ErrorMapper';
import Environment from '../../Environment';

export class SmartTestController {
  async expectEqual(actual, expected, message) {
    actual = String(actual).trim();
    expected = String(expected).trim();
    await t.expect(actual).eql(expected, message);
    console.log(
      `~ expectEqual = ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace(
          'something went wrong',
          ''
        )} | actual: ${actual} | expected: ${expected}`
    );
  }

  async expectNotEqual(actual, expected, message) {
    actual = String(actual).trim();
    expected = String(expected).trim();
    await t.expect(actual).notEql(expected, message);
    console.log(
      `~ expectNotEqual = message ${message}
        | actual: ${actual} | expected: ${expected}`
    );
  }

  async expectEqualWithoutPopUpCheck(actual, expected, message) {
    actual = String(actual).trim();
    expected = String(expected).trim();
    await t.expect(actual).eql(expected, message);
    console.log(
      `~ expectEqualWithoutPopUpCheck = ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace(
          'something went wrong',
          ''
        )} | actual: ${actual} | expected: ${expected}`
    );
  }

  async explicitWait(selector: Selector, timeoutInSeconds: number = 10) {
    console.log(`~ explicitWait(${timeoutInSeconds})`);
    try {
      if (await selector.exists) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
    if (timeoutInSeconds === 0) {
      return;
    }
    await t.wait(1000);
    await this.explicitWait(selector, timeoutInSeconds - 1);
  }

  async click(selector: Selector, timeoutInSeconds?: number) {
    await mapError(async () => {
      let newSelector = selector;
      if (timeoutInSeconds) {
        await this.explicitWait(selector, timeoutInSeconds);
        newSelector = Selector(selector, { timeout: 0 });
      }
      await t.click(newSelector);
      console.log(`~ click`);
    }, `click()`);
  }

  async clickWithoutPopUpCheck(selector: Selector) {
    await mapError(async () => {
      await this.explicitWait(selector, 10);
      await t.click(selector);
      console.log(`~ clickWithoutPopUpCheck`);
    }, `clickWithoutPopUpCheck()`);
  }

  async doubleClick(selector: Selector) {
    await mapError(async () => {
      await this.explicitWait(selector, 10);
      await t.doubleClick(selector, { speed: 1 });
      console.log(`~ doubleClick`);
    }, `doubleClick()`);
  }

  async typeText(selector: Selector, text: string) {
    await mapError(async () => {
      await this.explicitWait(selector, 10);
      await t.typeText(selector, text, { replace: true, paste: true });
      console.log(`~ typeText = text: ${text}`);
    }, `typeText(${text})`);
  }

  async typeTextWithoutPopUpCheck(selector: Selector, text: string) {
    await mapError(async () => {
      await this.explicitWait(selector, 10);
      await t.typeText(selector, text, { replace: true, paste: true });
      console.log(`~ typeTextWithoutPopUpCheck = text: ${text}`);
    }, `typeTextWithoutPopUpCheck(${text})`);
  }

  async navigateTo(url: string) {
    await mapError(async () => {
      await t.navigateTo(url);
      console.log(`~ navigateTo = ${url}`);
    }, `navigateTo(${url})`);
  }

  async switchToIframe(selector: Selector) {
    await mapError(async () => {
      await selector.exists;
      await t.switchToIframe(selector);
      console.log(`~ switchToIframe`);
    }, `switchToIframe()`);
  }

  async switchToWindow(windowDescriptor: WindowDescriptor) {
    await t.switchToWindow(windowDescriptor);
    console.log(`~ switchToWindow`);
  }

  async switchToMainWindow() {
    await mapError(async () => {
      await t.switchToMainWindow();
      console.log(`~ switchToMainWindow`);
    }, `switchToMainWindow()`);
  }

  async hover(selector: Selector) {
    await mapError(async () => {
      await selector.exists;
      await t.hover(selector);
      console.log(`~ hover`);
    }, `hover()`);
  }

  async hoverWithoutPopUpCheck(selector: Selector) {
    await mapError(async () => {
      await selector.exists;
      await t.hover(selector);
      console.log(`~ hoverWithoutPopUpCheck`);
    }, `hoverWithoutPopUpCheck()`);
  }

  async expectOk(actual, message, options?: AssertionOptions) {
    await t.expect(actual).ok(message, options);
    console.log(
      `~ expectOk = message: ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace('something went wrong', '')} | actual: ${actual}`
    );
  }

  async expectOkWithoutPopUpCheck(actual, message, options?: AssertionOptions) {
    await t.expect(actual).ok(message, options);
    console.log(
      `~ expectOkWithoutPopUpCheck = message: ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace('something went wrong', '')} | actual: ${actual}`
    );
  }

  async expectNotOk(actual, message, options?: AssertionOptions) {
    await t.expect(actual).notOk(message, options);
    console.log(`~ expectNotOk =  ${message} = False :: actual: ${actual}`);
  }

  async expectNotOkWithoutPopUpCheck(
    actual,
    message,
    options?: AssertionOptions
  ) {
    await t.expect(actual).notOk(message, options);
    console.log(
      `~ expectNotOkWithoutPopUpCheck = message: ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace('something went wrong', '')} | actual: ${actual}`
    );
  }

  async expectContains(actual, expected, message) {
    await t.expect(actual).contains(expected, message);
    console.log(
      `~ expectContains = message: ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace(
          'something went wrong',
          ''
        )} | actual: ${actual} | expected: ${expected}`
    );
  }

  async expectNotContains(actual, expected, message) {
    await t.expect(actual).notContains(expected, message);

    console.log(
      `~ expectNotContains = message: ${message} = False 
      | actual: ${actual} | expected: ${expected}`
    );
  }

  async expectWithin(actual, start, finish, message) {
    await t.expect(actual).within(start, finish, message);
    console.log(
      `~ expectWithin = message: ${message
        .toLowerCase()
        .replace('no ', '')
        .replace('not ', '')
        .replace("doesn't", 'does')
        .replace('incorrect', 'correct')
        .replace('invalid', 'valid')
        .replace('mismatch', 'match')
        .replace('unexpected', 'expected')
        .replace(
          'something went wrong',
          ''
        )} | actual: ${actual} | start: ${start} | finish: ${finish}`
    );
  }

  async waitToDisappear(selector: Selector, seconds: number) {
    for (let i = 0; i < seconds; i++) {
      try {
        await t.wait(1000);
        await t
          .expect(await selector.exists)
          .notOk(
            'Waited for ' +
              seconds +
              ' seconds but element did not disappeared.'
          );
        break;
      } catch (e) {
        if (i > 0) {
          console.log(
            `--> waitToDisappear: Element is still present. Remaining: ${
              seconds - i
            } seconds...`
          );
        }
      }
    }
    console.log(`~ waitToDisappear(${seconds})`);
  }

  async clear(selector: Selector) {
    await mapError(async () => {
      // todo implement it correctly

      await t.pressKey('ctrl+a delete');
      console.log(`~ clear()`);
    }, `clear()`);
  }

  async wait(seconds: number) {
    await t.wait(seconds * 1000);
    console.log(`~ wait = seconds: ${seconds}`);
  }

  async fail(message: string) {
    await this.expectOk(false, message);
    console.log(`~ fail = message: ${message}`);
  }

  async scroll(selector: Selector, position: ScrollPosition) {
    await t.scroll(selector, position);
    console.log(`~ scroll = position: ${String(position)}`);
  }

  async isElementDisabled(selector: Selector) {
    return this.execClientFunction(locator => {
      let res = document.querySelector(locator).disabled;
      console.log(`~ isElementDisabled = res: ${res}`);
      return res;
    }, selector);
  }

  async elementShouldBeDisabled(selector: Selector) {
    let isDisabled = await this.isElementDisabled(selector);
    await t.expect(isDisabled).eql(true);
    console.log(`~ elementShouldBeDisabled = isElementDisabled: ${isDisabled}`);
  }

  async elementShouldBeEnabled(selector: Selector) {
    let isDisabled = await this.isElementDisabled(selector);
    await t.expect(isDisabled).eql(false);
    console.log(`~ elementShouldBeEnabled = isElementEnabled: ${!isDisabled}`);
  }

  async pageUrl() {
    // TODO GLOBAL15-T1213 is failing because of the line below. Need to investigate and fix
    //console.log(`~ pageUrl = ${document.location.href.toString()}`)
    return this.execClientFunction(() => document.location.href.toString());
  }

  async goBack() {
    console.log(`~ goBack`);
    return this.execClientFunction(() => window.history.back());
  }

  async pressKey(text: string) {
    await mapError(async () => {
      await t.pressKey(text);
      console.log(`~ pressKey = ${text}`);
    }, `pressKey(${text})`);
  }

  async goForward() {
    console.log(`~ goForward`);
    return this.execClientFunction(() => window.history.forward());
  }

  async refresh() {
    console.log(`~ refresh`);
    await this.goBack();
    await this.goForward();
  }

  async setCheckbox(selector: Selector, value: boolean) {
    let isChecked;
    await mapError(async () => {
      let is_selected: boolean = await selector.checked;
      if (is_selected != value) {
        await this.click(selector);
      }
      console.log(`~ setCheckbox = value: ${value}`);
      isChecked = await selector.checked;
    }, `setCheckbox(${value})`);

    return isChecked;
  }

  async selectCheckbox(selector: Selector) {
    await mapError(async () => {
      await this.setCheckbox(selector, true);
      console.log(`~ selectCheckbox = true`);
    }, `selectCheckbox()`);
  }

  async unselectCheckbox(selector: Selector) {
    await mapError(async () => {
      await this.setCheckbox(selector, false);
      console.log(`~ unselectCheckbox = false`);
    }, `unselectCheckbox()`);
  }

  async selectFromListByLabel(selector: Selector, optionText: string) {
    let resultValue;
    await mapError(async () => {
      const option = selector.find('option').withText(optionText.trim());
      await this.click(selector);
      await this.click(option);
      console.log(`~ selectFromListByLabel(${optionText})`);
      resultValue = selector.value;
    }, `selectFromListByLabel(${optionText})`);
    return resultValue;
  }

  async getSelectedListLabels(selector: Selector) {
    let labels = [];
    await mapError(async () => {
      const option = selector.find('option');
      let count: number = await option.count;
      for (let i = 0; i < count; i++) {
        let isSelected: boolean = await option.nth(i).selected;
        if (isSelected) {
          let label = await option.nth(i).innerText;
          labels.push(label);
        }
      }
    }, `getSelectedListLabels()`);

    console.log(`~ selected labels: ${JSON.stringify(labels, null, 2)}`);
    return labels;
  }

  async getSelectedListLabel(selector: Selector) {
    let selected_labels;
    await mapError(async () => {
      selected_labels = await this.getSelectedListLabels(selector);
    }, `getSelectedListLabel()`);
    const label = selected_labels[0];
    console.log(`~ Selected label: ${label}`);
    return label;
  }

  async getText(selector: Selector) {
    let text;
    await mapError(async () => {
      text = await selector.textContent;
    }, `getText()`);
    console.log(`~ element's text: ${text}`);
    return text;
  }

  async getElementsText(selector: Selector) {
    let res: string[] = [];
    await mapError(async () => {
      const count: number = await selector.count;
      for (let i = 0; i < count; i++) {
        let text = await selector.nth(i).textContent;
        // console.log(`${i}: ${text}`)
        res.push(text);
      }
    }, `getElementsText()`);

    return res;
  }

  async getLabelsFromList(selector: Selector) {
    let res;
    await mapError(async () => {
      const option = selector.find('option');
      await this.click(selector);
      try {
        res = await this.getElementsText(option);
      } finally {
        await t.pressKey('esc');
      }
      res.shift();
      console.log(`~ getLabelsFromList = res: ${res}`);
    }, `getLabelsFromList()`);

    return res;
  }

  async setCookie(name, value, options) {
    let cookie;
    await mapError(async () => {
      cookie = this.execClientFunction(
        (name, value, options) => {
          console.log(name);
          console.log(value);
          console.log(options);

          let opts = {
            path: '/',
            // add other default values if needed
          };

          options = Object.assign(options, opts);

          if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
          }

          let updatedCookie =
            encodeURIComponent(name) + '=' + encodeURIComponent(value);

          for (let optionKey in options) {
            updatedCookie += '; ' + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
              updatedCookie += '=' + optionValue;
            }
          }
          console.log('updatedCookie: ' + updatedCookie);
          document.cookie = updatedCookie;
        },
        name,
        value,
        options
      );
    }, `setCookie(${name}, ${value}, ${options})`);
    return cookie;
  }

  async getCookie(name: string) {
    let cookie;
    await mapError(async () => {
      cookie = this.execClientFunction(cookieName => {
        let matches = document.cookie.match(
          new RegExp(
            '(?:^|; )' +
              cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
              '=([^;]*)'
          )
        );
        console.log(
          `~ getCookie = ${name} | matches: ${decodeURIComponent(matches[1])}`
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }, name);
    }, `getCookie(${name})`);
    return cookie;
  }

  async deleteCookie(name: string) {
    let cookie;
    await mapError(async () => {
      cookie = this.execClientFunction(cookieName => {
        document.cookie = cookieName + '=; max-age=-1';
      }, name);
      console.log(`~ deleteCookie = ${name}`);
    }, `deleteCookie(${name})`);
    return cookie;
  }

  async setLocalStorageItem(name: string, value: string) {
    let localStorage;
    await mapError(async () => {
      localStorage = await this.execClientFunction(
        (varName, varValue) => window.localStorage.setItem(varName, varValue),
        name,
        value
      );
      console.log(`~ setLocalStorageItem = name: ${name} | value: ${value}`);
    }, `setLocalStorageItem(${name}, ${value})`);
    return localStorage;
  }

  async getLocalStorageItem(name: string) {
    let localStorage;
    await mapError(async () => {
      localStorage = await this.execClientFunction(
        varName => window.localStorage.getItem(varName),
        name
      );
      console.log(
        `~ getLocalStorageItem = name: ${await this.execClientFunction(
          varName => window.localStorage.getItem(varName),
          name
        )} `
      );
    }, `getLocalStorageItem(${name})`);
    return localStorage;
  }

  async delLocalStorageItem(name: string) {
    let localStorage;
    await mapError(async () => {
      localStorage = this.execClientFunction(
        varName => window.localStorage.removeItem(varName),
        name
      );
      console.log(
        `~ delLocalStorageItem = name: ${this.execClientFunction(
          varName => window.localStorage.removeItem(varName),
          name
        )} `
      );
    }, `delLocalStorageItem(${name})`);
    return localStorage;
  }

  async getInnerHTML(cssLocator: string) {
    let innerHTML;
    await mapError(async () => {
      innerHTML = this.execClientFunction(
        locator => document.querySelector(locator).innerHTML,
        cssLocator
      );
      console.log(
        `~ getInnerHTML = cssLocator: ${cssLocator} | innerHTML: ${this.execClientFunction(
          locator => document.querySelector(locator).innerHTML,
          cssLocator
        )} `
      );
    }, `getInnerHTML(${cssLocator})`);
    return innerHTML;
  }

  execClientFunction(fn: (...fArgs: any[]) => any, ...args: any[]) {
    let result;
    mapErrorSync(() => {
      result = ClientFunction(fn)(...args);
    }, `execClientFunction(${fn.toString()}, ${args})`);
    return result;
  }

  async scrollToPageTop() {
    await mapError(async () => {
      await t.scroll(0, 0);
    }, `scrollToPageTop()`);
    console.log(`~ scrollToPageTop`);
  }
}
