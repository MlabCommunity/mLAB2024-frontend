import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {};

const CloseButton = ({ close }: { close: () => void }) => {
  const t = useTranslations("quizDetails");
  return (
    <Button onClick={close} size="md" variant="ghost">
      {t("close")}
    </Button>
  );
};

export default CloseButton;
