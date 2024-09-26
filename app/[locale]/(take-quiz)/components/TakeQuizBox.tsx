"use client";

import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import TakeQuizBoxSkeleton from "./skeletons/TakeQuizBoxSkeleton";

interface TakeQuizBoxProps {
  setIsTakeQuizBoxVisible: (value: boolean) => void;
  quizTitle: string;
  quizDescription: string;
  quizLength: number;
}

const TakeQuizBox = ({
  setIsTakeQuizBoxVisible,
  quizDescription,
  quizTitle,
  quizLength,
}: TakeQuizBoxProps) => {
  const t = useTranslations("TakeQuiz");

  function onSubmit() {
    setIsTakeQuizBoxVisible(false);
  }

  const isQuizDataLoaded = quizDescription && quizTitle;

  return (
    <div className="bg-default-100 p-6 py-10 rounded-xl flex flex-col items-start gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-foreground-700 text-4xl font-semibold ml-1">
          {t("takeQuiz")}
        </p>
        <span className="text-foreground-600">{t("quizSubHeading")}</span>
      </div>
      {!isQuizDataLoaded ? (
        <TakeQuizBoxSkeleton />
      ) : (
        <div className="border-dashed border-2 border-gray-300 g-[#f4f4f5] p-6 md:justify-between flex flex-col gap-6 shadow-md hover:shadow-lg transition-shadow relative w-full h-auto rounded-lg">
          <div className="flex flex-row justify-between items-start">
            <div>
              <h3 className="font-semibold text-base text-default-700">
                {quizTitle}
              </h3>
              <p className="text-base font-medium text-default-600 mt-1">
                {quizDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex items-center -mt-3 py-1 rounded-lg bg-primary/20 px-3">
              <p className="text-base-primary text-small">
                {t("total")} {quizLength} {t("questions")}
              </p>
            </div>
          </div>
          <Button
            variant="solid"
            className="bg-base-primary text-white"
            onClick={onSubmit}
          >
            {t("takeQuiz")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TakeQuizBox;
