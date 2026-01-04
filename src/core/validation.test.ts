import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber, validateInput } from './validation';

describe('validation module', () => {
  describe('isNumber', () => {
    it('should accept valid integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('456789')).toBe(true);
    });

    it('should accept valid floats', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
    });

    it('should accept decimals without leading zero', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('.456')).toBe(true);
    });

    it('should accept signed numbers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
    });

    it('should accept numbers with leading space', () => {
      expect(isNumber(' 123')).toBe(true);
    });

    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a3')).toBe(false);
    });
  });

  describe('castToNumber', () => {
    it('should convert integers', () => {
      expect(castToNumber('123')).toBe(123);
      expect(castToNumber('0')).toBe(0);
    });

    it('should convert floats', () => {
      expect(castToNumber('123.456')).toBe(123.456);
      expect(castToNumber('0.123')).toBe(0.123);
      expect(castToNumber('.123')).toBe(0.123);
    });

    it('should convert signed numbers', () => {
      expect(castToNumber('-123')).toBe(-123);
      expect(castToNumber('-0.123')).toBe(-0.123);
      expect(castToNumber('+123')).toBe(123);
    });
  });

  describe('validateInput', () => {
    it('should return valid for valid numbers', () => {
      const result = validateInput('123');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error for invalid input', () => {
      const result = validateInput('abc');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Enter a Valid number');
    });
  });
});
