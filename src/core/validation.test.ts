import { describe, it, expect } from 'vitest';
import { isNumber, castToNumber } from './validation';

describe('isNumber', () => {
  describe('valid integer formats', () => {
    it('should accept positive integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('1')).toBe(true);
      expect(isNumber('999999')).toBe(true);
    });

    it('should accept negative integers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-1')).toBe(true);
      expect(isNumber('-999')).toBe(true);
    });

    it('should accept positive integers with plus sign', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+1')).toBe(true);
      expect(isNumber('+999')).toBe(true);
    });

    it('should accept zero', () => {
      expect(isNumber('0')).toBe(true);
      expect(isNumber('+0')).toBe(true);
      expect(isNumber('-0')).toBe(true);
    });

    it('should accept integers with leading space', () => {
      expect(isNumber(' 123')).toBe(true);
      expect(isNumber(' 1')).toBe(true);
    });
  });

  describe('valid float formats', () => {
    it('should accept floats with leading zero', () => {
      expect(isNumber('0.123')).toBe(true);
      expect(isNumber('0.1')).toBe(true);
      expect(isNumber('0.999')).toBe(true);
    });

    it('should accept floats without leading zero', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('.1')).toBe(true);
      expect(isNumber('.999')).toBe(true);
    });

    it('should accept signed floats with leading zero', () => {
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
      expect(isNumber('-0.1')).toBe(true);
      expect(isNumber('+0.999')).toBe(true);
    });

    it('should accept signed floats without leading zero', () => {
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+.123')).toBe(true);
      expect(isNumber('-.1')).toBe(true);
      expect(isNumber('+.999')).toBe(true);
    });

    it('should accept standard float formats', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('1.5')).toBe(true);
      expect(isNumber('999.999')).toBe(true);
    });

    it('should reject signed standard floats (Python limitation)', () => {
      // Python's is_number does NOT accept signed floats like "-123.456"
      // It only accepts unsigned floats "123.456" and special cases like "-0.123" or "-.123"
      expect(isNumber('-123.456')).toBe(false);
      expect(isNumber('+123.456')).toBe(false);
      expect(isNumber('-1.5')).toBe(false);
    });

    it('should accept floats with leading space and decimal', () => {
      expect(isNumber(' 0.123')).toBe(true);
    });
  });

  describe('invalid formats', () => {
    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject alphabetic characters', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('1abc')).toBe(false);
      expect(isNumber('abc123')).toBe(false);
      expect(isNumber('12a34')).toBe(false);
    });

    it('should reject special characters', () => {
      expect(isNumber('!@#')).toBe(false);
      expect(isNumber('123!')).toBe(false);
      expect(isNumber('12@34')).toBe(false);
    });

    it('should reject multiple signs', () => {
      expect(isNumber('--123')).toBe(false);
      expect(isNumber('++123')).toBe(false);
      expect(isNumber('+-123')).toBe(false);
    });

    it('should reject multiple decimal points', () => {
      expect(isNumber('1.2.3')).toBe(false);
      // Note: Python implementation accepts "..123" due to its logic
      // expect(isNumber('..123')).toBe(false);
      expect(isNumber('1..23')).toBe(false);
    });

    it('should reject decimal point only', () => {
      expect(isNumber('.')).toBe(false);
      expect(isNumber('-.')).toBe(false);
      expect(isNumber('+.')).toBe(false);
    });

    it('should reject sign only', () => {
      expect(isNumber('-')).toBe(false);
      expect(isNumber('+')).toBe(false);
    });

    it('should reject space only', () => {
      expect(isNumber(' ')).toBe(false);
    });

    it('should reject numbers with internal spaces', () => {
      expect(isNumber('12 34')).toBe(false);
      expect(isNumber('1 .23')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle numbers starting with zero', () => {
      expect(isNumber('0123')).toBe(true);
      expect(isNumber('00.123')).toBe(true);
    });

    it('should handle numbers starting with space followed by decimal', () => {
      expect(isNumber(' .123')).toBe(true);
    });

    it('should reject incomplete float formats', () => {
      // Note: Python implementation accepts "123." because "123".isdigit() is True
      // expect(isNumber('123.')).toBe(false);
      expect(isNumber('-123.')).toBe(false);
      expect(isNumber('.0.')).toBe(false);
    });

    it('should handle single digit with decimal', () => {
      expect(isNumber('1.0')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
    });

    it('should accept trailing decimal for integers (Python quirk)', () => {
      // Python's is_number accepts "123." because "123".isdigit() is True
      expect(isNumber('123.')).toBe(true);
      expect(isNumber('0.')).toBe(true);
    });

    it('should accept leading double decimal (Python quirk)', () => {
      // Python's is_number accepts "..123" because s[0]='.' and s[1]='.' and s[2:]='123' isdigit
      expect(isNumber('..123')).toBe(true);
    });
  });
});

