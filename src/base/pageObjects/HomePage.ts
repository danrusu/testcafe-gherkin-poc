import { Selector, t } from 'testcafe';
import { SmartTestController } from './SmartTestController';

class HomePage {
  url = 'http://qatools.ro/calculate/appApi.html';
  smartTestController: SmartTestController;
  submitButton: Selector;

  constructor() {
    this.smartTestController = new SmartTestController();

    const submitButtonCssSelector = '#xyz';
    this.submitButton = Selector(submitButtonCssSelector);
  }
}

export default Object.freeze(new HomePage());
