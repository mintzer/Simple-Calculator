import { describe, it, expect } from 'vitest';
import { castNumber } from '../src/casting';

describe('castNumber', () => {
  describe('integer strings', () => {
    it('should convert positive integer strings', () => {
      expect(castNumber('123')).toBe(123);
      expect(castNumber('456')).toBe(456);
      expect(castNumber('0')).toBe(0);
      expect(castNumber('1')).toBe(1);
    });

    it('should convert negative integer strings', () => {
      expect(castNumber('-123')).toBe(-123);
      expect(castNumber('-456')).toBe(-456);
      expect(castNumber('-1')).toBe(-1);
    });

    it('should convert integer strings with plus sign', () => {
      expect(castNumber('+123')).toBe(123);
      expect(castNumber('+456')).toBe(456);
    });
  });

  describe('decimal strings', () => {
    it('should convert standard decimal strings', () => {
      expect(castNumber('123.456')).toBe(123.456);
      expect(castNumber('0.123')).toBe(0.123);
      expect(castNumber('1.0')).toBe(1.0);
    });

    it('should convert decimals starting with dot', () => {
      expect(castNumber('.123')).toBe(0.123);
      expect(castNumber('.456')).toBe(0.456);
      expect(castNumber('.1')).toBe(0.1);
    });

    it('should convert signed decimal strings', () => {
      expect(castNumber('-0.123')).toBe(-0.123);
      expect(castNumber('-123.456')).toBe(-123.456);
      expect(castNumber('+123.45')).toBe(123.45);
      expect(castNumber('+0.123')).toBe(0.123);
    });

    it('should convert signed decimals starting with dot', () => {
      expect(castNumber('-.123')).toBe(-0.123);
      expect(castNumber('+.456')).toBe(0.456);
    });
  });

  describe('edge cases', () => {
    it('should handle zero variations', () => {
      expect(castNumber('0')).toBe(0);
      expect(castNumber('0.0')).toBe(0);
      expect(castNumber('-0')).toBe(-0);
      expect(castNumber('+0')).toBe(0);
    });

    it('should handle numbers with leading zeros', () => {
      expect(castNumber('0123')).toBe(123);
      expect(castNumber('0.123')).toBe(0.123);
    });
  });

  describe('return type', () => {
    it('should return JavaScript number type for all inputs', () => {
      expect(typeof castNumber('123')).toBe('number');
      expect(typeof castNumber('123.456')).toBe('number');
      expect(typeof castNumber('.123')).toBe('number');
      expect(typeof castNumber('-123')).toBe('number');
    });

    it('should return finite numbers', () => {
      expect(isFinite(castNumber('123'))).toBe(true);
      expect(isFinite(castNumber('123.456'))).toBe(true);
      expect(isFinite(castNumber('-123.456'))).toBe(true);
    });
  });
});
