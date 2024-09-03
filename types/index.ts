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

export type QuestionType = ["MultipleChoice" | "TrueFalse"] | "";

export type QuestionsT = {
  title: string;
  createAnswersDto: {
    content: string;
    isCorrect: boolean;
  }[];
};

export type QuizzList = {
  items: [
    {
      id: string;
      title: string;
      description: string;
      availibility: string;
      status: "Active" | "Disabled";
      totalQuestions: number;
    }
  ];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
};
