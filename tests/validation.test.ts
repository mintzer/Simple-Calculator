import { describe, it, expect } from 'vitest';
import { isNumber } from '../src/validation';

describe('isNumber', () => {
  describe('valid integers', () => {
    it('should accept positive integers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('456')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('1')).toBe(true);
    });

    it('should accept negative integers', () => {
      expect(isNumber('-123')).toBe(true);
      expect(isNumber('-456')).toBe(true);
      expect(isNumber('-1')).toBe(true);
    });

    it('should accept integers with plus sign', () => {
      expect(isNumber('+123')).toBe(true);
      expect(isNumber('+456')).toBe(true);
    });
  });

  describe('valid decimals', () => {
    it('should accept standard decimal numbers', () => {
      expect(isNumber('123.456')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
      expect(isNumber('1.0')).toBe(true);
    });

    it('should accept decimals starting with dot', () => {
      expect(isNumber('.123')).toBe(true);
      expect(isNumber('.456')).toBe(true);
      expect(isNumber('.1')).toBe(true);
    });

    it('should accept signed decimals', () => {
      expect(isNumber('-0.123')).toBe(true);
      expect(isNumber('-123.456')).toBe(true);
      expect(isNumber('+123.45')).toBe(true);
      expect(isNumber('+0.123')).toBe(true);
    });

    it('should accept signed decimals starting with dot', () => {
      expect(isNumber('-.123')).toBe(true);
      expect(isNumber('+.456')).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('should reject empty string', () => {
      expect(isNumber('')).toBe(false);
    });

    it('should reject strings with letters', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a3')).toBe(false);
      expect(isNumber('a123')).toBe(false);
      expect(isNumber('123a')).toBe(false);
    });

    it('should reject strings with special characters', () => {
      expect(isNumber('12@3')).toBe(false);
      expect(isNumber('12#3')).toBe(false);
      expect(isNumber('12$3')).toBe(false);
    });

    it('should reject strings with multiple decimal points', () => {
      expect(isNumber('12.34.56')).toBe(false);
      expect(isNumber('1.2.3')).toBe(false);
    });

    it('should reject strings with only signs', () => {
      expect(isNumber('-')).toBe(false);
      expect(isNumber('+')).toBe(false);
    });

    it('should reject strings with only decimal point', () => {
      expect(isNumber('.')).toBe(false);
    });

    it('should reject strings with spaces in between', () => {
      expect(isNumber('12 3')).toBe(false);
      expect(isNumber('12 .3')).toBe(false);
    });

    it('should reject strings with sign in wrong position', () => {
      expect(isNumber('12-3')).toBe(false);
      expect(isNumber('12+3')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero variations', () => {
      expect(isNumber('0')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber('-0')).toBe(true);
      expect(isNumber('+0')).toBe(true);
    });

    it('should handle space as first character', () => {
      // Based on Python code, space at start with digits after should be valid
      expect(isNumber(' 123')).toBe(true);
    });

    it('should handle numbers starting with 0', () => {
      expect(isNumber('0123')).toBe(true);
      expect(isNumber('0.123')).toBe(true);
    });
  });
});
