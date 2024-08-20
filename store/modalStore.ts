
import { create } from "zustand";

export type ModalType = "deleteQuizz" | "cancelCreateQuizz" | "";

type ModalDataT = {
  onConfirmDelete?: (e: PressEvent) => void;  
  title: string;
  description: string;
  status: string;
  questions: number;
};

interface ModalStore {
  type: ModalType;
  isOpen: boolean;
  openModal: (payload: ModalType) => void;
  closeModal: () => void;
  modalData: ModalDataT;
  setModalData: (data: ModalDataT) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: "",
  isOpen: false,
  openModal: (payload: ModalType) => set({ isOpen: true, type: payload }),
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



