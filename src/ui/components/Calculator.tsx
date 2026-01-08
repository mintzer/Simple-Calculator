import React, { useState } from 'react';
import { isNumber, castToNumber, INVALID_NUMBER_MESSAGE } from '../../core/validation';
import { add } from '../../core/operations';
import { getAuthorInfo } from '../../core/author';
import '../styles/Calculator.css';

/**
 * Main Calculator component implementing the calculator interface.
 * Implements Design Decision #3 (React State Management) using useState hooks.
 * Implements Design Decision #4 (Color Scheme Application) using CSS classes.
 */
function Calculator() {
  // State management using React useState hooks
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [operationName, setOperationName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentOperation, setCurrentOperation] = useState<'addition' | 'subtraction' | 'multiplication' | 'division' | null>(null);

  /**
   * Handles the addition operation.
   * Validates inputs, performs addition, and displays result with operation-specific styling.
   */
  const handleAddition = () => {
    // Clear any previous errors
    setError(null);

    // Validate both inputs
    if (isNumber(num1) && isNumber(num2) && num1 !== ' ' && num2 !== ' ') {
      // Cast validated strings to numbers
      const n1 = castToNumber(num1);
      const n2 = castToNumber(num2);

      // Perform addition
      const sum = add(n1, n2);

      // Update state with result and operation name
      setResult(sum.toString());
      setOperationName('Summation');
      setCurrentOperation('addition');
    } else {
      // Display error message matching Python format
      setError(INVALID_NUMBER_MESSAGE);
      setResult('0');
      setOperationName('Summation');
      setCurrentOperation('addition');
    }
  };

  /**
   * Handles subtraction operation (stub for Milestone 2).
   */
  const handleSubtraction = () => {
    alert('Subtraction operation not yet implemented (Milestone 2)');
  };

  /**
   * Handles multiplication operation (stub for Milestone 2).
   */
  const handleMultiplication = () => {
    alert('Multiplication operation not yet implemented (Milestone 2)');
  };

  /**
   * Handles division operation (stub for Milestone 2).
   */
  const handleDivision = () => {
    alert('Division operation not yet implemented (Milestone 2)');
  };

  /**
   * Displays author information in a modal dialog.
   * Matches Python's messagebox.showinfo() behavior.
   */
  const handleAuthor = () => {
    const author = getAuthorInfo();
    alert(
      `Author\n\n${author.name}\nBatch: ${author.batch}\nDepartment: ${author.department}\n${author.institution}`
    );
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Title */}
        <h1 className="calculator-title">Python Calculator</h1>

        {/* Input fields */}
        <div className="input-container">
          <input
            type="text"
            className="number-input"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            aria-label="First number"
          />
          <input
            type="text"
            className="number-input"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            aria-label="Second number"
          />
        </div>

        {/* Result display area with operation-specific styling */}
        {(operationName || error) && (
          <div className={`result-container ${currentOperation ? `${currentOperation}-result` : ''}`}>
            <div className="operation-name">{operationName}</div>
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="result-value">{result}</div>
            )}
          </div>
        )}

        {/* Operation buttons */}
        <div className="button-container">
          <button
            className="operation-button"
            onClick={handleAddition}
            aria-label="Addition"
          >
            +
          </button>
          <button
            className="operation-button"
            onClick={handleSubtraction}
            aria-label="Subtraction"
          >
            -
          </button>
          <button
            className="operation-button"
            onClick={handleMultiplication}
            aria-label="Multiplication"
          >
            *
          </button>
          <button
            className="operation-button"
            onClick={handleDivision}
            aria-label="Division"
          >
            /
          </button>
        </div>

        {/* Author button */}
        <button
          className="author-button"
          onClick={handleAuthor}
          aria-label="Show author information"
        >
          Author
        </button>
      </div>
    </div>
  );
}

export default Calculator;
