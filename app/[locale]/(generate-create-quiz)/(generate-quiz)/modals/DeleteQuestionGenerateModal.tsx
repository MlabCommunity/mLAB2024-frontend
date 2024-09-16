import React from "react";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface DeleteQuestionModalGenerateProps {
  onConfirmDelete: () => void;
  questionTitle: string;
}

const DeleteQuestionGenerateModal = ({
  onConfirmDelete,
  questionTitle,
}: DeleteQuestionModalGenerateProps) => {
  const t = useTranslations("QuestionsOnAnswers");
  const { closeModal, isOpen, type } = useModalStore();

  if (!(isOpen && type === "deleteQuestion")) return null;

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
      <ModalContent className="rounded-lg shadow-lg relative bg-content2">
        <ModalHeader className="flex flex-col">
          <div className="flex flex-col justify-start">
            <p className="text-lg text-foreground-700 font-semibold">
              {t("areYouSure")}
            </p>
            <p className="text-base text-foreground-500 font-medium mt-1">
              {t("cannotUndo")}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="bg-white py-2 px-4 rounded-lg border-dashed border-2">
            <p className="text-foreground-700 font-semibold">{questionTitle}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="bg-primary-200 text-primary-600 py-2 px-4 rounded-md "
            >
              {t("cancel")}
            </button>

            <button
              onClick={() => {
                onConfirmDelete();
                closeModal();
              }}
              className="bg-pink-600 text-white py-2 px-4 rounded-md"
            >
              {t("delete")}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteQuestionGenerateModal;
