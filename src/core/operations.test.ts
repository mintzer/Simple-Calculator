import { describe, it, expect } from 'vitest';
import { add } from './operations';

describe('add', () => {
  it('should add two positive integers', () => {
    expect(add(5, 3)).toBe(8);
  });

  it('should add two positive floats', () => {
    expect(add(5.5, 3.2)).toBeCloseTo(8.7);
  });

  it('should add positive and negative numbers', () => {
    expect(add(10, -3)).toBe(7);
  });

  it('should add two negative numbers', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  it('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  it('should handle decimal numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
