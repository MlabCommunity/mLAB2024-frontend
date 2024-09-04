import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
const DetailsButton = () => {
  const t = useTranslations("QuestionsOnAnswers");
  return (
    <Button
      variant="solid"
      color="default"
      size="sm"
      radius="sm"
      className="text-white"
    >
      {t("detailsButton")}
    </Button>
  );
};

export default DetailsButton;
