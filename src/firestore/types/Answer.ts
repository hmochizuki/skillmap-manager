import { Category } from "./Team";

export type AnsweredWorksheet = Required<Category>[];

export type AnswerDocument = {
  yearMonth: string;
  answer: AnsweredWorksheet;
  createdAt: number;
  updatedAt: number;
};
