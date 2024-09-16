"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); 
  };

  return (
    <Button
      variant="light"
      color="default"
      size="sm"
      radius="sm"
      onClick={handleBack}
      className="flex items-center"
    >
      <FaArrowLeft size={20} />
    </Button>
  );
};

export default BackButton;
