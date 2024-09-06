"use client";
import React, { useState } from "react";
import Image from "next/image";
import editIcon from "/public/assets/edit.svg";
import binIcon from "/public/assets/bin.svg";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import EditQuestionModal from "../modals/EditQuestionModal";
import DeleteQuestionModal from "../modals/DeleteQuestionModal";
import { QuizDataT } from "@/types";
import { Button, Switch, Skeleton } from "@nextui-org/react";
import AddQuestionModal from "../../modals/AddQuestionModal";
import { cn } from "@/lib";

interface QuestionsProps {
  questions: QuizDataT[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizDataT[]>>;
  isFetching: boolean;
}

const Questions = ({ questions, setQuestions, isFetching }: QuestionsProps) => {
  const [enabled, setEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const { openModal, setModalData, closeModal, type } = useModalStore();
  const t = useTranslations("QuestionsOnAnswers");

  const handleEditQuestion = (index: number) => {
    if (questions[index]) {
      setCurrentQuestionIndex(index);
      openModal("editQuestion");
    }
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions[index]) {
      setCurrentQuestionIndex(index);
      openModal("deleteQuestion");
      setModalData({
        title: questions[index].title,
        description: questions[index].title,
        status: "Error",
        questions: 2,
        onConfirmDelete: () => handleConfirmDelete(index),
      });
    }
  };

  const handleConfirmDelete = (index: number) => {
    const updatedQuizData = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuizData);
    if (updatedQuizData.length === 0) {
      setCurrentQuestionIndex(null);
      closeModal();
    } else {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex as number, updatedQuizData.length - 1)
      );
    }
  };

  const handleSaveEdit = (updatedQuestion: any) => {
    if (
      currentQuestionIndex !== null &&
      currentQuestionIndex < questions.length
    ) {
      const updatedQuizData = [...questions];
      updatedQuizData[currentQuestionIndex] = {
        ...updatedQuizData[currentQuestionIndex],
        title: updatedQuestion.question,
        description: updatedQuestion.description,
        answers: updatedQuestion.options.map((option: string) => ({
          content: option,
          isCorrect: updatedQuestion.selected === option,
        })),
      };
      setQuestions(updatedQuizData);
      closeModal();
    }
  };

  const handleOpenAddQuestion = () => {
    openModal("addQuestion");
  };

  return (
    <>
      <section data-navbar-item="questions">
        <div className=" bg-content2 py-4 px-4 rounded-lg">
          <div className="flex justify-between items-center mb-6 mt-2 px-2">
            <div className="flex justify-end items-center">
              {isFetching ? (
                <Skeleton className="w-32 rounded-lg h-10" />
              ) : (
                <span className="bg-base-primary text-white py-2 px-2 rounded-lg ml-auto text-sm">
                  {t("total")} {questions?.length} {t("questionsSmall")}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-black text-sm">{t("answers")}</span>
              <Switch
                checked={enabled}
                onValueChange={setEnabled}
                isDisabled={isFetching}
              />
            </div>
          </div>
          <div className="flex justify-end items-center mb-4">
            <Button
              color="primary"
              className=" py-2 px-2 rounded-lg ml-auto disabled:bg-primary/50"
              onClick={handleOpenAddQuestion}
              isDisabled={isFetching}
            >
              {t("addNewButton")}
            </Button>
          </div>
          <ul>
            {(isFetching ? Array(3).fill(null) : questions)?.map(
              (data, index) =>
                data ? (
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
                ) : (
                  <li
                    key={index}
                    className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
                  >
                    <div className="w-full">
                      <Skeleton className="h-6 w-3/4 mb-2 rounded-lg" />
                      <Skeleton className="h-4 w-5/6 mb-4 rounded-lg" />
                      <Skeleton className="space-y-2 mt-2 rounded-lg">
                        <Skeleton className="h-8 w-full mb-2 rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                      </Skeleton>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditQuestion(index)}
                        disabled={true}
                        className="disabled:cursor-not-allowed"
                      >
                        <Image src={editIcon} alt="edit icon" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(index)}
                        disabled={true}
                        className="disabled:cursor-not-allowed"
                      >
                        <Image src={binIcon} alt="bin icon" />
                      </button>
                    </div>
                  </li>
                )
            )}
          </ul>
          <Button
            className="flex ml-auto disabled:bg-primary/50"
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            type="submit"
            isDisabled={isFetching}
          >
            {t("save")}
          </Button>
        </div>

        {currentQuestionIndex !== null && (
          <>
            <EditQuestionModal
              questionData={{
                question: questions[currentQuestionIndex].title,
                description: questions[currentQuestionIndex].description,
                options: questions[currentQuestionIndex].answers.map(
                  (answer) => answer.content
                ),
                selected: questions[currentQuestionIndex].answers.find(
                  (answer) => answer.isCorrect
                )?.content as string,
              }}
              onSave={handleSaveEdit}
            />
            <DeleteQuestionModal
              onConfirmDelete={() => handleConfirmDelete(currentQuestionIndex)}
              questionTitle={questions[currentQuestionIndex].title}
              questionDescription={questions[currentQuestionIndex].description}
            />
          </>
        )}
      </section>
      {type === "addQuestion" && (
        <AddQuestionModal setQuestions={setQuestions} />
      )}
    </>
  );
};

export default Questions;
