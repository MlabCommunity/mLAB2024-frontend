"use client";
import React, { useState } from "react";
import QuizItem from "./Quiz/QuizItem";
import { Switch } from "@nextui-org/switch";
import { Button, Chip } from "@nextui-org/react";
import SaveQuiz from "../../create-quiz/components/buttons/SaveQuiz";
import NavigationControls from "../../create-quiz/components/buttons/NavigationControls";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import DeleteQuestionModal from "@/app/[locale]/(questions_on_answers)/modals/DeleteQuestionModal";
import EditQuestionModal from "@/app/[locale]/(questions_on_answers)/modals/EditQuestionModal";
import AddQuestionModal from "@/app/[locale]/modals/AddQuestionModal";

const mockQuestions = {
  title: "What is the purpose of quantum physics?",
  description: "Test your knowledge about the purpose of quantum physics",
  generateQuestionsDto: [
    {
      title: "What is the primary goal of quantum physics?",
      generateAnswersDto: [
        {
          content: "To understand the behavior of macroscopic objects",
          iscorrect: false,
        },
        {
          content: "To understand the behavior of microscopic particles",
          iscorrect: false,
        },
        {
          content: "To understand the fundamental laws of the universe",
          iscorrect: true,
        },
        {
          content: "To develop new technologies",
          iscorrect: false,
        },
      ],
    },
    {
      title: "What is the main application of quantum physics?",
      generateAnswersDto: [
        {
          content: "Medical research",
          iscorrect: false,
        },
        {
          content: "Computer science",
          iscorrect: false,
        },
        {
          content: "Materials science",
          iscorrect: false,
        },
        {
          content: "Understanding the behavior of matter and energy",
          iscorrect: true,
        },
      ],
    },
    {
      title: "What is the primary focus of quantum physics?",
      generateAnswersDto: [
        {
          content: "The behavior of macroscopic objects",
          iscorrect: false,
        },
        {
          content: "The behavior of microscopic particles",
          iscorrect: true,
        },
        {
          content: "The behavior of living organisms",
          iscorrect: false,
        },
        {
          content: "The behavior of the universe as a whole",
          iscorrect: false,
        },
      ],
    },
    {
      title: "What is the main benefit of quantum physics?",
      generateAnswersDto: [
        {
          content: "Improved medical treatments",
          iscorrect: false,
        },
        {
          content: "New technologies and innovations",
          iscorrect: true,
        },
        {
          content: "Better understanding of the universe",
          iscorrect: false,
        },
        {
          content: "Increased funding for research",
          iscorrect: false,
        },
      ],
    },
  ],
};

function Preview() {
  const router = useRouter();
  const t = useTranslations("QuizPreview");
  const { closeModal, openModal, setModalData, isOpen, type } = useModalStore();

  const [questions, setQuestions] = useState(
    mockQuestions.generateQuestionsDto
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(routes.createQuiz[3].route);
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
      setCurrentQuestionIndex(null); // Reset index when there are no questions
      closeModal(); // Close any open modal since there's no data to show
    } else {
      // If questions remain, keep the index within bounds
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
        ...updatedQuizData[currentQuestionIndex], // Retain existing properties
        title: updatedQuestion.question, // Update the title
        generateAnswersDto: updatedQuestion.options.map((option: string) => ({
          content: option,
          iscorrect: updatedQuestion.selected === option,
        })),
      };
      setQuestions(updatedQuizData);
      closeModal(); // Ensure the modal is closed after saving
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
              {t("numberOfQuestions")}
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
            {questions.length === 0 ? (
              <p>No questions available.</p>
            ) : (
              questions.map((question, index) => (
                <QuizItem
                  key={index}
                  questionId={index + 1}
                  number={index + 1}
                  question={question.title}
                  options={question.generateAnswersDto} // Pass the full array with content and iscorrect
                  description={""}
                  showCorrectAnswers={showCorrectAnswers} // Make sure this prop is being passed
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
                options: questions[currentQuestionIndex].generateAnswersDto.map(
                  (ans) => ans.content
                ),
                selected:
                  questions[currentQuestionIndex].generateAnswersDto.find(
                    (ans) => ans.iscorrect
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
