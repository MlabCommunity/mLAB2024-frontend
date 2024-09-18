"use client";

import { useModalStore } from "@/store/modalStore";
import { useTakeQuizStore } from "@/store/takeQuizStore";
import { submitQuizParticipation } from "@/utils/actions/quiz/submitQuizParticipation";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface FinishQuizModalProps {
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  nextQuestion: () => void;
  questionsId: string[];
  answersId: string[];
}

function FinishQuizModal({
  setShowResult,
  nextQuestion,
}: FinishQuizModalProps) {
  const t = useTranslations("TakeQuiz");
  const { isOpen, type, closeModal } = useModalStore();
  const isModalOpen = isOpen && type === "finishQuiz";
  const { setAnswersId, setQuestionsId, questionsId, answersId } =
    useTakeQuizStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: submitQuizParticipation,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(t("signedIn"));
    },
  });

  const { id } = useParams();

  const handleFinish = () => {
    setShowResult(true);
    closeModal();
    mutate({ questionsId, answersId, quizParticipationId: id });
  };

  return (
    <Modal
      onOpenChange={closeModal}
      isOpen={isModalOpen}
      size="3xl"
      className="bg-content2"
      closeButton={
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#292D32",
            color: "white",
            width: 24,
            height: 24,
            fontSize: 11,
            fontWeight: "bold",
            borderRadius: "100%",
            top: 10,
            right: 10,
          }}
        >
          X
        </button>
      }
    >
      <ModalContent className="bg-content2">
        <ModalHeader>
          <div className="flex flex-col justify-start">
            <p className="text-lg text-foreground-700 font-semibold">
              {t("finishQuiz")}
            </p>
            <p className="text-base text-foreground-500 font-medium mt-1">
              {t("areYouSure")}
            </p>
          </div>
        </ModalHeader>
        <ModalFooter>
          <Button variant="flat" color="primary" onPress={closeModal}>
            {t("cancel")}
          </Button>
          <Button color="primary" onPress={handleFinish} isLoading={isPending}>
            {t("finish")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FinishQuizModal;
