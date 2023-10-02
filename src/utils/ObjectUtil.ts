export default class ObjectUtil {
  static isDefined(value?: any): boolean {
    return value !== null && value !== undefined && value !== 'undefined';
  }

  static isNotDefined(value?: any): boolean {
    return !this.isDefined(value);
  }

  static areAllDefined(...values: any): boolean {
    for (const value of values) {
      if (this.isNotDefined(value)) {
        return false;
      }
    }
    return true;
  }

  static areAnyDefined(...values: any): boolean {
    for (const value of values) {
      if (this.isDefined(value)) {
        return true;
      }
    }
    return false;
  }

  static areAllNotDefined(...values: any): boolean {
    for (const value of values) {
      if (this.isDefined(value)) {
        return false;
      }
    }
    return true;
  }

  static areAnyNotDefined(...values: any): boolean {
    for (const value of values) {
      if (this.isNotDefined(value)) {
        return true;
      }
    }
    return false;
  }

  static valueOrDefault(value?: any, defaultValue?: any) {
    return this.isDefined(value) ? value : defaultValue;
  }

  static keyValueOrDefault(value?: any, key?: string, defaultValue?: any) {
    if (this.isNotDefined(this.keyValue(value, key))) return defaultValue;
    return value[key!];
  }

  static keyValue(value?: any, key?: string) {
    if (this.isNotDefined(value)) return null;
    if (this.isNotDefined(key)) return null;
    if (value[key!]) return value[key!];
    return null;
  }

  static key2Value(value?: any, key1?: string, key2?: string) {
    if (this.isNotDefined(this.keyValue(value, key1))) {
      return null;
    }
    return this.keyValue(value[key1!], key2);
  }
}
