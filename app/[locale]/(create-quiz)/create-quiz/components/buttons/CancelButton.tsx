import CancelQuizModal from "@/app/(create-quiz)/components/CancelQuizModal";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import React from "react";

function CancelButton() {
  const { openModal } = useModalStore();
  const handleOpenModal = () => {
    openModal("cancelCreateQuizz");
  };
  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="flat"
        color="primary"
        size="lg"
        radius="sm"
      >
        Cancel
      </Button>
      <CancelQuizModal />
    </>
  );
}

export default CancelButton;