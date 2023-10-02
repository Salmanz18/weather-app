//https://date-fns.org/v2.19.0/docs/format

export enum DateTimeFormats {
  YYYY_MM_DD_DASH_TIME_24 = 'yyyy-MM-dd hh:mm', // ex- 2023-01-11 14:45
  YYYY_MM_DD_SLASH_TIME_24 = 'yyyy/MM/dd hh:mm', // ex- 2023/01/11 14:45
  MMM_DD_YYYY_SPACE_TIME_AM = 'MMM do yyyy, h:mm aa', // Ex- Jan 11th 2023, 2:45 PM
  M_D_YY_SLASH_AM = 'M/d/yy, h:mm a', // Ex- 2/22/23, 2:45 PM
}

export enum DateFormats {
  YYYY_MM_DD_DASH = 'yyyy-MM-dd', // ex- 2023-01-11
  YYYY_MM_DD_SLASH = 'yyyy/MM/dd', // ex- 2023/08/27
  MM_DD_YYYY_SLASH = 'MM/dd/yyyy', // ex- 08/27/2023
  MM_DD_YYYY_DASH = 'MM-dd-yyyy', // ex- 08-27-2023
  YYYY_MM_DD = 'YMMdd', // ex- 20230117
}
