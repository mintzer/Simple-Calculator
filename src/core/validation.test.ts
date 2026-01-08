import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber } from './validation';

describe('isNumber', () => {
  describe('valid integer formats', () => {
    it('should accept positive integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('999999')).toBe(true);
    });

    it('should accept signed integers', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('+0')).toBe(true);
      expect(isNumber('-0')).toBe(true);
    });

    it('should accept integers with leading space', () => {
      expect(isNumber(' 123')).toBe(true);
    });
  });

  describe('valid float formats', () => {
    it('should accept standard float notation', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
      expect(isNumber('1.0')).toBe(true);
    });

    it('should accept signed floats with leading zero', () => {
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
    });

    it('should accept leading decimal point', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
    });

    it('should accept floats with various leading patterns', () => {
      expect(isNumber('+0.5')).toBe(true);
      expect(isNumber('-0.5')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('0.')).toBe(true); // Python accepts this
    });
  });

  describe('invalid formats', () => {
    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject single space', () => {
      expect(isNumber(' ')).toBe(false);
    });

    it('should reject single dot', () => {
      expect(isNumber('.')).toBe(false);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a')).toBe(false);
      expect(isNumber('a12')).toBe(false);
      expect(isNumber('12.34a')).toBe(false);
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

    it('should reject signs in wrong positions', () => {
      expect(isNumber('12-34')).toBe(false);
      expect(isNumber('12+34')).toBe(false);
    });

    it('should reject strings with only special characters', () => {
      expect(isNumber('+')).toBe(false);
      expect(isNumber('-')).toBe(false);
      expect(isNumber('+.')).toBe(false);
      expect(isNumber('-.')).toBe(false);
    });
  });

  describe('edge cases from Python implementation', () => {
    it('should handle leading zeros correctly', () => {
      expect(isNumber('0123')).toBe(true); // Python accepts this
      expect(isNumber('00.123')).toBe(true);
    });

    it('should handle various sign and dot combinations', () => {
      expect(isNumber('+.1')).toBe(true);
      expect(isNumber('-.1')).toBe(true);
      expect(isNumber('0.1')).toBe(true);
    });

    it('should handle trailing dot patterns', () => {
      // Python's s.replace('.', '', 1).isdigit() accepts these
      expect(isNumber('0.')).toBe(true); // "0".isdigit() → True
      // But signed versions need the special logic
      expect(isNumber('+0.')).toBe(false); // No digits after dot at position [1]
      expect(isNumber('-0.')).toBe(false); // No digits after dot at position [1]
    });
  });
});

describe('castToNumber', () => {
  describe('integer conversion', () => {
    it('should convert integer strings to numbers', () => {
      expect(castToNumber('123')).toBe(123);
      expect(castToNumber('0')).toBe(0);
      expect(castToNumber('-123')).toBe(-123);
      expect(castToNumber('+123')).toBe(123);
    });
  });

  describe('float conversion', () => {
    it('should convert float strings to numbers', () => {
      expect(castToNumber('123.456')).toBe(123.456);
      expect(castToNumber('0.123')).toBe(0.123);
      expect(castToNumber('.123')).toBe(0.123);
    });

    it('should convert signed floats correctly', () => {
      expect(castToNumber('-0.123')).toBe(-0.123);
      expect(castToNumber('+0.123')).toBe(0.123);
      expect(castToNumber('-.123')).toBe(-0.123);
      expect(castToNumber('+.123')).toBe(0.123);
    });
  });

  describe('precision handling', () => {
    it('should handle decimal precision', () => {
      expect(castToNumber('0.1')).toBe(0.1);
      expect(castToNumber('0.01')).toBe(0.01);
      expect(castToNumber('123.456789')).toBe(123.456789);
    });

    it('should handle integers with decimal zero', () => {
      expect(castToNumber('5.0')).toBe(5.0);
      expect(castToNumber('100.00')).toBe(100);
    });
  });

  describe('special cases', () => {
    it('should handle leading space (space-prefixed numbers)', () => {
      expect(castToNumber(' 123')).toBe(123);
    });

    it('should handle leading zeros', () => {
      expect(castToNumber('0123')).toBe(123);
      expect(castToNumber('00.123')).toBe(0.123);
    });

    it('should handle positive sign', () => {
      expect(castToNumber('+123')).toBe(123);
      expect(castToNumber('+0.5')).toBe(0.5);
    });

    it('should handle negative zero', () => {
      expect(castToNumber('-0')).toBe(-0);
      expect(castToNumber('-0.0')).toBe(-0);
    });
  });
});

describe('validation and casting integration', () => {
  it('should work together for valid inputs', () => {
    const testCases = [
      { input: '123', expected: 123 },
      { input: '-123', expected: -123 },
      { input: '0.123', expected: 0.123 },
      { input: '.123', expected: 0.123 },
      { input: '-.123', expected: -0.123 },
      { input: '123.456', expected: 123.456 }, // Unsigned float with integer part
      { input: ' 999', expected: 999 },
      { input: '+0.5', expected: 0.5 },
      { input: '-0.5', expected: -0.5 },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(isNumber(input)).toBe(true);
      expect(castToNumber(input)).toBe(expected);
    });
  });

  it('should reject invalid inputs in validation', () => {
    const invalidInputs = [
      '',
      ' ',
      '.',
      'abc',
      '12.34.56',
      '--5',
      '++5',
      // These look like they might be valid but aren't per Python logic:
      '-123.456',  // Signed float with integer part > 0
      '+123.456',  // Signed float with integer part > 0
    ];

    invalidInputs.forEach(input => {
      expect(isNumber(input)).toBe(false);
    });
  });
});
