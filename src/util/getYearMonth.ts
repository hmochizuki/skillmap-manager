export const getYearMonth = (): string => {
  const now = new Date();

  return `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};
