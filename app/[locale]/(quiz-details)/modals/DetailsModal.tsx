"use client";
import { useModalStore } from "@/store/modalStore";
import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"; // Import necessary NextUI components
import React from "react";
import { QuizHistoryType } from "@/types";
import { formatParticipationDate } from "@/utils/helpers";
import Image from "next/image";
import checkCircle from "@/public/assets/check-circle.svg";
import cancelCircle from "@/public/assets/circle-cancel.svg";
import StatusChip from "../components/statistics/StatusChip/StatusChip";
import { useTranslations } from "next-intl";

function DetailsModal({ quiz }: { quiz: QuizHistoryType[] }) {
  const { isOpen, type, closeModal, modalData } = useModalStore();
  const isModalOpen = isOpen && type === "detailsModal";
  const selectedQuiz = quiz.find((q) => q.quizId === modalData.id);
  const t = useTranslations("quizDetails");

  return (
    <Modal isOpen={isModalOpen} onOpenChange={closeModal} size="5xl">
      <ModalContent>
        <ModalHeader className="flex justify-around">
          <h1 className="text-2xl">{t("quizDetails")}</h1>
          <StatusChip
            status={selectedQuiz?.status as "Stopped" | "Finished" | "Started"}
          />
        </ModalHeader>
        <ModalBody className="max-h-[400px] overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl flex flex-col text-foreground-700 font-semibold">
              <span>
                {t("startDate")}:{" "}
                {formatParticipationDate(
                  selectedQuiz?.participtionDateUtc as string
                )}
              </span>
            </div>
          </div>
          {selectedQuiz?.questions?.map((question, questionIndex) => {
            const userAnswer = selectedQuiz.userAnswers.find(
              (answer) => answer.questionId === question.id
            );
            const selectedAnswer = question.answers.find(
              (answer) => answer.id === userAnswer?.answerId
            );

            return (
              <div
                key={question.id}
                className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
              >
                <div className="w-full">
                  <h3 className="font-bold mb-2">
                    {questionIndex + 1}. {question.title}
                  </h3>
                  <div className="space-y-2">
                    {question.answers.map((answer, answerIndex) => {
                      const isSelected = selectedAnswer?.id === answer.id;
                      return (
                        <div
                          key={answer.id}
                          className={cn(
                            "flex items-center p-2 rounded-lg cursor-pointer w-full bg-white justify-between",
                            answer.isCorrect && "bg-success-100",
                            isSelected && !answer.isCorrect && "bg-danger-100"
                          )}
                        >
                          <div className="flex">
                            <span className="font-medium text-gray-700">
                              {String.fromCharCode(65 + answerIndex)}
                            </span>
                            <div className="border-l border-gray-300 h-6 mx-2"></div>
                            <span className="text-gray-700">
                              {answer.content}
                            </span>
                          </div>
                          {isSelected && answer.isCorrect && (
                            <Image src={checkCircle} alt="Correct answer" />
                          )}
                          {isSelected && !answer.isCorrect && (
                            <Image src={cancelCircle} alt="Incorrect answer" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" color="default" onClick={closeModal}>
            {t("close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DetailsModal;