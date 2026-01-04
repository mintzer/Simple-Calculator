/**
 * Author information module
 * Ported from Python's actionauthor() function
 */

export type AuthorInfo = {
  name: string;
  batch: string;
  department: string;
  institution: string;
};

/**
 * Get author information
 * Returns the developer's details as displayed in the original Python application
 */
export function getAuthorInfo(): AuthorInfo {
  return {
    name: "Pranta Sarker",
    batch: "6th",
    department: "CSE",
    institution: "North East University Bangladesh"
  };
}

/**
 * Format author information for display
 * Matches the format shown in the Python messagebox.showinfo()
 */
export function formatAuthorInfo(info: AuthorInfo): string {
  return `${info.name}\nBatch: ${info.batch}\nDepartment: ${info.department}\n${info.institution}`;
}
