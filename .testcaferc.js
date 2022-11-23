const Environment = require('./src/Environment').default;

const config = {
  browsers: Environment.browser,
  concurrency: parseInt(Environment.parallel),

  src: ['src/base/stepDefinitions/*.ts', 'src/features/*.feature'],

  skipJsErrors: true,
  skipUncaughtErrors: true,
  color: true,

  selectorTimeout: parseInt(Environment.selectorTimeout),
  assertionTimeout: parseInt(Environment.assertionTimeout),
  pageLoadTimeout: parseInt(Environment.pageLoadTimeout),
  browserInitTimeout: parseInt(Environment.browserInitTimeout),
  disablePageCaching: false,
  debugMode: false,
};

console.log(`TestCafe config: ${JSON.stringify(config, null, 2)}`);

module.exports = config;
