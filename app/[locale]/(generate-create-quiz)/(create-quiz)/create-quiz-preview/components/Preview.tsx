"use client";
import React, { useState } from "react";
import QuizItem from "./QuizItem";
import { Switch } from "@nextui-org/switch";
import { Button, Chip } from "@nextui-org/react";
import SaveQuiz from "../../../(generate-quiz)/generate-quiz/components/buttons/SaveQuiz";
import NavigationControls from "../../../(generate-quiz)/generate-quiz/components/buttons/NavigationControls";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "@/utils/actions/quiz/createQuiz";
import toast from "react-hot-toast";
import { GeneratedQuestionT } from "../../../types";
import DeleteQuestionModal from "../../../(generate-quiz)/modals/DeleteQuestionModal";
import EditQuestionModal from "../../../(generate-quiz)/modals/EditQuestionModal";
import AddQuestionModal from "../../../(generate-quiz)/modals/AddQuestionModal";

function Preview() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const selectedType = params.get("selectedType");
  console.log(selectedType);

  const { generatedQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const t = useTranslations("QuizPreview");
  const { closeModal, openModal, setModalData, type } = useModalStore();
  const router = useRouter();

  const [questions, setQuestions] = useState<GeneratedQuestionT[]>(
    generatedQuizData?.generateQuestions
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(generatedQuizData);
    mutate({
      title: generatedQuizData.title,
      description: generatedQuizData.description,
      questionType: selectedType,
      createQuizQuestions: questions.map((question) => {
        return {
          title: question.title,
          createQuizAnswers: question.generateAnswers.map((answer) => {
            return {
              content: answer.content,
              isCorrect: answer.isCorrect,
            };
          }),
        };
      }),
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

  const handleOpenAddQuestion = () => {
    openModal("addQuestion");
  };

  return (
    <form onSubmit={onSubmit} className="flex-col flex rounded-lg">
      <aside className="bg-content2 p-6 mt-5 gap-6 flex flex-col">
        <div className="flex gap-3 sm:gap-2 md:gap-0 justify-between items-center">
          <Chip color="primary" size="md" radius="sm">
            Total {questions?.length} questions
          </Chip>
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
        {questions?.map((question, index) => (
          <QuizItem
            key={index}
            questionId={index + 1}
            number={index + 1}
            question={question.title}
            generateAnswers={question.generateAnswers}
            showCorrectAnswers={showCorrectAnswers}
            handleDelete={() => handleDeleteQuestion(index)}
            handleEdit={() => handleEditQuestion(index)}
          />
        ))}
      </aside>
      <NavigationControls>
        <SaveQuiz />
      </NavigationControls>
      {type === "addQuestion" && (
        <AddQuestionModal setQuestions={setQuestions} />
      )}
      {currentQuestionIndex !== null && questions[currentQuestionIndex] && (
        <>
          <DeleteQuestionModal
            questionTitle={questions[currentQuestionIndex]?.title}
            onConfirmDelete={() => handleConfirmDelete(currentQuestionIndex)}
          />
          <EditQuestionModal
            questionData={{
              questionTitle: questions[currentQuestionIndex].title,
              options: questions[currentQuestionIndex].generateAnswers,
            }}
            setQuestions={setQuestions}
            questions={questions}
          />
        </>
      )}
    </form>
  );
}

export default Preview;
