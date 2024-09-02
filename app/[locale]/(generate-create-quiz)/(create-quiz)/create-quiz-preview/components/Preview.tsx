"use client";
import React, { useState } from "react";
import QuizItem from "./QuizItem";
import { Switch } from "@nextui-org/switch";
import { Button, Chip } from "@nextui-org/react";
import SaveQuiz from "../../../(generate-quiz)/generate-quiz/components/buttons/SaveQuiz";
import NavigationControls from "../../../(generate-quiz)/generate-quiz/components/buttons/NavigationControls";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import DeleteQuestionModal from "@/app/[locale]/(questions_on_answers)/modals/DeleteQuestionModal";
import EditQuestionModal from "@/app/[locale]/(questions_on_answers)/modals/EditQuestionModal";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "@/utils/actions/quiz/createQuiz";
import toast from "react-hot-toast";
import { QuestionsT } from "@/types";
import AddQuestionModal from "@/app/[locale]/modals/AddQuestionModal";

function Preview() {
  const { generatedQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const router = useRouter();
  const t = useTranslations("QuizPreview");
  const { closeModal, openModal, setModalData, isOpen, type } = useModalStore();

  const [questions, setQuestions] = useState<QuestionsT[]>(
    generatedQuizData?.createQuestionsDto
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
      router.push(routes.createQuiz[3].route);
      toast.success(t("createdSuccessfullyMsg"));
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
    <>
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
          >
            {t("addNewQuestionBtn")}
          </Button>
          <div>
            {questions?.length === 0 ? (
              <p>No questions available.</p>
            ) : (
              questions?.map((question, index) => (
                <QuizItem
                  key={index}
                  questionId={index + 1}
                  number={index + 1}
                  question={question.title}
                  options={question.createAnswersDto}
                  description={""}
                  showCorrectAnswers={showCorrectAnswers}
                  handleDelete={() => handleDeleteQuestion(index)}
                  handleEdit={() => handleEditQuestion(index)}
                />
              ))
            )}
          </div>
        </aside>
        <NavigationControls>
          <SaveQuiz />
        </NavigationControls>
        {/* Conditional rendering for AddQuestionModal */}
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
    </>
  );
}

export default Preview;
