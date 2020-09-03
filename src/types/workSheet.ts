export type Question = {
  id: string;
  value: string;
  checked?: boolean;
};

export type Category = {
  id: string;
  name: string;
  questions: Question[];
};

export type Worksheet = Category[];

export type WorksheetDocument = {
  id: string;
  team: string;
  worksheet: Category[];
  createdAt: number;
  updatedAt: number;
};
