"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import fileIcon from "../../../../../../../public/assets/file.svg";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";
const InsertFileButton = () => {
  const { openModal } = useModalStore();
  const t = useTranslations("CreateQuiz");
  const handleOpenModal = () => {
    openModal("uploadFile");
  };
  return (
    <Button
      onClick={handleOpenModal}
      color="danger"
      variant="solid"
      radius="sm"
      size="lg"
      endContent={<Image className="size-8" alt="file" src={fileIcon}></Image>}
    >
      <span className="text-white">{t("uploadFile")}</span>
    </Button>
  );
};

export default InsertFileButton;
