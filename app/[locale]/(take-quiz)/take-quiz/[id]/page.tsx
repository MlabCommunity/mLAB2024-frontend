"use client";

import React, { useState, useCallback, useMemo } from "react";
import Container from "@/components/shared/Container";
import QuizResults from "../../components/QuizResults";
import HistoryResults from "../../components/HistoryResults";
import TakeQuizBox from "../../components/TakeQuizBox";
import Quiz from "../../components/Quiz";
import { AnswerMapItemT } from "../../types";
import { useGetQuizParticipation } from "@/utils/hooks/useGetQuizParticipation";
import { useTakeQuizStore } from "@/store/takeQuizStore";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const TakeQuiz = ({ params }: { params: { id: string } }) => {
  const { data: quizParticipationData } = useGetQuizParticipation(params.id);
  const t = useTranslations("TakeQuiz");

  const [quizState, setQuizState] = useState({
    isTakeQuizBoxVisible: true,
    activeQuestion: 0,
    showResult: false,
    isHistoryVisible: false,
  });
  const [answersMap, setAnswersMap] = useState<AnswerMapItemT>({});
  const { setAnswersId, setQuestionsId, questionsId, answersId } =
    useTakeQuizStore();
  const [toastShown, setToastShown] = useState(false);

  const handleSelectAnswer = useCallback(
    (_answer: string, index: number) => {
      setAnswersMap((prev) => ({
        ...prev,
        [quizState.activeQuestion]: index,
      }));
    },
    [quizState.activeQuestion]
  );

  const updateQuizProgress = useCallback(() => {
    const currentQuestionId =
      quizParticipationData?.quizResponse.questions[quizState.activeQuestion]
        ?.id;

    if (currentQuestionId && !questionsId.includes(currentQuestionId)) {
      setQuestionsId((prev) => [...prev, currentQuestionId]);
    }

    if (answersMap[quizState.activeQuestion] !== undefined) {
      const selectedAnswerId =
        quizParticipationData?.quizResponse.questions[quizState.activeQuestion]
          .answers[answersMap[quizState.activeQuestion]!].id;

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
  }, [
    quizState.activeQuestion,
    answersMap,
    quizParticipationData,
    questionsId,
    setQuestionsId,
    setAnswersId,
  ]);

  const nextQuestion = useCallback(() => {
    updateQuizProgress();
    setQuizState((prev) => ({
      ...prev,
      activeQuestion: Math.min(
        prev.activeQuestion + 1,
        (quizParticipationData?.quizResponse.questions.length ?? 0) - 1
      ),
    }));
  }, [
    updateQuizProgress,
    quizParticipationData?.quizResponse.questions.length,
  ]);

  const previousQuestion = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      activeQuestion: Math.max(prev.activeQuestion - 1, 0),
    }));
  }, []);

  const currentQuestion = useMemo(
    () =>
      quizParticipationData?.quizResponse.questions[quizState.activeQuestion],
    [quizParticipationData, quizState.activeQuestion]
  );

  if (quizParticipationData) {
    if (!toastShown) {
      toast.success(t("joined"));
      setToastShown(true);
    }
  }

  return (
    <Container>
      <section className="flex items-center justify-center min-h-screen">
        {quizState.isTakeQuizBoxVisible && (
          <TakeQuizBox
            setIsTakeQuizBoxVisible={(visible) =>
              setQuizState((prev) => ({
                ...prev,
                isTakeQuizBoxVisible: visible,
              }))
            }
            quizTitle={quizParticipationData?.quizResponse.title}
            quizDescription={quizParticipationData?.quizResponse.description}
            quizLength={quizParticipationData?.quizResponse.questions.length}
          />
        )}
        {!quizState.isTakeQuizBoxVisible &&
          !quizState.showResult &&
          currentQuestion && (
            <Quiz
              questionHeading={currentQuestion.title}
              currentQuestionNumber={quizState.activeQuestion + 1}
              answers={currentQuestion.answers}
              handleSelectAnswer={handleSelectAnswer}
              selectedAnswerIndex={answersMap[quizState.activeQuestion]}
              nextQuestion={nextQuestion}
              previousQuestion={previousQuestion}
              quizLength={quizParticipationData?.quizResponse.questions.length}
              setShowResult={(show) =>
                setQuizState((prev) => ({
                  ...prev,
                  showResult:
                    typeof show === "function" ? show(prev.showResult) : show,
                }))
              }
              questionsId={questionsId}
              answersId={answersId}
            />
          )}
        {quizState.showResult && !quizState.isHistoryVisible && (
          <QuizResults
            setIsHistoryVisible={(visible) =>
              setQuizState((prev) => ({ ...prev, isHistoryVisible: visible }))
            }
          />
        )}
        {quizState.isHistoryVisible && <HistoryResults />}
      </section>
    </Container>
  );
};

export default TakeQuiz;
