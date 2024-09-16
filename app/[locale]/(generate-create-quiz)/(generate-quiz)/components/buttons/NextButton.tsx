import React from "react";
import { Button } from "@nextui-org/button";
import RightArrow from "./RightArrow";
import { useTranslations } from "next-intl";

interface NextButtonProps {
  isPending?: boolean;
}
const NextButton = ({ isPending }: NextButtonProps) => {
  const t = useTranslations("CreateQuiz");
  return (
    <Button
      type="submit"
      variant="solid"
      color="primary"
      size="lg"
      radius="sm"
      isDisabled={isPending}
      endContent={<RightArrow />}
    >
      {t("nextButton")}
    </Button>
  );
};

export default NextButton;
