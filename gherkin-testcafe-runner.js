const createTestCafe = require('gherkin-testcafe');

const { register } = require('ts-node');
const { compilerOptions } = require('./tsconfig.json');
register({ compilerOptions });
const Cli = require('./src/support/Cli').default;

(async () => {
  const cli = new Cli(process.argv);
  const report = cli.argument('report') !== 'false';

  const testcafe = await createTestCafe();

  try {
    await run(testcafe, { report });
    console.log('-||Test Completed||-');
  } catch (e) {
    console.error(e);
    console.log('-||Test was ended unexpectedly||-');
  } finally {
    testcafe.close();
  }
  process.exit(0);
})();

async function run(testcafe, { report }) {
  const runner = await testcafe.createRunner();
  if (report) {
    runner.reporter('cucumber-json', 'reports/report.json');
  }
  // runner config, but tags and report come from .testcaferc.js
  return runner.run();
}
