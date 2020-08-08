export type Questions = {
  id: string;
  question: string;
};

export type Label = {
  id: string;
  label: string;
  questions: Questions[];
};

export type SkillMap = Label[];
