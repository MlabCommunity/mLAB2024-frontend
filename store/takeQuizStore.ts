import { create } from "zustand";

interface TakeQuizStore {
  questionsId: string[];
  setQuestionsId: (updater: (prev: string[]) => string[]) => void;
  answersId: string[];
  setAnswersId: (updater: (prev: string[]) => string[]) => void;
}

export const useTakeQuizStore = create<TakeQuizStore>((set) => ({
  questionsId: [],
  setQuestionsId: (updater) =>
    set((state) => ({ questionsId: updater(state.questionsId) })),
  answersId: [],
  setAnswersId: (updater) =>
    set((state) => ({ answersId: updater(state.answersId) })),
}));
