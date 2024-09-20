import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
const DetailsButton = ({ id }: { id: string }) => {
  const t = useTranslations("quizDetails");
  const { openModal, setModalData } = useModalStore();
  const handleOpenModal = () => {
    openModal("detailsModal");
    setModalData({ id: id });
  };
  return (
    <Button
      variant="solid"
      color="primary"
      size="sm"
      onClick={handleOpenModal}
      radius="sm"
      className="text-white"
    >
      {t("detailsButton")}
    </Button>
  );
};

export default DetailsButton;
