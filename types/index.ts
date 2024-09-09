export type QuestionTypeT = "MultipleChoice" | "TrueFalse" | "";
export type GenerateQuizT = {
  Content?: string;
  NumberOfQuestions?: number;
  QuestionTypes?: QuestionTypeT[];
  Attachments?: File[];
};
