import { useTranslations } from "next-intl";
import React from "react";

const QuizDurationTime = ({
  durationInSeconds,
}: {
  durationInSeconds: number;
}) => {
  const t = useTranslations("QuestionsOnAnswers");

  // Helper function to determine the correct form based on the number
  const getPluralForm = (count: number, key: string) => {
    if (count === 1) return t(`${key}_one`);
    if (count > 1 && count < 5) return t(`${key}_few`);
    return t(`${key}_many`);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minuteStr =
      minutes > 0 ? `${minutes} ${getPluralForm(minutes, "minutes")}` : "";
    const secondStr =
      remainingSeconds > 0
        ? `${remainingSeconds} ${getPluralForm(remainingSeconds, "seconds")}`
        : "";

    if (minutes > 0 && remainingSeconds > 0) {
      return `${minuteStr} ${secondStr}`;
    } else if (minutes > 0) {
      return minuteStr;
    } else {
      return secondStr;
    }
  };

  return <>{formatDuration(durationInSeconds)}</>;
};

export default QuizDurationTime;
