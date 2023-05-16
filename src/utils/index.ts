import isString from "lodash/isString";
import { ParsedUrlQuery } from "querystring";

import { AnyObject } from "../types";

/**
 * Allowed characters in random string
 */
const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Getting a random integer between two values
 *
 * @param minimum: Minimum number
 * @param maximum: Maximum number
 * @returns Returns a random integer between the specified values.
 * The value is no lower than `min` (or the next integer greater than min
 * if min isn't an integer), and is less than (or equal to) `max`.
 */
export const randomInt = (minimum: number, maximum: number): number => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Random string
 * @see https://www.codegrepper.com/code-examples/javascript/how+to+auto+generate+unique+string+in+javascript
 * @returns String
 */
export const randomString = (length: number): string => {
  let result = "";
  const charsLength = RANDOM_CHARS.length;
  for (let i = 0; i < length; i++) {
    result += RANDOM_CHARS.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
};

/**
 * If value is string return value, otherwise return value.toString
 *
 * @param value: Value
 * @returns String or convert of value to string
 */
export const ensureString = (value: any): string => {
  try {
    if (value !== undefined && value !== null) {
      if (isString(value)) {
        return value;
      } else if (typeof value === "object") {
        return JSON.stringify(value);
      } else {
        return `${value}`;
      }
    }
  } catch (error) {
    return "";
  }
  return "";
};

/**
 * Convert a string (name of user) to color
 *
 * @param name Display name of user
 */
export const stringToColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

/**
 * Format numbers with leading zeros
 *
 * @param num A number
 * @param size String output length
 * @returns String format with leading zero
 */
export const zeroPad = (num: number, size: number): string => {
  return `${num}`.padStart(size, "0");
};

/**
 * Cast string to boolean
 *
 * @param value Value
 * @returns Boolean if value is `true` or `1`
 */
export const toBoolean = (value: any): boolean => {
  return value === "true" || Number(value) === 1;
};

/**
 * Convert any value to Number or null
 *
 * @param value Value
 * @returns Number or null
 */
export const toNullOrNumber = (value: any): number | null => {
  let result: number | null = Number(value);
  if (isNaN(result)) {
    result = null;
  }
  return result;
};

/**
 * Get the letter of username of name
 *
 * @param name Username or Name
 * @returns Letter of name
 */
export const avatarLetterName = (name: string) => {
  name = name || "";
  let words = name.split(".");
  if (words.length <= 1) {
    words = name.split("-");
  }
  if (words.length <= 1) {
    words = name.split(" ");
  }
  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return (words[0][0] || "").toUpperCase();
};

/**
 * Cast query object to Dynamic
 *
 * @param query ParsedUrlQuery
 * @returns Object
 */
export const queryString = <T = AnyObject>(query: ParsedUrlQuery): T => {
  return query as T;
};
