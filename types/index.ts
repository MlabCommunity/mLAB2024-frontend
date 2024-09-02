export type AnswerMapItemT = {
  [key: number]: number | undefined;
};

export type HistoryItemT = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  options: { answer: string; properValue: boolean }[];
};

export type UpdateProfileT = {
  userName: string;
};

export type QuestionTypeT = "MultipleChoice" | "TrueFalse" | "";

export type GenerateQuizT = {
  content?: string;
  numberOfQuestions?: number;
  questionTypes?: QuestionTypeT[];
};

export type GeneratedQuizT = {
  title: string;
  createAnswersDto: { content: string; isCorrect: boolean }[];
};
export type DashboardQuizT = {
  availability: "Public" | "Private";
  description: string;
  id: string;
  status: "Active" | "Inactive";
  title: string;
  totalQuestions: number;
};
