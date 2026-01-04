/**
 * Main Calculator component.
 * Provides a UI for performing arithmetic operations with validation.
 * Migrated from Python Tkinter GUI to React.
 */

import React, { useState } from 'react';
import { isNumber, castToNumber, VALIDATION_ERROR_MESSAGE } from '../../core/validation';
import { add } from '../../core/operations';
import { OPERATION_STYLES } from '../../core/operationConfig';
import '../styles/Calculator.css';

export function Calculator() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  const [operationName, setOperationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [operationStyle, setOperationStyle] = useState<{ textColor: string; backgroundColor: string } | null>(null);

  /**
   * Handles the addition operation.
   * Validates inputs, performs calculation, and displays result.
   */
  const handleAddition = () => {
    // Clear previous result and error
    setResult('');
    setOperationName('');
    setErrorMessage('');
    setOperationStyle(null);

    const num1Str = input1.trim();
    const num2Str = input2.trim();

    // Validate both inputs
    // Note: Python checks for ' ' (single space) explicitly, but trim() handles all whitespace
    if (isNumber(num1Str) && isNumber(num2Str) && num1Str !== '' && num2Str !== '') {
      // Cast to numbers
      const num1 = castToNumber(num1Str);
      const num2 = castToNumber(num2Str);

      // Perform addition
      const sum = add(num1, num2);

      // Display result with operation-specific styling
      const style = OPERATION_STYLES.add;
      setOperationName(style.name);
      setResult(String(sum));
      setOperationStyle({
        textColor: style.textColor,
        backgroundColor: style.backgroundColor,
      });
    } else {
      // Show validation error
      setErrorMessage(VALIDATION_ERROR_MESSAGE);
    }
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">Python Calculator</h1>

      {/* Input fields */}
      <div className="input-section">
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

      {/* Result display */}
      {operationName && (
        <div
          className="result-section"
          style={{
            color: operationStyle?.textColor,
            backgroundColor: operationStyle?.backgroundColor,
          }}
        >
          <div className="operation-name">{operationName}</div>
          <div className="result-value">{result}</div>
        </div>
      )}

      {/* Error message display */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {/* Operation buttons */}
      <div className="button-section">
        <button className="operation-button" onClick={handleAddition}>
          +
        </button>
        <button className="operation-button" disabled>
          -
        </button>
        <button className="operation-button" disabled>
          *
        </button>
        <button className="operation-button" disabled>
          /
        </button>
      </div>

      {/* Author button */}
      <div className="author-section">
        <button
          className="author-button"
          onClick={() => {
            alert('Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh');
          }}
        >
          Author
        </button>
      </div>
    </div>
  );
}
