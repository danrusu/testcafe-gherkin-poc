export default class Cli {
  private args: Array<string>;
  constructor(stringArguments: Array<string>) {
    this.args = [...stringArguments];
  }
  argument(
    name: string,
    defaultValue?: string | number | boolean
  ): string | number | boolean {
    const namePattern = `${name}=`;
    const value = this.args
      .find(a => a.startsWith(namePattern))
      ?.replace(namePattern, '');
    if (typeof defaultValue === 'boolean') {
      return value ? value === 'true' : defaultValue;
    }
    if (typeof defaultValue === 'number') {
      return value ? parseInt(value) : defaultValue;
    }
    return value ?? defaultValue;
  }
}
