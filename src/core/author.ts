/**
 * Author information module.
 * Provides author details equivalent to the Python actionauthor() function.
 */

/**
 * Author information structure containing personal and institutional details.
 */
export interface AuthorInfo {
  name: string;
  batch: string;
  department: string;
  institution: string;
}

/**
 * Returns the author information.
 * This data matches the Python implementation exactly.
 *
 * @returns An AuthorInfo object containing the author's details
 */
export function getAuthorInfo(): AuthorInfo {
  return {
    name: "Pranta Sarker",
    batch: "6th",
    department: "CSE",
    institution: "North East University Bangladesh",
  };
}
