/**
 * Validates whether a string represents a valid number.
 *
 * This function replicates the Python `is_number()` function behavior,
 * accepting various numeric formats including:
 * - Integers: "123", "-123", "+123"
 * - Decimals: "0.123", ".123", "123.456"
 * - Signed decimals: "-0.123", "+0.123", "-.123", "+.123"
 *
 * @param s - The string to validate
 * @returns true if the string is a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Empty string is not a valid number
  if (s === '') {
    return false;
  }

  // Helper function to check if a string contains only digits
  const isDigits = (str: string): boolean => {
    return str.length > 0 && /^\d+$/.test(str);
  };

  // Check if string with one '.' removed is all digits (e.g., "123.456")
  const withoutDot = s.replace('.', '');
  if (isDigits(withoutDot)) {
    return true;
  }

  // Check if string is all digits (e.g., "123")
  if (isDigits(s)) {
    return true;
  }

  // Check strings starting with special characters
  if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Check for patterns like "+.123", "-.123", "0.123"
    if (s[1] === '.' && isDigits(s.substring(2))) {
      return true;
    }

    // Check for patterns like "+0.123", "-0.123", " 0.123"
    if (s.length >= 4 && s[1] === '0' && s[2] === '.' && isDigits(s.substring(3))) {
      return true;
    }

    // Check for patterns like "+123", "-123", " 123"
    if (isDigits(s.substring(1))) {
      return true;
    }
  }

  return false;
}

/**
 * Converts a validated numeric string to a JavaScript number.
 *
 * This function replicates the Python `casting()` function behavior,
 * converting strings to numbers. In JavaScript, there's no distinction
 * between int and float types (both are `number`), but the function
 * preserves the same logic for consistency.
 *
 * @param num - The numeric string to convert (should be validated first)
 * @returns The numeric value as a number
 */
export function castToNumber(num: string): number {
  // The Python code returns float if '.' is in the string, otherwise int
  // In JavaScript, both are represented as number, but we preserve the logic
  if (num.includes('.')) {
    return parseFloat(num);
  } else {
    return parseInt(num, 10);
  }
}
