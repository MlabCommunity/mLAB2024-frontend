"use client";
import React, { useState } from "react";
import QuizItem from "./QuizItem";
import { Switch } from "@nextui-org/switch";
import { Button, Chip, Skeleton } from "@nextui-org/react";
import SaveQuiz from "../../../(generate-quiz)/generate-quiz/components/buttons/SaveQuiz";
import NavigationControls from "../../../(generate-quiz)/generate-quiz/components/buttons/NavigationControls";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";

import DeleteQuestionModal from "@/app/[locale]/(quiz-details)/modals/DeleteQuestionModal";
import EditQuestionModal from "@/app/[locale]/(quiz-details)/modals/EditQuestionModal";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "@/utils/actions/quiz/createQuiz";
import toast from "react-hot-toast";
import AddQuestionModal from "@/app/[locale]/modals/AddQuestionModal";
import { GeneratedQuizT } from "@/types";

function Preview() {
  const { generatedQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const t = useTranslations("QuizPreview");
  const { closeModal, openModal, setModalData, type } = useModalStore();
  const router = useRouter();

  const [questions, setQuestions] = useState<GeneratedQuizT[]>(
    generatedQuizData?.createQuestionsDto
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

  const skeletonItems = Array.from({ length: 6 });

  const { mutate } = useMutation({
    mutationFn: createQuiz,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setGeneratedQuizData(data);
      toast.success(t("createdSuccessfullyMsg"));
      router.push(routes.createQuiz[3].route);
    },
    onMutate: () => {
      toast.loading(t("creating"), { id: "loading-toast" });
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });

  console.log(questions);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      quizDto: {
        ...generatedQuizData,
        createQuestionsDto: questions,
      },
    });
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

  const handleEditQuestion = (index: number) => {
    if (questions[index]) {
      setCurrentQuestionIndex(index);
      openModal("editQuestion");
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
        createAnswersDto: updatedQuestion.options.map((option: string) => ({
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
    <form onSubmit={onSubmit} className="flex-col flex rounded-lg">
      <aside className="bg-content2 p-6 mt-5 gap-6 flex flex-col">
        <div className="flex gap-3 sm:gap-2 md:gap-0 justify-between items-center">
          {!questions ? (
            <Skeleton className="h-8 w-1/4 rounded-lg" />
          ) : (
            <Chip color="primary" size="md" radius="sm">
              Total {questions?.length} questions
            </Chip>
          )}
          <div className="flex items-center flex-col sm:flex-row gap-2">
            <label className="text-sm order-1" htmlFor="answers">
              {t("answers")}
            </label>
            <Switch
              className="order-0"
              size="lg"
              color="default"
              checked={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.checked)}
              isDisabled={!questions}
            />
          </div>
        </div>
        <Button
          className="self-end pr-6 pl-6"
          variant="flat"
          color="primary"
          size="sm"
          radius="md"
          onClick={handleOpenAddQuestion}
          isDisabled={!questions}
        >
          {t("addNewQuestionBtn")}
        </Button>
        <div>
          {questions
            ? questions.map((question, index) => (
                <QuizItem
                  key={index}
                  questionId={index + 1}
                  number={index + 1}
                  question={question.title}
                  options={question.createAnswersDto}
                  showCorrectAnswers={showCorrectAnswers}
                  handleDelete={() => handleDeleteQuestion(index)}
                  handleEdit={() => handleEditQuestion(index)}
                />
              ))
            : skeletonItems.map((_, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-5/6 rounded-lg" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </div>
              ))}
        </div>
      </aside>
      <NavigationControls>
        <SaveQuiz />
      </NavigationControls>
      {type === "addQuestion" && <AddQuestionModal />}
      {currentQuestionIndex !== null && questions[currentQuestionIndex] && (
        <>
          <DeleteQuestionModal
            questionTitle={questions[currentQuestionIndex]?.title}
            onConfirmDelete={() => handleConfirmDelete(currentQuestionIndex)}
            questionDescription={questions[currentQuestionIndex].title}
          />
          <EditQuestionModal
            questionData={{
              question: questions[currentQuestionIndex].title,
              description: questions[currentQuestionIndex].title,
              options: questions[currentQuestionIndex].createAnswersDto.map(
                (ans) => ans.content
              ),
              selected:
                questions[currentQuestionIndex].createAnswersDto.find(
                  (ans) => ans.isCorrect
                )?.content || "",
            }}
            onSave={handleSaveEdit}
          />
        </>
      )}
    </form>
  );
}

export default Preview;
