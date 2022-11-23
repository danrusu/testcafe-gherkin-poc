const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
const { reportErrors } = require('./error/report');

const CUCUMBER_REPORTS_DIR = 'cucumber-json-reports';
const reportPath = `${CUCUMBER_REPORTS_DIR}/html`;

const label = (labelName, labelValue) => ({
  label: labelName,
  value: labelValue || '',
});

(async () => {
  report.generate({
    reportName: 'Dashboard',
    jsonDir: CUCUMBER_REPORTS_DIR,
    reportPath,
    openReportInBrowser: true,
    disableLog: true,
    displayDuration: true,
    displayReportTime: true,
    durationInMS: true,
    customData: {
      title: 'Test Execution info',
      data: [
        label('Project', projectName),
        label('Release', projectVersion),
        label('Report Generation Time', reportGenerationTime),
        label(
          '<a style="color: #E74C3C; "href="./errorClassification.html">Error Classification</a>'
        ),
      ],
    },
  });
  await reportErrors(reportPath);
})();
