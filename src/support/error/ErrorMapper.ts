import { TEST_RUN_ERRORS } from 'testcafe/lib/errors/types';
import TestCafeError from './TestCafeError';

const TESTCAFE_ERRORS = Object.keys(TEST_RUN_ERRORS).reduce(
  (errors, errorName) => {
    const errorCode = TEST_RUN_ERRORS[errorName];
    errors[errorCode] = errorName;
    return errors;
  },
  {}
);

async function mapError(
  codeThatCanThrow: () => Promise<void>,
  ...details: string[]
): Promise<void> {
  try {
    await codeThatCanThrow();
  } catch (err) {
    mapToCustomError(err, ...details);
  }
}

function mapErrorSync(
  codeThatCanThrow: () => void,
  ...details: string[]
): void {
  try {
    codeThatCanThrow();
  } catch (err) {
    mapToCustomError(err, ...details);
  }
}

function mapToCustomError(error: any, ...details: string[]) {
  if (error.isTestCafeError) {
    throw new TestCafeError(
      `${TESTCAFE_ERRORS[error.code]}: ${details.join('|')}`,
      error
    );
  }
  throw error;
}

export { mapError, mapErrorSync };
