import { isNumber, castToNumber } from './validation';

/**
 * Result type for calculator operations.
 * Either contains a successful result or an error message.
 */
export type OperationResult =
  | { result: number; error?: never }
  | { error: string; result?: never };

/**
 * Standard error message for invalid number inputs.
 * Matches the Python implementation's error message format.
 */
export const INVALID_NUMBER_ERROR =
  'Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456';

/**
 * Performs addition of two numeric strings.
 *
 * This function replicates the Python `actionPlus()` calculation logic,
 * validating inputs and returning either the sum or an error message.
 *
 * @param num1 - First number as a string
 * @param num2 - Second number as a string
 * @returns OperationResult containing either the sum or an error message
 */
export function add(num1: string, num2: string): OperationResult {
  // Validate both inputs (matching Python's validation: is_number() == True and num != ' ')
  if (
    isNumber(num1) &&
    isNumber(num2) &&
    num1.trim() !== '' &&
    num2.trim() !== ''
  ) {
    // Cast strings to numbers
    const n1 = castToNumber(num1);
    const n2 = castToNumber(num2);

    // Perform addition
    const sum = n1 + n2;

    return { result: sum };
  } else {
    // Return error if validation fails
    return { error: INVALID_NUMBER_ERROR };
  }
}
