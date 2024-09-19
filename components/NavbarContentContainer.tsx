"use client";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";

const NavbarContentContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { openModal } = useModalStore();

  const t = useTranslations("quizDetails");
  return (
    <>
      <div className=" flex justify-between items-center mb-4">
        <p className="mb-4">{t("manageSettings")}</p>
        <Button
          onClick={() => openModal("chartModal")}
          size="lg"
          color="success"
        >
          <span className="text-white">{t("quizTakenPreviewButton")}</span>
        </Button>
      </div>
      <section className={className}>{children}</section>
    </>
  );
};

export default NavbarContentContainer;
