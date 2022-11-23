const { readdir, readFile, writeFile } = require('fs/promises');
const { createHtml, tag } = require('../createHtml');
const { getHtmlScripts } = require('./htmlScripts');

const { classifyByTypeAndThenByMessage } = require('./classification');

const CUCUMBER_REPORTS_DIR = 'cucumber-json-reports';
const REPORTS_DIR = `reports`;
const ERROR_REPORT_NAME = `errorClassification`;
const ERROR_CSS_FILE = 'js-utils/error/main.css';

async function reportErrors(reportDir) {
  const errors = await getCucumberReportErrors(CUCUMBER_REPORTS_DIR);

  const errorsByTypeAndThenByMessage = classifyByTypeAndThenByMessage(errors);

  await writeFile(
    `${REPORTS_DIR}/${ERROR_REPORT_NAME}.json`,
    JSON.stringify(errorsByTypeAndThenByMessage, null, 2)
  );
  await createHtml(`${reportDir}/${ERROR_REPORT_NAME}.html`, {
    title: 'Errors',
    style: (await readFile(ERROR_CSS_FILE)).toString(),
    bodyItems: [
      tag({ name: 'h1', content: 'Error Classification' }),
      tag({
        name: 'div',
        content: errorHtmlContent(errorsByTypeAndThenByMessage),
        attributes: { id: 'content' },
      }),
    ],
    scripts: getHtmlScripts(),
  });
}

async function reportErrorsByFeature() {
  const errors = await getCucumberReportErrors(CUCUMBER_REPORTS_DIR);

  const errorsByFeature = classifyByFeature(errors);
  await writeFile(
    `${REPORTS_DIR}/${ERROR_REPORT_NAME}ByFeature.json`,
    JSON.stringify(errorsByFeature, null, 2)
  );
  await createHtml(`${reportDir}/${ERROR_REPORT_NAME}ByFeature.html`, {
    title: 'Errors By Feature',
    style: (await readFile(ERROR_CSS_FILE)).toString(),
    bodyItems: [
      tag({ name: 'h1', content: 'Error Classification By Feature' }),
      tag({
        name: 'div',
        content: errorTable(errorsByFeature),
        attributes: { id: 'content' },
      }),
    ],
    scripts: getHtmlScripts(),
  });
}

async function getCucumberReportErrors(cucumberReportsDir) {
  const reports = await getReports(cucumberReportsDir);
  let errors = [];
  for (const report of reports) {
    const reportJson = JSON.parse(await readFile(report));
    reportJson.forEach(({ elements, name: feature }) => {
      const failedElements = elements.filter(
        element => element.status === 'failed'
      );
      failedElements.forEach(({ name: scenario, steps }) => {
        const stepErrors = steps
          .filter(step => step.result.status === 'failed')
          .map(step => {
            const fullErrorMessage = step.result?.error_message;
            const errorTypeAndMessage = fullErrorMessage?.split('\n').shift();
            const errorTypeAndMessagePattern = /.*\)\s(\w*):\s(.*)/;
            let [_, errorType, errorMessage] = errorTypeAndMessagePattern?.exec(
              errorTypeAndMessage
            ) || ['', 'UnknownError', errorTypeAndMessage];
            if (errorType === 'TestCafeError') {
              errorType += `_${errorMessage.split(':').shift()}`;
            }
            if (fullErrorMessage?.includes('TAFError')) {
              errorType = 'TAFFError';
              errorMessage = fullErrorMessage
                ?.split('\n')
                .find(line => line.includes('TAFError'))
                .replace('TAFError: ', '');
            }
            if (
              fullErrorMessage?.includes(
                'The element that matches the specified selector is not visible'
              ) ||
              fullErrorMessage?.includes(
                'Cannot obtain information about the node because the specified selector does not match any node in the DOM tree'
              )
            ) {
              errorType = 'AUTElementError';
            }
            return {
              feature,
              scenario,
              errorType,
              errorMessage: errorMessage?.replace(/^\d\)\s(.*)/, '$1'),
              details: tag({
                name: 'div',
                content: step?.result?.error_message?.replace(/\n/g, '</br>'),
                attributes: { class: 'errorFullMessage' },
              }),
              screenshot: step.image,
            };
          });
        errors = errors.concat(...stepErrors);
      });
    });
  }
  return errors;
}

async function getReports(cucumberReportsDir) {
  return (await readdir(cucumberReportsDir))
    .filter(isJsonReport)
    .map(reportName => `${cucumberReportsDir}/${reportName}`);
}

function isJsonReport(fileName) {
  return fileName.split('.').pop() === 'json';
}

function errorTable(errors) {
  const rows = Object.entries(errors).reduce(
    (acc, [errorName, errorsDetails]) => {
      const header = getErrorHeaderRow(errorName, errorsDetails);
      const errorDetailRows = getErrorRow(errorName, errorsDetails);
      acc += `\n\n${header}\n${errorDetailRows}`;
      return acc;
    },
    ''
  );
  return tag({
    name: 'table',
    content: rows,
    attributes: { class: 'errorTable', style: 'display: none' },
  });
}

function errorHtmlContent(errors) {
  const content = Object.entries(errors).reduce(
    (acc, [errorType, errorsByMessage]) => {
      const errorCount = Object.values(errorsByMessage).reduce(
        (count, errorDetails) => count + errorDetails.length,
        0
      );
      const mainErrorDiv = tag({
        name: 'div',
        content: `${errorType} ${errorCount}`,
        attributes: {
          class: errorType,
          onclick: `toggleDisplay('.${errorType} + table');`,
        },
      });
      const errorsByMessageTable = errorTable(errorsByMessage);
      acc += `\n${mainErrorDiv}\n${errorsByMessageTable}`;
      return acc;
    },
    ''
  );
  return tag({
    name: 'div',
    content,
    attributes: { id: 'errors' },
  });
}

function getErrorHeaderRow(errorName, errorsDetails) {
  const errorNameAsClassName = '_' + errorName.replace(/\W/g, '_');
  return tag({
    name: 'tr',
    content:
      tag({
        name: 'td',
        content: errorName,
      }) +
      tag({
        name: 'td',
        content: errorsDetails.length,
      }),
    attributes: {
      class: `header ${errorNameAsClassName}`,
      onclick: `htmlErrorToggle('${errorNameAsClassName}')`,
      title: 'expand/collapse',
    },
  });
}

function getErrorRow(errorName, errorsInfo) {
  return errorsInfo
    .map(info =>
      tag({
        name: 'tr',
        content:
          tag({ name: 'td' }) +
          tag({
            name: 'td',
            content: getErrorInfoContent(info),
          }),
        attributes: {
          class: '_' + errorName.replace(/\W/g, '_'),
          style: 'display: none',
        },
      })
    )
    .join('\n');
}

function getErrorInfoContent(infoObj) {
  return Object.entries(infoObj).reduce((acc, [name, value]) => {
    const info =
      name !== 'screenshot'
        ? `<div><span class="info">${name.toUpperCase()}</span>: ${value}</div>\n`
        : `<div><span class="info screenshot" onclick="htmlImageToggle(this)">${name.toUpperCase()}<img src="${value}" style="display: none"></span></div>`;
    acc += info;
    return acc;
  }, '');
}

module.exports = { reportErrors, reportErrorsByFeature };
