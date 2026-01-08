import { describe, it, expect } from 'vitest';
import { add, INVALID_NUMBER_ERROR } from './operations';

describe('add', () => {
  describe('valid inputs', () => {
    it('should add two positive integers', () => {
      const result = add('5', '3');
      expect(result).toEqual({ result: 8 });
    });

    it('should add two decimal numbers', () => {
      const result = add('0.1', '0.2');
      expect(result).toEqual({ result: expect.closeTo(0.3, 10) });
    });

    it('should add negative and positive numbers', () => {
      const result = add('-5', '3');
      expect(result).toEqual({ result: -2 });
    });

    it('should add two negative numbers', () => {
      const result = add('-5', '-3');
      expect(result).toEqual({ result: -8 });
    });

    it('should add numbers with leading plus sign', () => {
      const result = add('+5', '+3');
      expect(result).toEqual({ result: 8 });
    });

    it('should add decimal numbers starting with dot', () => {
      const result = add('.5', '.3');
      expect(result).toEqual({ result: expect.closeTo(0.8, 10) });
    });

    it('should add numbers with different formats', () => {
      const result = add('123.456', '-0.456');
      expect(result).toEqual({ result: 123 });
    });

    it('should handle zero correctly', () => {
      const result = add('0', '0');
      expect(result).toEqual({ result: 0 });
    });

    it('should add integer and decimal', () => {
      const result = add('5', '3.5');
      expect(result).toEqual({ result: 8.5 });
    });
  });

  describe('invalid inputs', () => {
    it('should return error for non-numeric first argument', () => {
      const result = add('abc', '5');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for non-numeric second argument', () => {
      const result = add('5', 'xyz');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for both non-numeric arguments', () => {
      const result = add('abc', 'xyz');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for empty string', () => {
      const result = add('', '5');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for whitespace-only string', () => {
      const result = add(' ', '5');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for both empty strings', () => {
      const result = add('', '');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for special characters', () => {
      const result = add('5$', '3');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });

    it('should return error for multiple dots', () => {
      const result = add('5.5.5', '3');
      expect(result).toEqual({ error: INVALID_NUMBER_ERROR });
    });
  });

  describe('edge cases', () => {
    it('should handle large numbers', () => {
      const result = add('999999999', '1');
      expect(result).toEqual({ result: 1000000000 });
    });

    it('should handle very small decimals', () => {
      const result = add('0.001', '0.002');
      expect(result).toEqual({ result: expect.closeTo(0.003, 10) });
    });

    it('should handle negative zero', () => {
      const result = add('-0', '5');
      expect(result).toEqual({ result: 5 });
    });
  });
});
