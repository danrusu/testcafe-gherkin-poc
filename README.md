# cucumber-testcafe-integration

This is a demonstration of integration TestCafé into CucumberJS tests using TestCafe. Cucumber and TypeScript

## Installation

1. Make sure Node.js is installed
2. Navigate to the root of the repo
3. Use the npm install command

## Running tests

```bash
node gherkin-testcafe-runner.js browser=chrome
```

### Generating reports

After completion of the test execution, user needs to run the command - **npm run report** . This command will generate a html report in the directory **cucumber-json-reports**
Note - Please make sure not to pass the run time argument **report=false** in order to generate the html report.

### StackTrace Logs

In order to get the stackTrace or error messages in the console, user needs to pass the run time argument as **report=false**

### Parallel execution of test cases

If user wants to run test scenarios in parallel mode then pass the run time argument as **parallel={thread-count}**. thread-count could be any numeric value , minimum 1 and maximum 8 (for orders related scenario)

### Dependencies check

```javascript
npm run depcheck
```
