import { QuestionsT } from "@/app/[locale]/(quiz-details)/types";
import { GenerateQuizT } from "@/types";
import { create } from "zustand";

interface QuizDetailsStore {
  questions: QuestionsT[];
  setQuestionsData: (data: QuestionsT[]) => void;
  status: string;
  setStatus: (data: string) => void;
  availability: string;
  setAvailability: (data: string) => void;
}

export const useQuizDetailStore = create<QuizDetailsStore>((set) => ({
  questions: [],
  setQuestionsData: (data: QuestionsT[]) => set({ questions: data }),
  status: "",
  setStatus: (data: string) => set({ status: data }),
  availability: "",
  setAvailability: (data: string) => set({ availability: data }),
}));
