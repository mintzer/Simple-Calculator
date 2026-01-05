/**
 * UI module for DOM manipulation and display logic.
 *
 * This module provides functions to interact with the calculator UI elements:
 * reading inputs, displaying results, and showing error messages.
 */

/**
 * Color scheme for operation display.
 */
export interface ColorScheme {
  labelColor: string;
  backgroundColor: string;
}

/**
 * Color schemes for each operation (matching the original Python calculator).
 */
export const COLOR_SCHEMES = {
  addition: {
    labelColor: 'red',
    backgroundColor: '#9ed8ee'
  },
  subtraction: {
    labelColor: 'green',
    backgroundColor: '#ece7e2'
  },
  multiplication: {
    labelColor: 'blue',
    backgroundColor: '#cacba9'
  },
  division: {
    labelColor: 'yellow',
    backgroundColor: '#8dad96'
  }
} as const;

/**
 * Gets the values from the two input fields.
 *
 * @returns An object with the two input values, or null if inputs don't exist
 */
export function getInputValues(): { num1: string; num2: string } | null {
  const input1 = document.getElementById('num1') as HTMLInputElement;
  const input2 = document.getElementById('num2') as HTMLInputElement;

  if (!input1 || !input2) {
    return null;
  }

  return {
    num1: input1.value,
    num2: input2.value
  };
}

/**
 * Displays the result of a calculation with the specified operation label and color scheme.
 *
 * @param operation - The operation label to display (e.g., "Summation", "Subtraction")
 * @param result - The numeric result to display
 * @param colorScheme - The color scheme to apply (label color and background color)
 */
export function displayResult(
  operation: string,
  result: number,
  colorScheme: ColorScheme
): void {
  const operationLabel = document.getElementById('operation-label');
  const resultDisplay = document.getElementById('result-display');

  if (!operationLabel || !resultDisplay) {
    console.error('Result display elements not found');
    return;
  }

  // Format the result: if it's a whole number, display without decimals
  const formattedResult = Number.isInteger(result) ? result.toString() : result.toString();

  // Update operation label
  operationLabel.textContent = operation;
  operationLabel.style.color = colorScheme.labelColor;
  operationLabel.style.backgroundColor = colorScheme.backgroundColor;

  // Update result display
  resultDisplay.textContent = formattedResult;
}

/**
 * Shows an error message to the user.
 *
 * Uses the browser's native alert dialog to match the blocking behavior
 * of the original Tkinter messagebox.showerror().
 *
 * @param message - The error message to display
 */
export function showError(message: string): void {
  // Using window.alert() to match the original Tkinter blocking dialog behavior
  alert(message);
}

/**
 * Shows the author information dialog.
 *
 * Uses the browser's native alert dialog to match the blocking behavior
 * of the original Tkinter messagebox.showinfo().
 *
 * Displays the author information exactly as in the original Python application.
 */
export function showAuthorInfo(): void {
  // Author information from the original Python application (line 16)
  const authorInfo = 'Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh';
  alert(authorInfo);
}
