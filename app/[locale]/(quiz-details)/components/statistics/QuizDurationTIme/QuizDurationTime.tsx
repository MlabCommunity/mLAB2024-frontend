import { getPluralForm } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import React from "react";

const QuizDurationTime = ({
  durationInSeconds,
}: {
  durationInSeconds: number;
}) => {
  const t = useTranslations("quizDetails");

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minuteStr =
      minutes > 0 ? `${minutes} ${t(getPluralForm(minutes, "minute"))}` : "";
    const secondStr =
      remainingSeconds > 0
        ? `${remainingSeconds} ${t(getPluralForm(remainingSeconds, "second"))}`
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
