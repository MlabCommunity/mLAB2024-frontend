"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import fileIcon from "@/public/assets/file.svg";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const InsertFileButton = () => {
  const { openModal } = useModalStore();
  const t = useTranslations("CreateQuiz");

  const handleOpenModal = () => {
    openModal("uploadFile");
  };

  return (
    <motion.div
      whileTap={{
        scale: 0.9,
        y: 0,
      }}
    >
      <Button
        onClick={handleOpenModal}
        color="success"
        variant="solid"
        radius="sm"
        size="lg"
        endContent={<Image className="size-8" alt="file" src={fileIcon} />}
      >
        <span className="text-white">{t("uploadFile")}</span>
      </Button>
    </motion.div>
  );
};

export default InsertFileButton;
