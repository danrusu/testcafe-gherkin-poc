export default class TAFError extends Error {
  constructor(message?: string) {
    super(message);
    const prototype = new.target.prototype;
    prototype.name = 'TAFError';
    Object.setPrototypeOf(this, prototype);
  }
}
