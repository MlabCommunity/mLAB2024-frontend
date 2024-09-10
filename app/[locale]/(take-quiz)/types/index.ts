export type AnswerMapItemT = {
  [key: number]: number | undefined;
};

export type HistoryItemT = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  options: { answer: string; properValue: boolean }[];
};
