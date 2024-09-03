import { create } from "zustand";

export type ModalType = "deleteQuestion" | "editQuestion" | "addQuestion" | "";

type ModalDataT = {
  onConfirmDelete?: () => void;
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
  closeModal: () => set({ isOpen: false, type: "" }),
  modalData: {
    title: "",
    description: "",
    status: "",
    questions: 0,
    onConfirmDelete: () => {},
  },
  setModalData: (data: ModalDataT) => set({ modalData: data }),
}));
