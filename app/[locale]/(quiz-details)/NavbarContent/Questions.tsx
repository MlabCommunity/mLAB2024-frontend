"use client";
import React, { useState } from "react";
import Image from "next/image";
import editIcon from "/public/assets/edit.svg";
import binIcon from "/public/assets/bin.svg";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import EditQuestionModal from "../modals/EditQuestionModal";
import DeleteQuestionModal from "../modals/DeleteQuestionModal";
import { Button, Switch } from "@nextui-org/react";
import AddQuestionModal from "../modals/AddQuestionModal";
import { cn } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/utils/actions/quiz/deleteQuestion";
import toast from "react-hot-toast";
import { GeneratedQuestionsT, QuestionsT } from "../types";
import { useQuizDetailStore } from "@/store/quizDetailsStore";
import QuestionsSkeleton from "../components/skeletons/QuestionsSkeleton";

const Questions = () => {
  const { questions, setQuestionsData } = useQuizDetailStore();
  const queryClient = useQueryClient();
  const [enabled, setEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const { openModal, setModalData, closeModal, type } = useModalStore();
  const t = useTranslations("QuestionsOnAnswers");

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
    if (updatedQuizData.length === 0) {
      closeModal();
    } else {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex as number, updatedQuizData.length - 1)
      );
    }
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
        <div className=" bg-content2 py-4 px-4 rounded-lg">
          <div className="flex justify-between items-center mb-6 mt-2 px-2">
            <div className="flex justify-end items-center">
              <span className="bg-base-primary text-white py-2 px-2 rounded-lg ml-auto text-sm">
                {t("total")} {questions?.length} {t("questionsSmall")}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-black text-sm">{t("answers")}</span>
              <Switch checked={enabled} onValueChange={setEnabled} />
            </div>
          </div>
          <div className="flex justify-end items-center mb-4">
            <Button
              color="primary"
              className=" py-2 px-2 rounded-lg ml-auto disabled:bg-primary/50"
              onClick={handleOpenAddQuestion}
            >
              {t("addNewButton")}
            </Button>
          </div>
          <ul>
            {questions?.map((data, index) => (
              <li
                key={index}
                className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
              >
                <div className="w-full">
                  <h4 className="font-bold mb-2 text-foreground-700">
                    {index + 1}. {data?.title}
                  </h4>
                  <p className="text-foreground-500 mb-4">
                    {data?.description}
                  </p>
                  <div className="space-y-2 mt-2">
                    {data?.answers?.map((answer: any, i: number) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center p-2 rounded-lg cursor-pointer",
                          enabled && answer.isCorrect
                            ? "bg-success-100"
                            : "bg-white"
                        )}
                      >
                        <span className="font-medium text-foreground-700">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="border-l border-b-gray-700 h-6 mx-2" />
                        <span className="text-foreground-700">
                          {answer.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditQuestion(index)}>
                    <Image src={editIcon} alt="edit icon" />
                  </button>
                  <button onClick={() => handleDeleteQuestion(index)}>
                    <Image src={binIcon} alt="bin icon" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {currentQuestionIndex !== null && (
          <>
            <EditQuestionModal
              questionData={{
                questionTitle: questions[currentQuestionIndex]?.title,
                options: questions[currentQuestionIndex]?.answers.map(
                  (answer) => {
                    return {
                      content: answer.content,
                      id: answer.id,
                      isCorrect: answer.isCorrect,
                    };
                  }
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
