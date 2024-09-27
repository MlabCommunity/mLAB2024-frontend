import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";

export default function DeleteQuizzModal() {
  const { isOpen, type, closeModal, modalData } = useModalStore();
  const isModalOpen = isOpen && type === "deleteQuizz";
  const t = useTranslations("Dashboard");

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      size="5xl"
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
      <ModalContent className="bg-content2 dark:bg-gray-800">
        <ModalHeader>
          <div className="flex flex-col justify-start">
            <p className="text-lg text-foreground-700 dark:text-foreground-400 font-semibold">
              {t("areYouSureText")}
            </p>
            <p className="text-base text-foreground-500 dark:text-foreground-300 font-medium mt-1">
              {t("deleteWarning")}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="bg-white dark:bg-gray-900 py-2 px-4 rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700">
            <p className="text-foreground-700 dark:text-foreground-200 font-semibold">
              {modalData.title}
            </p>
            <p className="text-foreground-600 dark:text-foreground-400">
              {modalData.description}
            </p>
          </div>
          <div className="bg-blue-600 text-white px-2 py-1 rounded-lg max-w-72 text-center">
            <p className="text-white text-small w-full">
              {t("total")} {modalData.questions} {t("questions")}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={closeModal}>
            {t("cancel")}
          </Button>
          <Button
            color="danger"
            onPress={modalData.onConfirmDelete}
            isDisabled={modalData.isPending}
          >
            {t("delete")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
