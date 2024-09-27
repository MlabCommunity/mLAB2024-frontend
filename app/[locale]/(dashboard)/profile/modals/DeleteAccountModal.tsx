"use client";
import CancelButton from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/buttons/CancelButton";
import { routes } from "@/routes";
import { useModalStore } from "@/store/modalStore";
import { deleteAccount } from "@/utils/actions/quiz/deleteAccount";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function DeleteAccountModal() {
  const { isOpen, type, closeModal, modalData, setModalData } = useModalStore();

  const t = useTranslations("Dashboard");
  const isModalOpen = isOpen && type === "deleteAccountModal";
  const handleDeleteAccount = () => {
    console.log("Deleting account...");
    closeModal();
  };
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: deleteAccount,
    mutationKey: ["deleteAccount"],
    onSuccess: () => {
      toast.success("Account deleted");
      router.push(routes.signIn.pathname);
      console.log("Account deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      size="xl"
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
          <div className="text-danger-400">
            <h1>Warning</h1>
          </div>
          <div className="bg-danger-50 text-danger-500 p-4 rounded-lg border-dashed border border-danger-400">
            <ul className="list-disc p-4 flex flex-col gap-2">
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
