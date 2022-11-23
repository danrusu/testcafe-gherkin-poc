function classifyByTypeAndThenByMessage(errors) {
  const errorsByType = classifyByType(errors);

  return Object.entries(errorsByType).reduce((acc, [errorType, errorList]) => {
    acc[errorType] = classifyByMessage(errorList);
    return acc;
  }, {});
}

function classifyByType(errors) {
  return classifyBy(errors, error => error.errorType);
}

function classifyByFeature(errors) {
  return classifyBy(errors, error => error.feature);
}

function classifyByMessage(errors) {
  const ASSERTION_ERROR_PATTERN = ': expected';
  return classifyBy(errors, error => {
    let message = error.errorMessage;
    if (message?.includes(ASSERTION_ERROR_PATTERN)) {
      message = message.split(ASSERTION_ERROR_PATTERN)[0];
    }
    if (error.errorType?.startsWith('TestCafeError')){
      message = message.split(':').slice(1).join('');
    }
    return message;
  });
}

/* criteriaFunction(error: { 
  feature,  
  scenario, 
  errorType, 
  errorMessage,
  details, 
  screenshot 
}) => string */
function classifyBy(errors, criteriaFunction) {
  return errors.reduce((acc, error) => {
    const { feature, scenario, errorType, errorMessage, details, screenshot } =
      error;
    const errorInfo = {
      feature,
      scenario,
      errorType,
      errorMessage,
      details,
      screenshot,
    };
    if (!screenshot) {
      delete errorInfo.screenshot;
    }
    const classificationCriteria = criteriaFunction(error);
    if (Object.keys(acc).includes(classificationCriteria)) {
      acc[classificationCriteria] =
        acc[classificationCriteria].concat(errorInfo);
    } else {
      acc[classificationCriteria] = [errorInfo];
    }
    return acc;
  }, {});
}

module.exports = {
  classifyByType,
  classifyByFeature,
  classifyByTypeAndThenByMessage,
};
