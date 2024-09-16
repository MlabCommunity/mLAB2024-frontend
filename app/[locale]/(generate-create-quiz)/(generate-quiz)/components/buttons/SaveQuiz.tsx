"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import RightArrow from "./RightArrow";
import { useTranslations } from "next-intl";

const SaveQuiz = () => {
  const t = useTranslations("QuizPreview");
  return (
    <Button
      endContent={<RightArrow />}
      variant="solid"
      color="primary"
      size="lg"
      radius="sm"
      type="submit"
    >
      {t("saveQuizButton")}
    </Button>
  );
};

export default SaveQuiz;
