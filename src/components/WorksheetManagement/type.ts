import { Category } from "types/workSheet";
import shortid from "shortid";

export type WorksheetWithFilter = Array<Category & { filtered: boolean }>;

export const emptyWorkSheetWithFilter: WorksheetWithFilter = [
  {
    id: shortid.generate(),
    name: "",
    questions: [],
    filtered: false,
  },
];
