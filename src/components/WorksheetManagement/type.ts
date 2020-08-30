import { Category } from "types/workSheet";

export type WorksheetWithFilter = Array<Category & { filtered: boolean }>;

export const emptyWorkSheetWithFilter: WorksheetWithFilter = [
  {
    category: "",
    questions: [],
    filtered: false,
  },
];
