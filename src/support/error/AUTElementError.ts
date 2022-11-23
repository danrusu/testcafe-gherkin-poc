export default class AUTElementError extends Error {
  constructor(message?: string) {
    super(message);
    const prototype = new.target.prototype;
    prototype.name = 'AUTElementError';
    Object.setPrototypeOf(this, prototype);
  }
}
