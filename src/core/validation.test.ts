import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber } from './validation';

describe('isNumber', () => {
  describe('Valid integers', () => {
    it('should accept plain positive integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('456')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('999')).toBe(true);
    });

    it('should accept integers with explicit + sign', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+456')).toBe(true);
      expect(isNumber('+0')).toBe(true);
    });

    it('should accept negative integers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-456')).toBe(true);
      expect(isNumber('-0')).toBe(true);
    });

    it('should accept integers with leading zero', () => {
      expect(isNumber('0123')).toBe(true);
      expect(isNumber('007')).toBe(true);
    });

    it('should accept integers with leading space', () => {
      expect(isNumber(' 123')).toBe(true);
      expect(isNumber(' 456')).toBe(true);
    });
  });

  describe('Valid floats', () => {
    it('should accept floats with decimal point', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
      expect(isNumber('99.99')).toBe(true);
    });

    it('should accept decimals without leading zero', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('.456')).toBe(true);
      expect(isNumber('.5')).toBe(true);
    });

    it('should accept signed floats starting with 0', () => {
      // Note: Python implementation only accepts signed floats that start with "0."
      // Forms like "-123.456" are NOT accepted by the Python source
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('-0.5')).toBe(true);
      expect(isNumber('+0.99')).toBe(true);
    });

    it('should NOT accept signed floats with non-zero leading digit', () => {
      // Python implementation rejects these forms
      expect(isNumber('-123.456')).toBe(false);
      expect(isNumber('+123.456')).toBe(false);
      expect(isNumber('-1.5')).toBe(false);
      expect(isNumber('+99.99')).toBe(false);
    });

    it('should accept signed decimals without leading zero', () => {
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+.456')).toBe(true);
      expect(isNumber('-.5')).toBe(true);
      expect(isNumber('+.5')).toBe(true);
    });

    it('should accept floats with leading space (only 0.x format)', () => {
      // Python implementation only accepts space followed by "0."
      expect(isNumber(' 0.123')).toBe(true);
      expect(isNumber(' 0.456')).toBe(true);
    });

    it('should NOT accept space followed by non-zero digit floats', () => {
      // Python implementation rejects these
      expect(isNumber(' 123.456')).toBe(false);
      expect(isNumber(' 99.99')).toBe(false);
    });

    it('should accept space followed by decimal without leading zero', () => {
      expect(isNumber(' .123')).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a')).toBe(false);
      expect(isNumber('a12')).toBe(false);
      expect(isNumber('hello')).toBe(false);
    });

    it('should reject strings with multiple decimal points', () => {
      expect(isNumber('12.34.56')).toBe(false);
      expect(isNumber('1.2.3')).toBe(false);
    });

    it('should reject single special characters', () => {
      expect(isNumber('.')).toBe(false);
      expect(isNumber('+')).toBe(false);
      expect(isNumber('-')).toBe(false);
      expect(isNumber(' ')).toBe(false);
    });

    it('should reject sign without number', () => {
      expect(isNumber('+.')).toBe(false);
      expect(isNumber('-.')).toBe(false);
    });

    it('should reject numbers with spaces in the middle', () => {
      expect(isNumber('12 34')).toBe(false);
      expect(isNumber('1 2 3')).toBe(false);
    });

    it('should reject special characters mixed with numbers', () => {
      expect(isNumber('12#34')).toBe(false);
      expect(isNumber('$123')).toBe(false);
      expect(isNumber('123%')).toBe(false);
    });
  });

  describe('Edge cases matching Python behavior', () => {
    it('should handle numbers with leading zeros correctly', () => {
      expect(isNumber('000')).toBe(true);
      expect(isNumber('00123')).toBe(true);
    });

    it('should handle explicit positive zero variations', () => {
      expect(isNumber('+0')).toBe(true);
      expect(isNumber('+0.0')).toBe(true);
      expect(isNumber('+.0')).toBe(true);
    });

    it('should handle explicit negative zero variations', () => {
      expect(isNumber('-0')).toBe(true);
      expect(isNumber('-0.0')).toBe(true);
      expect(isNumber('-.0')).toBe(true);
    });

    it('should handle space with signed numbers', () => {
      expect(isNumber(' +123')).toBe(false); // First char is space, second is +, third is 1
      expect(isNumber(' -123')).toBe(false); // First char is space, second is -, third is 1
    });

    it('should reject decimal followed by non-digits', () => {
      expect(isNumber('.abc')).toBe(false);
      expect(isNumber('-.abc')).toBe(false);
    });

    it('should handle zero with decimal variations', () => {
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('-0.0')).toBe(true);
      expect(isNumber('+0.0')).toBe(true);
    });
  });
});