describe('castToNumber', () => {
  describe('integer conversion', () => {
    it('should convert positive integers', () => {
      expect(castToNumber('123')).toBe(123);
      expect(castToNumber('1')).toBe(1);
      expect(castToNumber('999')).toBe(999);
    });

    it('should convert negative integers', () => {
      expect(castToNumber('-123')).toBe(-123);
      expect(castToNumber('-1')).toBe(-1);
      expect(castToNumber('-999')).toBe(-999);
    });

    it('should convert integers with plus sign', () => {
      expect(castToNumber('+123')).toBe(123);
      expect(castToNumber('+1')).toBe(1);
    });

    it('should convert zero', () => {
      expect(castToNumber('0')).toBe(0);
    });

    it('should convert integers with leading space', () => {
      expect(castToNumber(' 123')).toBe(123);
    });
  });

  describe('float conversion', () => {
    it('should convert floats with leading zero', () => {
      expect(castToNumber('0.123')).toBe(0.123);
      expect(castToNumber('0.5')).toBe(0.5);
    });

    it('should convert floats without leading zero', () => {
      expect(castToNumber('.123')).toBe(0.123);
      expect(castToNumber('.5')).toBe(0.5);
    });

    it('should convert signed floats', () => {
      expect(castToNumber('-0.123')).toBe(-0.123);
      expect(castToNumber('+0.123')).toBe(0.123);
      expect(castToNumber('-.123')).toBe(-0.123);
      expect(castToNumber('+.123')).toBe(0.123);
    });

    it('should convert standard float formats', () => {
      expect(castToNumber('123.456')).toBe(123.456);
      expect(castToNumber('-123.456')).toBe(-123.456);
      expect(castToNumber('1.5')).toBe(1.5);
    });

    it('should handle very small decimals', () => {
      expect(castToNumber('0.001')).toBe(0.001);
      expect(castToNumber('.001')).toBe(0.001);
    });
  });

  describe('type semantics', () => {
    it('should use parseFloat for numbers with decimal point', () => {
      const result = castToNumber('123.0');
      expect(result).toBe(123.0);
      expect(typeof result).toBe('number');
    });

    it('should use parseInt for numbers without decimal point', () => {
      const result = castToNumber('123');
      expect(result).toBe(123);
      expect(typeof result).toBe('number');
    });
  });

  describe('edge cases', () => {
    it('should handle numbers with leading zeros', () => {
      expect(castToNumber('0123')).toBe(123);
      expect(castToNumber('00.123')).toBe(0.123);
    });

    it('should handle negative zero', () => {
      expect(castToNumber('-0')).toBe(-0);
      expect(castToNumber('-0.0')).toBe(-0);
    });

    it('should handle space-prefixed numbers', () => {
      expect(castToNumber(' 123')).toBe(123);
      expect(castToNumber(' .123')).toBe(0.123);
      expect(castToNumber(' 0.123')).toBe(0.123);
    });
  });
});
