"use client";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import React from "react";
import CancelQuizModal from "../../../components/CancelQuizModal";
import { useTranslations } from "next-intl";

function CancelButton() {
  const t = useTranslations("CreateQuiz");
  const { openModal } = useModalStore();
  const handleOpenModal = () => {
    openModal("cancelCreateQuizz");
  };
  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="flat"
        color="primary"
        size="lg"
        radius="sm"
      >
        {t("cancelButton")}
      </Button>
      <CancelQuizModal />
    </>
  );
}

export default CancelButton;
