export type QuestionsT = {
  id: string;
  title: string;
  description: string;
  answers: AnswerT[];
};

export type AnswerT = {
  content: string;
  isCorrect: boolean;
  id?: string;
};

export type GeneratedQuestionsT = {
  title: string;
  status: string;
  id: string;
  availibility: string;
  description: string;
  questions: QuestionsT[];
};
export type ParticipantsT = {
  items: ItemsT[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
};
export type ItemsT = {
  displayName: string;
  score: number;
  status: "Finished" | "Started" | "Stopped";
  participationDateUtc: string;
};
export type QuizDetailsT = {
  id: string;
  title: string;
  description: string;
  shareLink: string;
  availability: "Public | Private";
  status: "Active" | "Inactive";
  questions: QuestionsT[];
  participants: ParticipantsT[];
};
