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
    <Modal isOpen={isModalOpen} size="5xl">
      <ModalContent>
        <ModalBody>
          <ChartComponent quiz={chartData} />
        </ModalBody>
        <ModalFooter>
          <Button
            size="md"
            color="default"
            variant="ghost"
            onClick={closeModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChartModal;
