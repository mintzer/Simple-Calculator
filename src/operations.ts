/**
 * Pure arithmetic operation functions.
 *
 * These functions perform the core calculator operations without any DOM dependencies,
 * making them easily testable and reusable.
 */

/**
 * Adds two numbers and returns the sum.
 *
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
