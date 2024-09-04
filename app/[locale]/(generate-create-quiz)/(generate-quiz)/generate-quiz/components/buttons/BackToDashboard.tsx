"use client";
import { routes } from "@/routes";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

function BackToDashboard() {
  const t = useTranslations("CreateQuizSuccess");
  return (
    <Button
      variant="solid"
      color="primary"
      onClick={() => localStorage.removeItem("visitedRoutes")}
    >
      <Link href={routes.dashboard}>{t("backToDashboardBtn")}</Link>
    </Button>
  );
}

export default BackToDashboard;
