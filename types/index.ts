export type GenerateQuizT = {
  Content?: string;
  NumberOfQuestions?: number;
  QuestionTypes?: string[];
  Attachments?: File[];
};

export interface PaginatedResponse<T> {
  items: T[];
  totalItemsCount: number;
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
}

export interface UserPaginatorOptions<T> {
  fetch: (
    page: number,
    pageSize: number,
    quizId?: string
  ) => Promise<PaginatedResponse<T>>;
  queryKey: any[];
  pageSize?: number; // Make pageSize optional here
}

export interface UsePaginatedStatisticsOptions<T>
  extends UserPaginatorOptions<T> {
  quizId: string;
  page: number;
}
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
export type Participants = {
  displayName: string;
  score: number;
  status: "Finished" | "Stopped" | "Started";
  participationDateUtc: string;
};
export interface QuizHistoryType {
  quizId: string;
  quizTitle: string;
  quizDescription: string;
  participationDateUtc: string;
  status: "Stopped" | "Finished" | "Started";
  quizResult?: QuizResult;
  questions: Question[];
  userAnswers: UserAnswer[]; //
}
export interface QuizDetail {
  id: string;
  title: string;
  description: string;
  shareLink: string;
  availability: "Public" | "Private";
  status: "Active" | "Inactive";
  questions: Question[];
  participants: Participants[];
}
