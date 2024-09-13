"use client";

import React, { useState } from "react";
import Container from "@/components/shared/Container";
import QuizResults from "../../components/QuizResults";
import HistoryResults from "../../components/HistoryResults";
import TakeQuizBox from "../../components/TakeQuizBox";
import Quiz from "../../components/Quiz";
import { quizData } from "@/constants";
import { AnswerMapItemT, HistoryItemT } from "../../types";

const TakeQuiz = () => {
  const [isTakeQuizBoxVisible, setIsTakeQuizBoxVisible] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [answersMap, setAnswersMap] = useState<AnswerMapItemT>({});
  const [history, setHistory] = useState<HistoryItemT[]>([]);

  const { questions } = quizData;
  const { question, answers, correctAnswer } = questions[activeQuestion];
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
    if (answersMap[activeQuestion] !== undefined) {
      const selectedAnswer = answers[answersMap[activeQuestion]!];
      const isCorrect =
        answersMap[activeQuestion] ===
        questions[activeQuestion].answers.indexOf(correctAnswer);

      setHistory((prev) => {
        const updatedHistory = [...prev];
        const existingIndex = updatedHistory.findIndex(
          (item) => item.question === question
        );

        const options = answers.map((answer) => ({
          answer,
          properValue: answer === correctAnswer,
        }));

        const newHistoryItem = {
          question,
          selectedAnswer,
          isCorrect,
          options,
        };

        if (existingIndex >= 0) {
          updatedHistory[existingIndex] = newHistoryItem;
        } else {
          updatedHistory.push(newHistoryItem);
        }

        return updatedHistory;
      });
    }

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
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
            quizTitle={quizData.title}
            quizDescription={quizData.description}
            quizLength={questions.length}
          />
        )}
        {!isTakeQuizBoxVisible && !showResult && (
          <Quiz
            questionHeading={questions[activeQuestion].question}
            questionDescription={questions[activeQuestion].description}
            currentQuestionNumber={activeQuestion + 1}
            answers={answers}
            handleSelectAnswer={handleSelectAnswer}
            selectedAnswerIndex={answersMap[activeQuestion]}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
            quizLength={questions.length}
            setShowResult={setShowResult}
          />
        )}
        {showResult && !isHistoryVisible && (
          <QuizResults
            correctAnswers={correctAnswers}
            quizLength={questions.length}
            setIsHistoryVisible={setIsHistoryVisible}
          />
        )}
        {isHistoryVisible && (
          <HistoryResults
            quizLength={questions.length}
            correctAnswers={correctAnswers}
            history={history}
          />
        )}
      </section>
    </Container>
  );
};

export default TakeQuiz;
