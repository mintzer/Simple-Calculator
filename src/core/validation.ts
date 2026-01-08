/**
 * Validation utilities for calculator input processing.
 * Mirrors the Python implementation's is_number() and casting() functions.
 */

/**
 * Checks whether the input string is a valid numeric format.
 * Mirrors the Python is_number() function's behavior exactly.
 *
 * Valid formats include:
 * - Integers: "123", "-123", "+123"
 * - Floats: "123.456", "0.123", "-0.123"
 * - Decimals without leading zero: ".123", "-.123"
 *
 * @param s - The string to validate
 * @returns true if the string represents a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Empty string is not a number
  if (s === '') {
    return false;
  }

  // Check if it's a simple float or integer (e.g., "123.456" or "123")
  // Replicate Python's replace('.', '', 1) which replaces first occurrence only
  const firstDotRemoved = s.replace('.', '');
  if (firstDotRemoved.match(/^\d+$/)) {
    return true;
  }

  // Check if it's a plain integer
  if (s.match(/^\d+$/)) {
    return true;
  }

  // Check for numbers with leading sign or decimal point
  if (s.length > 1 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Handle case like "-.123" or "+.123"
    if (s.length > 2 && s[1] === '.') {
      if (s.slice(2).match(/^\d+$/)) {
        return true;
      }
    }

    // Handle case like "-0.123" or "+0.123"
    if (s.length > 3 && s[1] === '0' && s[2] === '.') {
      if (s.slice(3).match(/^\d+$/)) {
        return true;
      }
    }

    // Handle case like "-123" or "+123" or " 123"
    if (s.slice(1).match(/^\d+$/)) {
      return true;
    }
  }

  return false;
}

/**
 * Converts a validated numeric string to a number.
 * Returns an integer if the string contains no decimal point, otherwise a float.
 * Mirrors the Python casting() function's behavior.
 *
 * @param num - The numeric string to convert (should be validated with isNumber first)
 * @returns The numeric value as a number
 */
export function castToNumber(num: string): number {
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}

/**
 * Standard error message for invalid numeric input.
 * Matches the Python implementation's error message exactly.
 */
export const INVALID_NUMBER_MESSAGE =
  "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456";
