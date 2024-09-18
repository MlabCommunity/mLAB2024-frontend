"use client";

import React, { useState } from "react";
import Container from "@/components/shared/Container";
import QuizResults from "../../components/QuizResults";
import HistoryResults from "../../components/HistoryResults";
import TakeQuizBox from "../../components/TakeQuizBox";
import Quiz from "../../components/Quiz";
import { AnswerMapItemT, HistoryItemT } from "../../types";
import { useGetQuizParticipation } from "@/utils/hooks/useGetQuizParticipation";
import { useTakeQuizStore } from "@/store/takeQuizStore";

const TakeQuiz = ({ params }: { params: { id: string } }) => {
  const { data: quizParticipationData } = useGetQuizParticipation(params.id);
  const [isTakeQuizBoxVisible, setIsTakeQuizBoxVisible] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [answersMap, setAnswersMap] = useState<AnswerMapItemT>({});
  const [history, setHistory] = useState<HistoryItemT[]>([]);
  const { setAnswersId, setQuestionsId, questionsId, answersId } =
    useTakeQuizStore();

  const correctAnswers = history.filter(
    (item) => item.isCorrect === true
  ).length;

  const handleSelectAnswer = (answer: string, index: number) => {
    setAnswersMap((prev) => ({
      ...prev,
      [activeQuestion]: index,
    }));
  };

  const nextQuestion = () => {
    const currentQuestionId =
      quizParticipationData?.quizResponse.questions[activeQuestion]?.id;

    // Update questionsId array
    if (!questionsId.includes(currentQuestionId)) {
      setQuestionsId((prev) => [...prev, currentQuestionId]);
    }

    if (answersMap[activeQuestion] !== undefined) {
      const selectedAnswerId =
        quizParticipationData?.quizResponse.questions[activeQuestion].answers[
          answersMap[activeQuestion]!
        ].id;
      setAnswersId((prev) => {
        const newAnswersId = [...prev];
        const existingIndex = questionsId.indexOf(currentQuestionId);
        if (existingIndex >= 0) {
          newAnswersId[existingIndex] = selectedAnswerId;
        } else {
          newAnswersId.push(selectedAnswerId);
        }
        return newAnswersId;
      });
    }

    if (
      activeQuestion <
      quizParticipationData?.quizResponse.questions.length - 1
    ) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  return (
    <Container>
      <section className="flex items-center justify-center h-screen">
        {isTakeQuizBoxVisible && (
          <TakeQuizBox
            setIsTakeQuizBoxVisible={setIsTakeQuizBoxVisible}
            quizTitle={quizParticipationData?.quizResponse.title}
            quizDescription={quizParticipationData?.quizResponse.description}
            quizLength={quizParticipationData?.quizResponse.questions.length}
          />
        )}
        {!isTakeQuizBoxVisible && !showResult && (
          <Quiz
            questionHeading={
              quizParticipationData?.quizResponse.questions[activeQuestion]
                .title
            }
            currentQuestionNumber={activeQuestion + 1}
            answers={
              quizParticipationData?.quizResponse.questions[activeQuestion]
                .answers
            }
            handleSelectAnswer={handleSelectAnswer}
            selectedAnswerIndex={answersMap[activeQuestion]}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
            quizLength={quizParticipationData?.quizResponse.questions.length}
            setShowResult={setShowResult}
            questionsId={questionsId}
            answersId={answersId}
          />
        )}
        {showResult && !isHistoryVisible && (
          <QuizResults
            correctAnswers={correctAnswers}
            quizLength={quizParticipationData?.quizResponse.questions.length}
            setIsHistoryVisible={setIsHistoryVisible}
          />
        )}
        {isHistoryVisible && (
          <HistoryResults
            quizLength={quizParticipationData?.quizResponse.questions.length}
            correctAnswers={correctAnswers}
            history={history}
          />
        )}
      </section>
    </Container>
  );
};

export default TakeQuiz;
