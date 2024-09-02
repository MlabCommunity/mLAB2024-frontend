"use client";
import { routes } from "@/routes";
import { useModalStore } from "@/store/modalStore";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

function CancelQuizModal() {
  const { isOpen, type, closeModal, modalData } = useModalStore();
  const isModalOpen = isOpen && type === "cancelCreateQuizz";
  const t = useTranslations("CreateQuiz");
  return (
    <Modal
      onOpenChange={closeModal}
      isOpen={isModalOpen}
      size="5xl"
      className="bg-content2 "
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
      <ModalContent className="bg-content2">
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
          <Link href={routes.dashboard}>
            <Button color="danger" onPress={closeModal}>
              {t("cancelQuizConfirm")}
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CancelQuizModal;
