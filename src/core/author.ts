/**
 * Author information module.
 * Provides author details for the calculator application.
 * Migrated from Python's actionauthor() function (lines 15-16).
 */

/**
 * Type definition for author information.
 * Contains developer details including name, batch, department, and institution.
 */
export type AuthorInfo = {
  name: string;
  batch: string;
  department: string;
  institution: string;
};

/**
 * Author information constant.
 * Contains the details of the original calculator developer.
 */
export const AUTHOR_INFO: AuthorInfo = {
  name: 'Pranta Sarker',
  batch: '6th',
  department: 'CSE',
  institution: 'North East University Bangladesh',
};

/**
 * Returns author information.
 * Equivalent to Python's actionauthor() function.
 * @returns AuthorInfo object containing developer details
 */
export function getAuthorInfo(): AuthorInfo {
  return AUTHOR_INFO;
}

/**
 * Formats author information as a display string.
 * Matches the format shown in the Python messagebox.showinfo().
 * @returns Formatted string with author details
 */
export function formatAuthorInfo(): string {
  const info = getAuthorInfo();
  return `${info.name}\nBatch: ${info.batch}\nDepartment: ${info.department}\n${info.institution}`;
}
