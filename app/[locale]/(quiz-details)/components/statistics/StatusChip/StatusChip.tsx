import { Chip } from "@nextui-org/react";
import React from "react";
import CheckIcon from "../CheckIcon";
import { useTranslations } from "next-intl";

type ChipStatusProp = {
  status: "Stopped" | "Finished" | "Started";
};

const StatusChip = ({ status }: ChipStatusProp) => {
  const t = useTranslations("quizDetails");

  const chipColor =
    status === "Finished"
      ? "success"
      : status === "Started"
      ? "warning"
      : "warning";

  const iconColor =
    status === "Finished"
      ? "warning"
      : status === "Started"
      ? "success"
      : "success";

  return (
    <Chip
      variant="dot"
      size="md"
      radius="full"
      color={chipColor} // Use the appropriate chip color
      className="w-full flex items-center"
      startContent={
        <CheckIcon color={iconColor} size={20} /> // Use the appropriate icon color
      }
    >
      {t(status)}
    </Chip>
  );
};

export default StatusChip;
