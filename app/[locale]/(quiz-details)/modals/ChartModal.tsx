import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import ChartComponent from "../components/chart/Chart";
import { useModalStore } from "@/store/modalStore";
import CloseButton from "../components/statistics/buttons/CloseButton";

interface FinishedQuiz {
  quizId: number;
  name: string;
  scorePercentage: number;
}

const ChartModal = ({ finishedQuiz }: { finishedQuiz: FinishedQuiz[] }) => {
  const { closeModal, isOpen, type } = useModalStore();
  const isModalOpen = type === "chartModal" && isOpen;

  const chartData = finishedQuiz?.map((quiz) => ({
    name: quiz.name,
    scorePercentage: quiz.scorePercentage,
  }));

  return (
    <Modal onOpenChange={closeModal} isOpen={isModalOpen} size="5xl">
      <ModalContent>
        <ModalBody>
          <ChartComponent quiz={chartData} />
        </ModalBody>
        <ModalFooter>
          <CloseButton close={closeModal} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChartModal;
