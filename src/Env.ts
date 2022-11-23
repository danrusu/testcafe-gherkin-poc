import Cli from './support/Cli';

interface TestCafeBrowserAndPlatformSettings {
  browsers: string;
  mobile: boolean;
}

export interface TestCafeSettings extends TestCafeBrowserAndPlatformSettings {}

export default class Environment {
  tags: string;
  browser: string;

  private static ARGUMENTS: Array<
    string | [string, string | number | boolean]
  > = [
    'tags',
    ['parallel', 1],
    ['selectorTimeout', 30000],
    ['assertionTimeout', 300],
    ['pageLoadTimeout', 30000],
    ['browserInitTimeout', 360000],
    ['browser', 'chrome:headless'],
  ];

  constructor(args: string[]) {
    this.initFields(args);
    this.browser = this.browser.replace(/_/g, ' ').replace(/\*/g, ';');
    this.log();
  }

  private initFields(args) {
    const cli = new Cli(args);
    Environment.ARGUMENTS.forEach(argument => {
      if (typeof argument === 'string') {
        this[argument] = cli.argument(argument);
      } else {
        const [argumentName, defaultValue] = argument;
        this[argumentName] = cli.argument(argumentName, defaultValue);
      }
    });
  }

  private log() {
    console.log(`Environment:\n${JSON.stringify(this, null, 2)}`);
  }
}
