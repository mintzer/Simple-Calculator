/**
 * Pure arithmetic operation functions for the calculator.
 * These functions perform basic arithmetic operations on two numbers.
 *
 * All operations expect validated numeric inputs. The division operation
 * includes explicit division-by-zero handling as per the migration requirements.
 */

/**
 * Result type for division operations that may fail.
 * Uses a discriminated union to allow type-safe error handling in the UI layer.
 */
export type DivisionResult =
  | { success: true; value: number }
  | { success: false; error: string };

/**
 * Adds two numbers together.
 *
 * @param num1 - The first number
 * @param num2 - The second number
 * @returns The sum of num1 and num2
 */
export function add(num1: number, num2: number): number {
  return num1 + num2;
}

/**
 * Subtracts the second number from the first.
 *
 * @param num1 - The number to subtract from
 * @param num2 - The number to subtract
 * @returns The difference of num1 minus num2
 */
export function subtract(num1: number, num2: number): number {
  return num1 - num2;
}

/**
 * Multiplies two numbers together.
 *
 * @param num1 - The first number
 * @param num2 - The second number
 * @returns The product of num1 and num2
 */
export function multiply(num1: number, num2: number): number {
  return num1 * num2;
}

/**
 * Divides the first number by the second.
 * Implements explicit division-by-zero checking as per migration requirements.
 *
 * @param num1 - The dividend
 * @param num2 - The divisor
 * @returns A DivisionResult indicating success with the quotient or failure with an error message
 */
export function divide(num1: number, num2: number): DivisionResult {
  if (num2 === 0) {
    return { success: false, error: "Cannot divide by zero" };
  }
  return { success: true, value: num1 / num2 };
}
