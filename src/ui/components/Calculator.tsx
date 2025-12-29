import { useState } from 'react';
import { isNumber, castToNumber } from '../../core/validation';
import { add } from '../../core/operations';
import '../styles/operations.css';

/**
 * Calculator Component
 *
 * Main calculator UI component that provides:
 * - Two input fields for numbers
 * - Addition button (+ operation)
 * - Result display area with operation name and result
 * - Error handling for invalid inputs
 *
 * Design Decisions:
 *
 * Design Decision #2 (Error Display Mechanism): Browser alert()
 * Chosen approach: Use browser-native alert() modal dialogs
 * Rationale: This most closely matches the original Python Tkinter messagebox.showerror()
 * behavior, which shows modal blocking dialogs. While inline error messages would be
 * more modern, using alert() preserves the exact UX of the source application.
 *
 * Design Decision #3 (Number Type Handling and Display):
 * Chosen approach: Display results as-is from JavaScript number type
 * Rationale: JavaScript automatically handles formatting - integer results display
 * without decimals (e.g., "8"), while float results display with decimals (e.g., "8.7").
 * The Python source converts results to strings with str(), which produces the same
 * behavior. No additional formatting logic is needed.
 *
 * Design Decision #4 (Project Structure and Module Organization):
 * Chosen approach: Domain-based separation with ui/components and ui/styles directories
 * Rationale: Separates UI concerns (components, styles) from core business logic
 * (validation, operations). This structure scales well for the remaining operations
 * in Milestone 2. CSS is kept in a separate styles directory for easy management
 * of operation-specific color schemes.
 */

interface ResultState {
  label: string;
  value: string;
  colorClass: string;
}

export default function Calculator() {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<ResultState | null>(null);

  const ERROR_MESSAGE = 'Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456';

  /**
   * Handles the addition operation when + button is clicked.
   * Validates inputs, performs addition, and updates the result display.
   */
  const handleAddition = () => {
    // Validate both inputs
    if (!isNumber(input1) || !isNumber(input2) || input1.trim() === '' || input2.trim() === '') {
      alert(ERROR_MESSAGE);
      return;
    }

    // Convert to numbers
    const num1 = castToNumber(input1);
    const num2 = castToNumber(input2);

    // Perform addition
    const sum = add(num1, num2);

    // Update result display with operation label and result
    setResult({
      label: 'Summation',
      value: String(sum),
      colorClass: 'addition'
    });
  };

  return (
    <div className="calculator">
      <h1 className="calculator-title">Python Calculator</h1>

      <div className="calculator-inputs">
        <input
          type="text"
          className="calculator-input"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="text"
          className="calculator-input"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter second number"
        />
      </div>

      {result && (
        <div className="calculator-result">
          <div className={`result-label ${result.colorClass}`}>
            {result.label}
          </div>
          <div className={`result-value ${result.colorClass}`}>
            {result.value}
          </div>
        </div>
      )}

      <div className="calculator-buttons">
        <button className="operation-button" onClick={handleAddition}>
          +
        </button>
      </div>
    </div>
  );
}
