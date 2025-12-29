import { describe, it, expect } from 'vitest'

describe('Project Setup', () => {
  it('should have a working test environment', () => {
    expect(true).toBe(true)
  })

  it('should support basic TypeScript features', () => {
    const sum = (a: number, b: number): number => a + b
    expect(sum(1, 2)).toBe(3)
  })
})
