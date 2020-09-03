import { Category } from "./Team";

export type Answer = Record<string, Required<Category[]>>;

export type AnswerDocument = {
  id: string;
  answers: Answer[];
  createdAt: number;
  updatedAt: number;
};
