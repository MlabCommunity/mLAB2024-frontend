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
      <div
        aria-label="navbar-content-container"
        className=" flex justify-between items-center mb-4 md:flex-row flex-col"
      >
        <p className="mb-4">{t("manageSettings")}</p>
      </div>
      <section className={className}>{children}</section>
    </>
  );
};

export default NavbarContentContainer;
