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
      expect(isNumber('.5')).toBe(true);
    });

    it('accepts signed positive numbers', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+456')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
    });

    it('accepts signed negative numbers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('-.123')).toBe(true);
    });

    it('accepts zero variants', () => {
      expect(isNumber('0')).toBe(true);
      expect(isNumber('.0')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('-0')).toBe(true);
      expect(isNumber('-.0')).toBe(true);
    });

    it('accepts very long numbers', () => {
      expect(isNumber('123456789012345678901234567890')).toBe(true);
      expect(isNumber('999999999999999999999999999999.123456789')).toBe(true);
    });

    // Python behavior: s[0] in ['-', '+', '.', '0', ' '] allows leading space,
    // but then s[1:] must be all digits. This matches Python's is_number() function.
    it('accepts space followed by digits (Python behavior)', () => {
      expect(isNumber(' 123')).toBe(true);
      expect(isNumber(' 0')).toBe(true);
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

    // Single space should be rejected because after checking s[0] == ' ',
    // the Python code requires s[1] to exist and be valid
    it('rejects single space character', () => {
      expect(isNumber(' ')).toBe(false);
    });

    it('rejects strings with spaces in the middle', () => {
      expect(isNumber('12 34')).toBe(false);
      expect(isNumber('12. 34')).toBe(false);
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
    expect(castToNumber('+456')).toBe(456);
  });
});

describe('VALIDATION_ERROR_MESSAGE', () => {
  it('exports the correct error message', () => {
    expect(VALIDATION_ERROR_MESSAGE).toBe(
      'Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456'
    );
  });
});
