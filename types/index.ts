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

<<<<<<< HEAD
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
=======
export type CreateQuiz = {
  quizDto: {
    title: string;
    description: string;
    createQuestionsDto: [
      title: string,
      description: string,
      createAnswersDto: [
        {
          content: string;
          isCorrect: string;
        }
      ]
    ];
  };
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
>>>>>>> 3f069289be673dd2401684cf7aea93013e087d29
};
