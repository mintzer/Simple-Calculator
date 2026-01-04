/**
 * Core validation module for calculator input validation and type casting.
 * Migrated from Python is_number() and casting() functions.
 */

/**
 * Type alias for strings that should contain numeric values
 */
export type NumericString = string;

/**
 * Standard validation error message displayed to users
 */
export const VALIDATION_ERROR_MESSAGE =
  "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456";

/**
 * Validates whether a string represents a valid number.
 * Accepts: integers, floats, decimals without leading zero (.123), signed numbers.
 * Rejects: empty strings, non-numeric strings, invalid formats.
 *
 * This function replicates the exact behavior of the Python is_number() function.
 *
 * @param s - The string to validate
 * @returns true if the string is a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Return false if string is empty
  if (s !== '') {
    // Check if string with one decimal point removed is all digits
    // This handles cases like "123.456"
    const withoutDecimal = s.replace('.', '');
    if (withoutDecimal.length > 0 && /^\d+$/.test(withoutDecimal)) {
      return true;
    }

    // Check if string is all digits (handles "123")
    if (/^\d+$/.test(s)) {
      return true;
    }

    // Check if first character is a special character: '-', '+', '.', '0', or ' '
    if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
      // If second char is '.', check if rest is digits (handles "+.123", "-.123")
      if (s[1] === '.') {
        const rest = s.substring(2);
        if (rest.length > 0 && /^\d+$/.test(rest)) {
          return true;
        }
      }

      // If second char is '0' and third is '.', check if rest is digits (handles "+0.123", "-0.123")
      if (s.length >= 3 && s[1] === '0' && s[2] === '.') {
        const rest = s.substring(3);
        if (rest.length > 0 && /^\d+$/.test(rest)) {
          return true;
        }
      }

      // Check if rest after first char is digits (handles "+123", "-123")
      const rest = s.substring(1);
      if (rest.length > 0 && /^\d+$/.test(rest)) {
        return true;
      }
    }

    return false;
  }

  return false;
}

/**
 * Converts a validated numeric string to a JavaScript number.
 * This function replicates the behavior of the Python casting() function.
 *
 * In Python, casting() returns int for whole numbers and float for decimals.
 * JavaScript/TypeScript has a single number type (IEEE 754 double-precision float),
 * so this distinction is not preserved at the type level, but the numeric value
 * will be correctly converted.
 *
 * @param num - The numeric string to convert (should be validated with isNumber first)
 * @returns The numeric value as a JavaScript number
 */
export function castToNumber(num: string): number {
  // Python's casting() checks for '.' to decide between int and float
  // In JavaScript, we can just use parseFloat or Number() which handles both
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}
