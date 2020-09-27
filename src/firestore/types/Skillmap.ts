export type Score = {
  categoryId: string;
  category: string;
  total: number;
  average: number;
  variance: number;
  answeres: { userId: string; point: number }[];
};

export type SkillmapDocument = {
  yearMonth: string;
  answeredUsers: string[];
  scores: Score[];
  updatedAt: number;
};
