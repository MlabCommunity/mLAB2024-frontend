import React, { useEffect } from "react";
import { Button, Progress } from "@nextui-org/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "@/lib";
import { useQuizParticipationResult } from "@/utils/hooks/useQuizParticipationResult";
import QuizResultsSkeleton from "./skeletons/QuizResultsSkeleton";
import happyReaction from "@/public/assets/happy-reaction.svg";
import badReaction from "@/public/assets/bad-reaction.svg";

interface QuizResultsProps {
  setIsHistoryVisible: (visible: boolean) => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ setIsHistoryVisible }) => {
  const { id } = useParams();
  const t = useTranslations("TakeQuiz");
  const { data, isLoading } = useQuizParticipationResult(id as string);

  useEffect(() => {
    if (data) {
      toast.dismiss("calculating-quiz-result");
      toast.success(t("quizResultSuccess"));
    }
  }, [data, t]);

  if (isLoading || !data) {
    return <QuizResultsSkeleton />;
  }

  const { scorePercentage, correctAnswers, totalQuestions } = data;
  const isGoodScore = scorePercentage > 60;
  const message = isGoodScore ? t("awesome") : t("notYourDay");
  const reactionImage = isGoodScore ? happyReaction : badReaction;

  return (
    <div className="bg-default-100 px-6 py-8 rounded-xl flex flex-col gap-8 items-center w-[700px]">
      <Progress
        aria-label="Progress"
        value={100}
        color="primary"
        className="w-full"
      />
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-4xl font-semibold text-foreground-700">
          {t("summary")}
        </h2>
        <p className="text-foreground-600 text-base mt-1">{t("thankYou")}</p>
        <h3 className="text-4xl font-semibold text-foreground-700 mt-2">
          {t("yourScoreIs")}
        </h3>
        <p
          className={cn(
            "text-4xl font-semibold mt-2 text-center",
            isGoodScore ? "text-green-700" : "text-red-700"
          )}
        >
          {correctAnswers}/{totalQuestions}
        </p>
        <p
          className={cn(
            "text-2xl font-semibold text-center -mt-2",
            isGoodScore ? "text-green-700" : "text-red-700"
          )}
        >
          {message}
        </p>
        <Image
          alt={isGoodScore ? "happy-animation" : "bad-animation"}
          src={reactionImage}
          className="self-center mt-2"
        />
      </div>
      <Button
        color="primary"
        className="ml-auto"
        onClick={() => setIsHistoryVisible(true)}
      >
        {t("seeResults")}
      </Button>
    </div>
  );
};

export default QuizResults;
