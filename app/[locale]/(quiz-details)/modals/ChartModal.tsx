import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import ChartComponent from "../components/chart/Chart";
import { useModalStore } from "@/store/modalStore";
import CloseButton from "../components/statistics/buttons/CloseButton";
import { QuizHistoryType } from "@/types";

const ChartModal = ({ finishedQuiz }: { finishedQuiz: QuizHistoryType[] }) => {
  const { closeModal, isOpen, type } = useModalStore();
  const isModalOpen = type === "chartModal" && isOpen;

  return (
    <Modal onOpenChange={closeModal} isOpen={isModalOpen} size="5xl">
      <ModalContent>
        <ModalBody>
          <ChartComponent quiz={finishedQuiz} />
        </ModalBody>
        <ModalFooter>
          <CloseButton close={closeModal} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChartModal;
