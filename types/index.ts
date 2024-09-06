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
export type GenerateQuizResponse = {
  title: string;
  description: string;
  questions: [
    title: string,
    answers: [
      {
        content: string;
        isCorrect: boolean;
      }
    ]
  ];
};
export type QuestionTypeT = "MultipleChoice" | "TrueFalse" | "";

export type GenerateQuizT = {
  Content?: string;
  NumberOfQuestions?: number;
  QuestionTypes?: QuestionTypeT[];
  Attachments?: File[];
};

export type GeneratedQuizT = {
  title: string;
  createAnswersDto: { content: string; isCorrect: boolean }[];
};
export type DashboardQuizT = {
  id?: string;
  availability: "Public" | "Private";
  description: string;
  status: "Active" | "Inactive";
  title: string;
  totalQuestions: number;
};

export type QuizDataT = {
  title: string;
  description: string;
  answers: {
    content: string;
    isCorrect: boolean;
  }[];
};
