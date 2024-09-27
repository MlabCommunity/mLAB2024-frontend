"use client";
import CancelButton from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/buttons/CancelButton";
import { useModalStore } from "@/store/modalStore";
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

function DeleteAccountModal() {
  const { isOpen, type, closeModal } = useModalStore();
  const t = useTranslations("Dashboard");
  const isModalOpen = isOpen && type === "deleteAccountModal";
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      size="md"
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
      <ModalContent>
        <ModalHeader>
          <h1>{t("deleteAccount")}</h1>
        </ModalHeader>
        <ModalBody>
          <div>
            A<h1>Warning</h1>
          </div>
          <div>
            <ul>
              <li>
                All your data will be permanenty delete, including personal
                information, settings, and any saved content
              </li>
              <li>
                You will lose access to all services and features associated
                with this account
              </li>
            </ul>
            <h4>
              If you are sure you want to procees, please confirm below. If you
              have any questions or need help, consider contacting support
              before finalizing this action.
            </h4>
          </div>
          <ModalFooter>
            <CancelButton />
            <Button color="danger">{t("delete")}</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DeleteAccountModal;
