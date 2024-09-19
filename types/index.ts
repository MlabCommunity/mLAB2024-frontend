export type GenerateQuizT = {
  Content?: string;
  NumberOfQuestions?: number;
  QuestionTypes?: string[];
  Attachments?: File[];
};

export type PaginatedResponse<T> = {
  count: number;
  items: T[];
};
export type UserPaginatorOptions = {
  queryKey: string[];
  fetch: <T>(page: number, limit: number) => Promise<PaginatedResponse<T>>;
  pageSize: number;
};
export type QuizHistoryType = {
  quizId: string;
  quizTitle: string;
  quizDescription: string;
  participtionDateUtc: string;
  status: string;
  questions: [
    {
      id: string;
      title: string;
      answers: [{ id: string; content: string; isCorrect: boolean }];
    }
  ];
  userAnswers: [];
  quizResult: {
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
  };
};
