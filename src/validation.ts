/**
 * Validates whether a string represents a valid numeric input.
 *
 * This function replicates the behavior of the Python `is_number()` function,
 * supporting integers, decimals, and signed numbers.
 *
 * Valid formats:
 * - Integers: 123, -456, +789
 * - Decimals: 123.456, 0.123, .123
 * - Signed decimals: -0.123, +123.45
 *
 * @param s - The string to validate
 * @returns true if the string is a valid number, false otherwise
 */
export function isNumber(s: string): boolean {
  // Empty string is not a valid number
  if (s === '') {
    return false;
  }

  // Check if string with first decimal point removed contains only digits
  // This mimics Python's s.replace('.', '', 1).isdigit()
  const withoutFirstDot = s.replace('.', '');
  if (withoutFirstDot !== '' && /^\d+$/.test(withoutFirstDot)) {
    return true;
  }

  // Check if string is all digits
  if (/^\d+$/.test(s)) {
    return true;
  }

  // Check special cases starting with -, +, ., 0, or space
  if (s.length >= 2 && ['-', '+', '.', '0', ' '].includes(s[0])) {
    // Case: second char is '.' and rest are digits (e.g., "-.123", "+.456")
    if (s[1] === '.' && s.length > 2 && /^\d+$/.test(s.slice(2))) {
      return true;
    }

    // Case: second char is '0', third is '.', and rest are digits (e.g., "-0.123")
    if (s.length >= 4 && s[1] === '0' && s[2] === '.' && /^\d+$/.test(s.slice(3))) {
      return true;
    }

    // Case: rest of string (from index 1) contains digits and at most one decimal point
    // This handles cases like "-123.456" by checking if s[1:] would pass the first check
    const remainder = s.slice(1);
    const remainderWithoutDot = remainder.replace('.', '');
    if (remainderWithoutDot !== '' && /^\d+$/.test(remainderWithoutDot)) {
      return true;
    }
  }

  return false;
}
