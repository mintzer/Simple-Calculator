/**
 * Operation configuration defining operation names and styling.
 * Maps each operation to its display name and color scheme.
 */

export interface OperationStyle {
  name: string;
  textColor: string;
  backgroundColor: string;
}

export const OPERATION_STYLES: Record<string, OperationStyle> = {
  add: {
    name: 'Summation',
    textColor: 'red',
    backgroundColor: '#9ed8ee',
  },
  subtract: {
    name: 'Subtraction',
    textColor: 'green',
    backgroundColor: '#ece7e2',
  },
  multiply: {
    name: 'Multiplication',
    textColor: 'blue',
    backgroundColor: '#cacba9',
  },
  divide: {
    name: 'Division',
    textColor: 'yellow',
    backgroundColor: '#8dad96',
  },
};
