import { useState } from 'react';
import { add } from '../../core/operations';
import '../styles/Calculator.css';

/**
 * Main Calculator component that provides a UI for basic arithmetic operations.
 *
 * This component replicates the Python Tkinter calculator UI with:
 * - Two input fields for number entry
 * - Operation buttons (currently only addition)
 * - Result display area with operation-specific styling
 * - Error display mechanism for validation failures
 */
export function Calculator() {
  // State for input values
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // State for result display
  const [operationName, setOperationName] = useState('');
  const [resultValue, setResultValue] = useState('');

  // State for error message
  const [error, setError] = useState<string | null>(null);

  // State for active operation (to apply correct styling)
  const [activeOperation, setActiveOperation] = useState<
    'addition' | 'subtraction' | 'multiplication' | 'division' | null
  >(null);

  /**
   * Handles the addition operation.
   * Validates inputs, performs calculation, and updates display.
   */
  const handleAddition = () => {
    // Clear any previous error
    setError(null);

    // Perform addition using core operation function
    const result = add(input1, input2);

    if ('error' in result && result.error) {
      // Show error in a more user-friendly way (inline instead of modal)
      setError(result.error);
      setOperationName('');
      setResultValue('');
      setActiveOperation(null);
    } else if ('result' in result) {
      // Clear error and show result
      setError(null);
      setOperationName('Summation');
      setResultValue(String(result.result));
      setActiveOperation('addition');
    }
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">Python Calculator</h1>

      <div className="calculator-body">
        {/* Input fields */}
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

        {/* Result display area */}
        {operationName && (
          <div className={`result-area result-${activeOperation}`}>
            <div className="operation-name">{operationName}</div>
            <div className="result-value">{resultValue}</div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="error-display">
            <strong>Error:</strong>
            <pre>{error}</pre>
          </div>
        )}

        {/* Operation buttons */}
        <div className="button-container">
          <button className="operation-button" onClick={handleAddition}>
            +
          </button>
          {/* Additional operation buttons will be added in Milestone 2 */}
        </div>
      </div>
    </div>
  );
}
