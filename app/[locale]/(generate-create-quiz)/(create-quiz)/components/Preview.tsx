import React, { useState } from "react";
import QuizItem from "./QuizItem";
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/react";
import SaveQuiz from "../../(generate-quiz)/components/buttons/SaveQuiz";
import NavigationControls from "../../(generate-quiz)/components/buttons/NavigationControls";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "@/utils/actions/quiz/createQuiz";
import toast from "react-hot-toast";
import { GeneratedQuestionT } from "../../types";
import AddQuestionGenerateModal from "../../(generate-quiz)/modals/AddQuestionGenerateModal";
import DeleteQuestionGenerateModal from "../../(generate-quiz)/modals/DeleteQuestionGenerateModal";
import EditQuestionGenerateModal from "../../(generate-quiz)/modals/EditQuestionGenerateModal";

import { AnimatePresence } from "framer-motion";

function Preview() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const selectedType = params.get("selectedType");

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: createQuiz,
    onError: (error) => {
      toast.error(error.message);
      setIsSubmitting(false);
    },
    onSuccess: (data) => {
      setGeneratedQuizData(data);
      toast.success(t("createdSuccessfullyMsg"));
      router.push(routes.createQuiz[3].route);
      setIsSubmitting(false);
    },
    onMutate: () => {
      toast.loading(t("creating"), { id: "loading-toast" });
      setIsSubmitting(true);
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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
      <aside className="bg-content2 p-6 mt-5 gap-6 flex flex-col rounded-lg">
        <div className="flex justify-between items-center mb-6 mt-2 px-2">
          <div className="flex justify-end items-center">
            <span className="bg-base-primary text-white py-2 px-2 rounded-lg ml-auto text-sm">
              {t("total")} {questions?.length} {t("questions")}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-black text-sm">{t("answers")}</span>
            <Switch
              className="order-0"
              size="md"
              checked={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.checked)}
              isDisabled={!questions}
            />
          </div>
        </div>
        <Button
          color="primary"
          className=" py-2 rounded-lg ml-auto disabled:bg-primary/50"
          radius="md"
          onClick={handleOpenAddQuestion}
          isDisabled={!questions}
        >
          {t("addNewQuestionBtn")}
        </Button>
        <AnimatePresence>
          {questions?.map((question, index) => (
            <QuizItem
              key={question.title}
              questionId={index + 1}
              number={index + 1}
              question={question.title}
              generateAnswers={question.generateAnswers}
              showCorrectAnswers={showCorrectAnswers}
              handleDelete={() => handleDeleteQuestion(index)}
              handleEdit={() => handleEditQuestion(index)}
            />
          ))}
        </AnimatePresence>
      </aside>
      <NavigationControls>
        <SaveQuiz />
      </NavigationControls>
      {type === "addQuestion" && (
        <AddQuestionGenerateModal setQuestions={setQuestions} />
      )}
      {currentQuestionIndex !== null && questions[currentQuestionIndex] && (
        <>
          <DeleteQuestionGenerateModal
            questionTitle={questions[currentQuestionIndex]?.title}
            onConfirmDelete={() => handleConfirmDelete(currentQuestionIndex)}
          />
          <EditQuestionGenerateModal
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
