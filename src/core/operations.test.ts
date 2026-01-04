/**
 * Unit tests for arithmetic operations.
 */

import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './operations';

describe('Operations Module', () => {
  describe('add', () => {
    it('should add two positive integers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(-1, 1)).toBe(0);
      expect(add(5, -3)).toBe(2);
    });

    it('should add decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });

    it('should handle large numbers', () => {
      expect(add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });
  });
});
