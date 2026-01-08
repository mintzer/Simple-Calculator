import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './operations';

describe('add', () => {
  it('should add two positive integers', () => {
    expect(add(5, 3)).toBe(8);
  });

  it('should add two positive decimals', () => {
    expect(add(1.5, 2.5)).toBe(4);
  });

  it('should add a positive and negative number', () => {
    expect(add(10, -3)).toBe(7);
  });

  it('should add two negative numbers', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  it('should add zero to a number', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });

  it('should handle floating point precision', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it('should add large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });
});

describe('subtract', () => {
  it('should subtract two positive integers', () => {
    expect(subtract(10, 3)).toBe(7);
  });

  it('should subtract two positive decimals', () => {
    expect(subtract(5.5, 2.5)).toBe(3);
  });

  it('should subtract a larger number from a smaller number', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  it('should subtract negative numbers', () => {
    expect(subtract(5, -3)).toBe(8);
    expect(subtract(-5, -3)).toBe(-2);
  });

  it('should subtract zero from a number', () => {
    expect(subtract(5, 0)).toBe(5);
  });

  it('should result in zero when subtracting a number from itself', () => {
    expect(subtract(5, 5)).toBe(0);
  });

  it('should handle floating point precision', () => {
    expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
  });
});

describe('multiply', () => {
  it('should multiply two positive integers', () => {
    expect(multiply(5, 3)).toBe(15);
  });

  it('should multiply two positive decimals', () => {
    expect(multiply(2.5, 4)).toBe(10);
  });

  it('should multiply positive and negative numbers', () => {
    expect(multiply(5, -3)).toBe(-15);
  });

  it('should multiply two negative numbers', () => {
    expect(multiply(-5, -3)).toBe(15);
  });

  it('should multiply by zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
    expect(multiply(0, 0)).toBe(0);
  });

  it('should multiply by one', () => {
    expect(multiply(5, 1)).toBe(5);
    expect(multiply(1, 5)).toBe(5);
  });

  it('should handle floating point precision', () => {
    expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
  });

  it('should multiply large numbers', () => {
    expect(multiply(1000, 1000)).toBe(1000000);
  });
});

describe('divide', () => {
  it('should divide two positive integers', () => {
    const result = divide(10, 2);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(5);
    }
  });

  it('should divide two positive decimals', () => {
    const result = divide(10.5, 3);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(3.5);
    }
  });

  it('should divide negative numbers', () => {
    const result1 = divide(-10, 2);
    expect(result1.success).toBe(true);
    if (result1.success) {
      expect(result1.value).toBe(-5);
    }

    const result2 = divide(10, -2);
    expect(result2.success).toBe(true);
    if (result2.success) {
      expect(result2.value).toBe(-5);
    }

    const result3 = divide(-10, -2);
    expect(result3.success).toBe(true);
    if (result3.success) {
      expect(result3.value).toBe(5);
    }
  });

  it('should divide zero by a number', () => {
    const result = divide(0, 5);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(0);
    }
  });

  it('should return an error object when dividing by zero', () => {
    const result = divide(10, 0);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Cannot divide by zero");
    }
  });

  it('should return an error object when dividing zero by zero', () => {
    const result = divide(0, 0);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Cannot divide by zero");
    }
  });

  it('should handle floating point division', () => {
    const result = divide(1, 3);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeCloseTo(0.333333);
    }
  });

  it('should divide by one', () => {
    const result = divide(5, 1);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(5);
    }
  });

  it('should handle division with large numbers', () => {
    const result = divide(1000000, 1000);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(1000);
    }
  });
});
