export type AnswerMapItem = {
  [key: number]: number | undefined;
};

export type HistoryItem = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  options: { answer: string; properValue: boolean }[];
};

export type UpdateProfile = {
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

export type QuestionType = "MultipleChoice" | "TrueFalse" | "";

export type GenerateQuizT = {
  content?: string;
  numberOfQuestions?: number;
  questionType?: QuestionType;
};

export type QuestionsT = {
  title: string;
  createAnswersDto: {
    content: string;
    isCorrect: boolean;
  }[];
};
