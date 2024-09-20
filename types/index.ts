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
interface UserAnswer {
  questionId: string;
  answerId: string;
}

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  answers: Answer[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
}

export interface QuizHistoryType {
  quizId: string;
  quizTitle: string;
  quizDescription: string;
  participtionDateUtc: string;
  status: "Stopped" | "Finished" | "Started";
  quizResult?: QuizResult;
  questions: Question[];
  userAnswers: UserAnswer[]; //
}
