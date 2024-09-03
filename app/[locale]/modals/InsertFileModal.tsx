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

function InsertFileModal() {
  const { isOpen, closeModal, setModalData } = useModalStore();
  const t = useTranslations("CreateQuiz");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };
  return (
    <Modal
      isOpen={isOpen}
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
            <div className="border border-slate-500 border-dashed h-[500px] flex flex-col items-center justify-center">
              <Input ref={fileInputRef} className=" hidden" type="file"></Input>
              <div className="text-foreground-600 md:text-2xl text-lg flex gap-2">
                <span>{t("uploadFileData")}</span>
                <span onClick={handleUploadFile} className="underline">
                  {t("uploadFile")}
                </span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" color="primary" onPress={closeModal}>
              {t("cancelButton")}
            </Button>
            <Button onPress={closeModal} color="primary">
              {t("nextButton")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default InsertFileModal;
