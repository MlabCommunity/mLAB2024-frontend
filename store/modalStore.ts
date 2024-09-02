import { create } from "zustand";
type ModalDataT = {
  title: string;
  description: string;
  status: string;
  questions: number;
  onConfirmDelete?: () => void;
};

interface ModalStore {
  type: ModalType;
  isOpen: boolean;
  openModal: (paylaod: ModalType) => void;
  closeModal: () => void;
  modalData: ModalDataT;
  setModalData: (data: ModalDataT) => void;
}

export type ModalType = "deleteQuizz" | "cancelCreateQuizz" | "finishQuiz" | "";

export const useModalStore = create<ModalStore>((set) => ({
  type: "",
  isOpen: false,
  openModal: (paylaod: ModalType) => set({ isOpen: true, type: paylaod }),
  closeModal: () => set({ isOpen: false }),
  modalData: {
    title: "",
    description: "",
    status: "",
    questions: 0,
    onConfirmDelete: () => {},
  },
  setModalData: (data: ModalDataT) => set({ modalData: data }),
}));
