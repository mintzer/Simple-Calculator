import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './operations';

describe('operations module', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(5, 3)).toBe(8);
      expect(add(10, 20)).toBe(30);
    });

    it('should add negative numbers', () => {
      expect(add(-5, 3)).toBe(-2);
      expect(add(-5, -3)).toBe(-8);
    });

    it('should add decimals', () => {
      expect(add(1.5, 2.5)).toBe(4);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 20)).toBe(-10);
    });

    it('should subtract negative numbers', () => {
      expect(subtract(-5, 3)).toBe(-8);
      expect(subtract(-5, -3)).toBe(-2);
    });

    it('should subtract decimals', () => {
      expect(subtract(5.5, 2.5)).toBe(3);
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(5, 3)).toBe(15);
      expect(multiply(10, 20)).toBe(200);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-5, 3)).toBe(-15);
      expect(multiply(-5, -3)).toBe(15);
    });

    it('should multiply decimals', () => {
      expect(multiply(2.5, 2)).toBe(5);
      expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(20, 4)).toBe(5);
    });

    it('should divide negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });

    it('should divide decimals', () => {
      expect(divide(5.5, 2)).toBe(2.75);
      expect(divide(0.4, 0.2)).toBeCloseTo(2);
    });

    it('should return error message for division by zero', () => {
      expect(divide(10, 0)).toBe('Cannot divide by zero');
      expect(divide(0, 0)).toBe('Cannot divide by zero');
    });
  });
});
