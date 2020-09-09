export const getYearMonth = (date?: Date): string => {
  const target = date || new Date();

  return `${target.getFullYear()}-${(target.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};
