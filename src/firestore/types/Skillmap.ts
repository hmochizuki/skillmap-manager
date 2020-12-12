export type Score = {
  categoryId: string;
  category: string;
  total: number;
  average: number;
  deviation: number;
  answeres: { userId: string; point: number }[];
};

export type SkillmapDocument = {
  yearMonth: string;
  // 過去のデータパターンでは answeredUsers: string[]がありうる
  answeredUsers: { id: string; name: string }[];
  scores: Score[];
  updatedAt: number;
};
