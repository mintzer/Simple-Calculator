/**
 * Operations Module
 *
 * Pure arithmetic operation functions for the calculator.
 * Each function takes numeric inputs and returns the computed result.
 *
 * Design Decision: Keep operations pure (no validation or error handling)
 * - Validation is handled by the UI layer using the validation module
 * - Operations assume they receive valid numeric inputs
 * - This separation of concerns makes operations simple to test and reason about
 */

/**
 * Adds two numbers and returns their sum.
 *
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
