"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore";
import EditQuestionModal from "../modals/EditQuestionModal";
import DeleteQuestionModal from "../modals/DeleteQuestionModal";
import { Button, Switch } from "@nextui-org/react";
import AddQuestionModal from "../modals/AddQuestionModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/utils/actions/quiz/deleteQuestion";
import toast from "react-hot-toast";
import { GeneratedQuestionsT } from "../types";
import { useQuizDetailStore } from "@/store/quizDetailsStore";
import QuestionsSkeleton from "../components/skeletons/QuestionsSkeleton";
import Question from "./Question";
import { motion, AnimatePresence } from "framer-motion";

const Questions = () => {
  const [enabled, setEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const { openModal, setModalData, closeModal, type } = useModalStore();
  const t = useTranslations("quizDetails");
  const { questions, setQuestionsData } = useQuizDetailStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.success(t("deletedQuestionSuccess"));
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.setQueryData(
        ["singleQuiz"],
        (oldData: GeneratedQuestionsT) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            questions: oldData.questions.filter(
              (question) => question.id !== variables
            ),
          };
        }
      );
    },
  });

  const handleEditQuestion = (index: number) => {
    if (questions[index]) {
      setCurrentQuestionIndex(index);
      openModal("editQuestion");
    }
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    if (questions[questionIndex]) {
      setCurrentQuestionIndex(questionIndex);
      openModal("deleteQuestion");
      setModalData({
        title: questions[questionIndex].title,
        description: questions[questionIndex].title,
        status: "Error",
        questions: 2,
        onConfirmDelete: () =>
          handleConfirmDelete(questionIndex, questions[questionIndex].id),
      });
    }
  };

  const handleConfirmDelete = (questionIndex: number, id: string) => {
    mutate(id);
    const updatedQuizData = questions.filter((_, i) => i !== questionIndex);
    setQuestionsData(updatedQuizData);
  };

  const handleOpenAddQuestion = () => {
    openModal("addQuestion");
  };

  if (questions?.length === 0) {
    return <QuestionsSkeleton />;
  }

  return (
    <>
      <section data-navbar-item="questions">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-Content-content2-light dark:bg-Content-content2-dark py-4 px-4 rounded-lg">
            <div className="flex justify-between items-center mb-6 mt-2 px-2">
              <div className="flex justify-end items-center">
                <span className="bg-base-primary text-white py-2 px-2 rounded-lg ml-auto text-sm">
                  {t("total")} {questions?.length} {t("questionsSmall")}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="light:text-black dark:text-white text-sm">{t("answers")}</span>
                <Switch checked={enabled} onValueChange={setEnabled} />
              </div>
            </div>
            <div className="flex justify-end items-center mb-4">
              <Button
                color="primary"
                className="py-2 px-2 rounded-lg ml-auto disabled:bg-primary/50"
                onClick={handleOpenAddQuestion}
              >
                {t("addNewButton")}
              </Button>
            </div>
            <AnimatePresence mode="popLayout">
              <ul>
                {questions?.map((question, index) => (
                  <Question
                    key={question.id}
                    question={question}
                    handleDeleteQuestion={handleDeleteQuestion}
                    handleEditQuestion={handleEditQuestion}
                    showAnswers={enabled}
                    index={index}
                  />
                ))}
              </ul>
            </AnimatePresence>
          </div>
        </motion.div>

        {currentQuestionIndex !== null && (
          <>
            <EditQuestionModal
              questionData={{
                questionTitle: questions[currentQuestionIndex]?.title,
                options: questions[currentQuestionIndex]?.answers.map(
                  (answer) => ({
                    content: answer.content,
                    id: answer.id,
                    isCorrect: answer.isCorrect,
                  })
                ),
                questionId: questions[currentQuestionIndex]?.id,
              }}
            />
            <DeleteQuestionModal
              onConfirmDelete={() =>
                handleConfirmDelete(
                  currentQuestionIndex,
                  questions[currentQuestionIndex]?.id
                )
              }
              questionTitle={questions[currentQuestionIndex]?.title}
            />
          </>
        )}
      </section>
      {type === "addQuestion" && <AddQuestionModal />}
    </>
  );
};

export default Questions;
