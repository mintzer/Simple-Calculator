/**
 * Validation and Type Conversion Module
 *
 * Replicates the validation logic from the Python source's is_number() and casting() functions.
 *
 * Design Decision #1: Input Validation Strategy
 * Approach: Direct port of Python logic using string manipulation methods
 * Rationale: This approach provides the clearest 1:1 correspondence with the Python source code,
 * making it easier to verify behavioral parity. The Python implementation uses string methods
 * like isdigit(), replace(), and character indexing - all of which have direct TypeScript equivalents.
 * Regular expressions would be more concise but harder to trace back to the original logic.
 */

/**
 * Checks whether the input string represents a valid number.
 *
 * Accepts:
 * - Plain integers: "123", "456"
 * - Floats with decimal points: "123.456", "0.123"
 * - Decimals without leading zero: ".123", ".456"
 * - Numbers with explicit +/- signs: "+123", "-456", "+.123", "-0.123"
 * - Numbers with leading space: " 123"
 *
 * Rejects:
 * - Empty strings: ""
 * - Non-numeric strings: "abc", "12a"
 * - Multiple decimals: "12.34.56"
 * - Only special characters: ".", "+", "-", " "
 *
 * @param s - The string to validate
 * @returns true if the string represents a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Helper function equivalent to Python's str.isdigit()
  const isDigit = (str: string): boolean => {
    if (str.length === 0) return false;
    return /^\d+$/.test(str);
  };

  // Check for empty string
  if (s === '') {
    return false;
  }

  // Check if removing one '.' makes it all digits (handles floats like "123.456")
  // This handles cases like "123.456" -> "123456" which is all digits
  // Note: JavaScript's replace() with string argument replaces only the FIRST occurrence
  // This matches Python's s.replace('.', '', 1) behavior
  // Strings with multiple decimals like "12.34.56" become "1234.56" (still has '.') and fail isDigit check
  const withoutFirstDot = s.replace('.', '');
  if (withoutFirstDot.length > 0 && isDigit(withoutFirstDot)) {
    return true;
  }

  // Check if plain digits (handles integers like "123")
  if (isDigit(s)) {
    return true;
  }

  // Check for special first characters: '-', '+', '.', '0', ' '
  if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Case: second character is '.' (e.g., "-.123", "+.456")
    if (s[1] === '.') {
      // Check if rest (from index 2 onwards) are all digits
      if (s.length >= 3 && isDigit(s.slice(2))) {
        return true;
      }
    }

    // Case: "X0.YYY" where X is a sign or space (e.g., "-0.123", "+0.456")
    if (s.length >= 4 && s[1] === '0' && s[2] === '.') {
      // Check if rest (from index 3 onwards) are all digits
      if (isDigit(s.slice(3))) {
        return true;
      }
    }

    // Case: rest of string (from index 1) are all digits
    // Handles: "-123", "+456", " 123", ".123", "0123"
    if (isDigit(s.slice(1))) {
      return true;
    }
  }

  return false;
}

/**
 * Converts a validated numeric string to a JavaScript number.
 *
 * The function checks if the input contains a decimal point and returns
 * the appropriate numeric value. Note that JavaScript's number type doesn't
 * distinguish between int and float at the type level (all numbers are IEEE 754
 * floating-point), but the mathematical value is preserved.
 *
 * @param num - The numeric string to convert (should be validated with isNumber first)
 * @returns The numeric value as a number
 */
export function castToNumber(num: string): number {
  // If the string contains a decimal point, parse as float
  // Otherwise parse as integer
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}
