import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber } from './validation';

describe('isNumber', () => {
  describe('valid numbers', () => {
    it('should accept simple integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('456')).toBe(true);
    });

    it('should accept positive signed integers', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+0')).toBe(true);
      expect(isNumber('+456')).toBe(true);
    });

    it('should accept negative signed integers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-0')).toBe(true);
      expect(isNumber('-456')).toBe(true);
    });

    it('should accept standard decimal numbers', () => {
      expect(isNumber('0.123')).toBe(true);
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('1.5')).toBe(true);
    });

    it('should accept decimal numbers with leading dot', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('.456')).toBe(true);
      expect(isNumber('.0')).toBe(true);
    });

    it('should accept signed decimals with leading zero', () => {
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('-0.456')).toBe(true);
      expect(isNumber('+0.5')).toBe(true);
    });

    it('should accept signed decimals with leading dot', () => {
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
      expect(isNumber('-.456')).toBe(true);
      expect(isNumber('+.5')).toBe(true);
    });

    it('should accept numbers with leading space', () => {
      expect(isNumber(' 123')).toBe(true);
      expect(isNumber(' 0')).toBe(true);
    });

    it('should accept decimal numbers with leading space', () => {
      expect(isNumber(' .123')).toBe(true);
      expect(isNumber(' 0.123')).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject single space', () => {
      expect(isNumber(' ')).toBe(false);
    });

    it('should reject single dot', () => {
      expect(isNumber('.')).toBe(false);
    });

    it('should reject single sign', () => {
      expect(isNumber('+')).toBe(false);
      expect(isNumber('-')).toBe(false);
    });

    it('should reject letters', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('123abc')).toBe(false);
      expect(isNumber('abc123')).toBe(false);
    });

    it('should reject multiple dots', () => {
      expect(isNumber('12.34.56')).toBe(false);
      expect(isNumber('1..2')).toBe(false);
    });

    it('should reject multiple signs', () => {
      expect(isNumber('--5')).toBe(false);
      expect(isNumber('++5')).toBe(false);
      expect(isNumber('+-5')).toBe(false);
    });

    it('should reject sign not at the beginning', () => {
      expect(isNumber('12+3')).toBe(false);
      expect(isNumber('12-3')).toBe(false);
    });

    it('should reject whitespace in the middle', () => {
      expect(isNumber('12 3')).toBe(false);
      expect(isNumber('12 .3')).toBe(false);
    });

    it('should reject special characters', () => {
      expect(isNumber('12@3')).toBe(false);
      expect(isNumber('12#3')).toBe(false);
      expect(isNumber('12$3')).toBe(false);
    });
  });

  describe('edge cases from Python implementation', () => {
    it('should handle edge case: sign followed by dot with digits', () => {
      expect(isNumber('+.1')).toBe(true);
      expect(isNumber('-.1')).toBe(true);
    });

    it('should handle edge case: zero followed by dot', () => {
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('0.00')).toBe(true);
    });

    it('should handle edge case: sign + zero + dot + digits', () => {
      expect(isNumber('+0.1')).toBe(true);
      expect(isNumber('-0.1')).toBe(true);
    });

    it('should reject edge case: just a sign and dot', () => {
      expect(isNumber('+.')).toBe(false);
      expect(isNumber('-.')).toBe(false);
    });

    it('should reject edge case: space followed by non-digit', () => {
      expect(isNumber(' +')).toBe(false);
      expect(isNumber(' -')).toBe(false);
      expect(isNumber(' .')).toBe(false);
    });

    it('should handle trailing zeros', () => {
      expect(isNumber('100')).toBe(true);
      expect(isNumber('1.00')).toBe(true);
    });

    it('should handle leading zeros', () => {
      expect(isNumber('0123')).toBe(true);
      expect(isNumber('00.123')).toBe(true);
    });
  });
});

describe('castToNumber', () => {
  describe('integer conversion', () => {
    it('should convert integer strings to numbers', () => {
      expect(castToNumber('123')).toBe(123);
      expect(castToNumber('0')).toBe(0);
      expect(castToNumber('456')).toBe(456);
    });

    it('should convert signed integer strings to numbers', () => {
      expect(castToNumber('+123')).toBe(123);
      expect(castToNumber('-123')).toBe(-123);
      expect(castToNumber('+0')).toBe(0);
      // parseInt('-0') returns -0, which is equal to 0 but different in Object.is
      // For calculator purposes, -0 and 0 are equivalent
      expect(castToNumber('-0') == 0).toBe(true);
    });

    it('should convert integer strings with leading space', () => {
      expect(castToNumber(' 123')).toBe(123);
      expect(castToNumber(' 0')).toBe(0);
    });
  });

  describe('float conversion', () => {
    it('should convert decimal strings to numbers', () => {
      expect(castToNumber('0.123')).toBe(0.123);
      expect(castToNumber('123.456')).toBe(123.456);
      expect(castToNumber('0.0')).toBe(0.0);
      expect(castToNumber('1.5')).toBe(1.5);
    });

    it('should convert decimal strings with leading dot', () => {
      expect(castToNumber('.123')).toBe(0.123);
      expect(castToNumber('.456')).toBe(0.456);
      expect(castToNumber('.0')).toBe(0.0);
    });

    it('should convert signed decimal strings', () => {
      expect(castToNumber('-0.123')).toBe(-0.123);
      expect(castToNumber('+0.123')).toBe(0.123);
      expect(castToNumber('-.123')).toBe(-0.123);
      expect(castToNumber('+.123')).toBe(0.123);
    });

    it('should convert decimal strings with leading space', () => {
      expect(castToNumber(' .123')).toBe(0.123);
      expect(castToNumber(' 0.123')).toBe(0.123);
    });
  });

  describe('precision preservation', () => {
    it('should handle JavaScript floating point precision', () => {
      const result = castToNumber('0.1');
      expect(result).toBeCloseTo(0.1, 10);
    });

    it('should handle large numbers', () => {
      expect(castToNumber('999999')).toBe(999999);
      expect(castToNumber('123.456789')).toBeCloseTo(123.456789, 6);
    });

    it('should handle very small numbers', () => {
      expect(castToNumber('.001')).toBe(0.001);
      expect(castToNumber('0.001')).toBe(0.001);
    });
  });

  describe('integer vs float behavior', () => {
    it('should use parseInt for strings without dots', () => {
      // Testing that integers are parsed as integers
      expect(castToNumber('123')).toBe(123);
      expect(Number.isInteger(castToNumber('123'))).toBe(true);
    });

    it('should use parseFloat for strings with dots', () => {
      // Testing that floats are parsed as floats
      expect(castToNumber('123.0')).toBe(123.0);
      expect(castToNumber('123.5')).toBe(123.5);
    });

    it('should handle edge case of 0.0', () => {
      expect(castToNumber('0.0')).toBe(0);
    });
  });
});
