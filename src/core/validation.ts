/**
 * Validation and type conversion utilities for calculator inputs.
 * These functions replicate the behavior of the Python implementation.
 */

/**
 * Check whether the input string represents a valid number.
 * This function replicates the Python `is_number()` behavior exactly.
 *
 * Valid formats include:
 * - Integers: "123", "-123", "+123"
 * - Floats: "123.456", "0.123", "-0.123"
 * - Decimals: ".123", "-.123", "+.123"
 * - Special: " 123" (space prefix)
 *
 * Invalid formats:
 * - Empty string: ""
 * - Single space: " "
 * - Single dot: "."
 * - Non-numeric: "abc"
 * - Multiple dots: "12.34.56"
 *
 * @param s - The string to validate
 * @returns true if the string represents a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Empty string check
  if (s === '') {
    return false;
  }

  // Check if string with single dot removed is all digits (handles "123.456", "123")
  const withoutFirstDot = s.replace('.', '');
  if (/^\d+$/.test(withoutFirstDot)) {
    return true;
  }

  // Check if string is all digits (handles "123")
  if (/^\d+$/.test(s)) {
    return true;
  }

  // Check strings starting with special characters: '-', '+', '.', '0', ' '
  if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Check if second character is '.' (handles "-.123", "+.123", "0.123")
    if (s[1] === '.') {
      if (s.length >= 3) {
        const afterDot = s.substring(2);
        if (/^\d+$/.test(afterDot)) {
          return true;
        }
      }
    }

    // Check if pattern is like "+0.123" or "-0.123"
    if (s.length >= 4 && s[1] === '0' && s[2] === '.') {
      const afterDot = s.substring(3);
      if (/^\d+$/.test(afterDot)) {
        return true;
      }
    }

    // Check if rest (from index 1) is all digits (handles "+123", "-123", " 123")
    const rest = s.substring(1);
    if (/^\d+$/.test(rest)) {
      return true;
    }
  }

  return false;
}

/**
 * Convert a validated numeric string to a JavaScript number.
 * This function replicates the Python `casting()` behavior.
 *
 * In Python, the function returns int() or float() based on the presence
 * of a decimal point. In JavaScript, all numbers are double-precision floats,
 * but we preserve the behavior by always using parseFloat for consistency.
 *
 * Note: This function assumes the input has already been validated by isNumber().
 * Calling this with invalid input may produce NaN or unexpected results.
 *
 * @param num - The validated numeric string to convert
 * @returns The numeric value as a JavaScript number
 */
export function castToNumber(num: string): number {
  // The Python implementation checks for '.' in the string and returns
  // float(num) if present, otherwise int(num).
  // In JavaScript, we can just use parseFloat which handles both cases.
  // Note: parseFloat handles leading spaces, signs, and decimal points naturally.
  return parseFloat(num);
}
