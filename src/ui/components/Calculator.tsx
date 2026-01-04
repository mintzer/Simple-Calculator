import { useState } from 'react';
import { isNumber, castToNumber } from '../../core/validation';
import { add, subtract, multiply, divide } from '../../core/operations';
import { getAuthorInfo, formatAuthorInfo } from '../../core/author';
import './Calculator.css';

type OperationType = 'add' | 'subtract' | 'multiply' | 'divide' | null;

interface OperationConfig {
  label: string;
  textColor: string;
  backgroundColor: string;
}

const operationConfigs: Record<Exclude<OperationType, null>, OperationConfig> = {
  add: {
    label: 'Summation',
    textColor: 'red',
    backgroundColor: '#9ed8ee'
  },
  subtract: {
    label: 'Subtraction',
    textColor: 'green',
    backgroundColor: '#ece7e2'
  },
  multiply: {
    label: 'Multiplication',
    textColor: 'blue',
    backgroundColor: '#cacba9'
  },
  divide: {
    label: 'Division',
    textColor: 'yellow',
    backgroundColor: '#8dad96'
  }
};

export function Calculator() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState<string>('0');
  const [operation, setOperation] = useState<OperationType>(null);

  const handleOperation = (opType: Exclude<OperationType, null>) => {
    // Validate inputs
    if (!isNumber(input1) || !isNumber(input2) || input1 === ' ' || input2 === ' ') {
      alert("Error\n\nEnter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456");
      setOperation(opType);
      setResult('0');
      return;
    }

    // Cast to numbers
    const num1 = castToNumber(input1);
    const num2 = castToNumber(input2);

    // Perform operation
    let resultValue: number | string;
    switch (opType) {
      case 'add':
        resultValue = add(num1, num2);
        break;
      case 'subtract':
        resultValue = subtract(num1, num2);
        break;
      case 'multiply':
        resultValue = multiply(num1, num2);
        break;
      case 'divide':
        resultValue = divide(num1, num2);
        if (typeof resultValue === 'string') {
          alert("Error\n\n" + resultValue);
          setOperation(opType);
          setResult('0');
          return;
        }
        break;
    }

    setOperation(opType);
    setResult(String(resultValue));
  };

  const handleAuthor = () => {
    const authorInfo = getAuthorInfo();
    const formattedInfo = formatAuthorInfo(authorInfo);
    alert("Author\n\n" + formattedInfo);
  };

  const config = operation ? operationConfigs[operation] : null;

  return (
    <div className="calculator">
      <h1 className="title">Python Calculator</h1>

      <div className="inputs">
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="number-input"
          placeholder="Enter first number"
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="number-input"
          placeholder="Enter second number"
        />
      </div>

      {config && (
        <div className="result-container">
          <div
            className="operation-label"
            style={{
              color: config.textColor,
              backgroundColor: config.backgroundColor
            }}
          >
            {config.label}
          </div>
          <div
            className="result-value"
            style={{
              color: config.textColor,
              backgroundColor: config.backgroundColor
            }}
          >
            {result}
          </div>
        </div>
      )}

      <div className="operations">
        <button onClick={() => handleOperation('add')} className="op-button">
          +
        </button>
        <button onClick={() => handleOperation('subtract')} className="op-button">
          -
        </button>
        <button onClick={() => handleOperation('multiply')} className="op-button">
          *
        </button>
        <button onClick={() => handleOperation('divide')} className="op-button">
          /
        </button>
      </div>

      <div className="author-container">
        <button onClick={handleAuthor} className="author-button">
          Author
        </button>
      </div>
    </div>
  );
}
