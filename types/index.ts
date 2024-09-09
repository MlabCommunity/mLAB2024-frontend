export type QuestionTypeT = "MultipleChoice" | "TrueFalse" | "";
export type GenerateQuizT = {
  content?: string;
  numberOfQuestions?: number;
  questionTypes?: QuestionTypeT[];
};
