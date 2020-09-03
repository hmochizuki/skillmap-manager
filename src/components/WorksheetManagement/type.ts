import { Category } from "firestore/types/Team";
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
