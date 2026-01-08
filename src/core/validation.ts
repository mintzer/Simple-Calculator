/**
 * Validation module for calculator input.
 *
 * This module provides functions to validate numeric string inputs and convert
 * them to JavaScript numbers, preserving the exact validation behavior of the
 * Python implementation.
 *
 * Accepted formats: 123, 0.123, .123, -0.123, 123.456, +123, etc.
 */

/**
 * Checks whether the input string is a valid number format.
 *
 * This function mirrors the Python `is_number()` implementation, accepting:
 * - Simple integers and floats with decimal points
 * - Numbers with leading signs (-, +)
 * - Numbers with leading decimal points (.123)
 * - Numbers with leading zeros before decimal points (0.123, -0.123)
 * - Edge cases with space characters
 *
 * @param s - The string to validate
 * @returns true if the string represents a valid number, false otherwise
 *
 * @example
 * ```ts
 * isNumber("123")      // true
 * isNumber("-456")     // true
 * isNumber("0.123")    // true
 * isNumber(".123")     // true
 * isNumber("-0.123")   // true
 * isNumber("abc")      // false
 * isNumber("")         // false
 * ```
 */
export function isNumber(s: string): boolean {
  // Empty string is not a number
  if (s === '') {
    return false;
  }

  // Helper function to check if a string contains only digits
  const isDigits = (str: string): boolean => {
    return str.length > 0 && /^\d+$/.test(str);
  };

  // Check if string is all digits (handles simple integers)
  if (isDigits(s)) {
    return true;
  }

  // Check if string with one decimal point removed is all digits (handles floats like "12.34")
  // This mimics Python's s.replace('.', '', 1).isdigit()
  const firstDotIndex = s.indexOf('.');
  if (firstDotIndex !== -1) {
    const withoutFirstDot = s.substring(0, firstDotIndex) + s.substring(firstDotIndex + 1);
    if (isDigits(withoutFirstDot)) {
      return true;
    }
  }

  // Check strings starting with special characters: -, +, ., 0, or space
  if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Pattern: [sign/space/dot/zero][digit]*
    // Examples: -123, +456, .789, 0.123, " 123"

    // Check for pattern [sign/space/dot/zero].[digits]
    // Examples: -.123, +.456, 0.789
    if (s[1] === '.') {
      if (s.length >= 3 && isDigits(s.substring(2))) {
        return true;
      }
    }

    // Check for pattern [sign/space/dot/zero]0.[digits]
    // Examples: -0.123, +0.456, 00.789
    if (s.length >= 4 && s[1] === '0' && s[2] === '.') {
      if (isDigits(s.substring(3))) {
        return true;
      }
    }

    // Check for pattern [sign/space/dot/zero][digits]
    // Examples: -123, +456, 0789, " 123"
    // NOTE: The Python code only checks if s[1:].isdigit(), meaning the entire
    // remainder must be digits. It does NOT handle decimal points in the remainder.
    if (isDigits(s.substring(1))) {
      return true;
    }
  }

  return false;
}

/**
 * Converts a validated numeric string to a JavaScript number.
 *
 * This function mirrors the Python `casting()` implementation, returning:
 * - An integer if the string contains no decimal point
 * - A float if the string contains a decimal point
 *
 * Note: JavaScript doesn't distinguish between int and float types at runtime,
 * but this function preserves the semantics by using parseInt vs parseFloat.
 *
 * @param num - The numeric string to convert (should be validated with isNumber first)
 * @returns The numeric value as a number
 *
 * @example
 * ```ts
 * castToNumber("123")    // 123
 * castToNumber("-456")   // -456
 * castToNumber("0.123")  // 0.123
 * castToNumber(".123")   // 0.123
 * ```
 */
export function castToNumber(num: string): number {
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}
