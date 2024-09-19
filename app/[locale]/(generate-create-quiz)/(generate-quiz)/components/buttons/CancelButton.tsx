"use client";

import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import React from "react";
import CancelQuizModal from "../CancelQuizModal";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion"; 

interface CancelButtonProps {
  isPending?: boolean;
}

function CancelButton({ isPending }: CancelButtonProps) {
  const t = useTranslations("CreateQuiz");
  const { openModal } = useModalStore();

  const handleOpenModal = () => {
    openModal("cancelCreateQuizz");
  };

  return (
    <>
    
      <motion.div
        whileHover={{
          y: -10, 
          transition: {
            type: "spring",
            stiffness: 500, 
            damping: 10, 
          },
        }}
        whileTap={{
          scale: 0.9, 
          y: 0, 
        }}
      >
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
      </motion.div>
      <CancelQuizModal />
    </>
  );
}

export default CancelButton;
