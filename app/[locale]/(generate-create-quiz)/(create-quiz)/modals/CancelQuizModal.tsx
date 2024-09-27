"use client";
import { useModalStore } from "@/store/modalStore";
import { useStepperStore } from "@/store/stepperStore";
import { clearLocalStorageRoutes } from "@/utils/clearLsRoutes";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

function CancelQuizModal() {
  const { isOpen, type, closeModal, modalData } = useModalStore();
  const isModalOpen = isOpen && type === "cancelCreateQuizz";
  const t = useTranslations("CreateQuiz");
  const { resetVisitedRoutes } = useStepperStore();
  const handleCancelQuiz = () => {
    resetVisitedRoutes();
    closeModal();
  };
  return (
    <Modal
      isOpen={isModalOpen}
      size="5xl"
      className="bg-Content-content2-light dark:bg-Content-content2-dark"
      closeButton={
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#292D32",
            color: "white",
            width: 24,
            height: 24,
            fontSize: 11,
            fontWeight: "bold",
            borderRadius: "100%",
            top: 10,
            right: 10,
          }}
        >
          X
        </button>
      }
    >
      <ModalContent className="bg-Content-content2-light dark:bg-Content-content2-dark">
        <ModalHeader>
          <div className="flex flex-col justify-start">
            <p className="text-lg text-foreground-700 font-semibold">
              {t("cancelQuizWarning")}
            </p>
            <p className="text-base text-foreground-500 font-medium mt-1">
              {t("cancelQuizWarningText")}
            </p>
          </div>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button variant="flat" color="primary" onPress={closeModal}>
            {t("cancelButton")}
          </Button>
          <Button onPress={handleCancelQuiz} color="danger">
            {t("cancelQuizConfirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CancelQuizModal;
