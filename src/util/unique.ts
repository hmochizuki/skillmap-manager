export const unique = <T extends (string | number | boolean | null)[]>(
  array: T
): T => [...new Set(array)] as T;
