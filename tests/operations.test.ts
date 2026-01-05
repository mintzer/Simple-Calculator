import { describe, it, expect } from 'vitest';
import { add } from '../src/operations';

describe('add', () => {
  it('should add two positive integers correctly', () => {
    expect(add(5, 3)).toBe(8);
    expect(add(10, 20)).toBe(30);
    expect(add(100, 1)).toBe(101);
  });

  it('should add negative numbers correctly', () => {
    expect(add(-5, 3)).toBe(-2);
    expect(add(5, -3)).toBe(2);
    expect(add(-5, -3)).toBe(-8);
  });

  it('should add decimal numbers correctly', () => {
    expect(add(1.5, 2.3)).toBeCloseTo(3.8, 10);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
    expect(add(123.456, 789.123)).toBeCloseTo(912.579, 10);
  });

  it('should handle zero correctly', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 0)).toBe(0);
    expect(add(0, -5)).toBe(-5);
  });

  it('should handle mixed integer and decimal addition', () => {
    expect(add(5, 2.5)).toBe(7.5);
    expect(add(10.5, 3)).toBe(13.5);
    expect(add(-5, 2.5)).toBe(-2.5);
  });

  it('should handle very large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
    expect(add(1.23e10, 4.56e10)).toBeCloseTo(5.79e10, 5);
  });

  it('should handle very small decimal numbers', () => {
    expect(add(0.0001, 0.0002)).toBeCloseTo(0.0003, 10);
    expect(add(0.123, 0.456)).toBeCloseTo(0.579, 10);
  });

  it('should handle negative decimal numbers', () => {
    expect(add(-0.123, 0.456)).toBeCloseTo(0.333, 10);
    expect(add(-1.5, -2.5)).toBe(-4);
  });
});
