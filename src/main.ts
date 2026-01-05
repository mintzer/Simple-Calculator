/**
 * Main entry point for the calculator application.
 *
 * This file initializes the calculator UI and wires up event handlers for
 * arithmetic operations.
 */

import { isNumber } from './validation';
import { castNumber } from './casting';
import { add } from './operations';
import { getInputValues, displayResult, showError, COLOR_SCHEMES } from './ui';

/**
 * Handles the addition operation when the + button is clicked.
 */
function handleAddition(): void {
  // Get input values from the DOM
  const inputs = getInputValues();
  if (!inputs) {
    showError('Input fields not found');
    return;
  }

  const { num1, num2 } = inputs;

  // Validate both inputs
  // Note: The Python code checks for ' ' (space) as an invalid input
  if (isNumber(num1) && isNumber(num2) && num1 !== ' ' && num2 !== ' ') {
    // Cast strings to numbers
    const a = castNumber(num1);
    const b = castNumber(num2);

    // Perform addition
    const result = add(a, b);

    // Display result with "Summation" label and red/blue color scheme
    displayResult('Summation', result, COLOR_SCHEMES.addition);
  } else {
    // Show error message matching the original Python application
    showError('Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456');
  }
}

/**
 * Initializes the application after the DOM is loaded.
 */
function initializeApp(): void {
  console.log('Calculator initialized');

  // Wire up the + button click handler
  const plusButton = document.getElementById('plus-btn');
  if (plusButton) {
    plusButton.addEventListener('click', handleAddition);
  } else {
    console.error('Plus button not found');
  }

  // TODO: Wire up other operation buttons in future tasks
  // - Subtraction (minus-btn)
  // - Multiplication (multiply-btn)
  // - Division (divide-btn)
  // - Author button (author-btn)
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already loaded
  initializeApp();
}
