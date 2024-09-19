"use client";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";

const NavbarContentContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const t = useTranslations("quizDetails");
  return (
    <>
      <p className="mb-4">{t("manageSettings")}</p>
      <section className={className}>{children}</section>
    </>
  );
};

export default NavbarContentContainer;
