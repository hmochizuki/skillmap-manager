import { Worksheet } from "./Team";

export type AnswerDocument = {
  yearMonth: string;
  answer: Worksheet;
  createdAt: number;
  updatedAt: number;
};
