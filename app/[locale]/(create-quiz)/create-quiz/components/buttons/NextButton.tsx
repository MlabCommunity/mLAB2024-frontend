import React from "react";
import { Button } from "@nextui-org/button";
import RightArrow from "./RightArrow";
import { useFormStatus } from "react-dom";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
const NextButton = () => {
  const t = useTranslations("CreateQuiz");
  return (
    <Button
      type="submit"
      variant="solid"
      color="primary"
      size="lg"
      radius="sm"
      endContent={<RightArrow />}
    >
      {t("nextButton")}
    </Button>
  );
};

export default NextButton;
