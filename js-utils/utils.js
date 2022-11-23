const { writeFile } = require('fs/promises');

const IssueCollector = () => {
  const issuesContainer = [];
  return {
    verify({ details, expected, actual, validation = equals, ...other }) {
      let isValid = true;
      try {
        isValid = validation(expected, actual);
      } catch (error) {
        isValid = false;
      }
      if (!isValid) {
        issuesContainer.push({
          ...other,
          details,
          expected,
          actual,
        });
      }
    },
    getIssues() {
      return [...issuesContainer];
    },
  };
};

const report = async (issues, reportName, detailsObj) => {
  const detailsSuffix = Object.entries(detailsObj || {}).reduce(
    (suffix, [detailName, detailValue]) =>
      `${suffix}__${detailName}_${detailValue}`,
    ''
  );

  const reportPath = `reports/analyzer/${reportName}${detailsSuffix}.json`;
  await writeFile(reportPath, JSON.stringify(issues, null, 2));

  console.log(
    `\n${reportName[0].toUpperCase()}${reportName.slice(
      1
    )} analysis ${getDetailsObjInfo(detailsObj)}`
  );
  if (issues.length > 0) {
    console.log(`report: ${reportPath} `);
    console.table(issues);
  } else {
    console.log(`No issues found.`);
  }

  function getDetailsObjInfo(detailsObj) {
    return detailsObj ? JSON.stringify(detailsObj) : '';
  }
};

function equals(expected, actual) {
  return expected === actual;
}

function atLeast(expected, actual) {
  return actual >= expected;
}

function areEqualCaseInsensitive(string1, string2) {
  return string1.toLowerCase() === string2.toLowerCase();
}

function sortKeysAndValues(object) {
  if (typeof object !== 'object') {
    return object;
  }

  let sortedObject = {};
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.find(item => typeof item === 'object')) {
        Object.entries(value).forEach(([index, valueAtIndex]) => {
          value[parseInt(index)] = sortKeysAndValues(valueAtIndex);
        });
      }
    } else {
      sortedObject = Object.keys(object)
        .sort()
        .reduce((acc, key) => {
          acc[key] = object[key];
          return acc;
        }, {});
      sortedObject[key] = sortKeysAndValues(value);
    }
  });
  return sortedObject;
}

function mapRejectToErrorObject(details = {}) {
  return async function (promise) {
    try {
      return await promise;
    } catch (err) {
      return { ...details, error: err.message };
    }
  };
}

module.exports = {
  areEqualCaseInsensitive,
  IssueCollector,
  mapRejectToErrorObject,
  report,
  sortKeysAndValues,
  validations: { atLeast },
};
