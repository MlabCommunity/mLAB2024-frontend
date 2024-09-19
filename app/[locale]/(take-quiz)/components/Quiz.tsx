"use client";

import { cn } from "@/lib";
import { useModalStore } from "@/store/modalStore";
import { Button, Progress } from "@nextui-org/react";
import React, { SetStateAction } from "react";
import FinishQuizModal from "./FinishQuizModal";
import { useTranslations } from "next-intl";

interface QuizProps {
  questionHeading: string;
  currentQuestionNumber: number;
  answers: { id: string; content: string }[];
  handleSelectAnswer: (answer: string, index: number) => void;
  selectedAnswerIndex: number | undefined;
  nextQuestion: () => void;
  previousQuestion: () => void;
  quizLength: number;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  questionsId: string[];
  answersId: string[];
}

const Quiz = ({
  questionHeading,
  currentQuestionNumber,
  answers,
  handleSelectAnswer,
  selectedAnswerIndex,
  nextQuestion,
  previousQuestion,
  quizLength,
  setShowResult,
}: QuizProps) => {
  const { openModal } = useModalStore();
  const t = useTranslations("TakeQuiz");

  const progressValue = (currentQuestionNumber / quizLength) * 100;
  const isLastQuestion = currentQuestionNumber === quizLength;
  const isAnswerSelected = selectedAnswerIndex == undefined;

  return (
    <div className="bg-default-100 px-6 py-6 pt-8 rounded-xl flex flex-col gap-8 items-center w-[700px]">
      <Progress
        aria-label="Progress"
        value={progressValue}
        color="primary"
        className="w-full"
      />
      <div className="w-full">
        <p className="font-bold text-foreground-700">
          {currentQuestionNumber}. {questionHeading}
        </p>
      </div>
      <ul className="w-full flex flex-col gap-4">
        {answers.map((answer, index) => (
          <button
            onClick={() => handleSelectAnswer(answer?.content, index)}
            key={answer?.content}
          >
            <li
              key={index}
              className={cn(
                "flex flex-row justify-start gap-3 items-center w-full bg-white p-2 rounded-lg cursor-pointer hover:bg-primary transition-all group",
                selectedAnswerIndex === index && "bg-primary"
              )}
            >
              <span
                className={cn(
                  "text-foreground-700 text-base w-6 h-6 border-r-1 border-foreground-300 group-hover:text-white pr-1",
                  selectedAnswerIndex === index && "text-white border-white"
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <p
                className={cn(
                  "text-foreground-700 text-base group-hover:text-white",
                  selectedAnswerIndex === index && "text-white"
                )}
              >
                {answer?.content}
              </p>
            </li>
          </button>
        ))}
      </ul>
      <div className="flex justify-between w-full">
        {currentQuestionNumber > 1 && (
          <Button
            variant="solid"
            color="primary"
            radius="md"
            onClick={previousQuestion}
            className="text-white self-end text-medium py-1 px-2 cursor-pointer disabled:bg-primary/60 disabled:cursor-not-allowed disabled:hover:bg-primary/60"
          >
            {t("previous")}
          </Button>
        )}
        {isLastQuestion ? (
          <Button
            variant="solid"
            color="primary"
            radius="md"
            onClick={() => {
              nextQuestion();
              openModal("finishQuiz");
            }}
            disabled={isAnswerSelected}
            className="text-white self-end text-medium py-1 px-2 cursor-pointer disabled:bg-primary/60 disabled:cursor-not-allowed disabled:hover:bg-primary/60 ml-auto"
          >
            {t("finish")}
          </Button>
        ) : (
          <Button
            variant="solid"
            color="primary"
            radius="md"
            onClick={nextQuestion}
            disabled={isAnswerSelected}
            className="text-white self-end text-medium py-1 px-2 cursor-pointer disabled:bg-primary/60 disabled:cursor-not-allowed disabled:hover:bg-primary/60 ml-auto"
          >
            {t("next")}
          </Button>
        )}
      </div>
      <FinishQuizModal setShowResult={setShowResult} />
    </div>
  );
};

export default Quiz;
