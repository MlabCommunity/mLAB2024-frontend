export type AnswerMapItemT = {
  [key: number]: number | undefined;
};

export type HistoryItemT = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  options: { answer: string; properValue: boolean }[];
};

type QuizAnswer = {
  id: string;
  content: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  id: string;
  title: string;
  answers: QuizAnswer[];
};

type QuizDetails = {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

type UserAnswer = {
  questionId: string;
  answerId: string;
};

export type QuizParticipationT = {
  quizParticipationId: string;
  quizDetails: QuizDetails;
  userAnswers: UserAnswer[];
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
};