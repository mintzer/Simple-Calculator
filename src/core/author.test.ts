import { describe, it, expect } from 'vitest';
import { getAuthorInfo, type AuthorInfo } from './author';

describe('getAuthorInfo', () => {
  it('should return author information object', () => {
    const authorInfo = getAuthorInfo();
    expect(authorInfo).toBeDefined();
    expect(typeof authorInfo).toBe('object');
  });

  it('should return correct author name', () => {
    const authorInfo = getAuthorInfo();
    expect(authorInfo.name).toBe('Pranta Sarker');
  });

  it('should return correct batch', () => {
    const authorInfo = getAuthorInfo();
    expect(authorInfo.batch).toBe('6th');
  });

  it('should return correct department', () => {
    const authorInfo = getAuthorInfo();
    expect(authorInfo.department).toBe('CSE');
  });

  it('should return correct institution', () => {
    const authorInfo = getAuthorInfo();
    expect(authorInfo.institution).toBe('North East University Bangladesh');
  });

  it('should return complete author information matching Python implementation', () => {
    const authorInfo = getAuthorInfo();
    const expected: AuthorInfo = {
      name: 'Pranta Sarker',
      batch: '6th',
      department: 'CSE',
      institution: 'North East University Bangladesh',
    };
    expect(authorInfo).toEqual(expected);
  });

  it('should return consistent data on multiple calls', () => {
    const firstCall = getAuthorInfo();
    const secondCall = getAuthorInfo();
    expect(firstCall).toEqual(secondCall);
  });
});
