import { GenerateQuizT } from "@/types";
import { create } from "zustand";

interface GenerateQuizStore {
  generateQuizData: GenerateQuizT;
  setGenerateQuizData: (data: GenerateQuizT) => void;
  generatedQuizData: any;
  setGeneratedQuizData: any;
}

export const useGenerateQuizStore = create<GenerateQuizStore>((set) => ({
  generateQuizData: {
    Content: "",
    NumberOfQuestions: 0,
    QuestionTypes: [""],
    Attachments: [],
  },
  setGenerateQuizData: (data: GenerateQuizT) => set({ generateQuizData: data }),
  generatedQuizData: [],
  setGeneratedQuizData: (data: any) => set({ generatedQuizData: data }),
}));
