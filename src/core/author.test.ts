import { describe, it, expect } from 'vitest';
import { getAuthorInfo, formatAuthorInfo } from './author';

describe('author module', () => {
  describe('getAuthorInfo', () => {
    it('should return correct author information', () => {
      const info = getAuthorInfo();
      expect(info.name).toBe('Pranta Sarker');
      expect(info.batch).toBe('6th');
      expect(info.department).toBe('CSE');
      expect(info.institution).toBe('North East University Bangladesh');
    });
  });

  describe('formatAuthorInfo', () => {
    it('should format author information correctly', () => {
      const info = getAuthorInfo();
      const formatted = formatAuthorInfo(info);
      expect(formatted).toContain('Pranta Sarker');
      expect(formatted).toContain('Batch: 6th');
      expect(formatted).toContain('Department: CSE');
      expect(formatted).toContain('North East University Bangladesh');
    });

    it('should include line breaks', () => {
      const info = getAuthorInfo();
      const formatted = formatAuthorInfo(info);
      expect(formatted.split('\n').length).toBe(4);
    });

    it('should match expected format', () => {
      const info = getAuthorInfo();
      const formatted = formatAuthorInfo(info);
      const expected = 'Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh';
      expect(formatted).toBe(expected);
    });
  });
});
