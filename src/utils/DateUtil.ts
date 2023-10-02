import { DateFormats } from '../enums/DateFormatTypes';
import ObjectUtil from './ObjectUtil';
import {
  toDate,
  fromUnixTime,
  parseISO,
  isLeapYear,
  startOfMonth,
  isAfter,
  subDays,
  endOfMonth,
  subMonths,
  subYears,
  addDays,
  addMonths,
  addYears,
  parse,
  format,
  isValid,
} from 'date-fns';

export class DateUtil {
  static getUTCDate(date: Date): Date {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  }

  static parseDate(date?: string): Date | null {
    if (ObjectUtil.isNotDefined(date)) {
      return null;
    }
    try {
      return parseISO(date!);
    } catch (error) {
      return null;
    }
  }
  static parseDateInMillies(date?: number): Date | null {
    if (ObjectUtil.isNotDefined(date)) {
      return null;
    }
    try {
      return fromUnixTime(date! / 1000.0);
    } catch (error) {
      return null;
    }
  }
  static parseDateInSeconds(date?: number): Date | null {
    if (ObjectUtil.isNotDefined(date)) {
      return null;
    }
    try {
      return fromUnixTime(date!);
    } catch (error) {
      return null;
    }
  }

  static parseDateWithFormat(date: string, format: string): Date | null {
    try {
      return parse(date, format, new Date());
    } catch (error) {
      return null;
    }
  }

  static month(date: Date): number {
    return date.getMonth() + 1;
  }

  static monthBaseZero(date: Date): number {
    return date.getMonth();
  }

  static isAfter(dateA: Date, dateB: Date): boolean {
    return isAfter(dateB, dateA);
  }
  static daysInMonth(date: Date): number {
    switch (DateUtil.month(date)) {
      case 2:
        return DateUtil.isLeapYear(date) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  }

  static isLeapYear(date: Date): boolean {
    return isLeapYear(date);
  }

  static getStartOfMonth(): Date {
    return startOfMonth(new Date());
  }

  static getEndOfMonth(): Date {
    return toDate(endOfMonth(new Date()));
  }

  static subtractDays(daysToSubtract: number, fromDate: Date): Date {
    return subDays(fromDate, daysToSubtract);
  }

  static subtractMonths(monthsToSubtract: number, fromDate: Date): Date {
    return toDate(subMonths(fromDate, monthsToSubtract));
  }

  static subtractYears(yearsToSubtract: number, fromDate: Date): Date {
    return toDate(subYears(fromDate, yearsToSubtract));
  }

  static addDays(daysToAdd: number, fromDate: Date): Date {
    return toDate(addDays(fromDate, daysToAdd));
  }

  static addMonths(monthsToAdd: number, fromDate: Date): Date {
    return toDate(addMonths(fromDate, monthsToAdd));
  }

  static addYears(yearsToAdd: number, fromDate: Date): Date {
    return toDate(addYears(fromDate, yearsToAdd));
  }

  static formatDate(date: Date, dateFormat: string, useLocalTimezone: boolean = false): string {
    if (useLocalTimezone) {
      return format(date!, dateFormat, { useAdditionalWeekYearTokens: true });
    }
    return format(DateUtil.getUTCDate(date!), dateFormat, { useAdditionalWeekYearTokens: true });
  }

  static yesterday(): Date {
    return toDate(subDays(new Date(), 1));
  }

  static now(): Date {
    return new Date();
  }

  static today(): Date {
    return new Date();
  }

  static tomorrow(): Date {
    return toDate(addDays(new Date(), 1));
  }

  static isValidDate(date: string, format: string): boolean {
    const parsedDate = parse(date, format, new Date());
    return isValid(parsedDate);
  }

  static areInSameDay(date_0: Date, date_1: Date): boolean {
    return this.formatDate(date_0, DateFormats.YYYY_MM_DD) === this.formatDate(date_1, DateFormats.YYYY_MM_DD);
  }
}
