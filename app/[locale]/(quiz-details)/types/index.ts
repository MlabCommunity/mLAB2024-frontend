export type QuestionsT = {
  id: string;
  title: string;
  description: string;
  answers: AnswerT[];
};

export type AnswerT = {
  id: string;
  content: string;
  isCorrect: boolean;
};

export type GeneratedQuestionsT = {
    title: string;
    status: string;
    id: string;
    availibility: string;
    description: string;
    questions: QuestionsT[];
  };
