import { Category } from "./workSheet";

export type Answer = {
  teamId: string;
  yearMonth: string; //  yyyyMM
  worksheet: Required<Category[]>;
};

export type AnswerDocument = {
  userId: string;
  answers: Answer[];
  createdAt: number;
  updatedAt: number;
};
