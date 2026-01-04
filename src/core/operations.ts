/**
 * Calculator operations module
 * Pure functions for arithmetic operations
 */

/**
 * Add two numbers
 * Ported from Python's actionPlus() function
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtract two numbers
 * Ported from Python's actionMinus() function
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiply two numbers
 * Ported from Python's actionMul() function
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divide two numbers
 * Ported from Python's actionDiv() function
 */
export function divide(a: number, b: number): number | string {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}
