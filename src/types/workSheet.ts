export type Question = {
  id?: string;
  value: string;
};

export type Category = {
  id?: string;
  name: string;
  questions: Question[];
};

export type Worksheet = Category[];

export type WorksheetDocument = {
  id?: string;
  team: string;
  worksheet: Category[];
  createdAt: number;
  updatedAt: number;
};
