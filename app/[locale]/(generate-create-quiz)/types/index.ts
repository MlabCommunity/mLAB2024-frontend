type Answer = {
  content: string;
  isCorrect: boolean;
};

export type GeneratedQuestionT = {
  id?: string;
  title: string;
  generateAnswers: Answer[];
};

export type GeneratedQuizT = {
  title: string;
  description: string;
  generateQuestions: GeneratedQuestionT[];
};
