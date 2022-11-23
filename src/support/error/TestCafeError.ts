export type TestCafeErrorType = {
  apiFnChain: string[];
  apiFnIndex: number;
  callsite: any; //CallsiteRecord;
  code: string;
  id: string;
  isTestCafeError: boolean;
};

export default class TestCafeError extends Error {
  constructor(message?: string, originalError?: TestCafeErrorType) {
    super(`${message} ${originalError.apiFnChain}`);

    const prototype = new.target.prototype;
    prototype.name = 'TestCafeError';
    Object.setPrototypeOf(this, prototype);
  }
}
