import { Chip } from "@nextui-org/react";
import React from "react";
import CheckIcon from "../CheckIcon";
import { useTranslations } from "next-intl";
type ChipStatusProp = {
  status: "Stopped" | "Finished";
};

const StatusChip = ({ status }: ChipStatusProp) => {
  const t = useTranslations("QuestionsOnAnswers");
  return (
    <Chip
      variant="dot"
      size="md"
      radius="full"
      color={status === "Finished" ? "success" : "warning"}
      className="w-full flex items-center"
      startContent={
        status === "Stopped" ? (
          <CheckIcon color="success" size={20} />
        ) : (
          <CheckIcon color="warning" size={20} />
        )
      }
    >
      {t(status)}
    </Chip>
  );
};

export default StatusChip;