describe('castToNumber', () => {
  describe('Integer conversion', () => {
    it('should convert plain integers correctly', () => {
      expect(castToNumber('123')).toBe(123);
      expect(castToNumber('456')).toBe(456);
      expect(castToNumber('0')).toBe(0);
    });

    it('should convert signed integers correctly', () => {
      expect(castToNumber('-123')).toBe(-123);
      expect(castToNumber('+456')).toBe(456);
      // Note: JavaScript maintains signed zero, so -0 === 0 but Object.is(-0, 0) is false
      expect(castToNumber('-0')).toBe(-0);
    });

    it('should handle integers with leading zeros', () => {
      expect(castToNumber('0123')).toBe(123);
      expect(castToNumber('007')).toBe(7);
    });

    it('should handle integers with leading space', () => {
      expect(castToNumber(' 123')).toBe(123);
      expect(castToNumber(' 456')).toBe(456);
    });
  });

  describe('Float conversion', () => {
    it('should convert floats with decimal point correctly', () => {
      expect(castToNumber('123.456')).toBe(123.456);
      expect(castToNumber('0.123')).toBe(0.123);
      expect(castToNumber('99.99')).toBe(99.99);
    });

    it('should convert decimals without leading zero correctly', () => {
      expect(castToNumber('.123')).toBe(0.123);
      expect(castToNumber('.456')).toBe(0.456);
      expect(castToNumber('.5')).toBe(0.5);
    });

    it('should convert signed floats correctly', () => {
      expect(castToNumber('-123.456')).toBe(-123.456);
      expect(castToNumber('+123.456')).toBe(123.456);
      expect(castToNumber('-0.123')).toBe(-0.123);
      expect(castToNumber('+0.123')).toBe(0.123);
    });

    it('should convert signed decimals without leading zero correctly', () => {
      expect(castToNumber('-.123')).toBe(-0.123);
      expect(castToNumber('+.456')).toBe(0.456);
    });

    it('should handle floats with leading space', () => {
      expect(castToNumber(' 123.456')).toBe(123.456);
      expect(castToNumber(' 0.123')).toBe(0.123);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero variations correctly', () => {
      expect(castToNumber('0')).toBe(0);
      expect(castToNumber('0.0')).toBe(0);
      // JavaScript maintains signed zero for negative zero
      expect(castToNumber('-0')).toBe(-0);
      expect(castToNumber('-0.0')).toBe(-0);
      expect(castToNumber('+0')).toBe(0);
    });

    it('should preserve precision for floats', () => {
      expect(castToNumber('1.5')).toBe(1.5);
      expect(castToNumber('2.25')).toBe(2.25);
      expect(castToNumber('3.125')).toBe(3.125);
    });

    it('should handle large numbers', () => {
      expect(castToNumber('999999')).toBe(999999);
      expect(castToNumber('999999.999')).toBe(999999.999);
    });
  });

  describe('Type distinction', () => {
    it('should return mathematically correct values for integers', () => {
      // In JavaScript, there's no type distinction between int and float,
      // but mathematically the value should be correct
      const intResult = castToNumber('5');
      const floatResult = castToNumber('5.0');

      expect(intResult).toBe(5);
      expect(floatResult).toBe(5.0);
      expect(intResult).toBe(floatResult); // They're equal in JavaScript
    });

    it('should preserve decimal information when present', () => {
      expect(castToNumber('5.5')).toBe(5.5);
      expect(castToNumber('5.1')).toBe(5.1);
      // The calling code can check if original string had '.' to determine display format
    });
  });
});

describe('Integration: isNumber and castToNumber', () => {
  it('should work together for valid inputs', () => {
    const validInputs = [
      '123',          // plain integer
      '456.789',      // plain float
      '.123',         // decimal without leading zero
      '-456',         // negative integer
      '+789',         // positive integer with sign
      '-0.123',       // negative float starting with 0
      ' 123',         // integer with leading space
      '-.456',        // negative decimal without leading zero
      '+.789',        // positive decimal without leading zero
      ' 0.5',         // space followed by 0.x
    ];

    validInputs.forEach(input => {
      if (isNumber(input)) {
        const result = castToNumber(input);
        expect(typeof result).toBe('number');
        expect(isNaN(result)).toBe(false);
      }
    });
  });

  it('should validate before casting (defensive programming)', () => {
    const testCases = [
      { input: '123', valid: true, expected: 123 },
      { input: 'abc', valid: false, expected: NaN },
      { input: '.456', valid: true, expected: 0.456 },
      { input: '', valid: false, expected: NaN },
    ];

    testCases.forEach(({ input, valid, expected }) => {
      expect(isNumber(input)).toBe(valid);
      if (valid) {
        expect(castToNumber(input)).toBe(expected);
      }
    });
  });
});
