import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button, Progress } from "@nextui-org/react";

import Container from "@/components/shared/Container";
import { cn } from "@/lib";
import { routes } from "@/routes";
import { useQuizParticipationResult } from "@/utils/hooks/useQuizParticipationResult";
import checkCircle from "@/public/assets/check-circle.svg";
import cancelCircle from "@/public/assets/circle-cancel.svg";
import { QuizParticipationT } from "../types";

const HistoryResults = () => {
  const t = useTranslations("TakeQuiz");
  const params = useParams();
  const { data: quizData } = useQuizParticipationResult(
    params.id as string
  ) as { data: QuizParticipationT };

  const {
    quizDetails,
    userAnswers,
    correctAnswers,
    totalQuestions,
    scorePercentage,
  } = quizData;

  return (
    <Container>
      <section className="bg-default-100 py-8 max-w-3xl mx-auto px-6 flex flex-col gap-6 mt-8 rounded-lg">
        <Progress
          aria-label="Quiz Progress"
          value={scorePercentage}
          color="primary"
          className="w-full"
        />
        <div className="flex justify-between">
          <h3 className="text-4xl text-foreground-700 font-semibold">
            {t("quizResults")}
          </h3>
          <p className="text-foreground-600">
            {t("yourScore")}: {correctAnswers}/{totalQuestions}
          </p>
        </div>
        {quizDetails.questions.map((question, questionIndex) => {
          const userAnswer = userAnswers.find(
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
        <Link href={routes.dashboard} className="ml-auto">
          <Button variant="flat" color="primary">
            {t("home")}
          </Button>
        </Link>
      </section>
    </Container>
  );
};

export default HistoryResults;
