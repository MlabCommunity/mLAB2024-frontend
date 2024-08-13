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

export default function DeleteQuizzModal() {
  const { isOpen, type, closeModal, modalData } = useModalStore();
  const isModalOpen = isOpen && type === "deleteQuizz";

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
      <ModalContent className="bg-content2">
        <ModalHeader>
          <div className="flex flex-col justify-start">
            <p className="text-lg text-foreground-700 font-semibold">
              Are you sure?
            </p>
            <p className="text-base text-foreground-500 font-medium mt-1">
              This action cannot be undone. Once you delete the quizz, there is
              no going back.
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="bg-white py-2 px-4 rounded-lg border-dashed border-2">
            <p className="text-foreground-700 font-semibold">
              {modalData.title}
            </p>
            <p className="text-foreground-600">{modalData.description}</p>
          </div>
          <div className=" bg-blue-600 text-white px-2 py-1 rounded-lg max-w-36 text-center">
            <p className="text-white text-small">
              Total {modalData.questions} questions
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="danger" onPress={closeModal}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
