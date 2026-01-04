/**
 * Converts a validated numeric string to a JavaScript number.
 *
 * This function replicates the behavior of the Python `casting()` function.
 * It returns a JavaScript number (which is always a 64-bit float).
 *
 * The caller must ensure the input is a valid numeric string by first
 * validating it with isNumber().
 *
 * @param num - A valid numeric string (e.g., "123", "123.456", ".123", "-0.123")
 * @returns The numeric value as a JavaScript number
 */
export function castNumber(num: string): number {
  // JavaScript's Number() or parseFloat() handle both integers and floats
  // The Python code checks for '.' to decide between int() and float()
  // Since JavaScript only has the 'number' type (64-bit float), we can simply parse
  return Number(num);
}
