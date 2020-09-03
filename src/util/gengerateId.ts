import shortid from "shortid";

export const generateId = (data: Record<string, unknown>) => {
  if (data.id) return data;
  const id = shortid.generate();

  return { ...data, id };
};
