/**
 * Validation module for calculator inputs
 * Mirrors the Python is_number() and casting() functions
 */

export type NumericString = string;
export type ValidationResult = { valid: boolean; error?: string };

/**
 * Check whether the input string is a valid number
 * Ported from Python's is_number() function
 *
 * Accepts: integers, floats, decimals without leading zero (e.g., .123),
 * negative numbers, positive signs
 */
export function isNumber(s: string): boolean {
  if (s === '') {
    return false;
  }

  // Check if it's a simple decimal number like "123.456"
  // Replace only the first occurrence of '.'
  const withoutFirstDot = s.indexOf('.') >= 0
    ? s.slice(0, s.indexOf('.')) + s.slice(s.indexOf('.') + 1)
    : s;
  if (/^\d+$/.test(withoutFirstDot)) {
    return true;
  }

  // Check if it's a simple integer
  if (/^\d+$/.test(s)) {
    return true;
  }

  // Check for numbers starting with special characters: -, +, ., 0, or space
  if (s[0] && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Handle cases like ".123" or "+.123" or "-.123"
    if (s[1] === '.') {
      if (s.length > 2 && /^\d+$/.test(s.slice(2))) {
        return true;
      }
    }

    // Handle cases like "0.123" or "+0.123" or "-0.123"
    if (s[1] === '0' && s[2] === '.') {
      if (s.length > 3 && /^\d+$/.test(s.slice(3))) {
        return true;
      }
    }

    // Handle simple signed numbers like "+123" or "-123" or " 123"
    if (s.length > 1 && /^\d+$/.test(s.slice(1))) {
      return true;
    }
  }

  return false;
}

/**
 * Cast a validated numeric string to a number
 * Ported from Python's casting() function
 *
 * Returns a number (TypeScript's number type is always float64)
 */
export function castToNumber(num: string): number {
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}

/**
 * Validate input and return a validation result
 */
export function validateInput(input: string): ValidationResult {
  if (isNumber(input)) {
    return { valid: true };
  }
  return {
    valid: false,
    error: "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
  };
}
