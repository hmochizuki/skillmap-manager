import { firestore } from "firebase";

export type WorkSheet<T extends string = string> = Record<string, Array<T>>;
export type WorkSheetCollection<T extends string = string> = {
  id: string;
  categories: Array<T>;
  workSheet: WorkSheet<T>;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
};