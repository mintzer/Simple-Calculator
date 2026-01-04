/**
 * Unit tests for validation module
 */

import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber, VALIDATION_ERROR_MESSAGE } from './validation';

describe('isNumber', () => {
  describe('should accept valid numbers', () => {
    it('accepts plain integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('999')).toBe(true);
    });

    it('accepts floats', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
    });

    it('accepts decimals without leading zero', () => {
      expect(isNumber('.123')).toBe(true);
    });

    it('accepts signed positive numbers', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
    });

    it('accepts signed negative numbers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('-.123')).toBe(true);
    });
  });

  describe('should reject invalid inputs', () => {
    it('rejects empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('rejects non-numeric strings', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a')).toBe(false);
    });

    it('rejects multiple decimal points', () => {
      expect(isNumber('12.34.56')).toBe(false);
    });

    it('rejects double signs', () => {
      expect(isNumber('--123')).toBe(false);
      expect(isNumber('++123')).toBe(false);
    });

    it('rejects single special characters', () => {
      expect(isNumber('.')).toBe(false);
      expect(isNumber('-')).toBe(false);
      expect(isNumber('+')).toBe(false);
    });

    it('rejects single space character', () => {
      expect(isNumber(' ')).toBe(false);
    });

    it('accepts space followed by digits', () => {
      expect(isNumber(' 123')).toBe(true);
    });
  });
});

describe('castToNumber', () => {
  it('converts integer strings to numbers', () => {
    expect(castToNumber('123')).toBe(123);
    expect(castToNumber('0')).toBe(0);
    expect(castToNumber('-123')).toBe(-123);
    expect(castToNumber('+123')).toBe(123);
  });

  it('converts float strings to numbers', () => {
    expect(castToNumber('123.456')).toBe(123.456);
    expect(castToNumber('0.123')).toBe(0.123);
    expect(castToNumber('-0.123')).toBe(-0.123);
  });

  it('converts edge cases', () => {
    expect(castToNumber('.123')).toBe(0.123);
    expect(castToNumber('-.123')).toBe(-0.123);
    expect(castToNumber('+.123')).toBe(0.123);
  });
});

describe('VALIDATION_ERROR_MESSAGE', () => {
  it('exports the correct error message', () => {
    expect(VALIDATION_ERROR_MESSAGE).toBe(
      'Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456'
    );
  });
});
