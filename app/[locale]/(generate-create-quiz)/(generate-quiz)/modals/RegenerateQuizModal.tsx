"use client";

import React from "react";
import { useModalStore } from "@/store/modalStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { regenerateQuiz } from "@/utils/actions/quiz/regenerateQuiz";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useTranslations } from "next-intl";

const RegenerateQuizModal = () => {
  const t = useTranslations("QuizPreview");
  const { closeModal, isOpen, type } = useModalStore();
  const { setGeneratedQuizData } = useGenerateQuizStore();

  const { mutate: regenerateQuizMutate, isPending } = useMutation({
    mutationFn: regenerateQuiz,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(t('regeneratedSuccessfullyMsg'));
      setGeneratedQuizData(data);
      closeModal();
    },
    onMutate() {
      toast.loading(t("regenerating"), {
        id: "loading-toast",
      });
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });

  if (!(isOpen && type === "regenerateQuiz")) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={closeModal}
      size="4xl"
      closeButton={
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#292D32",
            color: "white",
            width: 22,
            height: 22,
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
        <ModalHeader className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{t("regenerateQuizHeading")}</h2>
        </ModalHeader>
        <ModalBody>
          <p className="mb-4">
            {t("regenerateQuizMessage")}
          </p>
          <div className="bg-red-100 border border-red-400 p-4 rounded-md">
            <p className="text-red-700 font-semibold">
              {t("regenerateQuizWarning")}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onPress={closeModal}
            isDisabled={isPending}
            className="disabled:bg-danger/50"
          >
            {t("cancelButton")}
          </Button>
          <Button
            color="primary"
            isDisabled={isPending}
            onClick={() => regenerateQuizMutate()}
            className="disabled:bg-primary/50"
          >
            {isPending ? t("regenerating") : t("regenerateButton")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegenerateQuizModal;
