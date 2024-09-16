"use client";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import React from "react";
import CancelQuizModal from "../CancelQuizModal";
import { useTranslations } from "next-intl";

interface CancelButtonProps {
  isPending?: boolean;
}

function CancelButton({ isPending }: CancelButtonProps) {
  const t = useTranslations("CreateQuiz");
  const { openModal, setModalData, closeModal } = useModalStore();
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
        isDisabled={isPending}
      >
        {t("cancelButton")}
      </Button>
      <CancelQuizModal />
    </>
  );
}

export default CancelButton;
