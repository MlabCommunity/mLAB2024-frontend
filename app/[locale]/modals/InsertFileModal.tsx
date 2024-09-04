"use client";
import { useModalStore } from "@/store/modalStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import ImagePicker from "../(generate-create-quiz)/(generate-quiz)/generate-configure-quiz/components/FilePicker";
import FilePicker from "../(generate-create-quiz)/(generate-quiz)/generate-configure-quiz/components/FilePicker";

function InsertFileModal() {
  const { isOpen, closeModal, type } = useModalStore();
  const t = useTranslations("CreateQuiz");
  const isModalOpen = isOpen && type === "uploadFile";

  // Server action needs to be provided to integrate with APi

  return (
    <Modal
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
        <form action="">
          <ModalHeader>
            <div className="flex flex-col justify-start">
              <p className="text-lg text-foreground-700 font-semibold">
                {t("uploadFile")}
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="w-full h-full">
              <FilePicker id={"file"} name={"filePicker"} />
            </div>
            <aside className="flex justify-between">
              <div className="">
                <p className="text-foreground-600">
                  {t("uploadFileSupportedFormats")}
                </p>
              </div>
              <div className="">{t("uploadFileMaximumSize")}</div>
            </aside>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" color="primary" onPress={closeModal}>
              {t("cancelButton")}
            </Button>
            <Button type="submit" onPress={closeModal} color="primary">
              {t("nextButton")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default InsertFileModal;
